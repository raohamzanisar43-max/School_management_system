import { apiClient } from './apiClient';
import { localMockState } from './mockData';

export const getParents = async () => {
  try {
    const res = await apiClient.get('/users/parents/');
    return res.data;
  } catch (e) {
    return localMockState.parents;
  }
};
