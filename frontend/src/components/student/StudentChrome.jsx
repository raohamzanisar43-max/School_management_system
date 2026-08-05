import React, { useState } from 'react';
import { Sidebar } from '../layout/Sidebar';
import { Topbar } from '../layout/Topbar';
import { DashboardShell } from '../layout/DashboardShell';
import { ACCENTS } from '../../constants/theme';
import { NAV_ITEMS } from './constants';
import { DEFAULT_STUDENT_NAME } from './useStudentData';

const accent = ACCENTS.STUDENT;

export default function StudentChrome({ activeKey, onSelectNav, user, onLogout, switchRole, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const studentName = user?.name || DEFAULT_STUDENT_NAME;

  return (
    <DashboardShell
      sidebar={
        <Sidebar
          portalLabel="Student Portal"
          navItems={NAV_ITEMS}
          activeKey={activeKey}
          onSelect={onSelectNav}
          accent={accent}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          helpText="Our support team is here to assist you anytime."
          helpAction={() => alert('Support inbox: support@brightfuture.edu.pk')}
        />
      }
      topbar={
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          showSearch
          searchPlaceholder="Search anything..."
          notifCount={3}
          mailCount={5}
          user={{ name: studentName }}
          roleLabel="Grade 8"
          accent={accent}
          onLogout={onLogout}
          quickView={['ADMIN', 'TEACHER', 'PARENT']}
          onQuickView={switchRole}
        />
      }
    >
      {children}
    </DashboardShell>
  );
}
