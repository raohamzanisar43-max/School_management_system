import { apiClient } from './apiClient';
import { localMockState } from './mockData';

export const getAssessmentResults = async (studentId) => {
  try {
    const res = await apiClient.get(`/assessments/results/?student=${studentId}`);
    return res.data;
  } catch (e) {
    return localMockState.assessment_results;
  }
};
