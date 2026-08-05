import { useState, useEffect } from 'react';
import { getStudents } from '../../services/studentService';
import { getTeachers } from '../../services/teacherService';
import { getPrograms, getCourses } from '../../services/curriculumService';
import { getInvoices, getSalaries } from '../../services/billingService';
import { getAnnouncements, createAnnouncement, deleteAnnouncement } from '../../services/announcementService';

export default function useAdminData() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [studs, techs, progs, crs, invs, sals, anns] = await Promise.all([
        getStudents(), getTeachers(), getPrograms(),
        getCourses(), getInvoices(), getSalaries(), getAnnouncements(),
      ]);
      setStudents(studs);
      setTeachers(techs);
      setPrograms(progs);
      setCourses(crs);
      setInvoices(invs);
      setSalaries(sals);
      setAnnouncements(anns);
    };
    fetchData();
  }, []);

  const postAnnouncement = async (title, message) => {
    const newAnn = await createAnnouncement({ title, message, audience: 'ALL' });
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  const removeAnnouncement = async (id) => {
    await deleteAnnouncement(id);
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  return { students, teachers, programs, courses, invoices, salaries, announcements, postAnnouncement, deleteAnnouncement: removeAnnouncement };
}
