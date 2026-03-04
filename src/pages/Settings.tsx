import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from 'next-themes';

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="container space-y-8 py-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Personalize how SmartZone looks and behaves.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Switch between light and dark themes.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor="theme-toggle">Dark mode</Label>
              <p className="text-xs text-muted-foreground">
                Toggle the interface between light and dark.
              </p>
            </div>
            <Switch
              id="theme-toggle"
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

