import { useState } from 'react';
import { useRFID } from '@/context/RFIDContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Building2, MapPin, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const BUILT_IN = ['Workspace', 'Canteen', 'Lobby'];

export default function Workplaces() {
  const { zones, addZone, removeZone } = useRFID();
  const [newName, setNewName] = useState('');

  function handleAdd() {
    try {
      addZone(newName);
      toast.success(`Workplace "${newName.trim()}" created.`);
      setNewName('');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to add workplace');
    }
  }

  const customZones = zones.filter(z => !BUILT_IN.includes(z.name));

  return (
    <div className="container space-y-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Workplaces</h1>
        <p className="text-muted-foreground mt-1">Manage zones like Canteen, Meeting Room, Gym, etc.</p>
      </div>

      <Card className="border-2 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Create new workplace</CardTitle>
              <CardDescription>Add a zone (e.g. Canteen, Meeting Room, Gym) for RFID presence.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="e.g. Meeting Room A, Gym, Parking"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
              className="max-w-sm"
            />
            <Button onClick={handleAdd} disabled={!newName.trim()} className="gap-2">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">All workplaces</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {zones.map((zone) => {
            const isBuiltIn = BUILT_IN.includes(zone.name);
            return (
              <Card
                key={zone.name}
                className={cn(
                  'relative overflow-hidden border-2 transition-shadow hover:shadow-md',
                  isBuiltIn && 'border-primary/20'
                )}
              >
                <div className={cn('absolute left-0 top-0 h-full w-1 bg-[hsl(var(--primary))]')} />
                <CardContent className="flex items-center justify-between gap-4 p-4 pl-5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{zone.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {zone.occupantCount} present · Reader {zone.readerStatus}
                      </p>
                    </div>
                  </div>
                  {!isBuiltIn && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 text-destructive hover:text-destructive"
                      onClick={() => {
                        removeZone(zone.name);
                        toast.success(`"${zone.name}" removed.`);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
