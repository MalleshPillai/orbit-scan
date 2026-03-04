import { useRFID } from '@/context/RFIDContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowRight } from 'lucide-react';

export function ActivityLog() {
  const { activityLogs, getEmployeeById } = useRFID();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Activity Log</h2>
      <div className="rounded-lg border bg-card">
        <ScrollArea className="h-[320px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>From</TableHead>
                <TableHead className="w-8"></TableHead>
                <TableHead>To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLogs.map((log) => {
                const employee = getEmployeeById(log.employeeId);
                return (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {log.timestamp.toLocaleTimeString('en-US', { hour12: true })}
                    </TableCell>
                    <TableCell className="font-medium">{employee?.name ?? 'Unknown'}</TableCell>
                    <TableCell className="text-sm">{log.fromZone}</TableCell>
                    <TableCell>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </TableCell>
                    <TableCell className="text-sm font-medium">{log.toZone}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
