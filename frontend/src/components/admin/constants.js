import { GraduationCap, Users, BookOpen, BarChart3, Megaphone } from 'lucide-react';

export const PROGRAM_META = {
  MONTESSORI: { label: 'Montessori', dot: '#818cf8' },
  PRIMARY: { label: 'Primary (Grade 1-5)', dot: '#34d399' },
  MIDDLE: { label: 'Middle School', dot: '#fbbf24' },
  O_LEVEL: { label: 'O Levels', dot: '#fb7185' },
  GED: { label: 'GED Credential', dot: '#a78bfa' },
};

export const MODULES = [
  { key: 'students', title: 'Students', desc: 'Manage students information and data.', icon: GraduationCap, color: 'lime' },
  { key: 'teachers', title: 'Teachers', desc: 'Manage teachers information and data.', icon: Users, color: 'lime' },
  { key: 'curriculum', title: 'Curriculum', desc: 'Manage curriculum, subjects and classes.', icon: BookOpen, color: 'lime' },
  { key: 'reports', title: 'Reports', desc: 'View and generate important reports.', icon: BarChart3, color: 'amber' },
  { key: 'announcements', title: 'Announcements', desc: 'Create and manage announcements.', icon: Megaphone, color: 'rose' },
];

export const COLOR_CLASSES = {
  lime: { softBg: 'bg-lime-500/10', border: 'border-lime-500/30', text: 'text-lime-400', hoverBorder: 'hover:border-lime-500/60' },
  amber: { softBg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', hoverBorder: 'hover:border-amber-500/60' },
  rose: { softBg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', hoverBorder: 'hover:border-rose-500/60' },
};
