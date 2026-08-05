import { apiClient } from './apiClient';
import { localMockState } from './mockData';

export const getLessons = async (courseId) => {
  try {
    const res = await apiClient.get(`/lms/lessons/?course=${courseId}`);
    return res.data;
  } catch (e) {
    return localMockState.lessons.filter(l => !courseId || l.course === parseInt(courseId));
  }
};

export const createLesson = async (lessonData) => {
  try {
    const res = await apiClient.post('/lms/lessons/', lessonData);
    return res.data;
  } catch (e) {
    const newLesson = {
      id: localMockState.lessons.length + 1,
      course: parseInt(lessonData.course),
      title: lessonData.title,
      content_body: lessonData.content_body,
      video_url: lessonData.video_url,
      zoom_link: lessonData.zoom_link,
      scheduled_time: lessonData.scheduled_time || new Date().toISOString(),
      created_at: new Date().toISOString(),
    };
    localMockState.lessons.push(newLesson);
    return newLesson;
  }
};

export const getAssignments = async (lessonId) => {
  try {
    const res = await apiClient.get(`/lms/assignments/?lesson=${lessonId}`);
    return res.data;
  } catch (e) {
    return localMockState.assignments.filter(a => !lessonId || a.lesson === parseInt(lessonId));
  }
};

export const createAssignment = async (assignmentData) => {
  try {
    const res = await apiClient.post('/lms/assignments/', assignmentData);
    return res.data;
  } catch (e) {
    const newAssignment = {
      id: localMockState.assignments.length + 1,
      lesson: parseInt(assignmentData.lesson),
      title: assignmentData.title,
      instructions: assignmentData.instructions,
      due_date: assignmentData.due_date,
      created_at: new Date().toISOString(),
    };
    localMockState.assignments.push(newAssignment);
    return newAssignment;
  }
};

export const getSubmissions = async (assignmentId) => {
  try {
    const res = await apiClient.get(`/lms/submissions/?assignment=${assignmentId}`);
    return res.data;
  } catch (e) {
    return localMockState.submissions.filter(s => !assignmentId || s.assignment === parseInt(assignmentId));
  }
};

export const submitAssignment = async (submissionData) => {
  try {
    const formData = new FormData();
    formData.append('assignment', submissionData.assignment);
    formData.append('student', submissionData.student);
    if (submissionData.file) formData.append('file_attachment', submissionData.file);

    const res = await apiClient.post('/lms/submissions/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  } catch (e) {
    const newSub = {
      id: localMockState.submissions.length + 1,
      assignment: parseInt(submissionData.assignment),
      student: submissionData.student || 3,
      submitted_at: new Date().toISOString(),
      file_attachment: submissionData.fileName || 'file_submission.pdf',
      grade: null,
      teacher_feedback: null,
    };
    // Overwrite if exists, otherwise push
    const idx = localMockState.submissions.findIndex(s => s.assignment === newSub.assignment && s.student === newSub.student);
    if (idx >= 0) {
      localMockState.submissions[idx] = newSub;
    } else {
      localMockState.submissions.push(newSub);
    }
    return newSub;
  }
};

export const gradeSubmission = async (id, grade, feedback) => {
  try {
    const res = await apiClient.patch(`/lms/submissions/${id}/`, { grade, teacher_feedback: feedback });
    return res.data;
  } catch (e) {
    const sub = localMockState.submissions.find(s => s.id === parseInt(id));
    if (sub) {
      sub.grade = grade;
      sub.teacher_feedback = feedback;
      return sub;
    }
    throw new Error('Submission not found');
  }
};
