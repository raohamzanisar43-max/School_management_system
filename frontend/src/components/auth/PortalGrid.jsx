import React from 'react';

const PORTALS = [
  {
    role: 'STUDENT', title: 'Student Portal',
    desc: 'Access your classes, assignments, results, timetable and more.',
    icon: <svg className="w-6 h-6 sync-icon" viewBox="0 0 24 24" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" /></svg>,
    card: 'hover:border-lime-500/50', iconWrap: 'bg-lime-500/10 border-lime-500/30 text-lime-400', title_: 'text-lime-400',
    btn: 'border-lime-500/40 hover:border-lime-400 text-lime-400 hover:bg-lime-500/10',
  },
  {
    role: 'ADMIN', title: 'Admin Portal',
    desc: 'Manage users, academics, reports and system settings.',
    icon: <svg className="w-6 h-6 sync-icon" viewBox="0 0 24 24" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /><circle cx="12" cy="10" r="3" /></svg>,
    card: 'hover:border-blue-500/50', iconWrap: 'bg-blue-500/10 border-blue-500/30 text-blue-400', title_: 'text-blue-400',
    btn: 'border-blue-500/40 hover:border-blue-400 text-blue-400 hover:bg-blue-500/10',
  },
  {
    role: 'TEACHER', title: 'Teacher Portal',
    desc: 'Manage classes, students, assignments and evaluations.',
    icon: <svg className="w-6 h-6 sync-icon" viewBox="0 0 24 24" strokeWidth="1.8"><rect x="2" y="3" width="20" height="12" rx="2" /><circle cx="12" cy="19" r="2" /><path d="M12 9v4" /></svg>,
    card: 'hover:border-purple-500/50', iconWrap: 'bg-purple-500/10 border-purple-500/30 text-purple-400', title_: 'text-purple-400',
    btn: 'border-purple-500/40 hover:border-purple-400 text-purple-400 hover:bg-purple-500/10',
  },
  {
    role: 'PARENT', title: 'Parent Portal',
    desc: "Track your child's progress, attendance, fees and more.",
    icon: <svg className="w-6 h-6 sync-icon" viewBox="0 0 24 24" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    card: 'hover:border-amber-500/50', iconWrap: 'bg-amber-500/10 border-amber-500/30 text-amber-400', title_: 'text-amber-400',
    btn: 'border-amber-500/40 hover:border-amber-400 text-amber-400 hover:bg-amber-500/10',
  },
];

export default function PortalGrid({ onSelectRole, onSwitchToRegister }) {
  return (
    <div className="space-y-6 flex-1 flex flex-col justify-between animate-fade-in">
      <div>
        <span style={{ color: 'var(--brand-lime)' }} className="text-[11px] font-extrabold tracking-widest uppercase block mb-1">
          WELCOME BACK
        </span>
        <h2 className="text-2xl font-extrabold text-theme-main">Choose your portal</h2>
        <p className="text-xs text-theme-muted mt-0.5">Select your role to sign in to your account</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto">
        {PORTALS.map(p => (
          <div key={p.role} className={`p-5 rounded-2xl border border-theme bg-theme-card-inner transition flex flex-col items-center text-center group ${p.card}`}>
            <div className={`w-12 h-12 rounded-full border flex items-center justify-center mb-3 group-hover:scale-105 transition ${p.iconWrap}`}>
              {p.icon}
            </div>
            <h3 className={`text-sm font-bold mb-1 ${p.title_}`}>{p.title}</h3>
            <p className="text-[11px] text-theme-muted mb-4 leading-relaxed">{p.desc}</p>
            <button
              onClick={() => onSelectRole(p.role)}
              className={`mt-auto w-full py-2 px-4 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer bg-transparent ${p.btn}`}
            >
              Sign in<svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="relative my-4 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-theme"></div></div>
          <span className="relative px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase" style={{ backgroundColor: 'var(--bg-card)' }}>OR</span>
        </div>
        <button onClick={onSwitchToRegister} className="w-full py-3 px-4 rounded-xl border border-theme bg-theme-card-inner text-xs font-bold text-theme-main transition flex items-center justify-center gap-2 cursor-pointer">
          <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="17" y1="11" x2="23" y2="11" /></svg>Create account
        </button>
        <div className="text-center text-xs text-theme-muted">Don't have an account? <button onClick={onSwitchToRegister} style={{ color: 'var(--brand-lime)' }} className="font-bold hover:underline ml-1 cursor-pointer bg-transparent">Sign up</button></div>
      </div>
    </div>
  );
}
