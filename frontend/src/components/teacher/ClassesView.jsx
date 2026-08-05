import React from 'react';
import { Users } from 'lucide-react';
import { SectionCard } from '../ui/SectionCard';

export default function ClassesView({ classrooms, accent }) {
  return (
    <SectionCard title={`My Classes (${classrooms.length})`} icon={Users} accent={accent}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {classrooms.map(c => (
          <div key={c.id} className="p-4 bg-[#05070a] border border-[#182030] rounded-xl flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-white truncate">{c.name}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">{c.teacher} · {c.room}</p>
            </div>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-md shrink-0 ${accent.softBg} ${accent.text}`}>{c.students.length} students</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
