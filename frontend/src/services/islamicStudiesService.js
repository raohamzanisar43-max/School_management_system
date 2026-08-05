import { apiClient } from './apiClient';
import { localMockState } from './mockData';

export const getIslamicProfile = async (studentId) => {
  try {
    const res = await apiClient.get(`/islamic-studies/profiles/?student=${studentId}`);
    return res.data[0];
  } catch (e) {
    return localMockState.islamic_profile;
  }
};

export const updateIslamicProfile = async (id, profileData) => {
  try {
    const res = await apiClient.patch(`/islamic-studies/profiles/${id}/`, profileData);
    return res.data;
  } catch (e) {
    localMockState.islamic_profile = { ...localMockState.islamic_profile, ...profileData };
    return localMockState.islamic_profile;
  }
};

export const getDailyProgressLogs = async (profileId) => {
  try {
    const res = await apiClient.get(`/islamic-studies/logs/?profile=${profileId}`);
    return res.data;
  } catch (e) {
    return localMockState.islamic_logs;
  }
};

export const addDailyProgressLog = async (logData) => {
  try {
    const res = await apiClient.post('/islamic-studies/logs/', logData);
    return res.data;
  } catch (e) {
    const newLog = {
      id: localMockState.islamic_logs.length + 1,
      date: logData.date || new Date().toISOString().split('T')[0],
      type: logData.type,
      surah_name: logData.surah_name,
      from_ayat: parseInt(logData.from_ayat),
      to_ayat: parseInt(logData.to_ayat),
      evaluation_grade: logData.evaluation_grade,
      tarbiyah_notes: logData.tarbiyah_notes
    };
    localMockState.islamic_logs.unshift(newLog); // Put latest at top

    // Side effect: update current surah/ayat
    localMockState.islamic_profile.current_surah = logData.surah_name;
    localMockState.islamic_profile.current_ayat = parseInt(logData.to_ayat);

    return newLog;
  }
};
