/** Built-in zone names; custom workplaces use arbitrary strings */
export type ZoneName = 'Workspace' | 'Canteen' | 'Lobby' | (string & {});

export interface Employee {
  id: string;
  name: string;
  rfidId: string;
  department: string;
}

export interface ZoneSession {
  employeeId: string;
  zone: string;
  entryTime: Date;
  exitTime?: Date;
  status: 'active' | 'left';
}

export interface ActivityLog {
  id: string;
  timestamp: Date;
  employeeId: string;
  fromZone: string;
  toZone: string;
}

export interface ZoneInfo {
  name: string;
  readerStatus: 'online' | 'offline';
  occupantCount: number;
  /** Tailwind/CSS class or variable name, e.g. zone-workspace, zone-canteen */
  color: string;
}

export interface RFIDScanEvent {
  rfidId: string;
  zone: ZoneName;
  timestamp: Date;
}
