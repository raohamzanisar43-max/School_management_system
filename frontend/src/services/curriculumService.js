import { apiClient } from './apiClient';
import { localMockState } from './mockData';

export const getPrograms = async () => {
  try {
    const res = await apiClient.get('/curriculum/programs/');
    return res.data;
  } catch (e) {
    return localMockState.programs;
  }
};

export const getCourses = async () => {
  try {
    const res = await apiClient.get('/curriculum/courses/');
    return res.data;
  } catch (e) {
    return localMockState.courses;
  }
};

export const getClassrooms = async () => {
  try {
    const res = await apiClient.get('/curriculum/classrooms/');
    return res.data;
  } catch (e) {
    return localMockState.classrooms;
  }
};

export const getTimetableSlots = async () => {
  try {
    const res = await apiClient.get('/curriculum/slots/');
    return res.data;
  } catch (e) {
    return localMockState.timetable;
  }
};
