import React from 'react';
import { Users, Search, Mail } from 'lucide-react';
import { SectionCard, PersonCard } from '../DashboardChrome';

export default function TeachersView({ teachers, searchQuery, onSearchChange, accent }) {
  const filtered = teachers.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
  return (
    <SectionCard title={`Teachers (${filtered.length})`} icon={Users} accent={accent}
      action={
        <div className="relative">
          <Search className="h-3.5 w-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={searchQuery} onChange={e => onSearchChange(e.target.value)} placeholder="Search teachers..." className="bg-[#05070a] border border-[#182030] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none w-48" />
        </div>
      }>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map(t => (
          <PersonCard
            key={t.id}
            name={t.name}
            accent={accent}
            meta={
              <>
                <p className="text-[11px] text-slate-500 truncate">{t.specialization}</p>
                <p className="text-[10px] text-slate-600 truncate flex items-center gap-1 mt-0.5"><Mail className="h-2.5 w-2.5" />{t.email}</p>
              </>
            }
          />
        ))}
      </div>
    </SectionCard>
  );
}
