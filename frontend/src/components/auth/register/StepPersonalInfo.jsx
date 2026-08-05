import React from 'react';

export default function StepPersonalInfo({ phone, onPhoneChange, dob, onDobChange, gender, onGenderChange }) {
  return (
    <div className="space-y-5">
      <h3 className="text-xs font-bold text-theme-main uppercase tracking-widest border-b border-theme pb-2">Personal Information</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-theme-muted uppercase tracking-wider mb-2">Phone Number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            </div>
            <input type="text" required value={phone} onChange={e => onPhoneChange(e.target.value)} placeholder="Enter phone number" className="block w-full pl-10 pr-3 py-3 border border-theme rounded-xl bg-theme-card-inner text-theme-main placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500/80 transition-all text-xs" />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-theme-muted uppercase tracking-wider mb-2">Date of Birth</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            </div>
            <input type="date" required value={dob} onChange={e => onDobChange(e.target.value)} className="block w-full pl-10 pr-3 py-3 border border-theme rounded-xl bg-theme-card-inner text-theme-main focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500/80 transition-all text-xs" />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-theme-muted uppercase tracking-wider mb-2">Gender</label>
          <select value={gender} onChange={e => onGenderChange(e.target.value)} className="block w-full px-3.5 py-3 border border-theme rounded-xl bg-theme-card-inner text-theme-main focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500/80 transition-all text-xs">
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
}
