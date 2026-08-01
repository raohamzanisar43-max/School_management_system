import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

// ============================================================
// Bright Future School - Unified Portal (Login / Sign in / Register)
// React port of the original static HTML mockup.
// ============================================================

const ROLES = ['Student', 'Teacher', 'Parent', 'Admin'];
const THEMES = ['dark', 'light', 'night'];
const AVATAR_1 = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
const AVATAR_2 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80';
const AVATAR_3 = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80';
const AVATAR_4 = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80';

// Tailwind can't see dynamically-built class names like `bg-${color}-500`,
// so every color variant is spelled out literally per role instead.
const ROLE_META = {
  Student: {
    desc: 'Access classes, assignments, results.',
    cardHover: 'hover:border-lime-500/50',
    iconWrap: 'bg-lime-500/10 border-lime-500/30 text-lime-400',
    title: 'text-lime-400',
    roleDot: 'bg-lime-500/10 text-lime-400',
    btn: 'border-lime-500/40 hover:border-lime-400 text-lime-400 hover:bg-lime-500/10',
  },
  Teacher: {
    desc: 'Manage classes, students, assignments.',
    cardHover: 'hover:border-purple-500/50',
    iconWrap: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    title: 'text-purple-400',
    roleDot: 'bg-purple-500/10 text-purple-400',
    btn: 'border-purple-500/40 hover:border-purple-400 text-purple-400 hover:bg-purple-500/10',
  },
  Parent: {
    desc: 'Track attendance, progress & fees.',
    cardHover: 'hover:border-amber-500/50',
    iconWrap: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    title: 'text-amber-400',
    roleDot: 'bg-amber-500/10 text-amber-400',
    btn: 'border-amber-500/40 hover:border-amber-400 text-amber-400 hover:bg-amber-500/10',
  },
  Admin: {
    desc: 'Manage users, academics & settings.',
    cardHover: 'hover:border-blue-500/50',
    iconWrap: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    title: 'text-blue-400',
    roleDot: 'bg-blue-500/10 text-blue-400',
    btn: 'border-blue-500/40 hover:border-blue-400 text-blue-400 hover:bg-blue-500/10',
  },
};

const LOGIN_STYLES = `
  :root {
    --bg-page: #05070b;
    --bg-card: #0b0f17;
    --bg-card-inner: #07090e;
    --border-color: #1a2333;
    --border-subtle: rgba(255, 255, 255, 0.08);
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --text-subtle: #64748b;
    --brand-lime: #82e612;
    --brand-lime-glow: rgba(130, 230, 18, 0.15);
    --grid-line: rgba(255, 255, 255, 0.025);
  }
  .bf-login[data-theme="light"] {
    --bg-page: #f1f5f9;
    --bg-card: #ffffff;
    --bg-card-inner: #f8fafc;
    --border-color: #e2e8f0;
    --border-subtle: rgba(15, 23, 42, 0.08);
    --text-main: #0f172a;
    --text-muted: #475569;
    --text-subtle: #64748b;
    --brand-lime: #4d7c0f;
    --brand-lime-glow: rgba(77, 124, 15, 0.15);
    --grid-line: rgba(15, 23, 42, 0.04);
  }
  .bf-login[data-theme="night"] {
    --bg-page: #000000;
    --bg-card: #080808;
    --bg-card-inner: #111111;
    --border-color: #222222;
    --border-subtle: rgba(255, 255, 255, 0.1);
    --text-main: #ffffff;
    --text-muted: #a1a1aa;
    --text-subtle: #52525b;
    --brand-lime: #82e612;
    --brand-lime-glow: rgba(130, 230, 18, 0.2);
    --grid-line: rgba(255, 255, 255, 0.035);
  }
  .bf-login {
    background-color: var(--bg-page);
    color: var(--text-main);
    font-family: 'Inter', sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
    min-height: 100vh;
  }
  .bf-login[data-theme="light"] .bf-text-white { color: #0f172a !important; }
  .bf-login[data-theme="light"] .bf-text-slate-300 { color: #334155 !important; }
  .bf-login[data-theme="light"] .bf-text-slate-400 { color: #475569 !important; }
  .bf-login[data-theme="light"] .bf-input-focus { background-color: #f8fafc !important; border-color: #cbd5e1 !important; }
  .bf-login .bg-grid-pattern {
    background-image:
      linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
    background-size: 32px 32px;
  }
  .bf-login svg.sync-icon { color: currentColor; fill: none; stroke: currentColor; }
  .bf-login .input-focus:focus-within { border-color: var(--brand-lime); box-shadow: 0 0 0 1px var(--brand-lime); }
  .bf-login .role-card-selected { border-color: var(--brand-lime) !important; background-color: var(--brand-lime-glow) !important; }
  .bf-login ::-webkit-scrollbar { width: 6px; }
  .bf-login ::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 99px; }
`;

const ROLE_ICON_PATHS = {
  Student: (
    <>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
    </>
  ),
  Admin: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  Teacher: (
    <>
      <rect x="2" y="3" width="20" height="12" rx="2" />
      <circle cx="12" cy="19" r="2" />
      <path d="M12 9v4" />
    </>
  ),
  Parent: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
};

