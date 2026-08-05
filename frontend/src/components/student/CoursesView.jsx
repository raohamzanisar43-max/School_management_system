import React from 'react';
import { BookOpen } from 'lucide-react';
import { SectionCard } from '../ui/SectionCard';

export default function CoursesView({ courses, accent }) {
  return (
    <SectionCard title="My Courses" icon={BookOpen} accent={accent}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {courses.map(c => (
          <div key={c.id} className="p-4 bg-[#05070a] border border-[#182030] rounded-xl">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${accent.softBg} ${accent.text}`}>{c.code}</span>
            <h4 className="text-sm font-bold text-white mt-2">{c.name}</h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{c.syllabus}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
