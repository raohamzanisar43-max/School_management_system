import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/auth/Login';
import AdminDashboard from '../pages/admin/AdminDashboard';
import TeacherDashboard from '../pages/teacher/TeacherDashboard';
import StudentDashboard from '../pages/student/StudentDashboard';
import ParentDashboard from '../pages/parent/ParentDashboard';

function RoleDashboard() {
  const { user } = useAuth();

  // Route based on role
  switch (user.role) {
    case 'ADMIN':
      return <AdminDashboard />;
    case 'TEACHER':
      return <TeacherDashboard />;
    case 'STUDENT':
      return <StudentDashboard />;
    case 'PARENT':
      return <ParentDashboard />;
    default:
      return <Login />;
  }
}

export default function AppRoutes() {
  return (
    <ProtectedRoute>
      <RoleDashboard />
    </ProtectedRoute>
  );
}
