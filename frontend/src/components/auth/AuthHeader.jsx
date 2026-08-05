import React from 'react';

export default function AuthHeader({ mode, onGoHome, onSwitchToRegister, onSwitchToLogin, theme, onToggleTheme }) {
  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-5 flex items-center justify-between z-20">

      <a href="/" className="flex items-center gap-3 group" onClick={(e) => { e.preventDefault(); onGoHome(); }}>
        <div className="w-10 h-10 rounded-xl bg-theme-card-inner border border-theme flex items-center justify-center p-2 shadow-sm group-hover:border-lime-500/50 transition">
          <svg className="w-6 h-6 text-theme-main sync-icon" viewBox="0 0 24 24" strokeWidth="1.8">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
          </svg>
        </div>
        <div>
          <div className="font-extrabold text-sm sm:text-base tracking-tight text-theme-main uppercase flex items-center gap-1.5 leading-none">
            <span>BRIGHT FUTURE</span>
            <span style={{ color: 'var(--brand-lime)' }}>SCHOOL</span>
          </div>
          <div className="text-[9px] sm:text-[10px] font-bold tracking-widest text-theme-muted uppercase mt-1">
            THE GLOBAL LEARNING HUB
          </div>
        </div>
      </a>

      <div className="flex items-center gap-3 sm:gap-4">
        {mode === 'LOGIN' ? (
          <>
            <span className="hidden sm:inline text-xs text-theme-muted font-medium">New here?</span>
            <button
              onClick={onSwitchToRegister}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-theme text-xs font-bold text-theme-main hover:text-lime-400 transition-all flex items-center gap-2 bg-theme-card-inner hover:bg-lime-500/10 cursor-pointer"
            >
              <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="17" y1="11" x2="23" y2="11" />
              </svg>
              <span>Create account</span>
            </button>
          </>
        ) : (
          <>
            <span className="hidden sm:inline text-xs text-theme-muted font-medium">Already have an account?</span>
            <button
              onClick={onSwitchToLogin}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-theme text-xs font-bold text-theme-main hover:text-lime-400 transition-all flex items-center gap-2 bg-theme-card-inner hover:bg-lime-500/10 cursor-pointer"
            >
              <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M15 3h6v18h-6M10 17l5-5-5-5M13.8 12H3" />
              </svg>
              <span>Sign in</span>
            </button>
          </>
        )}

        <button
          onClick={onToggleTheme}
          title="Toggle Theme (Dark / Light / OLED)"
          className="w-9 h-9 rounded-xl border border-theme bg-theme-card-inner flex items-center justify-center text-theme-muted hover:text-theme-main transition cursor-pointer"
        >
          {theme === 'dark' && (
            <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
          {theme === 'light' && (
            <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          )}
          {theme === 'night' && (
            <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
