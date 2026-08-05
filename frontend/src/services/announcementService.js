import { apiClient } from './apiClient';
import { localMockState } from './mockData';

export const getAnnouncements = async () => {
  try {
    const res = await apiClient.get('/announcements/');
    return res.data;
  } catch (e) {
    return [...localMockState.announcements].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
};

export const createAnnouncement = async (data) => {
  try {
    const res = await apiClient.post('/announcements/', data);
    return res.data;
  } catch (e) {
    const newAnn = {
      id: localMockState.announcements.length + 1,
      title: data.title,
      message: data.message,
      audience: data.audience || 'ALL',
      created_at: new Date().toISOString(),
    };
    localMockState.announcements.unshift(newAnn);
    return newAnn;
  }
};

export const deleteAnnouncement = async (id) => {
  try {
    await apiClient.delete(`/announcements/${id}/`);
  } catch (e) {
    // fall through to local removal regardless of backend outcome
  }
  localMockState.announcements = localMockState.announcements.filter(a => a.id !== id);
};
