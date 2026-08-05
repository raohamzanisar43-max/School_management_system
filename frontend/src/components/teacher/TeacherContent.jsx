import React from 'react';
import { ACCENTS } from '../../constants/theme';
import { ChatPanel } from '../ui/ChatPanel';
import { SettingsPanel } from '../ui/SettingsPanel';
import { RESOURCE_FILES } from './constants';
import { DEFAULT_TEACHER_NAME } from './useTeacherData';
import DashboardHome from './DashboardHome';
import ClassesView from './ClassesView';
import AssignmentsView from './AssignmentsView';
import ExaminationsView from './ExaminationsView';
import GradesView from './GradesView';
import AttendanceView from './AttendanceView';
import TimetableView from '../shared/TimetableView';
import ResourceListView from '../shared/ResourceListView';

const accent = ACCENTS.TEACHER;
const isMine = msg => msg.sender_username === 'teacher_ahmed' || msg.sender === 2;

export default function TeacherContent({ activeTab, onNavigate, user, onLogout, data }) {
  const teacherName = user?.name || DEFAULT_TEACHER_NAME;
  const { classrooms, students, assignments, submissions, exams, attendanceLogs, timetable, announcements, chatMessages, sendMessage, gradeSubmission } = data;

  switch (activeTab) {
    case 'dashboard': return <DashboardHome teacherName={teacherName} announcements={announcements} accent={accent} onNavigate={onNavigate} />;
    case 'classes': return <ClassesView classrooms={classrooms} accent={accent} />;
    case 'assignments': return <AssignmentsView assignments={assignments} accent={accent} />;
    case 'examinations': return <ExaminationsView exams={exams} accent={accent} />;
    case 'grades': return <GradesView submissions={submissions} students={students} onGrade={gradeSubmission} accent={accent} />;
    case 'attendance': return <AttendanceView attendanceLogs={attendanceLogs} students={students} accent={accent} />;
    case 'timetable': return <TimetableView timetable={timetable} accent={accent} />;
    case 'resources': return <ResourceListView title="Learning Resources" files={RESOURCE_FILES} accent={accent} />;
    case 'messages': return <ChatPanel title="Student Messages" accent={accent} messages={chatMessages} isMine={isMine} onSend={sendMessage} placeholder="Type your reply..." />;
    case 'settings': return <SettingsPanel accent={accent} notifText="Receive submission and grading reminders via email." checkboxAccentClass="accent-purple-500" onLogout={onLogout} />;
    default: return null;
  }
}
