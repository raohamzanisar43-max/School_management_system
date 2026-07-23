import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState(null); // 'STUDENT' | 'TEACHER' | 'ADMIN' | 'PARENT' | null
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Theme state: 'dark' | 'light' | 'night'
  const [theme, setTheme] = useState('dark');
  const [toastText, setToastText] = useState(null);

  // Sync theme with Document attributes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark' || theme === 'night') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleNextTheme = () => {
    const themes = ['dark', 'light', 'night'];
    const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme);
    showNotification(`Switched to ${nextTheme.toUpperCase()} mode.`);
  };

  const showNotification = (msg) => {
    setToastText(msg);
  };

  // Clear toast notification after timeout
  useEffect(() => {
    if (toastText) {
      const timer = setTimeout(() => {
        setToastText(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastText]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      showNotification("Signed in successfully!");
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (role) => {
    setError('');
    setLoading(true);
    let demoUsername = '';
    const demoPassword = 'adminpassword';

    if (role === 'ADMIN') demoUsername = 'admin';
    else if (role === 'TEACHER') demoUsername = 'teacher_ahmed';
    else if (role === 'STUDENT') demoUsername = 'student_zayd';
    else if (role === 'PARENT') demoUsername = 'parent_ahmed';

    try {
      await login(demoUsername, demoPassword);
      showNotification(`Demo ${role} Portal Connected!`);
    } catch (err) {
      setError('Failed to log in with demo credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Theme specs based on selected role
  const getThemeSpecs = () => {
    if (selectedRole === 'STUDENT') return {
      badgeText: 'text-lime-400',
      badgeBg: 'bg-lime-500/10 border-lime-500/30',
      borderFocus: 'focus:border-lime-500/80 focus:ring-lime-500/20',
      btn: 'bg-lime-600 hover:bg-lime-500 text-slate-950 focus:ring-lime-500',
      iconColor: 'text-lime-400'
    };
    if (selectedRole === 'ADMIN') return {
      badgeText: 'text-blue-400',
      badgeBg: 'bg-blue-500/10 border-blue-500/30',
      borderFocus: 'focus:border-blue-500/80 focus:ring-blue-500/20',
      btn: 'bg-blue-600 hover:bg-blue-500 text-white focus:ring-blue-500',
      iconColor: 'text-blue-400'
    };
    if (selectedRole === 'TEACHER') return {
      badgeText: 'text-purple-400',
      badgeBg: 'bg-purple-500/10 border-purple-500/30',
      borderFocus: 'focus:border-purple-500/80 focus:ring-purple-500/20',
      btn: 'bg-purple-600 hover:bg-purple-500 text-white focus:ring-purple-500',
      iconColor: 'text-purple-400'
    };
    if (selectedRole === 'PARENT') return {
      badgeText: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 border-amber-500/30',
      borderFocus: 'focus:border-amber-500/80 focus:ring-amber-500/20',
      btn: 'bg-amber-600 hover:bg-amber-500 text-slate-950 focus:ring-amber-500',
      iconColor: 'text-amber-400'
    };
    return {
      badgeText: 'text-lime-400',
      badgeBg: 'bg-lime-500/10 border-lime-500/30',
      borderFocus: 'focus:border-lime-500/80 focus:ring-lime-500/20',
      btn: 'bg-lime-600 hover:bg-lime-500 text-slate-950 focus:ring-lime-500',
      iconColor: 'text-lime-400'
    };
  };

  const specs = getThemeSpecs();

  return (
    <div className="min-h-screen bg-grid-pattern flex flex-col justify-between selection:bg-lime-500/20 selection:text-lime-400 relative overflow-hidden">
      
      {/* Dynamic Theme Styles Injection */}
      <style>{`
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

        [data-theme="light"] {
          --bg-page: #f1f5f9;
          --bg-card: #ffffff;
          --bg-card-inner: #f8fafc;
          --border-color: #e2e8f0;
          --border-subtle: rgba(15, 23, 42, 0.08);

          --text-main: #0f172a;
          --text-muted: #475569;
          --text-subtle: #64748b;

          --brand-lime: #4d7c0f;
          --brand-lime-hover: #3f6212;
          --brand-lime-glow: rgba(77, 124, 15, 0.15);
          --grid-line: rgba(15, 23, 42, 0.04);
        }

        [data-theme="night"] {
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

        body {
          background-color: var(--bg-page);
          color: var(--text-main);
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        [data-theme="light"] body {
          background-color: var(--bg-page);
          color: var(--text-main);
        }

        [data-theme="light"] .text-white {
          color: #0f172a !important;
        }

        [data-theme="light"] .text-slate-200,
        [data-theme="light"] .text-slate-300 {
          color: #334155 !important;
        }

        [data-theme="light"] .text-slate-400 {
          color: #475569 !important;
        }

        [data-theme="light"] .text-slate-500 {
          color: #64748b !important;
        }

        [data-theme="light"] .bg-slate-900,
        [data-theme="light"] .bg-slate-950,
        [data-theme="light"] .bg-slate-900\/80,
        [data-theme="light"] .bg-slate-950\/80,
        [data-theme="light"] .bg-slate-950\/60,
        [data-theme="light"] .bg-slate-950\/50,
        [data-theme="light"] .bg-slate-950\/40 {
          background-color: #ffffff !important;
        }

        [data-theme="light"] .border-slate-800,
        [data-theme="light"] .border-slate-800\/80,
        [data-theme="light"] .border-slate-800\/90,
        [data-theme="light"] .border-slate-700\/80,
        [data-theme="light"] .border-slate-700\/60 {
          border-color: #e2e8f0 !important;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        svg.sync-icon {
          color: currentColor;
          fill: none;
          stroke: currentColor;
        }
      `}</style>

      {/* HEADER LOGO SECTION */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-5 flex items-center justify-between z-20">
        
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-3 group" onClick={(e) => { e.preventDefault(); setSelectedRole(null); }}>
          <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white/5 border border-slate-700/60 dark:border-white/15 flex items-center justify-center p-2 shadow-sm group-hover:border-lime-500/50 transition">
            <svg className="w-6 h-6 text-white sync-icon" viewBox="0 0 24 24" strokeWidth="1.8">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/>
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

        {/* Header Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden sm:inline text-xs text-slate-400 font-medium">New here?</span>
          
          <button 
            onClick={() => showNotification("Registration feature is coming soon!")}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-700/80 hover:border-lime-400 text-xs font-bold text-white hover:text-lime-400 transition-all flex items-center gap-2 bg-slate-900/60 hover:bg-lime-500/10 cursor-pointer"
          >
            <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="8.5" cy="7" r="4"/>
              <line x1="20" y1="8" x2="20" y2="14"/>
              <line x1="17" y1="11" x2="23" y2="11"/>
            </svg>
            <span>Create account</span>
          </button>

          {/* Theme Switcher */}
          <button 
            onClick={toggleNextTheme} 
            title="Toggle Theme (Dark / Light / OLED)" 
            className="w-9 h-9 rounded-xl border border-slate-700/80 hover:border-slate-500 bg-slate-900/80 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
          >
            {theme === 'dark' && (
              <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
            {theme === 'light' && (
              <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            )}
            {theme === 'night' && (
              <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-2 sm:py-4 flex-1 flex items-center z-10">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full min-h-[75vh]">
          
          {/* Left Hero Column */}
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

            {/* Feature Bullets Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 mb-2">
                  <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                  </svg>
                </div>
                <h4 className="text-xs font-bold text-white">Global Community</h4>
                <p className="text-[11px] text-slate-400">Connect worldwide</p>
              </div>

              <div className="space-y-1">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 mb-2">
                  <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                </div>
                <h4 className="text-xs font-bold text-white">Smart Learning</h4>
                <p className="text-[11px] text-slate-400">Learn. Grow. Succeed.</p>
              </div>

              <div className="space-y-1">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 mb-2">
                  <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h4 className="text-xs font-bold text-white">Secure & Trusted</h4>
                <p className="text-[11px] text-slate-400">Your data is safe</p>
              </div>

              <div className="space-y-1">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 mb-2">
                  <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                  </svg>
                </div>
                <h4 className="text-xs font-bold text-white">Better Outcomes</h4>
                <p className="text-[11px] text-slate-400">Track your progress</p>
              </div>
            </div>

            {/* Learners Badge */}
            <div className="pt-2 flex items-center gap-3">
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Student 1" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Student 2" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Student 3" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Student 4" />
              </div>
              <div className="text-xs text-slate-400">
                <span style={{ color: 'var(--brand-lime)' }} className="font-extrabold text-sm">21,500+</span> learners already connected
              </div>
            </div>
          </div>

          {/* Right Portal Grid / Form Container */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-6 sm:p-8 border border-slate-800/90 backdrop-blur-xl shadow-2xl relative transition-all duration-300 min-h-[500px] flex flex-col justify-between" style={{ backgroundColor: 'var(--bg-card)' }}>
              
              {selectedRole === null ? (
                /* CHOOSE PORTAL CARD GRID */
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span style={{ color: 'var(--brand-lime)' }} className="text-[11px] font-extrabold tracking-widest uppercase block mb-1">
                      WELCOME BACK
                    </span>
                    <h2 className="text-2xl font-extrabold text-white">Choose your portal</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Select your role to sign in to your account</p>
                  </div>

                  {/* 2x2 Portals Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto">
                    
                    {/* Student Portal Card */}
                    <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/50 hover:border-lime-500/50 transition flex flex-col items-center text-center group">
                      <div className="w-12 h-12 rounded-full bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 mb-3 group-hover:scale-105 transition">
                        <svg className="w-6 h-6 sync-icon" viewBox="0 0 24 24" strokeWidth="1.8">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                          <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/>
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold text-lime-400 mb-1">Student Portal</h3>
                      <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                        Access your classes, assignments, results, timetable and more.
                      </p>
                      <button 
                        onClick={() => { setSelectedRole('STUDENT'); setUsername(''); setPassword(''); setError(''); }}
                        className="mt-auto w-full py-2 px-4 rounded-xl border border-lime-500/40 hover:border-lime-400 text-xs font-semibold text-lime-400 hover:bg-lime-500/10 transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Sign in
                        <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </button>
                    </div>

                    {/* Admin Portal Card */}
                    <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/50 hover:border-blue-500/50 transition flex flex-col items-center text-center group">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-105 transition">
                        <svg className="w-6 h-6 sync-icon" viewBox="0 0 24 24" stroke-width="1.8">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                          <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold text-blue-400 mb-1">Admin Portal</h3>
                      <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                        Manage users, academics, reports and system settings.
                      </p>
                      <button 
                        onClick={() => { setSelectedRole('ADMIN'); setUsername(''); setPassword(''); setError(''); }}
                        className="mt-auto w-full py-2 px-4 rounded-xl border border-blue-500/40 hover:border-blue-400 text-xs font-semibold text-blue-400 hover:bg-blue-500/10 transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Sign in
                        <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </button>
                    </div>

                    {/* Teacher Portal Card */}
                    <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/50 hover:border-purple-500/50 transition flex flex-col items-center text-center group">
                      <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-105 transition">
                        <svg className="w-6 h-6 sync-icon" viewBox="0 0 24 24" stroke-width="1.8">
                          <rect x="2" y="3" width="20" height="12" rx="2"/>
                          <circle cx="12" cy="19" r="2"/>
                          <path d="M12 9v4"/>
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold text-purple-400 mb-1">Teacher Portal</h3>
                      <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                        Manage classes, students, assignments and evaluations.
                      </p>
                      <button 
                        onClick={() => { setSelectedRole('TEACHER'); setUsername(''); setPassword(''); setError(''); }}
                        className="mt-auto w-full py-2 px-4 rounded-xl border border-purple-500/40 hover:border-purple-400 text-xs font-semibold text-purple-400 hover:bg-purple-500/10 transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Sign in
                        <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </button>
                    </div>

                    {/* Parent Portal Card */}
                    <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/50 hover:border-amber-500/50 transition flex flex-col items-center text-center group">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition">
                        <svg className="w-6 h-6 sync-icon" viewBox="0 0 24 24" stroke-width="1.8">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold text-amber-400 mb-1">Parent Portal</h3>
                      <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                        Track your child's progress, attendance, fees and more.
                      </p>
                      <button 
                        onClick={() => { setSelectedRole('PARENT'); setUsername(''); setPassword(''); setError(''); }}
                        className="mt-auto w-full py-2 px-4 rounded-xl border border-amber-500/40 hover:border-amber-400 text-xs font-semibold text-amber-400 hover:bg-amber-500/10 transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Sign in
                        <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </button>
                    </div>

                  </div>

                  {/* Divider & Create Account Button */}
                  <div className="space-y-4">
                    <div className="relative my-4 text-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-800"></div>
                      </div>
                      <span className="relative px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase" style={{ backgroundColor: 'var(--bg-card)' }}>OR</span>
                    </div>

                    <button 
                      onClick={() => showNotification("Registrations are closed on this instance.")}
                      className="w-full py-3 px-4 rounded-xl border border-slate-700/80 hover:border-slate-500 bg-slate-950/60 hover:bg-slate-900 text-xs font-bold text-white transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/>
                        <line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/>
                      </svg>
                      Create account
                    </button>

                    <div className="text-center text-xs text-slate-400">
                      Don't have an account? 
                      <button onClick={() => showNotification("Please contact admin for registrations.")} style={{ color: 'var(--brand-lime)' }} className="font-bold hover:underline ml-1 cursor-pointer">Sign up</button>
                    </div>
                  </div>
                </div>
              ) : (
                /* DETAILED SIGN IN FORM VIEW */
                <div className="space-y-6 flex-1 flex flex-col justify-between animate-fade-in">
                  
                  {/* Back button */}
                  <div>
                    <button 
                      onClick={() => { setSelectedRole(null); setError(''); }}
                      className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer"
                    >
                      <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                      Back to portals
                    </button>
                  </div>

                  <div>
                    <span className={`text-[11px] font-extrabold tracking-widest uppercase block mb-1 ${specs.badgeText}`}>
                      PORTAL SIGN IN
                    </span>
                    <h2 className="text-2xl font-extrabold text-white">
                      {selectedRole.charAt(0) + selectedRole.slice(1).toLowerCase()} Login
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">Please provide your credentials below.</p>
                  </div>

                  <form className="space-y-5 my-auto" onSubmit={handleSubmit}>
                    {error && (
                      <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-xs p-3.5 rounded-xl">
                        {error}
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Username field */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Username
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                            <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                            </svg>
                          </div>
                          <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={`Enter ${selectedRole.toLowerCase()} username`}
                            className={`block w-full pl-10 pr-3 py-3 border border-slate-800 rounded-xl bg-slate-950/60 text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all text-xs ${specs.borderFocus}`}
                          />
                        </div>
                      </div>

                      {/* Password field */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                            <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                          </div>
                          <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className={`block w-full pl-10 pr-3 py-3 border border-slate-800 rounded-xl bg-slate-950/60 text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all text-xs ${specs.borderFocus}`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50 ${specs.btn}`}
                      >
                        {loading ? 'Verifying...' : 'Sign In'}
                      </button>
                    </div>
                  </form>

                  {/* Demo sign in footer */}
                  <div className="mt-4 pt-6 border-t border-slate-800/80 text-center">
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin(selectedRole)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl text-[10px] font-bold transition cursor-pointer`}
                    >
                      <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                      Quick Demo Sign-In
                    </button>
                    <p className="text-[9px] text-slate-600 mt-2">
                      Demo accounts pre-seeded with fallback database credentials.
                    </p>
                  </div>

                </div>
              )}

            </div>
          </div>

        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 border-t border-slate-800/40 mt-6 z-10">
        <div>
          © 2025 Bright Future School. All rights reserved.
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button onClick={() => showNotification('Privacy Policy Document')} className="hover:text-slate-200 transition cursor-pointer">Privacy Policy</button>
          <span className="text-slate-700">|</span>
          <button onClick={() => showNotification('Terms of Service Document')} className="hover:text-slate-200 transition cursor-pointer">Terms of Service</button>
          <span className="text-slate-700">|</span>
          <button onClick={() => showNotification('Help Center & Support Desk')} className="hover:text-slate-200 transition cursor-pointer">Help Center</button>
        </div>
      </footer>

      {/* Notification Toast */}
      {toastText && (
        <div id="toastNotification" className="fixed bottom-6 right-6 z-50 transform translate-y-0 opacity-100 transition-all duration-300">
          <div className="px-4 py-3 rounded-2xl bg-slate-900/95 border border-lime-500/50 shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs text-white">
            <div className="w-6 h-6 rounded-full bg-lime-500/20 text-lime-400 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span>{toastText}</span>
          </div>
        </div>
      )}

    </div>
  );
}
