import { useState } from 'react';
import { Menu, Bell, Mail, ChevronDown, LogOut, Search } from 'lucide-react';
import { initials } from '../../utils/stringUtils';

const QUICK_VIEW_COLORS = {
  ADMIN: 'text-violet-400 hover:bg-violet-500/10',
  TEACHER: 'text-emerald-400 hover:bg-emerald-500/10',
  STUDENT: 'text-amber-400 hover:bg-amber-500/10',
  PARENT: 'text-pink-400 hover:bg-pink-500/10',
};
const QUICK_VIEW_LABELS = { ADMIN: 'Admin', TEACHER: 'Teacher', STUDENT: 'Student', PARENT: 'Parent' };

export function Topbar({ onMenuClick, title, showSearch = true, searchValue, onSearchChange, searchPlaceholder = 'Search anything...', notifCount = 0, mailCount = 0, user, roleLabel, accent, onLogout, quickView, onQuickView }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-20 bg-[#05070a]/95 backdrop-blur border-b border-[#182030] px-4 sm:px-6 py-3.5 flex items-center gap-3">
      <button onClick={onMenuClick} className="w-9 h-9 rounded-xl border border-[#182030] bg-[#0b101d] flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer shrink-0 md:hidden">
        <Menu className="h-4 w-4" />
      </button>

      {title && <h1 className="hidden sm:block text-sm font-bold text-white shrink-0 mr-2">{title}</h1>}

      {showSearch && (
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-[#0b101d] border border-[#182030] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/10"
          />
        </div>
      )}

      <div className="flex items-center gap-2 ml-auto">
        <button className="relative w-9 h-9 rounded-xl border border-[#182030] bg-[#0b101d] flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer" title="Notifications">
          <Bell className="h-4 w-4" />
          {notifCount > 0 && <span className={`absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full text-[9px] font-bold flex items-center justify-center text-white ${accent.solid.split(' ')[0]}`}>{notifCount}</span>}
        </button>
        {mailCount !== undefined && mailCount !== null && (
          <button className="relative hidden sm:flex w-9 h-9 rounded-xl border border-[#182030] bg-[#0b101d] items-center justify-center text-slate-400 hover:text-white transition cursor-pointer" title="Messages">
            <Mail className="h-4 w-4" />
            {mailCount > 0 && <span className={`absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full text-[9px] font-bold flex items-center justify-center text-white ${accent.solid.split(' ')[0]}`}>{mailCount}</span>}
          </button>
        )}

        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 pl-2 pr-1.5 py-1.5 rounded-xl border border-[#182030] bg-[#0b101d] hover:border-slate-700 transition cursor-pointer">
            <div className={`w-7 h-7 rounded-full ${accent.softBg} border ${accent.softBorder} flex items-center justify-center font-bold text-[10px] ${accent.text} shrink-0`}>
              {initials(user?.name)}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-xs font-bold text-white truncate max-w-[120px]">{user?.name || 'User'}</p>
              <p className="text-[9px] text-slate-500 truncate max-w-[120px]">{roleLabel}</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-500 hidden sm:block" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#182030] bg-[#0b101d] shadow-2xl overflow-hidden z-30">
              {quickView && quickView.length > 0 && (
                <div className="border-b border-[#182030] py-1.5">
                  <span className="block px-3.5 pb-1 text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Quick View</span>
                  {quickView.map(role => (
                    <button
                      key={role}
                      onClick={() => { setMenuOpen(false); onQuickView(role); }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium transition cursor-pointer ${QUICK_VIEW_COLORS[role]}`}
                    >
                      {QUICK_VIEW_LABELS[role]}
                    </button>
                  ))}
                </div>
              )}
              <button onClick={() => { setMenuOpen(false); onLogout(); }} className="w-full flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition cursor-pointer">
                <LogOut className="h-3.5 w-3.5" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
