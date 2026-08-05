import React from 'react';
import { TrendingUp } from 'lucide-react';
import { SectionCard } from '../ui/SectionCard';
import { ProgressBar } from '../ui/ProgressBar';
import { SUBJECT_LEVELS } from './constants';

export default function ProgressView({ accent }) {
  return (
    <SectionCard title="Overall Progress" icon={TrendingUp} accent={accent}>
      <div className="space-y-4">
        {SUBJECT_LEVELS.map(s => (
          <div key={s.name} className="space-y-1.5">
            <div className="flex justify-between text-xs"><span className="text-slate-300 font-medium">{s.name}</span><span className="font-bold text-white">65%</span></div>
            <ProgressBar value={65} color={s.color} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
