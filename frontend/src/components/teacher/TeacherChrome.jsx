import React, { useState } from 'react';
import { Sidebar } from '../layout/Sidebar';
import { Topbar } from '../layout/Topbar';
import { DashboardShell } from '../layout/DashboardShell';
import { ACCENTS } from '../../constants/theme';
import { NAV_ITEMS } from './constants';
import { DEFAULT_TEACHER_NAME } from './useTeacherData';

const accent = ACCENTS.TEACHER;

export default function TeacherChrome({ activeKey, onSelectNav, user, onLogout, switchRole, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const teacherName = user?.name || DEFAULT_TEACHER_NAME;

  return (
    <DashboardShell
      sidebar={
        <Sidebar
          portalLabel="Teacher Workspace"
          navItems={NAV_ITEMS}
          activeKey={activeKey}
          onSelect={onSelectNav}
          accent={accent}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          helpText="Our support team is here to assist you."
          helpAction={() => alert('Support inbox: support@brightfuture.edu.pk')}
        />
      }
      topbar={
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          title="Teacher Dashboard"
          showSearch={activeKey !== 'dashboard'}
          searchPlaceholder="Search students, classes..."
          notifCount={3}
          mailCount={5}
          user={{ name: teacherName }}
          roleLabel="Mathematics Teacher"
          accent={accent}
          onLogout={onLogout}
          quickView={['ADMIN', 'STUDENT', 'PARENT']}
          onQuickView={switchRole}
        />
      }
    >
      {children}
    </DashboardShell>
  );
}
