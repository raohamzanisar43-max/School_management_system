import React from 'react';
import { ChevronRight, GraduationCap, Users, Wallet } from 'lucide-react';
import { StatCard } from '../DashboardChrome';
import { MODULES, COLOR_CLASSES } from './constants';

export default function DashboardHome({ user, students, teachers, invoices, accent, onNavigate }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold font-outfit text-white">Welcome back, {(user?.name || 'Admin').split(' ')[0]}!</h2>
        <p className="text-slate-400 text-sm mt-1">Manage your school easily from one place.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {MODULES.map(mod => {
          const c = COLOR_CLASSES[mod.color];
          const Icon = mod.icon;
          return (
            <div key={mod.key} className={`rounded-2xl border border-[#182030] bg-[#0b101d] p-6 flex flex-col items-center text-center transition ${c.hoverBorder}`}>
              <div className={`w-14 h-14 rounded-full ${c.softBg} border ${c.border} flex items-center justify-center mb-4`}>
                <Icon className={`h-7 w-7 ${c.text}`} />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">{mod.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-5 flex-1">{mod.desc}</p>
              <button
                onClick={() => onNavigate(mod.key)}
                className={`w-full py-2 px-4 rounded-xl border ${c.border} ${c.text} text-xs font-bold hover:bg-white/5 transition flex items-center justify-center gap-1.5 cursor-pointer`}
              >
                Manage <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard icon={GraduationCap} label="Enrolled Students" value={students.length} sub="Across all programs" accent={accent} />
        <StatCard icon={Users} label="Active Teachers" value={teachers.length} sub="Full-time tutors" accent={accent} />
        <StatCard icon={Wallet} label="Pending Invoices" value={invoices.filter(i => i.status === 'UNPAID').length} sub="Requires follow-up" accent={accent} />
      </div>
    </div>
  );
}
