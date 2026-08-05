import React from 'react';
import { GraduationCap, BookOpen } from 'lucide-react';
import { SectionCard } from '../ui/SectionCard';

export default function CurriculumView({ programs, courses, accent }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SectionCard title="Offered Programs" icon={GraduationCap} accent={accent}>
        <div className="space-y-3">
          {programs.map(p => (
            <div key={p.id} className="p-4 bg-[#05070a] border border-[#182030] rounded-xl">
              <h4 className="text-sm font-bold text-white">{p.name_display || p.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{p.description}</p>
            </div>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Active Courses" icon={BookOpen} accent={accent}>
        <div className="space-y-3">
          {courses.map(c => (
            <div key={c.id} className="p-4 bg-[#05070a] border border-[#182030] rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-lime-500/10 text-lime-400 border border-lime-500/30 rounded-md uppercase tracking-wider">{c.code}</span>
              </div>
              <h4 className="text-sm font-bold text-white mt-2">{c.name}</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{c.syllabus}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
