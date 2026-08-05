import React from 'react';

export default function RegisterHero({ onBackToHome }) {
  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-theme-muted hover:text-theme-main transition cursor-pointer"
        >
          <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          Back to home
        </button>
      </div>

      <div className="space-y-3">
        <span className="text-xs font-extrabold tracking-widest text-slate-500 uppercase block">
          STUDENT SUCCESS, WORLDWIDE
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-theme-main leading-[1.08]">
          Every future <br />
          <span style={{ color: 'var(--brand-lime)' }}>starts connected.</span>
        </h1>
        <p className="text-sm text-theme-muted leading-relaxed font-normal pt-2 max-w-md">
          Create your account to access everything you need. Choose your role and join our learning community.
        </p>
      </div>

      <div className="space-y-4 pt-4 border-t border-theme">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full border border-theme flex items-center justify-center text-xs shrink-0 text-theme-main bg-theme-card-inner">
            <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
          </div>
          <div>
            <h4 className="text-xs font-bold text-theme-main">Smart Learning</h4>
            <p className="text-[11px] text-theme-muted mt-0.5">Learn. Grow. Succeed.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full border border-theme flex items-center justify-center text-xs shrink-0 text-theme-main bg-theme-card-inner">
            <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          </div>
          <div>
            <h4 className="text-xs font-bold text-theme-main">Secure & Trusted</h4>
            <p className="text-[11px] text-theme-muted mt-0.5">Your data is safe with us.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full border border-theme flex items-center justify-center text-xs shrink-0 text-theme-main bg-theme-card-inner">
            <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
          </div>
          <div>
            <h4 className="text-xs font-bold text-theme-main">Global Community</h4>
            <p className="text-[11px] text-theme-muted mt-0.5">Connect and learn worldwide.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full border border-theme flex items-center justify-center text-xs shrink-0 text-theme-main bg-theme-card-inner">
            <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
          </div>
          <div>
            <h4 className="text-xs font-bold text-theme-main">Better Outcomes</h4>
            <p className="text-[11px] text-theme-muted mt-0.5">Track your progress and achieve more.</p>
          </div>
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-theme bg-theme-card-inner flex items-center gap-3 max-w-sm">
        <div className="flex -space-x-1.5 overflow-hidden shrink-0">
          <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80" alt="Student 1" />
          <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80" alt="Student 2" />
          <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&auto=format&fit=crop&q=80" alt="Student 3" />
        </div>
        <span className="text-[10px] text-theme-muted leading-none">
          <strong style={{ color: 'var(--brand-lime)' }} className="font-extrabold text-xs">21,500+</strong> learners already connected
        </span>
      </div>
    </div>
  );
}
