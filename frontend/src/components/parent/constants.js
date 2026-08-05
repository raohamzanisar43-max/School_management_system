import { LayoutGrid, Users, Award, Wallet, MessageSquare, Megaphone, Settings } from 'lucide-react';

export const TODAY_SCHEDULE = [
  { subject: 'Mathematics', time: '09:00 AM - 10:00 AM', color: '#a78bfa' },
  { subject: 'English', time: '11:00 AM - 12:00 PM', color: '#34d399' },
  { subject: 'Science', time: '01:00 PM - 02:00 PM', color: '#fbbf24' },
];
export const EXAM_RESULTS = [
  { subject: 'Mathematics', marks: 92 },
  { subject: 'English', marks: 88 },
  { subject: 'Science', marks: 90 },
  { subject: 'Computer', marks: 95 },
];

export const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { key: 'children', label: 'My Children', icon: Users },
  { key: 'results', label: 'Exam Results', icon: Award },
  { key: 'fees', label: 'Fee Payments', icon: Wallet },
  { key: 'messages', label: 'Teacher Messages', icon: MessageSquare },
  { key: 'announcements', label: 'Announcements', icon: Megaphone },
  { key: 'settings', label: 'Settings', icon: Settings },
];
