import { Employee, ZoneSession, ActivityLog, ZoneName } from '@/types/rfid';

export const employees: Employee[] = [
  { id: '1', name: 'Arun Sharma', rfidId: 'RF-1001', department: 'Engineering' },
  { id: '2', name: 'Priya Patel', rfidId: 'RF-1002', department: 'Design' },
  { id: '3', name: 'Rahul Verma', rfidId: 'RF-1003', department: 'Marketing' },
  { id: '4', name: 'Sneha Gupta', rfidId: 'RF-1004', department: 'Engineering' },
  { id: '5', name: 'Vikram Singh', rfidId: 'RF-1005', department: 'HR' },
  { id: '6', name: 'Anjali Nair', rfidId: 'RF-1006', department: 'Finance' },
  { id: '7', name: 'Deepak Kumar', rfidId: 'RF-1007', department: 'Engineering' },
  { id: '8', name: 'Meera Reddy', rfidId: 'RF-1008', department: 'Design' },
  { id: '9', name: 'Karthik Iyer', rfidId: 'RF-1009', department: 'Operations' },
  { id: '10', name: 'Nisha Joshi', rfidId: 'RF-1010', department: 'Marketing' },
  { id: '11', name: 'Amit Tiwari', rfidId: 'RF-1011', department: 'Engineering' },
  { id: '12', name: 'Pooja Desai', rfidId: 'RF-1012', department: 'HR' },
  { id: '13', name: 'Suresh Menon', rfidId: 'RF-1013', department: 'Finance' },
  { id: '14', name: 'Kavita Rao', rfidId: 'RF-1014', department: 'Design' },
  { id: '15', name: 'Rajesh Pillai', rfidId: 'RF-1015', department: 'Operations' },
];

function minutesAgo(mins: number): Date {
  return new Date(Date.now() - mins * 60 * 1000);
}

export const initialSessions: ZoneSession[] = [
  { employeeId: '1', zone: 'Workspace', entryTime: minutesAgo(120), status: 'active' },
  { employeeId: '2', zone: 'Workspace', entryTime: minutesAgo(90), status: 'active' },
  { employeeId: '3', zone: 'Canteen', entryTime: minutesAgo(50), status: 'active' },
  { employeeId: '4', zone: 'Workspace', entryTime: minutesAgo(75), status: 'active' },
  { employeeId: '5', zone: 'Lobby', entryTime: minutesAgo(10), status: 'active' },
  { employeeId: '6', zone: 'Canteen', entryTime: minutesAgo(30), status: 'active' },
  { employeeId: '7', zone: 'Workspace', entryTime: minutesAgo(180), status: 'active' },
  { employeeId: '8', zone: 'Lobby', entryTime: minutesAgo(5), status: 'active' },
  { employeeId: '9', zone: 'Workspace', entryTime: minutesAgo(60), status: 'active' },
  { employeeId: '10', zone: 'Canteen', entryTime: minutesAgo(15), status: 'active' },
  { employeeId: '11', zone: 'Workspace', entryTime: minutesAgo(45), status: 'active' },
  { employeeId: '12', zone: 'Lobby', entryTime: minutesAgo(20), status: 'active' },
  { employeeId: '13', zone: 'Workspace', entryTime: minutesAgo(100), status: 'active' },
  { employeeId: '14', zone: 'Workspace', entryTime: minutesAgo(55), status: 'active' },
  { employeeId: '15', zone: 'Canteen', entryTime: minutesAgo(48), status: 'active' },
];

export const initialActivityLogs: ActivityLog[] = [
  { id: 'log-1', timestamp: minutesAgo(180), employeeId: '7', fromZone: 'Outside', toZone: 'Workspace' },
  { id: 'log-2', timestamp: minutesAgo(120), employeeId: '1', fromZone: 'Outside', toZone: 'Workspace' },
  { id: 'log-3', timestamp: minutesAgo(100), employeeId: '13', fromZone: 'Lobby', toZone: 'Workspace' },
  { id: 'log-4', timestamp: minutesAgo(90), employeeId: '2', fromZone: 'Canteen', toZone: 'Workspace' },
  { id: 'log-5', timestamp: minutesAgo(75), employeeId: '4', fromZone: 'Outside', toZone: 'Workspace' },
  { id: 'log-6', timestamp: minutesAgo(60), employeeId: '9', fromZone: 'Canteen', toZone: 'Workspace' },
  { id: 'log-7', timestamp: minutesAgo(55), employeeId: '14', fromZone: 'Lobby', toZone: 'Workspace' },
  { id: 'log-8', timestamp: minutesAgo(50), employeeId: '3', fromZone: 'Workspace', toZone: 'Canteen' },
  { id: 'log-9', timestamp: minutesAgo(48), employeeId: '15', fromZone: 'Workspace', toZone: 'Canteen' },
  { id: 'log-10', timestamp: minutesAgo(45), employeeId: '11', fromZone: 'Canteen', toZone: 'Workspace' },
  { id: 'log-11', timestamp: minutesAgo(30), employeeId: '6', fromZone: 'Workspace', toZone: 'Canteen' },
  { id: 'log-12', timestamp: minutesAgo(20), employeeId: '12', fromZone: 'Workspace', toZone: 'Lobby' },
  { id: 'log-13', timestamp: minutesAgo(15), employeeId: '10', fromZone: 'Lobby', toZone: 'Canteen' },
  { id: 'log-14', timestamp: minutesAgo(10), employeeId: '5', fromZone: 'Workspace', toZone: 'Lobby' },
  { id: 'log-15', timestamp: minutesAgo(5), employeeId: '8', fromZone: 'Canteen', toZone: 'Lobby' },
];
