import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Users, BookOpen, GraduationCap, DollarSign, Plus, Check, CreditCard,
  Layers, UserCheck, FileText, ShieldCheck, LogOut, Search,
  Bell, Settings, LayoutGrid, HelpCircle, MoreHorizontal, Wallet, Phone
} from 'lucide-react';

const PROGRAM_META = {
  MONTESSORI: { label: 'Montessori', dot: 'bg-indigo-500', bar: 'bg-indigo-500', text: 'text-indigo-600' },
  PRIMARY: { label: 'Primary (Grade 1-5)', dot: 'bg-emerald-500', bar: 'bg-emerald-500', text: 'text-emerald-600' },
  MIDDLE: { label: 'Middle School', dot: 'bg-amber-500', bar: 'bg-amber-500', text: 'text-amber-600' },
  O_LEVEL: { label: 'O Levels', dot: 'bg-rose-500', bar: 'bg-rose-500', text: 'text-rose-600' },
  GED: { label: 'GED Credential', dot: 'bg-violet-500', bar: 'bg-violet-500', text: 'text-violet-600' },
};

const TOP_STUDENTS = [
  { name: 'Fatima Ali', meta: 'O Levels · Physics', grade: 'A', color: 'bg-emerald-50 text-emerald-700' },
  { name: 'Zayd Ahmed Bilal', meta: 'Grade 1 · Mathematics', grade: 'A-', color: 'bg-indigo-50 text-indigo-700' },
  { name: 'Yusuf Khan', meta: 'Middle School · Science', grade: 'A-', color: 'bg-indigo-50 text-indigo-700' },
  { name: 'Maryam Ahmed', meta: 'Grade 1 · English', grade: 'A', color: 'bg-emerald-50 text-emerald-700' },
];

