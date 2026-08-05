import React from 'react';
import { BookOpen, Circle } from 'lucide-react';
import { SectionCard, ProgressBar } from '../DashboardChrome';
import { SUBJECT_LEVELS, LEARNING_GAPS } from './constants';

export default function LearningView({ accent }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SectionCard title="Subject-wise Levels" icon={BookOpen} accent={accent}>
        <div className="space-y-3">
          {SUBJECT_LEVELS.map(s => (
            <div key={s.name} className="space-y-1.5">
              <div className="flex justify-between text-xs"><span className="text-slate-300 font-medium">{s.name}</span><span className="font-bold" style={{ color: s.color }}>{s.level}</span></div>
              <ProgressBar value={65} color={s.color} />
            </div>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Learning Gaps" icon={Circle} accent={accent}>
        <div className="space-y-2.5">
          {LEARNING_GAPS.map(g => (
            <div key={g.label} className="flex items-center justify-between p-3 bg-[#05070a] border border-[#182030] rounded-xl text-xs">
              <span className="text-slate-200 font-semibold">{g.label}</span>
              <span className={`font-bold px-2 py-0.5 rounded-full ${g.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-500/10 text-slate-400'}`}>{g.status}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
