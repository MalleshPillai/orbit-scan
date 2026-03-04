import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Employee, ZoneSession, ActivityLog, ZoneInfo } from '@/types/rfid';
import { employees as initialEmployees, initialSessions, initialActivityLogs } from '@/data/mockData';

const DEFAULT_ZONES: ZoneInfo[] = [
  { name: 'Workspace', readerStatus: 'online', occupantCount: 0, color: 'zone-workspace' },
  { name: 'Canteen', readerStatus: 'online', occupantCount: 0, color: 'zone-canteen' },
  { name: 'Lobby', readerStatus: 'online', occupantCount: 0, color: 'zone-lobby' },
];

const CUSTOM_ZONE_COLORS = ['zone-workspace', 'zone-canteen', 'zone-lobby'] as const;
function nextZoneColor(index: number): string {
  return CUSTOM_ZONE_COLORS[index % CUSTOM_ZONE_COLORS.length];
}

interface RFIDContextType {
  employees: Employee[];
  sessions: ZoneSession[];
  activityLogs: ActivityLog[];
  zones: ZoneInfo[];
  scanRFID: (rfidId: string, zone: string) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  getEmployeeByRfid: (rfidId: string) => Employee | undefined;
  getActiveSessionsForZone: (zone: string) => ZoneSession[];
  totalPresent: number;
  addEmployee: (employee: Omit<Employee, 'id'>) => Employee;
  addZone: (name: string) => ZoneInfo;
  removeZone: (name: string) => void;
}

const RFIDContext = createContext<RFIDContextType | null>(null);

export function useRFID() {
  const ctx = useContext(RFIDContext);
  if (!ctx) throw new Error('useRFID must be used within RFIDProvider');
  return ctx;
}

export function RFIDProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [sessions, setSessions] = useState<ZoneSession[]>(initialSessions);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(initialActivityLogs);
  const [customZones, setCustomZones] = useState<Omit<ZoneInfo, 'occupantCount'>[]>([]);

  const getEmployeeById = useCallback((id: string) => employees.find(e => e.id === id), [employees]);
  const getEmployeeByRfid = useCallback((rfidId: string) => employees.find(e => e.rfidId === rfidId), [employees]);

  const getActiveSessionsForZone = useCallback(
    (zone: string) => sessions.filter(s => s.zone === zone && s.status === 'active'),
    [sessions]
  );

  const zones: ZoneInfo[] = [
    ...DEFAULT_ZONES.map(z => ({
      ...z,
      occupantCount: getActiveSessionsForZone(z.name).length,
    })),
    ...customZones.map(z => ({
      ...z,
      occupantCount: getActiveSessionsForZone(z.name).length,
    })),
  ];

  const totalPresent = sessions.filter(s => s.status === 'active').length;

  const scanRFID = useCallback((rfidId: string, zone: string) => {
    const employee = employees.find(e => e.rfidId === rfidId);
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
      const fromZone = currentSession ? currentSession.zone : 'Outside';
      return [
        { id: `log-${Date.now()}`, timestamp: now, employeeId: employee.id, fromZone, toZone: zone },
        ...prev,
      ];
    });
  }, [employees, sessions]);

  const addEmployee = useCallback((data: Omit<Employee, 'id'>) => {
    const id = `emp-${Date.now()}`;
    const employee: Employee = { ...data, id };
    setEmployees(prev => [...prev, employee]);
    return employee;
  }, []);

  const addZone = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) throw new Error('Zone name is required');
    const existing = [...DEFAULT_ZONES.map(z => z.name), ...customZones.map(z => z.name)];
    if (existing.includes(trimmed)) throw new Error(`Zone "${trimmed}" already exists`);
    const color = nextZoneColor(customZones.length);
    const zone: Omit<ZoneInfo, 'occupantCount'> = {
      name: trimmed,
      readerStatus: 'online',
      color,
    };
    setCustomZones(prev => [...prev, zone]);
    return { ...zone, occupantCount: 0 };
  }, [customZones.length]);

  const removeZone = useCallback((name: string) => {
    if (DEFAULT_ZONES.some(z => z.name === name)) return;
    setCustomZones(prev => prev.filter(z => z.name !== name));
  }, []);

  // Simulate random zone transitions every 30-60s (only for existing zones)
  const zoneNames = zones.map(z => z.name).join(',');
  useEffect(() => {
    const names = zoneNames.split(',').filter(Boolean);
    const interval = setInterval(() => {
      const activeSessions = sessions.filter(s => s.status === 'active');
      if (activeSessions.length === 0) return;
      const randomSession = activeSessions[Math.floor(Math.random() * activeSessions.length)];
      const employee = employees.find(e => e.id === randomSession.employeeId);
      if (!employee) return;
      const otherZones = names.filter(z => z !== randomSession.zone);
      if (otherZones.length === 0) return;
      const newZone = otherZones[Math.floor(Math.random() * otherZones.length)];
      scanRFID(employee.rfidId, newZone);
    }, 30000 + Math.random() * 30000);
    return () => clearInterval(interval);
  }, [sessions, employees, zoneNames, scanRFID]);

  return (
    <RFIDContext.Provider value={{
      employees,
      sessions,
      activityLogs,
      zones,
      scanRFID,
      getEmployeeById,
      getEmployeeByRfid,
      getActiveSessionsForZone,
      totalPresent,
      addEmployee,
      addZone,
      removeZone,
    }}>
      {children}
    </RFIDContext.Provider>
  );
}
