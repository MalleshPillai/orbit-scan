import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Employee, ZoneSession, ActivityLog, ZoneName, ZoneInfo } from '@/types/rfid';
import { employees as mockEmployees, initialSessions, initialActivityLogs } from '@/data/mockData';

interface RFIDContextType {
  employees: Employee[];
  sessions: ZoneSession[];
  activityLogs: ActivityLog[];
  zones: ZoneInfo[];
  scanRFID: (rfidId: string, zone: ZoneName) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  getEmployeeByRfid: (rfidId: string) => Employee | undefined;
  getActiveSessionsForZone: (zone: ZoneName) => ZoneSession[];
  totalPresent: number;
}

const RFIDContext = createContext<RFIDContextType | null>(null);

export function useRFID() {
  const ctx = useContext(RFIDContext);
  if (!ctx) throw new Error('useRFID must be used within RFIDProvider');
  return ctx;
}

export function RFIDProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<ZoneSession[]>(initialSessions);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(initialActivityLogs);

  const getEmployeeById = useCallback((id: string) => mockEmployees.find(e => e.id === id), []);
  const getEmployeeByRfid = useCallback((rfidId: string) => mockEmployees.find(e => e.rfidId === rfidId), []);

  const getActiveSessionsForZone = useCallback(
    (zone: ZoneName) => sessions.filter(s => s.zone === zone && s.status === 'active'),
    [sessions]
  );

  const zones: ZoneInfo[] = [
    { name: 'Workspace', readerStatus: 'online', occupantCount: getActiveSessionsForZone('Workspace').length, color: 'zone-workspace' },
    { name: 'Canteen', readerStatus: 'online', occupantCount: getActiveSessionsForZone('Canteen').length, color: 'zone-canteen' },
    { name: 'Lobby', readerStatus: 'online', occupantCount: getActiveSessionsForZone('Lobby').length, color: 'zone-lobby' },
  ];

  const totalPresent = sessions.filter(s => s.status === 'active').length;

  const scanRFID = useCallback((rfidId: string, zone: ZoneName) => {
    const employee = mockEmployees.find(e => e.rfidId === rfidId);
    if (!employee) return;

    const now = new Date();

    setSessions(prev => {
      const updated = prev.map(s =>
        s.employeeId === employee.id && s.status === 'active'
          ? { ...s, status: 'left' as const, exitTime: now }
          : s
      );
      return [...updated, { employeeId: employee.id, zone, entryTime: now, status: 'active' as const }];
    });

    setActivityLogs(prev => {
      const currentSession = sessions.find(s => s.employeeId === employee.id && s.status === 'active');
      const fromZone = currentSession ? currentSession.zone : 'Outside' as const;
      return [
        { id: `log-${Date.now()}`, timestamp: now, employeeId: employee.id, fromZone, toZone: zone },
        ...prev,
      ];
    });
  }, [sessions]);

  // Simulate random zone transitions every 30-60s
  useEffect(() => {
    const interval = setInterval(() => {
      const activeSessions = sessions.filter(s => s.status === 'active');
      if (activeSessions.length === 0) return;
      const randomSession = activeSessions[Math.floor(Math.random() * activeSessions.length)];
      const employee = mockEmployees.find(e => e.id === randomSession.employeeId);
      if (!employee) return;
      const otherZones: ZoneName[] = (['Workspace', 'Canteen', 'Lobby'] as ZoneName[]).filter(z => z !== randomSession.zone);
      const newZone = otherZones[Math.floor(Math.random() * otherZones.length)];
      scanRFID(employee.rfidId, newZone);
    }, 30000 + Math.random() * 30000);
    return () => clearInterval(interval);
  }, [sessions, scanRFID]);

  return (
    <RFIDContext.Provider value={{
      employees: mockEmployees,
      sessions,
      activityLogs,
      zones,
      scanRFID,
      getEmployeeById,
      getEmployeeByRfid,
      getActiveSessionsForZone,
      totalPresent,
    }}>
      {children}
    </RFIDContext.Provider>
  );
}
