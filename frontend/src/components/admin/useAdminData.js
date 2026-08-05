import { useState, useEffect } from 'react';
import { api } from '../../services/api';

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
        api.getStudents(), api.getTeachers(), api.getPrograms(),
        api.getCourses(), api.getInvoices(), api.getSalaries(), api.getAnnouncements(),
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
    const newAnn = await api.createAnnouncement({ title, message, audience: 'ALL' });
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  const deleteAnnouncement = async (id) => {
    await api.deleteAnnouncement(id);
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  return { students, teachers, programs, courses, invoices, salaries, announcements, postAnnouncement, deleteAnnouncement };
}
