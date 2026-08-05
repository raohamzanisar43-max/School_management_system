import { apiClient } from './apiClient';
import { localMockState } from './mockData';

export const getExams = async () => {
  try {
    const res = await apiClient.get('/exams/exams/');
    return res.data;
  } catch (e) {
    return localMockState.exams;
  }
};

export const submitExamAttempt = async (attemptData) => {
  try {
    const res = await apiClient.post('/exams/attempts/', attemptData);
    return res.data;
  } catch (e) {
    const newAttempt = {
      id: localMockState.exam_attempts.length + 1,
      student: 3,
      exam: parseInt(attemptData.exam),
      score: attemptData.score,
      started_at: attemptData.started_at || new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      submitted_at: new Date().toISOString()
    };
    localMockState.exam_attempts.push(newAttempt);
    return newAttempt;
  }
};

export const logProctoringViolation = async (violationData) => {
  try {
    const res = await apiClient.post('/exams/violations/', violationData);
    return res.data;
  } catch (e) {
    const newV = {
      id: localMockState.violations.length + 1,
      attempt: parseInt(violationData.attempt) || 1,
      timestamp: new Date().toISOString(),
      violation_type: violationData.violation_type,
      confidence_score: parseFloat(violationData.confidence_score)
    };
    localMockState.violations.push(newV);
    return newV;
  }
};

export const getProctoringViolations = async (attemptId) => {
  try {
    const res = await apiClient.get(`/exams/violations/?attempt=${attemptId}`);
    return res.data;
  } catch (e) {
    return localMockState.violations.filter(v => v.attempt === parseInt(attemptId));
  }
};
