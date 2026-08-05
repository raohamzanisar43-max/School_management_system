import {
  LayoutGrid, ClipboardCheck, Target, BookOpen, Users, Calendar, Folder, TrendingUp,
  FileText, Settings, Send, Sparkles,
} from 'lucide-react';

export const STRENGTHS = ['Mathematics', 'Logical Thinking', 'Science', 'Reading Skills'];
export const WEAKNESSES = ['Grammar', 'Writing Skills', 'Problem Solving'];
export const LEARNING_GAPS = [
  { label: 'Fractions', status: 'In Progress' },
  { label: 'Algebra Basics', status: 'Not Started' },
  { label: 'Vocabulary', status: 'In Progress' },
  { label: 'Essay Writing', status: 'Not Started' },
];
export const SUBJECT_LEVELS = [
  { name: 'Mathematics', icon: LayoutGrid, level: 'Intermediate', color: '#a3e635' },
  { name: 'English', icon: BookOpen, level: 'Beginner', color: '#60a5fa' },
  { name: 'Science', icon: Sparkles, level: 'Advanced', color: '#c084fc' },
  { name: 'Computer Science', icon: FileText, level: 'Intermediate', color: '#fbbf24' },
  { name: 'General Knowledge', icon: Target, level: 'Advanced', color: '#34d399' },
];
export const REASSESSMENT_STEPS = [
  { label: 'Initial Assessment', status: 'Completed' },
  { label: 'Weekly Quiz', status: 'Upcoming' },
  { label: 'Monthly Evaluation', status: 'Upcoming' },
  { label: 'Quarterly Assessment', status: 'Upcoming' },
  { label: 'Annual Progress Review', status: 'Upcoming' },
];

export const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { key: 'assessment', label: 'Assessment', icon: ClipboardCheck },
  { key: 'learning', label: 'Personalized Learning', icon: Target },
  { key: 'courses', label: 'Courses', icon: BookOpen },
  { key: 'teachers', label: 'Teachers', icon: Users },
  { key: 'timetable', label: 'Timetable', icon: Calendar },
  { key: 'resources', label: 'Learning Resources', icon: Folder },
  { key: 'progress', label: 'Progress', icon: TrendingUp },
  { key: 'reports', label: 'Reports', icon: FileText },
  { key: 'messages', label: 'Messages', icon: Send, badge: 2 },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export const RESOURCE_FILES = ['Video Lessons — Grade 8 Mathematics', 'Practice Sheets — Algebra Basics', 'Quizzes — Weekly Vocabulary', 'Reading Set — Science Chapter 4'];
