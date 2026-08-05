import React from 'react';
import { GraduationCap, Search } from 'lucide-react';
import { SectionCard, PersonCard } from '../DashboardChrome';
import { PROGRAM_META } from './constants';

export default function StudentsView({ students, searchQuery, onSearchChange, accent }) {
  const filtered = students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  return (
    <SectionCard title={`Students (${filtered.length})`} icon={GraduationCap} accent={accent}
      action={
        <div className="relative">
          <Search className="h-3.5 w-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={searchQuery} onChange={e => onSearchChange(e.target.value)} placeholder="Search students..." className="bg-[#05070a] border border-[#182030] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none w-48" />
        </div>
      }>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map(s => (
          <PersonCard
            key={s.id}
            name={s.name}
            subtitle={s.email}
            accent={accent}
            trailing={<span className="text-[10px] font-bold px-2 py-1 bg-lime-500/10 text-lime-400 border border-lime-500/30 rounded-md shrink-0">{PROGRAM_META[s.current_level]?.label || s.current_level}</span>}
          />
        ))}
      </div>
    </SectionCard>
  );
}
