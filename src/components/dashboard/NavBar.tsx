import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useRFID } from '@/context/RFIDContext';
import { Wifi, LogOut, Moon, Sun } from 'lucide-react';

export function NavBar() {
  const [time, setTime] = useState(new Date());
  const { theme, setTheme } = useTheme();
  const { totalPresent } = useRFID();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
      <div className="flex h-14 items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1 flex items-center justify-between gap-4">
        {/* Live Clock */}
        <div className="font-mono text-sm tabular-nums text-muted-foreground">
          {time.toLocaleTimeString('en-US', { hour12: true })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="gap-1.5 px-3 py-1">
            <Wifi className="h-3.5 w-3.5 text-zone-lobby" />
            <span className="font-semibold">{totalPresent}</span>
            <span className="hidden text-muted-foreground sm:inline">present</span>
          </Badge>

          <div className="flex items-center gap-1.5">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>

          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        </div>
      </div>
    </header>
  );
}
