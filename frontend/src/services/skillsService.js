import { apiClient } from './apiClient';
import { localMockState } from './mockData';

export const getSkillProgress = async (studentId) => {
  try {
    const res = await apiClient.get(`/skills-future/progress/?student=${studentId}`);
    return res.data;
  } catch (e) {
    return localMockState.skill_progress.map(sp => ({
      ...sp,
      track_details: localMockState.skill_tracks.find(t => t.id === sp.track)
    }));
  }
};

export const getProjects = async (studentId) => {
  try {
    const res = await apiClient.get(`/skills-future/projects/?student=${studentId}`);
    return res.data;
  } catch (e) {
    return localMockState.projects.map(p => ({
      ...p,
      track_details: localMockState.skill_tracks.find(t => t.id === p.track)
    }));
  }
};

export const submitProject = async (projectData) => {
  try {
    const res = await apiClient.post('/skills-future/projects/', projectData);
    return res.data;
  } catch (e) {
    const newProj = {
      id: localMockState.projects.length + 1,
      student: projectData.student || 3,
      track: parseInt(projectData.track),
      title: projectData.title,
      project_url: projectData.project_url,
      submitted_at: new Date().toISOString(),
      grade: null,
      teacher_review: null
    };
    localMockState.projects.unshift(newProj);

    // Update student progress percent
    const prog = localMockState.skill_progress.find(sp => sp.track === newProj.track);
    if (prog) {
      prog.completed_projects_count += 1;
      prog.progress_percent = Math.min(100, prog.progress_percent + 15);
    } else {
      localMockState.skill_progress.push({
        id: localMockState.skill_progress.length + 1,
        student: 3,
        track: newProj.track,
        progress_percent: 15,
        completed_projects_count: 1,
        last_active: new Date().toISOString()
      });
    }
    return newProj;
  }
};

export const reviewProject = async (id, grade, reviewText) => {
  try {
    const res = await apiClient.patch(`/skills-future/projects/${id}/`, { grade, teacher_review: reviewText });
    return res.data;
  } catch (e) {
    const proj = localMockState.projects.find(p => p.id === parseInt(id));
    if (proj) {
      proj.grade = grade;
      proj.teacher_review = reviewText;
      return proj;
    }
    throw new Error('Project not found');
  }
};
