import { apiClient } from './apiClient';
import { localMockState } from './mockData';

export const getAttendanceLogs = async (studentId) => {
  try {
    const res = await apiClient.get(`/attendance/logs/${studentId ? `?student=${studentId}` : ''}`);
    return res.data;
  } catch (e) {
    return localMockState.attendance_logs.filter(a => !studentId || a.student === parseInt(studentId));
  }
};
