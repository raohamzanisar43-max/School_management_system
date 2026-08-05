import React from 'react';
import { Folder, FileText } from 'lucide-react';
import { SectionCard } from '../ui/SectionCard';

export default function ResourceListView({ title = 'Learning Resources', files, accent }) {
  return (
    <SectionCard title={title} icon={Folder} accent={accent}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {files.map((f, i) => (
          <div key={i} className="p-4 bg-[#05070a] border border-[#182030] rounded-xl flex items-center gap-3">
            <FileText className={`h-4 w-4 ${accent.text} shrink-0`} />
            <span className="text-xs font-semibold text-slate-200 truncate">{f}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
