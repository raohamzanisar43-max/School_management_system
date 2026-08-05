import React from 'react';
import { Users } from 'lucide-react';
import { SectionCard, PersonCard } from '../DashboardChrome';

export default function TeachersView({ teachers, accent }) {
  return (
    <SectionCard title="My Teachers" icon={Users} accent={accent}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {teachers.map(t => (
          <PersonCard key={t.id} name={t.name} subtitle={t.specialization} accent={accent} />
        ))}
      </div>
    </SectionCard>
  );
}