export default function Login() {
  const { switchRole } = useAuth();

  const [page, setPage] = useState('home'); // 'home' | 'signin' | 'register'
  const [registerStep, setRegisterStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('Student');
  const [theme, setTheme] = useState('dark');
  const [toast, setToast] = useState({ show: false, text: '' });
  const toastTimerRef = useRef(null);

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [reg, setReg] = useState({
    fullName: 'Muhammad Faizan Haider',
    email: 'faizan.haider@example.com',
    password: 'Password123!',
    confirmPassword: 'Password123!',
    dob: '15 March 2002',
    gender: 'Male',
    nationality: 'Pakistani',
    address: 'House # 123, Street 5, Sector F-11/2',
    city: 'Islamabad',
    state: 'ICT',
    postalCode: '44000',
    phone: '312 3456789',
    altPhone: '333 9876543',
    emergName: '',
    emergPhone: '',
    contactEmail: 'faizan.haider@example.com',
    altEmail: '',
    prefComm: 'Email',
    bestTime: 'Evening (6 PM – 9 PM)',
    commAddress: 'House # 123, Street 5, Sector F-11/2, Islamabad, Pakistan',
    profileImage: null,
    agreeTerms: true,
  });
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);
  const fileInputRef = useRef(null);

  const updateReg = (key, value) => setReg((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  const notify = (msg) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ show: true, text: msg });
    toastTimerRef.current = setTimeout(() => setToast({ show: false, text: msg }), 3500);
  };

  const navigateTo = (target) => {
    if (target === 'home') setPage('home');
    else if (target === 'signin') setPage('signin');
    else if (target.startsWith('register')) {
      setPage('register');
      const step = parseInt(target.split('-')[1] || '1', 10);
      setRegisterStep(step);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectPortalAndSignIn = (roleName) => {
    setSelectedRole(roleName);
    navigateTo('signin');
    notify(`Redirected to ${roleName} Portal sign in.`);
  };

  const handleNavAction = () => {
    if (page === 'register') navigateTo('signin');
    else navigateTo('register-1');
  };

  const toggleNextTheme = () => {
    const nextTheme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    setTheme(nextTheme);
    notify(`Switched to ${nextTheme.toUpperCase()} mode.`);
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    notify('Signed in successfully! Redirecting to your dashboard...');
    switchRole(selectedRole.toUpperCase());
  };

  const handleImageSelected = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      updateReg('profileImage', e.target.result);
      notify('Profile picture updated!');
    };
    reader.readAsDataURL(file);
  };

  const handleFinalAccountCreation = () => {
    notify('Congratulations! Your account has been created successfully.');
    setTimeout(() => {
      switchRole(selectedRole.toUpperCase());
    }, 1500);
  };

  const themeIconPath = theme === 'light'
    ? <><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></>
    : theme === 'night'
    ? <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    : <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />;

  return (
    <div className="bf-login bg-grid-pattern flex flex-col justify-between selection:bg-lime-500/20 selection:text-lime-400" data-theme={theme}>
      <style>{LOGIN_STYLES}</style>

      {/* HEADER */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-5 flex items-center justify-between z-20">
        <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center p-2 shadow-sm group-hover:border-lime-500/50 transition">
            <svg className="w-6 h-6 text-white sync-icon" viewBox="0 0 24 24" strokeWidth="1.8">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
            </svg>
          </div>
          <div>
            <div className="font-extrabold text-sm sm:text-base tracking-tight text-white uppercase flex items-center gap-1.5 leading-none">
              <span>BRIGHT FUTURE</span>
              <span style={{ color: 'var(--brand-lime)' }}>SCHOOL</span>
            </div>
            <div className="text-[9px] sm:text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-1">
              THE GLOBAL LEARNING HUB
            </div>
          </div>
        </a>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden sm:inline text-xs text-slate-400 font-medium">
            {page === 'register' ? 'Already have an account?' : "Don't have an account?"}
          </span>

          <a href="#" onClick={(e) => { e.preventDefault(); handleNavAction(); }}
             className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-700/80 hover:border-lime-400 text-xs font-bold text-white hover:text-lime-400 transition-all flex items-center gap-2 bg-slate-900/60 hover:bg-lime-500/10 cursor-pointer">
            <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="17" y1="11" x2="23" y2="11" />
            </svg>
            <span>{page === 'register' ? 'Sign in' : 'Create account'}</span>
          </a>

          <button onClick={toggleNextTheme} title="Toggle Theme (Dark / Light / Night)"
                  className="w-9 h-9 rounded-xl border border-slate-700/80 hover:border-slate-500 bg-slate-900/80 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer">
            <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2">{themeIconPath}</svg>
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-2 sm:py-4 flex-1">

        {/* HOME PAGE */}
        {page === 'home' && (
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[75vh]">
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <span style={{ color: 'var(--brand-lime)' }} className="text-xs font-extrabold tracking-widest uppercase block">
                    STUDENT SUCCESS, WORLDWIDE
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.08]">
                    Every future <br />
                    <span style={{ color: 'var(--brand-lime)' }}>starts connected.</span>
                  </h1>
                  <p className="text-sm text-slate-400 leading-relaxed font-normal pt-2 max-w-md">
                    A unified portal to access everything you need. Choose your portal and sign in to continue your learning journey.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
                  {[
                    { title: 'Global Community', desc: 'Connect worldwide', icon: <><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></> },
                    { title: 'Smart Learning', desc: 'Learn. Grow. Succeed.', icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></> },
                    { title: 'Secure & Trusted', desc: 'Your data is safe', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> },
                    { title: 'Better Outcomes', desc: 'Track your progress', icon: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></> },
                  ].map((f) => (
                    <div key={f.title} className="space-y-1">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 mb-2">
                        <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2">{f.icon}</svg>
                      </div>
                      <h4 className="text-xs font-bold text-white">{f.title}</h4>
                      <p className="text-[11px] text-slate-400">{f.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <div className="flex -space-x-2 overflow-hidden shrink-0">
                    {[AVATAR_1, AVATAR_2, AVATAR_3, AVATAR_4].map((src, i) => (
                      <img key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover" src={src} alt={`Student ${i + 1}`} />
                    ))}
                  </div>
                  <div className="text-xs text-slate-400">
                    <span style={{ color: 'var(--brand-lime)' }} className="font-extrabold text-sm">21,500+</span> learners already connected
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-3xl p-6 sm:p-8 border border-slate-800/90 backdrop-blur-xl shadow-2xl relative" style={{ backgroundColor: 'var(--bg-card)' }}>
                  <div className="mb-6">
                    <span style={{ color: 'var(--brand-lime)' }} className="text-[11px] font-extrabold tracking-widest uppercase block mb-1">
                      WELCOME BACK
                    </span>
                    <h2 className="text-2xl font-extrabold text-white">Choose your portal</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Select your role to sign in to your account</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ROLES.map((role) => {
                      const meta = ROLE_META[role];
                      return (
                        <div key={role} className={`p-5 rounded-2xl border border-slate-800 bg-slate-950/50 ${meta.cardHover} transition flex flex-col items-center text-center group`}>
                          <div className={`w-12 h-12 rounded-full border ${meta.iconWrap} flex items-center justify-center mb-3 group-hover:scale-105 transition`}>
                            <svg className="w-6 h-6 sync-icon" viewBox="0 0 24 24" strokeWidth="1.8">{ROLE_ICON_PATHS[role]}</svg>
                          </div>
                          <h3 className={`text-sm font-bold ${meta.title} mb-1`}>{role} Portal</h3>
                          <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">{meta.desc}</p>
                          <button onClick={() => selectPortalAndSignIn(role)}
                                  className={`mt-auto w-full py-2 px-4 rounded-xl border ${meta.btn} text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer`}>
                            Sign in
                            <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="relative my-6 text-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
                    <span className="relative px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase" style={{ backgroundColor: 'var(--bg-card)' }}>OR</span>
                  </div>

                  <button onClick={() => navigateTo('register-1')} className="w-full py-3 px-4 rounded-xl border border-slate-700/80 hover:border-slate-500 bg-slate-950/60 hover:bg-slate-900 text-xs font-bold text-white transition flex items-center justify-center gap-2 cursor-pointer">
                    <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" />
                      <line x1="20" y1="8" x2="20" y2="14" /><line x1="17" y1="11" x2="23" y2="11" />
                    </svg>
                    Create account
                  </button>

                  <div className="text-center mt-4 text-xs text-slate-400">
                    Don't have an account?
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('register-1'); }} style={{ color: 'var(--brand-lime)' }} className="font-bold hover:underline ml-1 cursor-pointer">Sign up</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SIGN IN PAGE */}
        {page === 'signin' && (
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[75vh]">
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-3">
                  <span style={{ color: 'var(--brand-lime)' }} className="text-xs font-extrabold tracking-widest uppercase block">
                    WELCOME BACK!
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
                    Sign in to continue <br />
                    your <span style={{ color: 'var(--brand-lime)' }}>learning journey</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed font-normal pt-1">
                    Access your classes, assignments, grades and everything you need to succeed. Signing in as <span className="font-bold text-white">{selectedRole}</span>.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { title: 'Smart Learning', desc: 'Personalized education for a better future.', icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></> },
                    { title: 'Secure & Trusted', desc: 'Your data is protected with top security.', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> },
                    { title: 'Global Community', desc: 'Connect, learn and grow together worldwide.', icon: <><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></> },
                  ].map((f) => (
                    <div key={f.title} className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-full border border-slate-800 bg-slate-900/80 flex items-center justify-center shrink-0 text-lime-400 shadow-sm mt-0.5">
                        <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2">{f.icon}</svg>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-white">{f.title}</h3>
                        <p className="text-[11px] text-slate-400">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex items-end">
                  <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#03060c" />
                        <stop offset="60%" stopColor="#0a1220" />
                        <stop offset="100%" stopColor="#060c18" />
                      </linearGradient>
                      <radialGradient id="windowGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffea79" stopOpacity="1" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
                      </radialGradient>
                    </defs>
                    <rect width="600" height="300" fill="url(#nightSky)" />
                    <circle cx="80" cy="40" r="1" fill="#ffffff" opacity="0.8" />
                    <circle cx="280" cy="35" r="1" fill="#ffffff" opacity="0.9" />
                    <path d="M480 40 A18 18 0 1 0 500 62 A15 15 0 1 1 480 40 Z" fill="#e2e8f0" opacity="0.85" />
                    <g>
                      <rect x="250" y="100" width="100" height="150" fill="#070e1b" />
                      <polygon points="250,100 300,50 350,100" fill="#050a14" />
                      <circle cx="300" cy="80" r="8" fill="url(#windowGlow)" />
                      <rect x="150" y="130" width="100" height="120" fill="#08101f" />
                      <rect x="350" y="130" width="100" height="120" fill="#08101f" />
                      <rect x="170" y="150" width="12" height="18" rx="2" fill="url(#windowGlow)" />
                      <rect x="200" y="150" width="12" height="18" rx="2" fill="url(#windowGlow)" />
                      <rect x="370" y="150" width="12" height="18" rx="2" fill="url(#windowGlow)" />
                      <rect x="400" y="150" width="12" height="18" rx="2" fill="url(#windowGlow)" />
                      <path d="M 285 250 L 285 210 A 15 15 0 0 1 315 210 L 315 250 Z" fill="url(#windowGlow)" />
                    </g>
                  </svg>
                  <div className="relative m-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md flex items-center gap-3 z-10 shadow-lg">
                    <div className="flex -space-x-2 overflow-hidden shrink-0">
                      {[AVATAR_1, AVATAR_2, AVATAR_3].map((src, i) => (
                        <img key={i} className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src={src} alt={`Student ${i + 1}`} />
                      ))}
                    </div>
                    <div className="text-[11px] text-slate-300">
                      <span style={{ color: 'var(--brand-lime)' }} className="font-extrabold">21,500+</span> learners already connected and growing.
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 flex justify-center lg:justify-end">
                <div className="w-full max-w-md rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl backdrop-blur-xl" style={{ backgroundColor: 'var(--bg-card)' }}>
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 mb-2 shadow-inner">
                      <svg className="w-6 h-6 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </div>
                    <h2 className="text-2xl font-extrabold text-white">Sign in</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Enter your credentials to access your account</p>
                  </div>

                  <form onSubmit={handleSignInSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                      <div className="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800 transition">
                        <div className="pl-3.5 text-slate-500">
                          <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        </div>
                        <input type="email" required value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} placeholder="Enter your email address"
                               className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
                      <div className="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800 transition">
                        <div className="pl-3.5 text-slate-500">
                          <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        </div>
                        <input type={showSignInPassword ? 'text' : 'password'} required value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} placeholder="Enter your password"
                               className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                        <button type="button" onClick={() => setShowSignInPassword((v) => !v)} className="pr-3.5 text-slate-500 hover:text-slate-300 transition cursor-pointer">
                          {showSignInPassword ? (
                            <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                          ) : (
                            <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                          )}
                        </button>
                      </div>
                      <div className="flex justify-end mt-1.5">
                        <a href="#" onClick={(e) => { e.preventDefault(); notify('Password reset link has been dispatched to your email.'); }} style={{ color: 'var(--brand-lime)' }} className="text-[11px] font-semibold hover:underline cursor-pointer">Forgot Password?</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-0.5">
                      <input type="checkbox" id="signInRemember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border-slate-700 text-lime-500 focus:ring-0 cursor-pointer accent-lime-500" />
                      <label htmlFor="signInRemember" className="text-xs text-slate-300 font-medium cursor-pointer select-none">Remember me</label>
                    </div>

                    <button type="submit" style={{ backgroundColor: 'var(--brand-lime)' }}
                            className="w-full py-3 px-4 rounded-xl text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition shadow-md mt-2 cursor-pointer">
                      Sign in
                      <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </button>
                  </form>

                  <div className="relative my-5 text-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
                    <span className="relative px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase" style={{ backgroundColor: 'var(--bg-card)' }}>OR SIGN IN WITH</span>
                  </div>

                  <div className="space-y-2">
                    <button onClick={() => notify('Connecting to Microsoft account...')} className="w-full py-2.5 px-4 rounded-xl border border-slate-800 hover:border-slate-600 bg-slate-950/60 hover:bg-slate-900 transition flex items-center justify-center gap-2.5 text-xs font-semibold text-slate-200 cursor-pointer">
                      <svg className="w-4 h-4" viewBox="0 0 21 21"><rect x="1" y="1" width="9" height="9" fill="#f25022" /><rect x="11" y="1" width="9" height="9" fill="#7fba00" /><rect x="1" y="11" width="9" height="9" fill="#00a4ef" /><rect x="11" y="11" width="9" height="9" fill="#ffb900" /></svg>
                      Continue with Microsoft
                    </button>
                    <button onClick={() => notify('Connecting to Apple ID...')} className="w-full py-2.5 px-4 rounded-xl border border-slate-800 hover:border-slate-600 bg-slate-950/60 hover:bg-slate-900 transition flex items-center justify-center gap-2.5 text-xs font-semibold text-slate-200 cursor-pointer">
                      <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 170 170"><path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.33.13-9.13-1.9-14.4-6.08-3.81-3.04-7.84-7.85-12.08-14.43-8.01-12.55-14.18-26.23-18.52-41.05-4.34-14.82-6.51-28.84-6.51-42.06 0-16.1 4.13-29.43 12.39-40 8.25-10.57 18.7-15.93 31.34-16.08 6.09 0 12.33 1.5 18.71 4.5 6.38 3 10.74 4.58 13.08 4.75 2.12-.25 6.64-1.84 13.56-4.75 6.93-2.92 13.09-4.29 18.5-4.12 10.08.51 18.61 3.99 25.59 10.43 6.98 6.44 11.45 14.7 13.41 24.78-11.87 7.12-17.7 16.88-17.49 29.28.21 9.84 4.03 18.15 11.45 24.93 7.42 6.78 16.29 10.43 26.61 10.95-2.03 6.02-4.66 12.28-7.88 18.78zm-30.88-106.6c0 6.61-2.42 12.98-7.25 19.11-4.83 6.13-10.87 9.88-18.12 11.25-.42-1.02-.63-2.12-.63-3.3 0-6.78 2.58-13.32 7.75-19.62 5.17-6.3 11.37-9.97 18.6-11.02.21.93.32 2.12.32 3.58z" /></svg>
                      Continue with Apple
                    </button>
                  </div>

                  <div className="text-center mt-5 text-xs text-slate-400">
                    Don't have an account?
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('register-1'); }} style={{ color: 'var(--brand-lime)' }} className="font-bold hover:underline ml-1 cursor-pointer">Create Account</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* REGISTRATION WIZARD */}
        {page === 'register' && (
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start min-h-[75vh]">
              <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition mb-2 cursor-pointer">
                  <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                  Back to home
                </a>

                <div className="space-y-3">
                  <span style={{ color: 'var(--brand-lime)' }} className="text-xs font-extrabold tracking-widest uppercase block">
                    STUDENT SUCCESS, WORLDWIDE
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-[1.12]">
                    Every future <br />
                    <span style={{ color: 'var(--brand-lime)' }}>starts connected.</span>
                  </h1>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal pt-1">
                    Create your account to access everything you need. Choose your role and join our learning community.
                  </p>
                </div>

                <div className="space-y-3.5 pt-2 border-t border-slate-800/80">
                  {[
                    { title: 'Smart Learning', desc: 'Learn. Grow. Succeed.', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></> },
                    { title: 'Secure & Trusted', desc: 'Your data is safe with us.', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> },
                    { title: 'Global Community', desc: 'Connect and learn worldwide.', icon: <><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></> },
                    { title: 'Better Outcomes', desc: 'Track your progress and achieve more.', icon: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></> },
                  ].map((f) => (
                    <div key={f.title} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                        <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2">{f.icon}</svg>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{f.title}</h4>
                        <p className="text-[11px] text-slate-400">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
                  <div className="flex -space-x-2 overflow-hidden shrink-0">
                    {[AVATAR_1, AVATAR_2, AVATAR_3, AVATAR_4].map((src, i) => (
                      <img key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover" src={src} alt={`Learner ${i + 1}`} />
                    ))}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span style={{ color: 'var(--brand-lime)' }} className="font-extrabold text-sm">21,500+</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">learners already connected</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl backdrop-blur-xl" style={{ backgroundColor: 'var(--bg-card)' }}>
                  <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 mb-2">
                      <svg className="w-6 h-6 sync-icon" viewBox="0 0 24 24" strokeWidth="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" />
                        <line x1="20" y1="8" x2="20" y2="14" /><line x1="17" y1="11" x2="23" y2="11" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-extrabold text-white">Create your account</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Join Bright Future School and start your journey</p>
                  </div>

                  {/* Step Badges */}
                  <div className="relative mb-8 max-w-xl mx-auto px-2">
                    <div className="absolute top-4 left-6 right-6 h-[2px] bg-slate-800 -z-0"></div>
                    <div className="flex justify-between items-center relative z-10">
                      {['Account Info', 'Personal Info', 'Contact Info', 'Review'].map((label, idx) => {
                        const stepNum = idx + 1;
                        const isDone = stepNum < registerStep;
                        const isCurrent = stepNum === registerStep;
                        return (
                          <div key={label} onClick={() => setRegisterStep(stepNum)} className="flex flex-col items-center cursor-pointer group">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                              isDone ? 'bg-lime-500/20 border-2 border-lime-500 text-lime-400'
                              : isCurrent ? 'border-2 border-lime-500 bg-slate-950 text-lime-400'
                              : 'border-2 border-slate-800 bg-slate-950 text-slate-400'
                            }`}>
                              {isDone ? <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> : stepNum}
                            </div>
                            <span className={`text-[11px] font-semibold mt-1.5 transition ${isDone || isCurrent ? 'text-lime-400' : 'text-slate-400'}`}>{label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* STEP 1: Account Info */}
                  {registerStep === 1 && (
                    <div>
                      <h3 className="text-sm font-bold text-white mb-4">Account Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                        <RegField label="Full Name" value={reg.fullName} onChange={(v) => updateReg('fullName', v)} placeholder="Enter your full name"
                                  icon={<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>} />
                        <RegField label="Email Address" type="email" value={reg.email} onChange={(v) => updateReg('email', v)} placeholder="Enter your email address"
                                  icon={<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>} />
                        <RegPasswordField label="Create Password" value={reg.password} onChange={(v) => updateReg('password', v)}
                                          show={showRegPassword} onToggle={() => setShowRegPassword((v) => !v)} placeholder="Create a strong password" />
                        <RegPasswordField label="Confirm Password" value={reg.confirmPassword} onChange={(v) => updateReg('confirmPassword', v)}
                                          show={showRegConfirmPassword} onToggle={() => setShowRegConfirmPassword((v) => !v)} placeholder="Confirm your password" />
                      </div>

                      <p className="text-[11px] text-slate-500 mb-6">Min. 8 characters with letters, numbers & symbols</p>

                      <h3 className="text-xs font-bold text-slate-300 mb-3">Select Your Role</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                        {ROLES.map((role) => {
                          const isSelected = selectedRole === role;
                          const meta = ROLE_META[role];
                          return (
                            <div key={role} onClick={() => setSelectedRole(role)}
                                 className={`p-3.5 rounded-2xl border transition cursor-pointer flex flex-col items-center text-center relative ${isSelected ? 'role-card-selected border-slate-800' : 'border-slate-800 bg-slate-950/50 hover:border-slate-600'}`}>
                              <div className={`absolute top-2.5 right-2.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-lime-500' : 'border-slate-700'}`}>
                                <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-lime-500' : 'bg-transparent'}`}></div>
                              </div>
                              <div className={`w-9 h-9 rounded-full ${meta.roleDot} flex items-center justify-center my-1`}>
                                <svg className="w-5 h-5 sync-icon" viewBox="0 0 24 24" strokeWidth="1.8">{ROLE_ICON_PATHS[role]}</svg>
                              </div>
                              <h4 className="text-xs font-bold text-white mt-1">{role}</h4>
                              <p className="text-[10px] text-slate-400 mt-1 leading-tight">{meta.desc}</p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-2 mb-6">
                        <input type="checkbox" id="regTerms" checked={reg.agreeTerms} onChange={(e) => updateReg('agreeTerms', e.target.checked)} className="w-4 h-4 rounded border-slate-700 text-lime-500 focus:ring-0 cursor-pointer accent-lime-500" />
                        <label htmlFor="regTerms" className="text-xs text-slate-300 font-medium select-none">
                          I agree to the <a href="#" onClick={(e) => { e.preventDefault(); notify('Terms of Service'); }} style={{ color: 'var(--brand-lime)' }} className="hover:underline cursor-pointer">Terms of Service</a> and <a href="#" onClick={(e) => { e.preventDefault(); notify('Privacy Policy'); }} style={{ color: 'var(--brand-lime)' }} className="hover:underline cursor-pointer">Privacy Policy</a>
                        </label>
                      </div>

                      <button onClick={() => navigateTo('register-2')} style={{ backgroundColor: 'var(--brand-lime)' }} className="w-full py-3 px-4 rounded-xl text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition shadow-md cursor-pointer">
                        Next
                        <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                      </button>
                    </div>
                  )}

                  {/* STEP 2: Personal Info */}
                  {registerStep === 2 && (
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">Personal Information</h3>
                      <p className="text-xs text-slate-400 mb-5">Please provide your personal details.</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <RegField label="Date of Birth" value={reg.dob} onChange={(v) => updateReg('dob', v)} placeholder="Select your date of birth"
                                  icon={<><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>} />
                        <RegSelect label="Gender" value={reg.gender} onChange={(v) => updateReg('gender', v)} options={['Male', 'Female', 'Other']} />
                        <RegSelect label="Nationality" value={reg.nationality} onChange={(v) => updateReg('nationality', v)} options={['Pakistani', 'American', 'British', 'Canadian']} />
                        <RegField label="Address" value={reg.address} onChange={(v) => updateReg('address', v)} placeholder="Enter your full address"
                                  icon={<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>} />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <RegField label="City" value={reg.city} onChange={(v) => updateReg('city', v)} placeholder="Enter your city"
                                  icon={<rect x="4" y="2" width="16" height="20" rx="2" ry="2" />} />
                        <RegField label="State / Province" value={reg.state} onChange={(v) => updateReg('state', v)} placeholder="Enter state / province"
                                  icon={<><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-3" /></>} />
                        <RegField label="Postal Code" value={reg.postalCode} onChange={(v) => updateReg('postalCode', v)} placeholder="Enter postal code"
                                  icon={<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M6 8h12" /></>} />
                      </div>

                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Profile Picture <span className="text-slate-500 font-normal">(Optional)</span></label>
                      <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-slate-800 hover:border-slate-600 rounded-2xl p-4 bg-slate-950/40 hover:bg-slate-950/80 transition cursor-pointer flex items-center justify-between gap-4 mb-6 group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-lime-400 transition">
                            <svg className="w-5 h-5 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-white">Click to upload</span>
                            <span className="text-xs text-slate-400"> or drag and drop</span>
                            <p className="text-[10px] text-slate-500 mt-0.5">JPG, PNG or WEBP (Max. 2MB)</p>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-900 overflow-hidden shrink-0 border border-slate-700 flex items-center justify-center">
                          <img src={reg.profileImage || AVATAR_1} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelected} />
                      </div>

                      <div className="flex items-center gap-3">
                        <button onClick={() => navigateTo('register-1')} className="w-1/3 py-3 px-4 rounded-xl border border-slate-800 hover:border-slate-600 bg-slate-950/60 text-xs font-bold text-white transition flex items-center justify-center gap-2 cursor-pointer">
                          <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                          Back
                        </button>
                        <button onClick={() => navigateTo('register-3')} style={{ backgroundColor: 'var(--brand-lime)' }} className="w-2/3 py-3 px-4 rounded-xl text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition shadow-md cursor-pointer">
                          Next
                          <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 mt-4">
                        <svg className="w-3.5 h-3.5 text-lime-400 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 11 12 14 22 4" /></svg>
                        Your information is safe with us and will never be shared.
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Contact Info */}
                  {registerStep === 3 && (
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">Contact Information</h3>
                      <p className="text-xs text-slate-400 mb-5">Please provide your contact details so we can stay in touch with you.</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
                          <div className="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                            <div className="pl-3.5 text-slate-500 text-xs font-medium border-r border-slate-800 pr-2">+92</div>
                            <input type="text" value={reg.phone} onChange={(e) => updateReg('phone', e.target.value)} placeholder="Enter your phone number"
                                   className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Alternate Phone <span className="text-slate-500 font-normal">(Optional)</span></label>
                          <div className="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                            <div className="pl-3.5 text-slate-500 text-xs font-medium border-r border-slate-800 pr-2">+92</div>
                            <input type="text" value={reg.altPhone} onChange={(e) => updateReg('altPhone', e.target.value)} placeholder="Enter alternate phone number"
                                   className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                          </div>
                        </div>
                        <RegField label="Emergency Contact Name (Optional)" value={reg.emergName} onChange={(v) => updateReg('emergName', v)} placeholder="Enter emergency contact name"
                                  icon={<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>} />
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Emergency Contact Number <span className="text-slate-500 font-normal">(Optional)</span></label>
                          <div className="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                            <div className="pl-3.5 text-slate-500 text-xs font-medium border-r border-slate-800 pr-2">+92</div>
                            <input type="text" value={reg.emergPhone} onChange={(e) => updateReg('emergPhone', e.target.value)} placeholder="Enter emergency contact number"
                                   className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
                          </div>
                        </div>
                        <RegField label="Email Address" type="email" value={reg.contactEmail} onChange={(v) => updateReg('contactEmail', v)} placeholder="Confirm your contact email"
                                  icon={<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>} />
                        <RegField label="Alternate Email (Optional)" type="email" value={reg.altEmail} onChange={(v) => updateReg('altEmail', v)} placeholder="Enter alternate email address"
                                  icon={<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>} />
                        <RegSelect label="Preferred Communication Method" value={reg.prefComm} onChange={(v) => updateReg('prefComm', v)} options={['Email', 'SMS / Phone Call', 'WhatsApp']} />
                        <RegSelect label="Best Time to Contact You" value={reg.bestTime} onChange={(v) => updateReg('bestTime', v)}
                                   options={['Evening (6 PM – 9 PM)', 'Morning (9 AM – 12 PM)', 'Afternoon (12 PM – 5 PM)']} />
                      </div>

                      <div className="mb-6">
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Communication Address</label>
                        <div className="relative flex items-start input-focus rounded-xl bg-slate-950/80 border border-slate-800">
                          <div className="pl-3.5 pt-3 text-slate-500">
                            <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          </div>
                          <textarea rows={2} value={reg.commAddress} onChange={(e) => updateReg('commAddress', e.target.value)} placeholder="Enter your communication address"
                                    className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none resize-none" />
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button onClick={() => navigateTo('register-2')} className="w-1/3 py-3 px-4 rounded-xl border border-slate-800 hover:border-slate-600 bg-slate-950/60 text-xs font-bold text-white transition flex items-center justify-center gap-2 cursor-pointer">
                          <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                          Back
                        </button>
                        <button onClick={() => navigateTo('register-4')} style={{ backgroundColor: 'var(--brand-lime)' }} className="w-2/3 py-3 px-4 rounded-xl text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition shadow-md cursor-pointer">
                          Next
                          <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 mt-4">
                        <svg className="w-3.5 h-3.5 text-lime-400 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 11 12 14 22 4" /></svg>
                        Your information is safe with us and will never be shared.
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Review */}
                  {registerStep === 4 && (
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">Review Your Information</h3>
                      <p className="text-xs text-slate-400 mb-5">Please review your details before creating your account.</p>

                      <ReviewCard title="Account Information" onEdit={() => navigateTo('register-1')}
                                  icon={<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <ReviewField label="Full Name" value={reg.fullName} />
                          <ReviewField label="Email Address" value={reg.email} />
                          <div>
                            <span className="text-[10px] text-slate-500 block mb-1">Selected Role</span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-bold">
                              <svg className="w-3 h-3 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /></svg>
                              {selectedRole}
                            </span>
                          </div>
                        </div>
                      </ReviewCard>

                      <ReviewCard title="Personal Information" onEdit={() => navigateTo('register-2')}
                                  icon={<><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>}>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs items-center">
                          <ReviewField label="Date of Birth" value={reg.dob} />
                          <ReviewField label="Gender" value={reg.gender} />
                          <ReviewField label="Nationality" value={reg.nationality} />
                          <div>
                            <span className="text-[10px] text-slate-500 block mb-1">Profile Picture</span>
                            <img src={reg.profileImage || AVATAR_1} alt="Profile" className="w-7 h-7 rounded-full object-cover border border-slate-700" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mt-3">
                          <ReviewField label="Address" value={reg.address} />
                          <ReviewField label="City" value={reg.city} />
                          <ReviewField label="State / Province" value={reg.state} />
                          <ReviewField label="Postal Code" value={reg.postalCode} />
                        </div>
                      </ReviewCard>

                      <ReviewCard title="Contact Information" onEdit={() => navigateTo('register-3')}
                                  icon={<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />}>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-3">
                          <ReviewField label="Phone Number" value={`+92 ${reg.phone}`} />
                          <ReviewField label="Alternate Phone" value={reg.altPhone ? `+92 ${reg.altPhone}` : '—'} />
                          <ReviewField label="Email Address" value={reg.contactEmail} />
                          <ReviewField label="Best Time to Contact" value={reg.bestTime} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <ReviewField label="Preferred Method" value={reg.prefComm} />
                          <ReviewField label="Communication Address" value={reg.commAddress} />
                        </div>
                      </ReviewCard>

                      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3 mb-6">
                        <div className="w-7 h-7 rounded-full bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 shrink-0 mt-0.5">
                          <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        </div>
                        <div className="text-[11px] text-slate-400 leading-relaxed">
                          <span className="text-white font-semibold block mb-0.5">Your information is safe with us and will never be shared.</span>
                          By creating an account, you agree to our <a href="#" style={{ color: 'var(--brand-lime)' }} className="hover:underline">Terms of Service</a> and <a href="#" style={{ color: 'var(--brand-lime)' }} className="hover:underline">Privacy Policy</a>.
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button onClick={() => navigateTo('register-3')} className="w-1/3 py-3 px-4 rounded-xl border border-slate-800 hover:border-slate-600 bg-slate-950/60 text-xs font-bold text-white transition flex items-center justify-center gap-2 cursor-pointer">
                          <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                          Back
                        </button>
                        <button onClick={handleFinalAccountCreation} style={{ backgroundColor: 'var(--brand-lime)' }} className="w-2/3 py-3 px-4 rounded-xl text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition shadow-md cursor-pointer">
                          <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="17" y1="11" x2="23" y2="11" /></svg>
                          Create Account
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 border-t border-slate-800/40 mt-6 z-10">
        <div>&copy; 2025 Bright Future School. All rights reserved.</div>
        <div className="flex items-center gap-4 sm:gap-6">
          <a href="#" onClick={(e) => { e.preventDefault(); notify('Privacy Policy Document'); }} className="hover:text-slate-200 transition cursor-pointer">Privacy Policy</a>
          <span className="text-slate-700">|</span>
          <a href="#" onClick={(e) => { e.preventDefault(); notify('Terms of Service Document'); }} className="hover:text-slate-200 transition cursor-pointer">Terms of Service</a>
          <span className="text-slate-700">|</span>
          <a href="#" onClick={(e) => { e.preventDefault(); notify('Help Center & Support Desk'); }} className="hover:text-slate-200 transition cursor-pointer">Help Center</a>
        </div>
      </footer>

      {/* TOAST */}
      <div className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="px-4 py-3 rounded-2xl bg-slate-900/95 border border-lime-500/50 shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs text-white">
          <div className="w-6 h-6 rounded-full bg-lime-500/20 text-lime-400 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <span>{toast.text}</span>
        </div>
      </div>
    </div>
  );
}

function RegField({ label, value, onChange, placeholder, icon, type = 'text' }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-300 mb-1.5">{label}</label>
      <div className="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
        <div className="pl-3.5 text-slate-500">
          <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2">{icon}</svg>
        </div>
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
               className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
      </div>
    </div>
  );
}

function RegPasswordField({ label, value, onChange, placeholder, show, onToggle }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-300 mb-1.5">{label}</label>
      <div className="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
        <div className="pl-3.5 text-slate-500">
          <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
        </div>
        <input type={show ? 'text' : 'password'} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
               className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none" />
        <button type="button" onClick={onToggle} className="pr-3.5 text-slate-500 hover:text-slate-300 cursor-pointer">
          {show ? (
            <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
          ) : (
            <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
          )}
        </button>
      </div>
    </div>
  );
}

function RegSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-300 mb-1.5">{label}</label>
      <div className="relative flex items-center input-focus rounded-xl bg-slate-950/80 border border-slate-800">
        <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent px-3 py-2.5 text-xs text-white focus:outline-none cursor-pointer">
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-slate-900 text-white">{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function ReviewCard({ title, icon, onEdit, children }) {
  return (
    <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/50 mb-4 relative">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400">
            <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2">{icon}</svg>
          </div>
          <h4 className="text-xs font-bold text-white">{title}</h4>
        </div>
        <button onClick={onEdit} style={{ color: 'var(--brand-lime)' }} className="text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer">
          Edit
          <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
        </button>
      </div>
      {children}
    </div>
  );
}

function ReviewField({ label, value }) {
  return (
    <div>
      <span className="text-[10px] text-slate-500 block">{label}</span>
      <span className="font-semibold text-white truncate block">{value}</span>
    </div>
  );
}
