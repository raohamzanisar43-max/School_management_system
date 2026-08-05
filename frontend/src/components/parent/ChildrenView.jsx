import React from 'react';
import { Users } from 'lucide-react';
import { SectionCard, PersonCard } from '../DashboardChrome';

export default function ChildrenView({ child, accent }) {
  return (
    <SectionCard title="My Children" icon={Users} accent={accent}>
      <div className="max-w-lg">
        <PersonCard
          name={child.name}
          rounded="rounded-2xl"
          accent={accent}
          meta={
            <>
              <p className="text-xs text-slate-500 mt-0.5">Grade 8 · Roll No. 1024</p>
              <p className="text-xs text-slate-500">{child.email}</p>
            </>
          }
        />
      </div>
    </SectionCard>
  );
}
