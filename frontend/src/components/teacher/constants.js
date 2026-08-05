import {
  LayoutGrid, Users, ClipboardList, ClipboardCheck, Award, CalendarCheck, Calendar,
  Folder, Send, Settings,
} from 'lucide-react';

export const TODAY_SCHEDULE = [
  { time: '09:00 AM', subject: 'Mathematics - Grade 8A', desc: 'Algebra and Equations', status: 'Live' },
  { time: '11:00 AM', subject: 'Mathematics - Grade 9B', desc: 'Linear Equations', status: 'Live' },
  { time: '01:00 PM', subject: 'Mathematics - Grade 10A', desc: 'Quadratic Equations', status: 'Upcoming' },
  { time: '02:30 PM', subject: 'Extra Class - Grade 10B', desc: 'Problem Solving Session', status: 'Upcoming' },
];
export const MY_CLASSES = [
  { name: 'Grade 8A', students: 32, pct: 74 },
  { name: 'Grade 9B', students: 30, pct: 68 },
  { name: 'Grade 10A', students: 33, pct: 76 },
  { name: 'Grade 10B', students: 33, pct: 70 },
];
export const PENDING_ASSIGNMENTS = [
  { title: 'Algebra Worksheet', cls: 'Grade 8A', due: 'Due Tomorrow' },
  { title: 'Linear Equations Quiz', cls: 'Grade 9B', due: 'Due in 2 Days' },
  { title: 'Quadratic Equations HW', cls: 'Grade 10A', due: 'Due in 3 Days' },
];
export const RECENT_NOTICES = [
  { title: 'Parent Teacher Meeting', date: 'May 25, 2026 · 10:00 AM' },
  { title: 'Science Fair Registration', date: 'May 20, 2026' },
  { title: 'School Holiday Notice', date: 'May 18, 2026' },
];
export const UPCOMING_EVENTS = [
  { month: 'MAY', day: '18', title: 'Summer Vacation', sub: 'May 18 - Jun 30, 2026' },
  { month: 'MAY', day: '25', title: 'Parent Teacher Meeting', sub: '10:00 AM' },
  { month: 'JUN', day: '15', title: 'Sports Day', sub: '09:00 AM' },
];

export const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { key: 'classes', label: 'My Classes', icon: Users },
  { key: 'assignments', label: 'Assignments', icon: ClipboardList },
  { key: 'examinations', label: 'Examinations', icon: ClipboardCheck },
  { key: 'grades', label: 'Grades', icon: Award },
  { key: 'attendance', label: 'Attendance', icon: CalendarCheck },
  { key: 'timetable', label: 'Timetable', icon: Calendar },
  { key: 'resources', label: 'Resources', icon: Folder },
  { key: 'messages', label: 'Messages', icon: Send },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export const STATUS_STYLE = { Live: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', Upcoming: 'bg-slate-500/10 text-slate-400 border-slate-500/30' };

export const RESOURCE_FILES = ['Lesson Slides — Algebra Basics.pdf', 'Worksheet Pack — Grade 8A.pdf', 'Video Lecture — Linear Equations.mp4', 'Answer Key — Quadratic Equations.pdf'];
