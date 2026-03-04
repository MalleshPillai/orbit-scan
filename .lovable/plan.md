

# SmartZone RFID Tracker — Implementation Plan

## Overview
A modern, responsive dashboard for tracking employee movement across 3 RFID-monitored zones (Workspace, Canteen, Lobby) with real-time updates, live timers, and activity logging.

## Pages & Layout

### 1. Dashboard (Single-Page App)
**Top Navigation Bar:**
- SmartZone logo + app name (left)
- Live clock updating every second (center)
- Badge showing total employees present
- Dark/Light mode toggle
- Logout button

**Zone Status Cards (3-column grid):**
- **Workspace** (blue theme), **Canteen** (orange theme), **Lobby** (green theme)
- Each card shows: zone name, online/offline reader status indicator, people count, and a pulsing activity dot
- Soft shadows, rounded corners, color-coded borders/accents

**Live Activity Table:**
- Columns: Employee Name, RFID ID, Current Zone, Entry Time, Time Spent (live HH:MM:SS counter), Status badge (Active/Left)
- Filter tabs above table: All / Workspace / Canteen / Lobby
- Rows auto-highlighted in red if canteen time exceeds 45 minutes
- Sortable columns

**Activity Log Section:**
- Scrollable chronological log of zone transitions
- Columns: Timestamp, Employee, From Zone, To Zone
- Latest entries appear at top

## Data & State Management
- Mock data with ~15 sample employees across zones
- React context/state for zone tracking with simulated real-time updates (setInterval-based timers)
- Zone transition logic: scanning a new zone auto-closes the previous session
- Structured with TypeScript interfaces (Employee, ZoneSession, ActivityLog) ready for API integration
- Service layer with placeholder functions for WebSocket connection and REST API endpoints

## Design System
- Clean corporate aesthetic with the existing shadcn/ui components
- Zone color palette: Blue (Workspace), Orange (Canteen), Green (Lobby)
- Dark and light mode via next-themes
- Fully responsive: cards stack vertically on mobile, table becomes scrollable
- Pulse animation on active zone indicators

## File Structure
- `src/types/rfid.ts` — TypeScript types
- `src/data/mockData.ts` — Sample employees and scan events
- `src/context/RFIDContext.tsx` — Global state for zones and employees
- `src/services/rfidApi.ts` — API service layer (placeholder for backend)
- `src/components/dashboard/` — NavBar, ZoneCard, LiveActivityTable, ZoneFilterTabs, ActivityLog
- `src/pages/Dashboard.tsx` — Main dashboard page

