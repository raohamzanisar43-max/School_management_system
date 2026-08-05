import { apiClient } from './apiClient';
import { localMockState } from './mockData';

export const getStudents = async () => {
  try {
    const res = await apiClient.get('/users/students/');
    return res.data;
  } catch (e) {
    return localMockState.students;
  }
};
