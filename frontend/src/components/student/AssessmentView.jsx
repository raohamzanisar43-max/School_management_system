import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import { SectionCard } from '../ui/SectionCard';
import { SUBJECT_LEVELS } from './constants';

export default function AssessmentView({ accent }) {
  return (
    <SectionCard title="Learning Assessment" icon={ClipboardCheck} accent={accent}>
      <p className="text-xs text-slate-400 mb-4">Complete each subject assessment to refine your personalized learning plan.</p>
      <div className="space-y-3">
        {SUBJECT_LEVELS.map(s => (
          <div key={s.name} className="p-4 bg-[#05070a] border border-[#182030] rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <s.icon className="h-4 w-4" style={{ color: s.color }} />
              <span className="text-sm font-bold text-white">{s.name}</span>
            </div>
            <button className={`px-4 py-1.5 rounded-lg text-[11px] font-bold text-white cursor-pointer ${accent.solid}`}>Start</button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
