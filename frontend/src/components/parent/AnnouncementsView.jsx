import React from 'react';
import { Megaphone } from 'lucide-react';
import { SectionCard } from '../ui/SectionCard';

export default function AnnouncementsView({ announcements, accent }) {
  return (
    <SectionCard title="School Announcements" icon={Megaphone} accent={accent}>
      <div className="space-y-3">
        {announcements.map(a => (
          <div key={a.id} className="p-4 bg-[#05070a] border border-[#182030] rounded-xl">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white">{a.title}</h4>
              <span className="text-[9px] text-slate-500">{new Date(a.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{a.message}</p>
          </div>
        ))}
        {announcements.length === 0 && <p className="text-xs text-slate-500 italic text-center py-6">No announcements yet.</p>}
      </div>
    </SectionCard>
  );
}
