import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ACCENTS } from '../../constants/theme';
import DashboardHome from './DashboardHome';
import StudentsView from './StudentsView';
import TeachersView from './TeachersView';
import CurriculumView from './CurriculumView';
import ReportsView from './ReportsView';
import AnnouncementsView from './AnnouncementsView';

const accent = ACCENTS.ADMIN;

export default function AdminContent({ view, onNavigate, user, data }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { students, teachers, programs, courses, invoices, salaries, announcements, postAnnouncement, deleteAnnouncement } = data;

  if (view === 'dashboard') {
    return <DashboardHome user={user} students={students} teachers={teachers} invoices={invoices} accent={accent} onNavigate={onNavigate} />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <button onClick={() => onNavigate('dashboard')} className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </button>

      {view === 'students' && <StudentsView students={students} searchQuery={searchQuery} onSearchChange={setSearchQuery} accent={accent} />}
      {view === 'teachers' && <TeachersView teachers={teachers} searchQuery={searchQuery} onSearchChange={setSearchQuery} accent={accent} />}
      {view === 'curriculum' && <CurriculumView programs={programs} courses={courses} accent={accent} />}
      {view === 'reports' && <ReportsView students={students} invoices={invoices} salaries={salaries} accent={accent} />}
      {view === 'announcements' && <AnnouncementsView announcements={announcements} onPost={postAnnouncement} onDelete={deleteAnnouncement} accent={accent} />}
    </div>
  );
}
