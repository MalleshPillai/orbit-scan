import { useState, useEffect } from 'react';
import { useRFID } from '@/context/RFIDContext';
import { ZoneName } from '@/types/rfid';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

function formatDuration(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
  const s = String(totalSec % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

const CANTEEN_LIMIT_MS = 45 * 60 * 1000;

export function LiveActivityTable() {
  const { sessions, getEmployeeById } = useRFID();
  const [filter, setFilter] = useState<'All' | ZoneName>('All');
  const [, setTick] = useState(0);

  // Force re-render every second for live timers
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const activeSessions = sessions
    .filter(s => s.status === 'active')
    .filter(s => filter === 'All' || s.zone === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Live Activity</h2>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Workspace" className="data-[state=active]:text-zone-workspace">Workspace</TabsTrigger>
            <TabsTrigger value="Canteen" className="data-[state=active]:text-zone-canteen">Canteen</TabsTrigger>
            <TabsTrigger value="Lobby" className="data-[state=active]:text-zone-lobby">Lobby</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>RFID ID</TableHead>
              <TableHead>Zone</TableHead>
              <TableHead>Entry Time</TableHead>
              <TableHead>Time Spent</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeSessions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No active sessions in this zone
                </TableCell>
              </TableRow>
            ) : (
              activeSessions.map((session) => {
                const employee = getEmployeeById(session.employeeId);
                if (!employee) return null;
                const elapsed = Date.now() - session.entryTime.getTime();
                const isOvertime = session.zone === 'Canteen' && elapsed > CANTEEN_LIMIT_MS;

                return (
                  <TableRow
                    key={`${session.employeeId}-${session.entryTime.getTime()}`}
                    className={cn(isOvertime && 'bg-destructive/10')}
                  >
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{employee.rfidId}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn(
                          session.zone === 'Workspace' && 'border-zone-workspace/40 text-zone-workspace',
                          session.zone === 'Canteen' && 'border-zone-canteen/40 text-zone-canteen',
                          session.zone === 'Lobby' && 'border-zone-lobby/40 text-zone-lobby',
                          'border'
                        )}
                      >
                        {session.zone}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {session.entryTime.toLocaleTimeString('en-US', { hour12: true })}
                    </TableCell>
                    <TableCell className={cn('font-mono tabular-nums', isOvertime && 'font-bold text-destructive')}>
                      {formatDuration(elapsed)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-zone-lobby/20 text-zone-lobby border-zone-lobby/30 border">
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
