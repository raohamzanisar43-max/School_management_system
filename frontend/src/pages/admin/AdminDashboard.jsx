import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminChrome from '../../components/admin/AdminChrome';
import AdminContent from '../../components/admin/AdminContent';
import useAdminData from '../../components/admin/useAdminData';

export default function AdminDashboard() {
  const { user, logout, switchRole } = useAuth();
  const [view, setView] = useState('dashboard'); // 'dashboard' | students | teachers | curriculum | reports | announcements
  const data = useAdminData();

  return (
    <AdminChrome user={user} onLogout={logout} switchRole={switchRole} onSelectDashboard={() => setView('dashboard')}>
      <AdminContent view={view} onNavigate={setView} user={user} data={data} />
    </AdminChrome>
  );
}
