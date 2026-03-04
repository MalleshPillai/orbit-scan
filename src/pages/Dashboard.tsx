import { NavLink } from 'react-router-dom';
import { useRFID } from '@/context/RFIDContext';
import { ZoneCard } from '@/components/dashboard/ZoneCard';
import { LiveActivityTable } from '@/components/dashboard/LiveActivityTable';
import { ActivityLog } from '@/components/dashboard/ActivityLog';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { Users, MapPin, UserPlus, Building2, Radio } from 'lucide-react';

const chartConfig = {
  count: { label: 'Present', color: 'hsl(var(--primary))' },
};

export default function Dashboard() {
  const { zones, totalPresent, employees, sessions } = useRFID();

  const zoneChartData = zones.map((z) => ({ name: z.name, count: z.occupantCount }));
  const activeSessions = sessions.filter((s) => s.status === 'active');

  return (
    <div className="min-h-full bg-gradient-to-b from-muted/30 to-background">
      {/* Hero / Stats strip */}
      <div className="border-b bg-card/60 backdrop-blur-sm">
        <div className="container py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">SmartZone overview</h1>
              <p className="text-muted-foreground mt-1">
                High-level snapshot of employees, workplaces and live presence.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Card className="min-w-[160px] border-2 bg-background/90">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold tabular-nums">{totalPresent}</p>
                    <p className="text-xs text-muted-foreground">Present now</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="min-w-[160px] border-2 bg-background/90">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zone-workspace/20">
                    <Radio className="h-5 w-5 text-zone-workspace" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold tabular-nums">{employees.length}</p>
                    <p className="text-xs text-muted-foreground">Employees</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="min-w-[160px] border-2 bg-background/90">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zone-lobby/20">
                    <MapPin className="h-5 w-5 text-zone-lobby" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold tabular-nums">{zones.length}</p>
                    <p className="text-xs text-muted-foreground">Workplaces</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <NavLink
              to="/employees/new"
              className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              <UserPlus className="h-4 w-4" />
              Add employee
            </NavLink>
            <NavLink
              to="/workplaces"
              className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              <Building2 className="h-4 w-4" />
              Manage workplaces
            </NavLink>
          </div>
        </div>
      </div>

      <div className="container space-y-8 py-8">
        {/* Presence by zone chart */}
        {zoneChartData.some((d) => d.count > 0) && (
          <Card className="border-2 overflow-hidden">
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-4">Presence by zone</h2>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <BarChart data={zoneChartData} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="var(--color-count)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}

        {/* Live snapshot + zones */}
        <div className="grid gap-8 xl:grid-cols-5">
          <section className="space-y-4 xl:col-span-3">
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Live snapshot</h2>
                    <p className="text-sm text-muted-foreground">
                      Who&apos;s currently checked in and where.
                    </p>
                  </div>
                  <NavLink
                    to="/activity"
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Open full activity
                  </NavLink>
                </div>
                <LiveActivityTable />
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4 xl:col-span-2">
            <Card className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Quick signal</h2>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    {activeSessions.length} active session{activeSessions.length === 1 ? '' : 's'}
                  </span>
                </div>
                <ActivityLog />
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Zone cards */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Workplaces</h2>
            <NavLink
              to="/workplaces"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Manage workplaces
            </NavLink>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {zones.map((zone) => (
              <ZoneCard key={zone.name} zone={zone} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