export default function AdminDashboard() {
  const { user, logout, switchRole } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [parents, setParents] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // New Invoice Form state
  const [selectedStudent, setSelectedStudent] = useState(3); // default to Zayd
  const [invoiceAmount, setInvoiceAmount] = useState('12000.00');
  const [invoiceDueDate, setInvoiceDueDate] = useState('2026-08-15');

  useEffect(() => {
    const fetchData = async () => {
      const [progs, crs, invs, sals, studs, techs, prnts, clsrms, slots, attend] = await Promise.all([
        api.getPrograms(), api.getCourses(), api.getInvoices(), api.getSalaries(),
        api.getStudents(), api.getTeachers(), api.getParents(), api.getClassrooms(),
        api.getTimetableSlots(), api.getAttendanceLogs(),
      ]);
      setPrograms(progs);
      setCourses(crs);
      setInvoices(invs);
      setSalaries(sals);
      setStudents(studs);
      setTeachers(techs);
      setParents(prnts);
      setClassrooms(clsrms);
      setTimetable(slots);
      setAttendanceLogs(attend);
    };
    fetchData();
  }, []);

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    const student = students.find(s => s.user === selectedStudent) || students.find(s => s.user === 3);
    const newInv = {
      id: invoices.length + 1,
      student: selectedStudent,
      student_name: student ? student.name : 'Zayd Ahmed Bilal',
      amount: invoiceAmount,
      status: 'UNPAID',
      due_date: invoiceDueDate,
      issue_date: new Date().toISOString().split('T')[0],
      payment_method: 'PENDING'
    };

    setInvoices([newInv, ...invoices]);
    alert('Invoice generated successfully for ' + newInv.student_name);
  };

  const handleMarkAsPaid = async (invoiceId) => {
    try {
      await api.payInvoice(invoiceId, 'BANK_TRANSFER');
      setInvoices(invoices.map(inv => inv.id === invoiceId ? { ...inv, status: 'PAID', payment_method: 'BANK_TRANSFER' } : inv));
    } catch (e) {
      console.error(e);
    }
  };

  // Helper calculation for total revenue
  const totalInvoiced = invoices.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
  const totalPaid = invoices.filter(inv => inv.status === 'PAID').reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
  const totalUnpaid = invoices.filter(inv => inv.status === 'UNPAID').reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
  const unpaidCount = invoices.filter(inv => inv.status === 'UNPAID').length;

  // Attendance today (or most recent logged day) as a percentage
  const latestDate = attendanceLogs.reduce((max, a) => (a.date > max ? a.date : max), attendanceLogs[0]?.date || '');
  const todayLogs = attendanceLogs.filter(a => a.date === latestDate);
  const attendanceRate = todayLogs.length ? Math.round((todayLogs.filter(a => a.status === 'PRESENT' || a.status === 'LATE').length / todayLogs.length) * 100) : 0;

  // Program distribution (fixed category order, driven by real student roster)
  const programDistribution = Object.keys(PROGRAM_META)
    .map(key => ({ key, ...PROGRAM_META[key], count: students.filter(s => s.current_level === key).length }))
    .filter(p => p.count > 0);
  const programTotal = programDistribution.reduce((sum, p) => sum + p.count, 0) || 1;
  let cumulativePct = 0;
  const conicStops = programDistribution.map(p => {
    const pct = (p.count / programTotal) * 100;
    const start = cumulativePct;
    cumulativePct += pct;
    const colorHex = { 'bg-indigo-500': '#6366f1', 'bg-emerald-500': '#10b981', 'bg-amber-500': '#f59e0b', 'bg-rose-500': '#f43f5e', 'bg-violet-500': '#8b5cf6' }[p.dot];
    return `${colorHex} ${start}% ${cumulativePct}%`;
  }).join(', ');

  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const NAV_ITEMS = [
    { key: 'overview', label: 'Dashboard', icon: LayoutGrid },
    { key: 'curriculum', label: 'Programs & Courses', icon: BookOpen },
    { key: 'billing', label: 'Billing & Invoicing', icon: DollarSign },
    { key: 'users', label: 'Platform Directory', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex font-sans">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-gradient-to-b from-violet-800 via-violet-900 to-indigo-950 text-white">
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold font-outfit tracking-tight leading-tight">Bright Future</h1>
            <p className="text-[10px] text-violet-300 uppercase tracking-widest font-semibold">Admin Portal</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === key ? 'bg-white/15 text-white shadow-sm' : 'text-violet-200/80 hover:bg-white/5 hover:text-white'}`}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              <span className="truncate whitespace-nowrap">{label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4">
          <button
            onClick={() => alert('Support inbox: support@brightfuture.edu.pk')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition cursor-pointer"
          >
            <HelpCircle className="h-4 w-4" />
            Help Center
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 sm:px-8 py-3.5 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="h-4 w-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full bg-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs ml-auto">
            <span className="px-2 text-gray-400 font-semibold">Quick View:</span>
            <button onClick={() => switchRole('TEACHER')} className="px-2.5 py-1 hover:bg-white rounded-lg transition text-emerald-600 font-medium cursor-pointer">Teacher</button>
            <button onClick={() => switchRole('STUDENT')} className="px-2.5 py-1 hover:bg-white rounded-lg transition text-amber-600 font-medium cursor-pointer">Student</button>
            <button onClick={() => switchRole('PARENT')} className="px-2.5 py-1 hover:bg-white rounded-lg transition text-pink-600 font-medium cursor-pointer">Parent</button>
          </div>

          <button className="relative w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition cursor-pointer" title="Notifications">
            <Bell className="h-[18px] w-[18px]" />
            {unpaidCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>}
          </button>
          <button className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition cursor-pointer" title="Settings">
            <Settings className="h-[18px] w-[18px]" />
          </button>

          <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
            <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-xs">
              {(user?.name || 'A').split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-900 leading-tight">{user?.name}</p>
              <p className="text-xs text-gray-400 capitalize leading-tight">{user?.role?.toLowerCase()}</p>
            </div>
            <button
              onClick={logout}
              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-rose-50 flex items-center justify-center text-gray-500 hover:text-rose-500 transition cursor-pointer"
              title="Logout"
            >
              <LogOut className="h-[18px] w-[18px]" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {/* Tab 1: OVERVIEW / DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Admin Dashboard</h2>
                <p className="text-gray-500 text-sm mt-1">Welcome back, here's an overview of your institution.</p>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard icon={Users} label="Total Students" value={students.length} sub="Enrolled across all programs" iconBg="bg-violet-50" iconColor="text-violet-600" />
                <StatCard icon={UserCheck} label="Total Teachers" value={teachers.length} sub="Full-time tutors" iconBg="bg-emerald-50" iconColor="text-emerald-600" />
                <StatCard icon={Users} label="Total Parents" value={parents.length} sub="Guardian accounts" iconBg="bg-amber-50" iconColor="text-amber-600" />
                <StatCard icon={ShieldCheck} label="Attendance Today" value={`${attendanceRate}%`} sub={latestDate || 'No records yet'} iconBg="bg-blue-50" iconColor="text-blue-600" />
                <StatCard icon={Wallet} label="Pending Invoices" value={unpaidCount} sub="Requires follow-up" iconBg="bg-rose-50" iconColor="text-rose-600" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Weekly Routine */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-gray-900">Weekly Routine</h3>
                      <button onClick={() => setActiveTab('curriculum')} className="text-xs font-semibold text-violet-600 hover:underline cursor-pointer">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="text-[11px] uppercase tracking-wider text-gray-400 border-b border-gray-100">
                            <th className="pb-2.5 font-semibold">Timing</th>
                            <th className="pb-2.5 font-semibold">Subject</th>
                            <th className="pb-2.5 font-semibold">Teacher</th>
                            <th className="pb-2.5 font-semibold">Room</th>
                          </tr>
                        </thead>
                        <tbody>
                          {timetable.slice(0, 4).map(slot => {
                            const room = classrooms.find(c => c.name === slot.classroom);
                            return (
                              <tr key={slot.id} className="border-b border-gray-50 last:border-0">
                                <td className="py-3 text-gray-500 whitespace-nowrap">{slot.day} · {slot.time}</td>
                                <td className="py-3 font-semibold text-gray-800">{room?.course?.name || slot.classroom}</td>
                                <td className="py-3 text-gray-500">{room?.teacher || '—'}</td>
                                <td className="py-3 text-gray-500">{room?.room || '—'}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Parent Overview */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-gray-900">Parent Overview</h3>
                      <button onClick={() => setActiveTab('users')} className="text-gray-400 hover:text-gray-600 cursor-pointer"><MoreHorizontal className="h-4 w-4" /></button>
                    </div>
                    <div className="space-y-3">
                      {parents.slice(0, 4).map(p => {
                        const hasUnpaid = invoices.some(inv => p.children.includes(inv.student_name) && inv.status === 'UNPAID');
                        return (
                          <div key={p.id} className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-xs shrink-0">
                                {p.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                                <p className="text-xs text-gray-500">{p.children.length} {p.children.length === 1 ? 'Child' : 'Children'} Enrolled</p>
                              </div>
                            </div>
                            <span className="text-xs text-gray-400 hidden sm:flex items-center gap-1 shrink-0"><Phone className="h-3 w-3" />{p.phone}</span>
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${hasUnpaid ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                              {hasUnpaid ? 'Pending' : 'Fees Paid'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Course Statistics donut */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-4">Course Statistics</h3>
                    <div className="flex items-center justify-center py-2">
                      <div
                        className="w-36 h-36 rounded-full flex items-center justify-center"
                        style={{ background: `conic-gradient(${conicStops})` }}
                      >
                        <div className="w-24 h-24 rounded-full bg-white flex flex-col items-center justify-center">
                          <span className="text-lg font-black text-gray-900">{students.length}</span>
                          <span className="text-[9px] text-gray-400 uppercase tracking-wider font-bold">Total</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      {programDistribution.map(p => (
                        <div key={p.key} className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-2 text-gray-600 font-medium">
                            <span className={`w-2.5 h-2.5 rounded-full ${p.dot}`}></span>
                            {p.label}
                          </span>
                          <span className="font-bold text-gray-800">{Math.round((p.count / programTotal) * 100)}% <span className="text-gray-400 font-medium">({p.count})</span></span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Students */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-4">Top Students</h3>
                    <div className="space-y-3.5">
                      {TOP_STUDENTS.map(s => (
                        <div key={s.name} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-[11px] shrink-0">
                              {s.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-gray-900 truncate">{s.name}</p>
                              <p className="text-[11px] text-gray-400 truncate">{s.meta}</p>
                            </div>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-md shrink-0 ${s.color}`}>{s.grade}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: CURRICULUM */}
          {activeTab === 'curriculum' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Programs & Courses</h2>
                <p className="text-gray-500 text-sm mt-1">Manage standard homeschooling tracks and educational plans.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Programs List */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-1 space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                    <Layers className="h-[18px] w-[18px] text-violet-600" />
                    Offered Programs
                  </h3>
                  <div className="space-y-3">
                    {programs.map(prog => (
                      <div key={prog.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                        <h4 className="text-sm font-bold text-gray-900 tracking-wide">{prog.name_display || prog.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{prog.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Courses List */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-2 space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                    <BookOpen className="h-[18px] w-[18px] text-emerald-600" />
                    Active Courses
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {courses.map(course => (
                      <div key={course.id} className="p-4 bg-gray-50 border border-gray-100 hover:border-gray-200 rounded-xl transition">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md uppercase tracking-wider">{course.code}</span>
                          <span className="text-xs text-gray-400">Prog ID: {course.program}</span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 mt-2">{course.name}</h4>
                        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{course.syllabus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Classrooms */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                  <GraduationCap className="h-[18px] w-[18px] text-amber-600" />
                  Active Classrooms
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {classrooms.map(cls => (
                    <div key={cls.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 truncate">{cls.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{cls.teacher} · {cls.room}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 bg-violet-50 text-violet-600 rounded-md shrink-0">{cls.students.length} students</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: BILLING */}
          {activeTab === 'billing' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Billing & Fee Management</h2>
                <p className="text-gray-500 text-sm mt-1">Issue tuition receipts, monitor fee payments, and view payroll expenses.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard icon={DollarSign} label="Revenue Collected" value={`Rs. ${totalPaid.toLocaleString()}`} sub="From total tuition bills" iconBg="bg-emerald-50" iconColor="text-emerald-600" valueColor="text-emerald-600" />
                <StatCard icon={CreditCard} label="Pending Outstanding" value={`Rs. ${totalUnpaid.toLocaleString()}`} sub="Requires follow-up" iconBg="bg-rose-50" iconColor="text-rose-600" valueColor="text-rose-600" />
                <StatCard icon={FileText} label="Total Invoiced" value={`Rs. ${totalInvoiced.toLocaleString()}`} sub={`${invoices.length} invoices issued`} iconBg="bg-violet-50" iconColor="text-violet-600" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form to create Invoice */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-1">
                  <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2 mb-4">
                    <Plus className="h-[18px] w-[18px] text-violet-600" />
                    Generate New Invoice
                  </h3>
                  <form onSubmit={handleCreateInvoice} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Select Student</label>
                      <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(parseInt(e.target.value))}
                        className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
                      >
                        {students.map(s => (
                          <option key={s.id} value={s.user}>{s.name} ({PROGRAM_META[s.current_level]?.label || s.current_level})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Billing Amount (Rs.)</label>
                      <input
                        type="number"
                        required
                        value={invoiceAmount}
                        onChange={(e) => setInvoiceAmount(e.target.value)}
                        className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Due Date</label>
                      <input
                        type="date"
                        required
                        value={invoiceDueDate}
                        onChange={(e) => setInvoiceDueDate(e.target.value)}
                        className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex justify-center py-2.5 border border-transparent rounded-xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 transition cursor-pointer"
                    >
                      Generate Bill
                    </button>
                  </form>
                </div>

                {/* List of Invoices */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-2 space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="h-[18px] w-[18px] text-emerald-600" />
                      Invoice Billing Log
                    </span>
                    <span className="text-xs text-gray-400 font-medium">Total: {invoices.length} invoices</span>
                  </h3>

                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                    {invoices.map(inv => (
                      <div key={inv.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between gap-4">
                        <div className="space-y-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">{inv.student_name}</p>
                          <div className="flex items-center gap-2.5 text-xs text-gray-500">
                            <span>Due: {inv.due_date}</span>
                            <span>•</span>
                            <span>Issued: {inv.issue_date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          <div className="text-right">
                            <p className="text-sm font-extrabold text-gray-900">Rs. {parseFloat(inv.amount).toLocaleString()}</p>
                            <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 ${inv.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                              {inv.status}
                            </span>
                          </div>

                          {inv.status === 'UNPAID' && (
                            <button
                              onClick={() => handleMarkAsPaid(inv.id)}
                              className="p-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white transition cursor-pointer"
                              title="Mark as Paid"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Salaries */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                  <Wallet className="h-[18px] w-[18px] text-amber-600" />
                  Teacher Payroll
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {salaries.map(sal => (
                    <div key={sal.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{sal.teacher_name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{new Date(sal.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-extrabold text-gray-900">Rs. {(parseFloat(sal.base_salary) + parseFloat(sal.allowances)).toLocaleString()}</p>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${sal.is_paid ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{sal.is_paid ? 'PAID' : 'PENDING'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: DIRECTORY */}
          {activeTab === 'users' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Platform Directory</h2>
                <p className="text-gray-500 text-sm mt-1">View registered active students, teachers, parents, and system administrators.</p>
              </div>

              {/* Teachers */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                  <UserCheck className="h-[18px] w-[18px] text-emerald-600" />
                  Teachers ({teachers.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teachers.map(t => (
                    <div key={t.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 truncate">{t.name}</h4>
                        <p className="text-xs text-emerald-600 mt-0.5">{t.specialization}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{t.email}</p>
                      </div>
                      <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-1 rounded-md font-semibold shrink-0">Tutor</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Students */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <GraduationCap className="h-[18px] w-[18px] text-amber-600" />
                    Students ({filteredStudents.length})
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredStudents.map(s => (
                    <div key={s.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 truncate">{s.name}</h4>
                        <p className="text-xs text-amber-600 mt-0.5">{PROGRAM_META[s.current_level]?.label || s.current_level}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{s.email}</p>
                      </div>
                      <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-1 rounded-md font-semibold shrink-0">Enrolled</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parents */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                  <Users className="h-[18px] w-[18px] text-pink-600" />
                  Parents / Guardians ({parents.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {parents.map(p => (
                    <div key={p.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 truncate">{p.name}</h4>
                        <p className="text-xs text-pink-600 mt-0.5">{p.children.join(', ')}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{p.email}</p>
                      </div>
                      <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-1 rounded-md font-semibold shrink-0">Guardian</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                  <ShieldCheck className="h-[18px] w-[18px] text-violet-600" />
                  Administrators
                </h3>
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between max-w-md">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">System Administrator</h4>
                    <p className="text-xs text-violet-600 mt-0.5">Administrator Persona</p>
                    <p className="text-[10px] text-gray-400 mt-1">admin@brightfuture.edu.pk</p>
                  </div>
                  <span className="text-[10px] bg-violet-100 text-violet-700 border border-violet-200 px-2 py-1 rounded-md font-semibold">Super</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, iconBg, iconColor, valueColor }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider truncate">{label}</p>
        <h3 className={`text-xl font-bold font-outfit mt-1 ${valueColor || 'text-gray-900'}`}>{value}</h3>
        <p className="text-[10px] text-gray-400 font-medium mt-1 truncate">{sub}</p>
      </div>
      <div className={`p-3 rounded-xl shrink-0 ${iconBg} ${iconColor}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );
}
