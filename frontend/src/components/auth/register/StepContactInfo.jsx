import React from 'react';

export default function StepContactInfo({ address, onAddressChange, city, onCityChange, country, onCountryChange }) {
  return (
    <div className="space-y-5">
      <h3 className="text-xs font-bold text-theme-main uppercase tracking-widest border-b border-theme pb-2">Contact Information</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-[10px] font-bold text-theme-muted uppercase tracking-wider mb-2">Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            </div>
            <input type="text" required value={address} onChange={e => onAddressChange(e.target.value)} placeholder="Enter home address" className="block w-full pl-10 pr-3 py-3 border border-theme rounded-xl bg-theme-card-inner text-theme-main placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500/80 transition-all text-xs" />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-theme-muted uppercase tracking-wider mb-2">City</label>
          <input type="text" required value={city} onChange={e => onCityChange(e.target.value)} placeholder="Enter city" className="block w-full px-3.5 py-3 border border-theme rounded-xl bg-theme-card-inner text-theme-main placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500/80 transition-all text-xs" />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-theme-muted uppercase tracking-wider mb-2">Country</label>
          <input type="text" required value={country} onChange={e => onCountryChange(e.target.value)} placeholder="Enter country" className="block w-full px-3.5 py-3 border border-theme rounded-xl bg-theme-card-inner text-theme-main placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500/80 transition-all text-xs" />
        </div>
      </div>
    </div>
  );
}
