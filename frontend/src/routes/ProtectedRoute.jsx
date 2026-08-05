import { useAuth } from '../contexts/AuthContext';
import Login from '../pages/auth/Login';
import { LoadingScreen } from '../components/ui/LoadingScreen';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return children;
}
