import React from 'react';

const FEATURE_ICONS = {
  globe: <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>,
  book: <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
  shield: <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  chart: <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
};

export default function LoginHero({ selectedRole, specs }) {
  return (
    <div className="space-y-6">
      {selectedRole === null ? (
        <div className="space-y-3">
          <span style={{ color: 'var(--brand-lime)' }} className="text-xs font-extrabold tracking-widest uppercase block">
            STUDENT SUCCESS, WORLDWIDE
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-theme-main leading-[1.08]">
            Every future <br />
            <span style={{ color: 'var(--brand-lime)' }}>starts connected.</span>
          </h1>
          <p className="text-sm text-theme-muted leading-relaxed font-normal pt-2 max-w-md">
            A unified portal to access everything you need. Choose your portal and sign in to continue your learning journey.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <span className={`text-xs font-extrabold tracking-widest uppercase block ${specs.accentText}`}>
            WELCOME BACK!
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-theme-main leading-[1.08]">
            Sign in to continue <br />
            <span className={`${specs.accentText}`}>your learning journey</span>
          </h1>
          <p className="text-sm text-theme-muted leading-relaxed font-normal pt-2 max-w-md">
            Access your classes, assignments, grades and everything you need to succeed.
          </p>
        </div>
      )}

      {selectedRole === null ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-theme">
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-lg bg-theme-card-inner border border-theme flex items-center justify-center text-theme-main mb-2">{FEATURE_ICONS.globe}</div>
            <h4 className="text-xs font-bold text-theme-main">Global Community</h4>
            <p className="text-[11px] text-theme-muted">Connect worldwide</p>
          </div>
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-lg bg-theme-card-inner border border-theme flex items-center justify-center text-theme-main mb-2">{FEATURE_ICONS.book}</div>
            <h4 className="text-xs font-bold text-theme-main">Smart Learning</h4>
            <p className="text-[11px] text-theme-muted">Learn. Grow. Succeed.</p>
          </div>
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-lg bg-theme-card-inner border border-theme flex items-center justify-center text-theme-main mb-2">{FEATURE_ICONS.shield}</div>
            <h4 className="text-xs font-bold text-theme-main">Secure & Trusted</h4>
            <p className="text-[11px] text-theme-muted">Your data is safe</p>
          </div>
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-lg bg-theme-card-inner border border-theme flex items-center justify-center text-theme-main mb-2">{FEATURE_ICONS.chart}</div>
            <h4 className="text-xs font-bold text-theme-main">Better Outcomes</h4>
            <p className="text-[11px] text-theme-muted">Track your progress</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 pt-4 border-t border-theme">
          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-full border ${specs.iconCircle} flex items-center justify-center text-xs shrink-0`}>
              <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-theme-main">Smart Learning</h4>
              <p className="text-[11px] text-theme-muted mt-0.5">Personalized education for a better future.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-full border ${specs.iconCircle} flex items-center justify-center text-xs shrink-0`}>
              <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-theme-main">Secure & Trusted</h4>
              <p className="text-[11px] text-theme-muted mt-0.5">Your data is protected with top security.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-full border ${specs.iconCircle} flex items-center justify-center text-xs shrink-0`}>
              <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-theme-main">Global Community</h4>
              <p className="text-[11px] text-theme-muted mt-0.5">Connect, learn and grow together worldwide.</p>
            </div>
          </div>
        </div>
      )}

      {selectedRole === null ? (
        <div className="pt-2 flex items-center gap-3">
          <div className="flex -space-x-2 overflow-hidden shrink-0">
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Student 1" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Student 2" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Student 3" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Student 4" />
          </div>
          <div className="text-xs text-theme-muted">
            <span style={{ color: 'var(--brand-lime)' }} className="font-extrabold text-sm">21,500+</span> learners already connected
          </div>
        </div>
      ) : (
        <div className="w-full h-48 rounded-2xl bg-gradient-to-b from-slate-950 to-indigo-950/40 border border-theme relative overflow-hidden flex items-end justify-center pt-8">
          <div className="absolute top-4 left-6 w-1 h-1 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-10 right-12 w-1.5 h-1.5 bg-white rounded-full opacity-45"></div>
          <div className="absolute top-4 right-10 w-6 h-6 bg-amber-200/20 rounded-full blur-[1px] flex items-center justify-center">
            <div className="w-4 h-4 bg-amber-100 rounded-full"></div>
          </div>
          <div className="absolute bottom-0 right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
          <div className="w-full flex items-end justify-center px-8 gap-3 relative z-10">
            <div className="w-14 h-16 bg-slate-950 border-t border-x border-slate-900 rounded-t-lg flex flex-col justify-around py-2.5 px-2">
              <div className="flex gap-1 justify-center"><div className="w-2 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div><div className="w-2 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div></div>
              <div className="flex gap-1 justify-center"><div className="w-2 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div><div className="w-2 h-3 bg-slate-900 rounded-sm"></div></div>
            </div>
            <div className="w-20 h-24 bg-slate-950 border-t border-x border-slate-900 rounded-t-xl flex flex-col justify-between py-3 px-2.5 relative">
              <div className="w-5 h-5 bg-slate-900 border border-slate-800 rounded-full absolute -top-2.5 left-7.5 flex items-center justify-center text-[7px] text-slate-500">⏰</div>
              <div className="flex gap-1.5 justify-center"><div className="w-2.5 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div><div className="w-2.5 h-3 bg-slate-900 rounded-sm"></div><div className="w-2.5 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div></div>
              <div className="flex gap-1.5 justify-center"><div className="w-2.5 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div><div className="w-2.5 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div><div className="w-2.5 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div></div>
              <div className="w-5 h-7 bg-slate-900 rounded-t-md mx-auto border-t border-x border-slate-800"></div>
            </div>
            <div className="w-14 h-18 bg-slate-950 border-t border-x border-slate-900 rounded-t-lg flex flex-col justify-around py-2.5 px-2">
              <div className="flex gap-1 justify-center"><div className="w-2 h-3 bg-slate-900 rounded-sm"></div><div className="w-2 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div></div>
              <div className="flex gap-1 justify-center"><div className="w-2 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div><div className="w-2 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div></div>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 border border-slate-800/60 rounded-xl px-2.5 py-1.5 flex items-center gap-2 z-20 backdrop-blur-sm">
            <div className="flex -space-x-1.5 overflow-hidden shrink-0">
              <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80" alt="Student 1" />
              <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80" alt="Student 2" />
              <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&auto=format&fit=crop&q=80" alt="Student 3" />
            </div>
            <span className="text-[10px] text-slate-400 leading-none">
              <strong className="text-lime-400 font-extrabold">21,500+</strong> learners already connected and growing every day.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
