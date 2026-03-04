import { Card, CardContent } from '@/components/ui/card';
import { ZoneInfo } from '@/types/rfid';
import { Users, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

const zoneStyles: Record<string, { border: string; bg: string; dot: string; icon: string }> = {
  Workspace: {
    border: 'border-zone-workspace/30',
    bg: 'bg-zone-workspace-light',
    dot: 'bg-zone-workspace',
    icon: 'text-zone-workspace',
  },
  Canteen: {
    border: 'border-zone-canteen/30',
    bg: 'bg-zone-canteen-light',
    dot: 'bg-zone-canteen',
    icon: 'text-zone-canteen',
  },
  Lobby: {
    border: 'border-zone-lobby/30',
    bg: 'bg-zone-lobby-light',
    dot: 'bg-zone-lobby',
    icon: 'text-zone-lobby',
  },
};

interface ZoneCardProps {
  zone: ZoneInfo;
}

export function ZoneCard({ zone }: ZoneCardProps) {
  const style = zoneStyles[zone.name];

  return (
    <Card className={cn('relative overflow-hidden border-2 transition-shadow hover:shadow-lg', style.border)}>
      <div className={cn('absolute inset-0 opacity-40', style.bg)} />
      <CardContent className="relative flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{zone.name}</h3>
          <div className="flex items-center gap-2">
            {zone.occupantCount > 0 && (
              <span className={cn('inline-block h-2.5 w-2.5 rounded-full animate-pulse-dot', style.dot)} />
            )}
            <div className="flex items-center gap-1 text-xs">
              <Cpu className={cn('h-3.5 w-3.5', zone.readerStatus === 'online' ? 'text-zone-lobby' : 'text-destructive')} />
              <span className={zone.readerStatus === 'online' ? 'text-zone-lobby' : 'text-destructive'}>
                {zone.readerStatus === 'online' ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-end gap-2">
          <span className={cn('text-4xl font-bold tabular-nums', style.icon)}>
            {zone.occupantCount}
          </span>
          <div className="mb-1 flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>people</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
