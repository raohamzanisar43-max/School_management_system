import { useState, useEffect } from 'react';
import { api } from '../../services/api';

export const DEFAULT_STUDENT_NAME = 'Muhammad';

export default function useStudentData() {
  const [assessmentResults, setAssessmentResults] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [results, crs, techs, slots] = await Promise.all([
        api.getAssessmentResults(3), api.getCourses(), api.getTeachers(), api.getTimetableSlots(),
      ]);
      setAssessmentResults(results);
      setCourses(crs);
      setTeachers(techs);
      setTimetable(slots);
      try {
        setChatMessages(await api.getChatMessages(2));
      } catch { /* ignore */ }
    };
    fetchData();
  }, []);

  const sendMessage = async (text) => {
    const msg = await api.sendChatMessage(2, text);
    setChatMessages(prev => [...prev, msg]);
  };

  const report = assessmentResults[0];
  const overallScore = report ? Math.round(report.score) : 78;
  const assessmentDate = report ? new Date(report.created_at).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }) : '21 July 2025';

  return { courses, teachers, timetable, chatMessages, sendMessage, report, overallScore, assessmentDate };
}
