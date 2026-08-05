import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import TeacherChrome from '../../components/teacher/TeacherChrome';
import TeacherContent from '../../components/teacher/TeacherContent';
import useTeacherData from '../../components/teacher/useTeacherData';

export default function TeacherDashboard() {
  const { user, logout, switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const data = useTeacherData();

  return (
    <TeacherChrome activeKey={activeTab} onSelectNav={setActiveTab} user={user} onLogout={logout} switchRole={switchRole}>
      <TeacherContent activeTab={activeTab} onNavigate={setActiveTab} user={user} onLogout={logout} data={data} />
    </TeacherChrome>
  );
}
