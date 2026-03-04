import { ActivityLog } from '@/components/dashboard/ActivityLog';
import { LiveActivityTable } from '@/components/dashboard/LiveActivityTable';
import { Card, CardContent } from '@/components/ui/card';

export default function Activity() {
  return (
    <div className="container space-y-8 py-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Activity</h1>
        <p className="text-muted-foreground">
          Live presence and historical movement across all workplaces.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <section className="lg:col-span-3 space-y-4">
          <Card className="border-2">
            <CardContent className="pt-6">
              <LiveActivityTable />
            </CardContent>
          </Card>
        </section>
        <section className="lg:col-span-2">
          <Card className="border-2 h-full">
            <CardContent className="pt-6">
              <ActivityLog />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

