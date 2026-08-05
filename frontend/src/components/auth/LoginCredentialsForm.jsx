import React from 'react';

export default function LoginCredentialsForm({ selectedRole, specs, form, onBack, onForgotPassword, onSwitchToRegister }) {
  const { username, setUsername, password, setPassword, error, loading, handleSubmit, handleQuickDemoLogin } = form;
  return (
    <div className="space-y-6 flex-1 flex flex-col justify-between animate-fade-in">
      <div>
        <button onClick={onBack} className="inline-flex items-center gap-2 text-xs font-bold text-theme-muted hover:text-theme-main transition cursor-pointer bg-transparent">
          <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>Back to portals
        </button>
      </div>
      <div className="text-center space-y-3">
        <div className={`mx-auto w-12 h-12 rounded-full border ${specs.iconCircle} flex items-center justify-center`}><svg className="w-6 h-6 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg></div>
        <div>
          <h2 className="text-2xl font-extrabold text-theme-main">Sign in</h2>
          <p className="text-xs text-theme-muted mt-1">Enter your credentials to access your account</p>
        </div>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-xs p-3.5 rounded-xl">{error}</div>}
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-theme-muted uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500"><svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></div>
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your email address" className={`block w-full pl-10 pr-3 py-3 border border-theme rounded-xl bg-theme-card-inner text-theme-main placeholder-slate-600 focus:outline-none focus:ring-2 transition-all text-xs ${specs.borderFocus}`} />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] font-bold text-theme-muted uppercase tracking-wider">Password</label>
              <button type="button" onClick={onForgotPassword} className={`text-[10px] font-bold hover:underline ${specs.badgeText} cursor-pointer bg-transparent`}>Forgot Password?</button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500"><svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg></div>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className={`block w-full pl-10 pr-10 py-3 border border-theme rounded-xl bg-theme-card-inner text-theme-main placeholder-slate-600 focus:outline-none focus:ring-2 transition-all text-xs ${specs.borderFocus}`} />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 cursor-pointer hover:text-slate-350"><svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /></svg></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 py-1">
          <input type="checkbox" id="rememberMe" className="rounded border-theme bg-theme-card-inner focus:ring-lime-500 h-4 w-4" />
          <label htmlFor="rememberMe" className="text-xs text-theme-muted cursor-pointer">Remember me</label>
        </div>
        <div className="pt-2">
          <button type="submit" disabled={loading} className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5 ${specs.btnBg}`}>Sign in<svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></button>
        </div>
      </form>
      <div className="space-y-4 pt-4 border-t border-theme">
        <div className="relative text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-theme"></div></div>
          <span className="relative px-2.5 text-[9px] font-bold tracking-widest text-slate-600 uppercase" style={{ backgroundColor: 'var(--bg-card)' }}>Or sign in with</span>
        </div>
        <div className="space-y-2">
          <button type="button" onClick={() => handleQuickDemoLogin(selectedRole)} className="w-full py-2.5 border border-theme bg-theme-card-inner hover:bg-slate-100/5 text-xs text-theme-main rounded-xl transition flex items-center justify-center gap-2 cursor-pointer">
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 23 23"><rect x="0" y="0" width="11" height="11" fill="#f25022" /><rect x="12" y="0" width="11" height="11" fill="#7fba00" /><rect x="0" y="12" width="11" height="11" fill="#00a4ef" /><rect x="12" y="12" width="11" height="11" fill="#ffb900" /></svg>
            <span>Continue with Microsoft</span>
          </button>
          <button type="button" onClick={() => handleQuickDemoLogin(selectedRole)} className="w-full py-2.5 border border-theme bg-theme-card-inner hover:bg-slate-100/5 text-xs text-theme-main rounded-xl transition flex items-center justify-center gap-2 cursor-pointer">
            <svg className="w-3.5 h-3.5 shrink-0 fill-current text-theme-main" viewBox="0 0 24 24"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.51 12.06 1.005 1.45 2.187 3.076 3.755 3.017 1.51-.062 2.079-.974 3.906-.974 1.826 0 2.36.974 3.934.94 1.602-.027 2.646-1.477 3.627-2.9 1.135-1.655 1.604-3.255 1.63-3.342-.03-.013-3.136-1.202-3.167-4.773-.027-2.983 2.444-4.417 2.557-4.483-1.402-2.052-3.57-2.285-4.331-2.342-1.954-.157-3.35 1.03-4.1.988zM15.975 4.108c.828-1.002 1.385-2.4 1.23-3.793-1.197.047-2.647.795-3.504 1.802-.756.873-1.42 2.29-1.242 3.666 1.332.103 2.69-.672 3.516-1.675z" /></svg>
            <span>Continue with Apple</span>
          </button>
        </div>
        <div className="text-center text-xs text-theme-muted">Don't have an account? <button type="button" onClick={onSwitchToRegister} style={{ color: 'var(--brand-lime)' }} className="font-bold hover:underline cursor-pointer bg-transparent">Create Account</button></div>
      </div>
    </div>
  );
}
