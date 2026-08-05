import React from 'react';
import { CalendarCheck } from 'lucide-react';
import { SectionCard } from '../ui/SectionCard';

export default function AttendanceView({ attendanceLogs, students, accent }) {
  return (
    <SectionCard title="Attendance Log" icon={CalendarCheck} accent={accent}>
      <div className="space-y-2">
        {attendanceLogs.slice(0, 20).map(log => {
          const stu = students.find(s => s.id === log.student);
          return (
            <div key={log.id} className="p-3 bg-[#05070a] border border-[#182030] rounded-xl flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">{stu?.name || `Student #${log.student}`}</span>
              <span className="text-[10px] text-slate-500">{log.date}</span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${log.status === 'PRESENT' ? 'bg-emerald-500/10 text-emerald-400' : log.status === 'LATE' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'}`}>{log.status}</span>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
