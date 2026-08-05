import React, { useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { Sidebar } from '../layout/Sidebar';
import { Topbar } from '../layout/Topbar';
import { DashboardShell } from '../layout/DashboardShell';
import { ACCENTS } from '../../constants/theme';

const accent = ACCENTS.ADMIN;
const NAV_ITEMS = [{ key: 'dashboard', label: 'Dashboard', icon: LayoutGrid }];

export default function AdminChrome({ user, onLogout, switchRole, onSelectDashboard, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DashboardShell
      sidebar={
        <Sidebar
          portalLabel="Admin Portal"
          navItems={NAV_ITEMS}
          activeKey="dashboard"
          onSelect={onSelectDashboard}
          accent={accent}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      }
      topbar={
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          title="Admin Dashboard"
          showSearch={false}
          notifCount={3}
          mailCount={null}
          user={user}
          roleLabel="Administrator"
          accent={accent}
          onLogout={onLogout}
          quickView={['TEACHER', 'STUDENT', 'PARENT']}
          onQuickView={switchRole}
        />
      }
    >
      {children}
    </DashboardShell>
  );
}
