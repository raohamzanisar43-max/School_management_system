import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ParentChrome from '../../components/parent/ParentChrome';
import ParentContent from '../../components/parent/ParentContent';
import useParentData from '../../components/parent/useParentData';

export default function ParentDashboard() {
  const { user, logout, switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const data = useParentData();

  return (
    <ParentChrome activeKey={activeTab} onSelectNav={setActiveTab} user={user} onLogout={logout} switchRole={switchRole}>
      <ParentContent activeTab={activeTab} onNavigate={setActiveTab} user={user} onLogout={logout} data={data} />
    </ParentChrome>
  );
}
