import { Settings } from 'lucide-react';
import { SectionCard } from './SectionCard';

export function SettingsPanel({ accent, notifText, checkboxAccentClass = 'accent-lime-500', onLogout }) {
  return (
    <SectionCard title="Settings" icon={Settings} accent={accent} className="max-w-xl">
      <div className="flex items-center justify-between pb-4 border-b border-[#182030]">
        <div>
          <h4 className="font-bold text-sm text-white">Email Notifications</h4>
          <p className="text-xs text-slate-500">{notifText}</p>
        </div>
        <input type="checkbox" defaultChecked className={`w-5 h-5 ${checkboxAccentClass}`} />
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <h4 className="font-bold text-sm text-white">Sign out</h4>
          <p className="text-xs text-slate-500">End your current session on this device.</p>
        </div>
        <button onClick={onLogout} className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 font-bold text-xs cursor-pointer transition">Logout</button>
      </div>
    </SectionCard>
  );
}
