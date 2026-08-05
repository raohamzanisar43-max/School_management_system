import React from 'react';
import { FileText } from 'lucide-react';
import { SectionCard } from '../DashboardChrome';

export default function ReportsView({ report, accent }) {
  return (
    <div className="space-y-6">
      <SectionCard title="Assessment Report" icon={FileText} accent={accent}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-lime-500/5 border border-lime-500/20 rounded-2xl">
            <h4 className="text-xs font-bold text-lime-400 uppercase tracking-widest mb-2">Strengths</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{report?.strengths || 'Shows exceptional logical skills and quick memory retrieval.'}</p>
          </div>
          <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">Weaknesses</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{report?.weaknesses || 'Requires extra writing practice to match speed expectations.'}</p>
          </div>
          <div className="p-5 bg-rose-500/5 border border-rose-500/20 rounded-2xl">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2">Learning Gaps</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{report?.learning_gaps || 'Basic reading fluency and spelling rules need attention.'}</p>
          </div>
          <div className="p-5 bg-violet-500/5 border border-violet-500/20 rounded-2xl">
            <h4 className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-2">Recommendations</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{report?.recommendations || 'Integrate daily writing activities and guided reading exercises.'}</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
