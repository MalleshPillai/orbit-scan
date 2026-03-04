import { RFIDScanEvent, ZoneName } from '@/types/rfid';

// Placeholder API service — replace with real endpoints
const API_BASE = '/api/rfid';

export const rfidApi = {
  async submitScan(event: RFIDScanEvent): Promise<void> {
    // POST /api/rfid/scan
    console.log('[rfidApi] submitScan', event);
  },

  async getZoneStatus(zone: ZoneName) {
    // GET /api/rfid/zones/:zone
    console.log('[rfidApi] getZoneStatus', zone);
    return { readerStatus: 'online' as const };
  },

  async getEmployeeSessions() {
    // GET /api/rfid/sessions
    console.log('[rfidApi] getEmployeeSessions');
    return [];
  },

  async getActivityLogs(limit = 50) {
    // GET /api/rfid/logs?limit=
    console.log('[rfidApi] getActivityLogs', limit);
    return [];
  },
};

// WebSocket placeholder
export function connectWebSocket(onMessage: (event: RFIDScanEvent) => void) {
  console.log('[rfidApi] WebSocket connection placeholder');
  // const ws = new WebSocket('ws://localhost:8080/rfid');
  // ws.onmessage = (e) => onMessage(JSON.parse(e.data));
  // return ws;
  return { close: () => {} };
}
