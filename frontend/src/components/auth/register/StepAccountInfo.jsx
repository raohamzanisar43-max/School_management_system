import React from 'react';

const ROLE_CARDS = [
  {
    role: 'STUDENT', title: 'Student', desc: 'Access assignments, classes, and marks.',
    icon: <svg className="w-5 h-5 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" /></svg>,
    selectedCard: 'border-lime-500 bg-lime-500/5', selectedDot: 'border-lime-500', dotFill: 'bg-lime-500',
    selectedIcon: 'text-lime-400 bg-lime-500/10', selectedTitle: 'text-lime-400',
  },
  {
    role: 'TEACHER', title: 'Teacher', desc: 'Manage students and schedule classes.',
    icon: <svg className="w-5 h-5 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><rect x="2" y="3" width="20" height="12" rx="2" /><circle cx="12" cy="19" r="2" /><path d="M12 9v4" /></svg>,
    selectedCard: 'border-purple-500 bg-purple-500/5', selectedDot: 'border-purple-500', dotFill: 'bg-purple-500',
    selectedIcon: 'text-purple-400 bg-purple-500/10', selectedTitle: 'text-purple-400',
  },
  {
    role: 'PARENT', title: 'Parent', desc: 'Track child details and fee invoices.',
    icon: <svg className="w-5 h-5 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>,
    selectedCard: 'border-amber-500 bg-amber-500/5', selectedDot: 'border-amber-500', dotFill: 'bg-amber-500',
    selectedIcon: 'text-amber-400 bg-amber-500/10', selectedTitle: 'text-amber-400',
  },
  {
    role: 'ADMIN', title: 'Admin', desc: 'Configure school settings and databases.',
    icon: <svg className="w-5 h-5 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /></svg>,
    selectedCard: 'border-blue-500 bg-blue-500/5', selectedDot: 'border-blue-500', dotFill: 'bg-blue-500',
    selectedIcon: 'text-blue-400 bg-blue-500/10', selectedTitle: 'text-blue-400',
  },
];

export default function StepAccountInfo({
  fullName, onFullNameChange, email, onEmailChange,
  password, onPasswordChange, showPass, onToggleShowPass,
  confirmPassword, onConfirmPasswordChange, showConfirmPass, onToggleShowConfirmPass,
  role, onRoleChange, agree, onAgreeChange,
}) {
  return (
    <div className="space-y-5">
      <h3 className="text-xs font-bold text-theme-main uppercase tracking-widest border-b border-theme pb-2">Account Information</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-theme-muted uppercase tracking-wider mb-2">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </div>
            <input type="text" required value={fullName} onChange={e => onFullNameChange(e.target.value)} placeholder="Enter your full name" className="block w-full pl-10 pr-3 py-3 border border-theme rounded-xl bg-theme-card-inner text-theme-main placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500/80 transition-all text-xs" />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-theme-muted uppercase tracking-wider mb-2">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </div>
            <input type="email" required value={email} onChange={e => onEmailChange(e.target.value)} placeholder="Enter your email address" className="block w-full pl-10 pr-3 py-3 border border-theme rounded-xl bg-theme-card-inner text-theme-main placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500/80 transition-all text-xs" />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-theme-muted uppercase tracking-wider mb-2">Create Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </div>
            <input type={showPass ? 'text' : 'password'} required value={password} onChange={e => onPasswordChange(e.target.value)} placeholder="Create a strong password" className="block w-full pl-10 pr-10 py-3 border border-theme rounded-xl bg-theme-card-inner text-theme-main placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500/80 transition-all text-xs" />
            <button type="button" onClick={onToggleShowPass} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 cursor-pointer hover:text-slate-350">
              <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /></svg>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-theme-muted uppercase tracking-wider mb-2">Confirm Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </div>
            <input type={showConfirmPass ? 'text' : 'password'} required value={confirmPassword} onChange={e => onConfirmPasswordChange(e.target.value)} placeholder="Confirm your password" className="block w-full pl-10 pr-10 py-3 border border-theme rounded-xl bg-theme-card-inner text-theme-main placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500/80 transition-all text-xs" />
            <button type="button" onClick={onToggleShowConfirmPass} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 cursor-pointer hover:text-slate-350">
              <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /></svg>
            </button>
          </div>
        </div>
      </div>
      <p className="text-[9px] text-theme-muted">Min. 8 characters with letters, numbers & symbols</p>

      <div>
        <h3 className="text-xs font-bold text-theme-main uppercase tracking-widest mb-3">Select Your Role</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ROLE_CARDS.map(c => {
            const active = role === c.role;
            return (
              <div
                key={c.role}
                onClick={() => onRoleChange(c.role)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer text-center relative ${active ? c.selectedCard : 'border-theme bg-theme-card-inner'}`}
              >
                <div className={`absolute top-2 right-2 w-3.5 h-3.5 rounded-full border flex items-center justify-center ${active ? c.selectedDot : 'border-theme'}`}>
                  {active && <div className={`w-1.5 h-1.5 rounded-full ${c.dotFill}`}></div>}
                </div>
                <div className={`w-8 h-8 rounded-lg mx-auto flex items-center justify-center mb-2 ${active ? c.selectedIcon : 'text-theme-muted bg-theme-card-inner'}`}>{c.icon}</div>
                <h4 className={`text-xs font-bold ${active ? c.selectedTitle : 'text-theme-main'}`}>{c.title}</h4>
                <p className="text-[8px] text-theme-muted mt-1 leading-tight">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2.5 py-1">
        <input type="checkbox" id="regAgreeCheck" checked={agree} onChange={e => onAgreeChange(e.target.checked)} className="rounded border-theme bg-theme-card-inner focus:ring-lime-500 h-4 w-4 cursor-pointer" />
        <label htmlFor="regAgreeCheck" className="text-xs text-theme-muted cursor-pointer">
          I agree to the <span className="text-lime-400 hover:underline">Terms of Service</span> and <span className="text-lime-400 hover:underline">Privacy Policy</span>
        </label>
      </div>
    </div>
  );
}
