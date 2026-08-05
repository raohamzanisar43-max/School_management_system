import React from 'react';
import { ClipboardList } from 'lucide-react';
import { SectionCard } from '../DashboardChrome';

export default function AssignmentsView({ assignments, accent }) {
  return (
    <SectionCard title="Assignments" icon={ClipboardList} accent={accent}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {assignments.map(a => (
          <div key={a.id} className="p-4 bg-[#05070a] border border-[#182030] rounded-xl">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">{a.title}</h4>
              <span className="text-[10px] text-slate-500 whitespace-nowrap">Due {new Date(a.due_date).toLocaleDateString()}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">{a.instructions}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
