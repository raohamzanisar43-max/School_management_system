import { initials } from '../../utils/stringUtils';

export function PersonCard({ name, subtitle, meta, trailing, accent, rounded = 'rounded-full' }) {
  return (
    <div className="p-4 bg-[#05070a] border border-[#182030] rounded-xl flex items-center gap-3">
      <div className={`w-10 h-10 ${rounded} ${accent.softBg} border ${accent.softBorder} flex items-center justify-center font-bold text-xs ${accent.text} shrink-0`}>{initials(name)}</div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-white truncate">{name}</p>
        {subtitle && <p className="text-[11px] text-slate-500 truncate">{subtitle}</p>}
        {meta}
      </div>
      {trailing}
    </div>
  );
}
