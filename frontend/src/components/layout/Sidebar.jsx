import { GraduationCap, HelpCircle } from 'lucide-react';

export function Sidebar({ brandLabel = 'BRIGHT FUTURE', portalLabel, navItems, activeKey, onSelect, accent, open, onClose, helpText, helpAction }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={onClose}></div>
      )}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 shrink-0 flex flex-col bg-[#05070a] border-r border-[#182030] transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex items-center gap-3 px-5 py-5 border-b border-[#182030]">
          <div className={`w-9 h-9 rounded-xl ${accent.softBg} border ${accent.softBorder} flex items-center justify-center shrink-0`}>
            <GraduationCap className={`h-5 w-5 ${accent.text}`} />
          </div>
          <div className="min-w-0">
            <h1 className="text-xs font-extrabold font-outfit tracking-tight text-white leading-tight truncate">{brandLabel} <span className={accent.text}>SCHOOL</span></h1>
            <p className={`text-[9px] uppercase tracking-widest font-bold mt-0.5 ${accent.text}`}>{portalLabel}</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ key, label, icon: Icon, badge }) => (
            <button
              key={key}
              onClick={() => { onSelect(key); if (onClose) onClose(); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${activeKey === key ? `${accent.activeBg} ${accent.text}` : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 min-w-0 truncate text-left">{label}</span>
              {!!badge && (
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${activeKey === key ? 'bg-white/15 text-white' : `${accent.softBg} ${accent.text}`}`}>{badge}</span>
              )}
            </button>
          ))}
        </nav>

        {helpText && (
          <div className="p-4">
            <div className="rounded-2xl border border-[#182030] bg-[#0b101d] p-4 text-center space-y-2.5">
              <div className={`w-9 h-9 rounded-xl ${accent.softBg} border ${accent.softBorder} flex items-center justify-center mx-auto`}>
                <HelpCircle className={`h-4 w-4 ${accent.text}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Need Help?</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{helpText}</p>
              </div>
              <button onClick={helpAction} className={`w-full py-2 rounded-lg text-[10px] font-bold transition cursor-pointer ${accent.solid}`}>Contact Support</button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
