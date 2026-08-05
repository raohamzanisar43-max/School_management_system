import React, { useState } from 'react';
import { Menu, Bell, Mail, ChevronDown, LogOut, Search, GraduationCap, HelpCircle, Send, Settings } from 'lucide-react';

// Shared dark "Bright Future School" dashboard design system used by all four
// role dashboards (Admin / Teacher / Student / Parent). Keeping the chrome
// (sidebar + topbar + stat/section cards) in one place avoids re-implementing
// near-identical layout code four times.

export const ACCENTS = {
  STUDENT: {
    text: 'text-lime-400',
    softBg: 'bg-lime-500/10',
    softBorder: 'border-lime-500/30',
    solid: 'bg-lime-500 hover:bg-lime-400 text-slate-950',
    ring: 'ring-lime-500/40',
    dot: 'bg-lime-400',
    activeBg: 'bg-lime-500/15',
    barColor: '#a3e635',
  },
  ADMIN: {
    text: 'text-blue-400',
    softBg: 'bg-blue-500/10',
    softBorder: 'border-blue-500/30',
    solid: 'bg-blue-500 hover:bg-blue-400 text-white',
    ring: 'ring-blue-500/40',
    dot: 'bg-blue-400',
    activeBg: 'bg-blue-500/15',
    barColor: '#60a5fa',
  },
  TEACHER: {
    text: 'text-purple-400',
    softBg: 'bg-purple-500/10',
    softBorder: 'border-purple-500/30',
    solid: 'bg-purple-500 hover:bg-purple-400 text-white',
    ring: 'ring-purple-500/40',
    dot: 'bg-purple-400',
    activeBg: 'bg-purple-500/15',
    barColor: '#c084fc',
  },
  PARENT: {
    text: 'text-violet-400',
    softBg: 'bg-violet-500/10',
    softBorder: 'border-violet-500/30',
    solid: 'bg-violet-500 hover:bg-violet-400 text-white',
    ring: 'ring-violet-500/40',
    dot: 'bg-violet-400',
    activeBg: 'bg-violet-500/15',
    barColor: '#a78bfa',
  },
};

export function initials(name) {
  return (name || '?').trim().split(/\s+/).map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

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

      {quickView && quickView.length > 0 && (
        <div className="hidden lg:flex items-center gap-1 bg-[#0b101d] border border-[#182030] p-1 rounded-xl text-xs ml-auto">
          <span className="px-2 text-slate-500 font-semibold">Quick View:</span>
          {quickView.map(role => (
            <button
              key={role}
              onClick={() => onQuickView(role)}
              className={`px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${QUICK_VIEW_COLORS[role]}`}
            >
              {QUICK_VIEW_LABELS[role]}
            </button>
          ))}
        </div>
      )}

      <div className={`flex items-center gap-2 ${quickView && quickView.length > 0 ? '' : 'ml-auto'}`}>
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
            <div className="absolute right-0 mt-2 w-40 rounded-xl border border-[#182030] bg-[#0b101d] shadow-2xl overflow-hidden z-30">
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

export function StatCard({ icon: Icon, label, value, sub, accent, valueClass }) {
  return (
    <div className="rounded-2xl border border-[#182030] bg-[#0b101d] p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-xl ${accent.softBg} border ${accent.softBorder} flex items-center justify-center`}>
          <Icon className={`h-4 w-4 ${accent.text}`} />
        </div>
      </div>
      <p className={`text-xl font-extrabold font-outfit ${valueClass || 'text-white'}`}>{value}</p>
      <p className="text-xs font-semibold text-slate-300 mt-1">{label}</p>
      {sub && <p className="text-[10px] text-slate-500 mt-1">{sub}</p>}
    </div>
  );
}

export function SectionCard({ title, action, icon: Icon, accent, children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-[#182030] bg-[#0b101d] p-5 sm:p-6 ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            {Icon && <Icon className={`h-4 w-4 ${accent?.text || 'text-slate-400'}`} />}
            {title}
          </h3>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function ProgressBar({ value, color }) {
  return (
    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: color }}></div>
    </div>
  );
}

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

export function ChatPanel({ title, icon, accent, messages, isMine, onSend, placeholder = 'Type your message...', emptyText = 'No messages yet.' }) {
  const [input, setInput] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput('');
  };
  return (
    <SectionCard title={title} icon={icon} accent={accent}>
      <div className="flex flex-col h-[420px]">
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${isMine(msg) ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md rounded-2xl px-4 py-2.5 text-xs ${isMine(msg) ? `${accent.solid} rounded-tr-none` : 'bg-white/5 text-slate-200 rounded-tl-none'}`}>{msg.message}</div>
            </div>
          ))}
          {messages.length === 0 && <p className="text-xs text-slate-500 italic text-center py-6">{emptyText}</p>}
        </div>
        <form onSubmit={handleSubmit} className="border-t border-[#182030] pt-4 flex gap-3">
          <input value={input} onChange={e => setInput(e.target.value)} placeholder={placeholder} className="flex-1 px-4 py-3 border border-[#182030] bg-[#05070a] text-xs text-white rounded-xl focus:outline-none" />
          <button type="submit" className={`p-3 rounded-xl text-white cursor-pointer ${accent.solid}`}><Send className="h-4 w-4" /></button>
        </form>
      </div>
    </SectionCard>
  );
}

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

export function DashboardShell({ sidebar, topbar, children }) {
  return (
    <div className="min-h-screen bg-[#05070a] text-white flex font-sans">
      {sidebar}
      <div className="flex-1 flex flex-col min-w-0">
        {topbar}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
