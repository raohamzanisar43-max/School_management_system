import React from 'react';
import { Award } from 'lucide-react';
import { SectionCard } from '../ui/SectionCard';
import { EXAM_RESULTS } from './constants';

export default function ResultsView({ accent }) {
  return (
    <SectionCard title="Exam Results" icon={Award} accent={accent}>
      <table className="w-full text-left text-sm max-w-lg">
        <thead>
          <tr className="text-slate-500 border-b border-[#182030] text-xs"><th className="pb-2 font-semibold">Subject</th><th className="pb-2 font-semibold text-right">Marks</th></tr>
        </thead>
        <tbody>
          {EXAM_RESULTS.map(r => (
            <tr key={r.subject} className="border-b border-[#182030]/60 last:border-0">
              <td className="py-3 font-semibold text-slate-200">{r.subject}</td>
              <td className="py-3 text-right font-bold text-emerald-400">{r.marks}/100</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}
