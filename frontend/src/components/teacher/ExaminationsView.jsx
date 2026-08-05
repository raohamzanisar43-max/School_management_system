import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import { SectionCard } from '../DashboardChrome';

export default function ExaminationsView({ exams, accent }) {
  return (
    <SectionCard title="Examinations" icon={ClipboardCheck} accent={accent}>
      <div className="space-y-3">
        {exams.map(ex => (
          <div key={ex.id} className="p-4 bg-[#05070a] border border-[#182030] rounded-xl flex items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">{ex.title}</h4>
              <p className="text-xs text-slate-500 mt-1">{ex.duration_minutes} minutes · {ex.questions?.length || 0} questions</p>
            </div>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${ex.ai_proctoring_enabled ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>{ex.ai_proctoring_enabled ? 'AI Proctored' : 'Standard'}</span>
          </div>
        ))}
        {exams.length === 0 && <p className="text-xs text-slate-500 italic text-center py-6">No examinations scheduled.</p>}
      </div>
    </SectionCard>
  );
}
