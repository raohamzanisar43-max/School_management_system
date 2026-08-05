import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import StudentChrome from '../../components/student/StudentChrome';
import StudentContent from '../../components/student/StudentContent';
import useStudentData from '../../components/student/useStudentData';

export default function StudentDashboard() {
  const { user, logout, switchRole } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const data = useStudentData();

  return (
    <StudentChrome activeKey={activePage} onSelectNav={setActivePage} user={user} onLogout={logout} switchRole={switchRole}>
      <StudentContent activePage={activePage} onNavigate={setActivePage} user={user} onLogout={logout} data={data} />
    </StudentChrome>
  );
}
