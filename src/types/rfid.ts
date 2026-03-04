export type ZoneName = 'Workspace' | 'Canteen' | 'Lobby';

export interface Employee {
  id: string;
  name: string;
  rfidId: string;
  department: string;
}

export interface ZoneSession {
  employeeId: string;
  zone: ZoneName;
  entryTime: Date;
  exitTime?: Date;
  status: 'active' | 'left';
}

export interface ActivityLog {
  id: string;
  timestamp: Date;
  employeeId: string;
  fromZone: ZoneName | 'Outside';
  toZone: ZoneName | 'Outside';
}

export interface ZoneInfo {
  name: ZoneName;
  readerStatus: 'online' | 'offline';
  occupantCount: number;
  color: string;
}

export interface RFIDScanEvent {
  rfidId: string;
  zone: ZoneName;
  timestamp: Date;
}
