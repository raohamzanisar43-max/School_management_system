import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import useGeminiApiKeySync from './hooks/useGeminiApiKeySync';

export default function App() {
  useGeminiApiKeySync();

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
