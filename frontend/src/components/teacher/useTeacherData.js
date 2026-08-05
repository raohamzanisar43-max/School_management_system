import { useState, useEffect } from 'react';
import { getClassrooms, getTimetableSlots } from '../../services/curriculumService';
import { getStudents } from '../../services/studentService';
import { getAssignments, getSubmissions, gradeSubmission as gradeSubmissionRequest } from '../../services/lmsService';
import { getExams } from '../../services/examsService';
import { getAttendanceLogs } from '../../services/attendanceService';
import { getAnnouncements } from '../../services/announcementService';
import { getChatMessages, sendChatMessage } from '../../services/chatService';

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
        getClassrooms(), getStudents(), getAssignments(), getSubmissions(),
        getExams(), getAttendanceLogs(), getTimetableSlots(), getAnnouncements(),
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
        setChatMessages(await getChatMessages(3));
      } catch { /* ignore */ }
    };
    fetchData();
  }, []);

  const sendMessage = async (text) => {
    const msg = await sendChatMessage(3, text);
    setChatMessages(prev => [...prev, msg]);
  };

  const gradeSubmission = async (id, grade, feedback) => {
    const updated = await gradeSubmissionRequest(id, grade, feedback);
    setSubmissions(prev => prev.map(s => (s.id === updated.id ? updated : s)));
  };

  return { classrooms, students, assignments, submissions, exams, attendanceLogs, timetable, announcements, chatMessages, sendMessage, gradeSubmission };
}
