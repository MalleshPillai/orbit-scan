import { NavBar } from '@/components/dashboard/NavBar';
import { ZoneCard } from '@/components/dashboard/ZoneCard';
import { LiveActivityTable } from '@/components/dashboard/LiveActivityTable';
import { ActivityLog } from '@/components/dashboard/ActivityLog';
import { useRFID } from '@/context/RFIDContext';

const Dashboard = () => {
  const { zones } = useRFID();

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container space-y-8 py-8">
        {/* Zone Status Cards */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {zones.map((zone) => (
            <ZoneCard key={zone.name} zone={zone} />
          ))}
        </section>

        {/* Live Activity Table */}
        <section>
          <LiveActivityTable />
        </section>

        {/* Activity Log */}
        <section>
          <ActivityLog />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
