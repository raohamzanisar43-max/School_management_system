import { apiClient } from './apiClient';
import { localMockState } from './mockData';

export const getTeachers = async () => {
  try {
    const res = await apiClient.get('/users/teachers/');
    return res.data;
  } catch (e) {
    return localMockState.teachers;
  }
};
