import { useState, useEffect } from 'react';
import { api } from '../../services/api';

export const DEFAULT_TEACHER_NAME = 'Ustadh Ahmed Bilal';

export default function useTeacherData() {
  const [classrooms, setClassrooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [exams, setExams] = useState([]);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [clsrms, studs, assigns, subs, exms, attend, slots, anns] = await Promise.all([
        api.getClassrooms(), api.getStudents(), api.getAssignments(), api.getSubmissions(),
        api.getExams(), api.getAttendanceLogs(), api.getTimetableSlots(), api.getAnnouncements(),
      ]);
      setClassrooms(clsrms);
      setStudents(studs);
      setAssignments(assigns);
      setSubmissions(subs);
      setExams(exms);
      setAttendanceLogs(attend);
      setTimetable(slots);
      setAnnouncements(anns);
      try {
        setChatMessages(await api.getChatMessages(3));
      } catch { /* ignore */ }
    };
    fetchData();
  }, []);

  const sendMessage = async (text) => {
    const msg = await api.sendChatMessage(3, text);
    setChatMessages(prev => [...prev, msg]);
  };

  const gradeSubmission = async (id, grade, feedback) => {
    const updated = await api.gradeSubmission(id, grade, feedback);
    setSubmissions(prev => prev.map(s => (s.id === updated.id ? updated : s)));
  };

  return { classrooms, students, assignments, submissions, exams, attendanceLogs, timetable, announcements, chatMessages, sendMessage, gradeSubmission };
}
