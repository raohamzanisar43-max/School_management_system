import { apiClient } from './apiClient';
import { localMockState } from './mockData';

export const login = async (username, password) => {
  try {
    const response = await apiClient.post('/auth/login/', { username, password });
    const { access, refresh } = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);

    // Get role and user details
    const userRes = await apiClient.get('/users/me/');
    return userRes.data;
  } catch (error) {
    console.warn('Backend login failed, using local mock login logic:', error.message);
    // Fallback: search mock database
    const user = localMockState.users.find(u => u.username === username);
    if (user) {
      localStorage.setItem('access_token', 'mock_jwt_token_' + user.role);
      return {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
        name: user.name,
        profile: user.role === 'TEACHER' ? user.teacher_profile : (user.role === 'STUDENT' ? user.student_profile : {})
      };
    }
    throw new Error('Invalid credentials');
  }
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/users/me/');
    return response.data;
  } catch (error) {
    const token = localStorage.getItem('access_token');
    if (token && token.startsWith('mock_jwt_token_')) {
      const role = token.replace('mock_jwt_token_', '');
      const user = localMockState.users.find(u => u.role === role);
      return {
        ...user,
        profile: role === 'TEACHER' ? user.teacher_profile : (role === 'STUDENT' ? user.student_profile : {})
      };
    }
    throw new Error('Not authenticated');
  }
};
