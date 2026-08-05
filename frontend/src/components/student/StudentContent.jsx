import React from 'react';
import { ACCENTS, ChatPanel, SettingsPanel } from '../DashboardChrome';
import { RESOURCE_FILES } from './constants';
import { DEFAULT_STUDENT_NAME } from './useStudentData';
import DashboardHome from './DashboardHome';
import AssessmentView from './AssessmentView';
import LearningView from './LearningView';
import CoursesView from './CoursesView';
import TeachersView from './TeachersView';
import ProgressView from './ProgressView';
import ReportsView from './ReportsView';
import TimetableView from '../shared/TimetableView';
import ResourceListView from '../shared/ResourceListView';

const accent = ACCENTS.STUDENT;
const isMine = msg => msg.sender_username === 'student_zayd' || msg.sender === 3;

export default function StudentContent({ activePage, onNavigate, user, onLogout, data }) {
  const studentName = user?.name || DEFAULT_STUDENT_NAME;
  const { courses, teachers, timetable, chatMessages, sendMessage, report, overallScore, assessmentDate } = data;

  switch (activePage) {
    case 'dashboard': return <DashboardHome studentName={studentName} overallScore={overallScore} assessmentDate={assessmentDate} accent={accent} onNavigate={onNavigate} />;
    case 'assessment': return <AssessmentView accent={accent} />;
    case 'learning': return <LearningView accent={accent} />;
    case 'courses': return <CoursesView courses={courses} accent={accent} />;
    case 'teachers': return <TeachersView teachers={teachers} accent={accent} />;
    case 'timetable': return <TimetableView timetable={timetable} accent={accent} />;
    case 'resources': return <ResourceListView title="Learning Resources" files={RESOURCE_FILES} accent={accent} />;
    case 'progress': return <ProgressView accent={accent} />;
    case 'reports': return <ReportsView report={report} accent={accent} />;
    case 'messages': return <ChatPanel title="Message Teacher" accent={accent} messages={chatMessages} isMine={isMine} onSend={sendMessage} placeholder="Type your message..." />;
    case 'settings': return <SettingsPanel accent={accent} notifText="Receive assessment and homework reminders via email." checkboxAccentClass="accent-lime-500" onLogout={onLogout} />;
    default: return null;
  }
}
