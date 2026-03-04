import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  Radio,
  LayoutDashboard,
  UserPlus,
  Building2,
  ListTree,
  Settings,
  MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const primaryItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/employees/new', label: 'Add employee', icon: UserPlus },
  { to: '/workplaces', label: 'Workplaces', icon: Building2 },
];

const analyticsItems = [
  { to: '/activity', label: 'Activity log', icon: ListTree },
];

const settingsItems = [
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" isActive={location.pathname === '/'}>
              <NavLink to="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Radio className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-semibold">SmartZone</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    isActive={location.pathname === item.to}
                  >
                    <NavLink to={item.to} className={cn('flex items-center gap-2')}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    isActive={location.pathname.startsWith(item.to)}
                  >
                    <NavLink to={item.to} className={cn('flex items-center gap-2')}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    isActive={location.pathname.startsWith(item.to)}
                  >
                    <NavLink to={item.to} className={cn('flex items-center gap-2')}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>Zone presence</span>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
