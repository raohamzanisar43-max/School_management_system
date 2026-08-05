import React from 'react';
import { Calendar } from 'lucide-react';
import { SectionCard } from '../ui/SectionCard';

export default function TimetableView({ timetable, accent }) {
  return (
    <SectionCard title="Weekly Timetable" icon={Calendar} accent={accent}>
      <div className="space-y-2">
        {timetable.map(t => (
          <div key={t.id} className="p-3 bg-[#05070a] border border-[#182030] rounded-xl flex items-center justify-between">
            <span className="text-xs font-bold text-white">{t.classroom}</span>
            <span className="text-[11px] text-slate-500">{t.day} · {t.time}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
