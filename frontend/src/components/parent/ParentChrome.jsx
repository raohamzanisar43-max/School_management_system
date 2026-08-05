import React, { useState } from 'react';
import { Sidebar } from '../layout/Sidebar';
import { Topbar } from '../layout/Topbar';
import { DashboardShell } from '../layout/DashboardShell';
import { ACCENTS } from '../../constants/theme';
import { NAV_ITEMS } from './constants';
import { DEFAULT_PARENT_NAME } from './useParentData';

const accent = ACCENTS.PARENT;

export default function ParentChrome({ activeKey, onSelectNav, user, onLogout, switchRole, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const parentName = user?.name || DEFAULT_PARENT_NAME;

  return (
    <DashboardShell
      sidebar={
        <Sidebar
          brandLabel="BRIGHTFUTURE"
          portalLabel="Parent Portal"
          navItems={NAV_ITEMS}
          activeKey={activeKey}
          onSelect={onSelectNav}
          accent={accent}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          helpText="We're here to assist you."
          helpAction={() => alert('Support inbox: support@brightfuture.edu.pk')}
        />
      }
      topbar={
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          showSearch
          searchPlaceholder="Search anything..."
          notifCount={3}
          mailCount={null}
          user={{ name: parentName }}
          roleLabel="Parent"
          accent={accent}
          onLogout={onLogout}
          quickView={['ADMIN', 'TEACHER', 'STUDENT']}
          onQuickView={switchRole}
        />
      }
    >
      {children}
    </DashboardShell>
  );
}
