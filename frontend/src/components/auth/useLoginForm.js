import { useState } from 'react';

const DEMO_USERNAMES = { ADMIN: 'admin', TEACHER: 'teacher_ahmed', STUDENT: 'student_zayd', PARENT: 'parent_ahmed' };

export default function useLoginForm(login, showNotification) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => { setUsername(''); setPassword(''); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      showNotification('Signed in successfully!');
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (role) => {
    setError('');
    setLoading(true);
    try {
      await login(DEMO_USERNAMES[role] || '', 'adminpassword');
      showNotification(`Demo ${role} Portal Connected!`);
    } catch (err) {
      setError('Failed to log in with demo credentials.');
    } finally {
      setLoading(false);
    }
  };

  return { username, setUsername, password, setPassword, error, setError, loading, handleSubmit, handleQuickDemoLogin, reset };
}
