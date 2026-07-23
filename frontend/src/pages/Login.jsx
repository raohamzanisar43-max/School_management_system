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

  // Color schemes dynamically styled based on role
  const getThemeSpecs = () => {
    if (selectedRole === 'STUDENT') return {
      accentText: 'text-lime-400',
      accentBg: 'bg-lime-500',
      borderFocus: 'focus:border-lime-500/80 focus:ring-lime-500/20',
      btnBg: 'bg-lime-500 hover:bg-lime-400 text-slate-950 focus:ring-lime-500',
      badgeBg: 'bg-lime-500/10 border-lime-500/30 text-lime-400',
      iconCircle: 'border-lime-500 text-lime-400 bg-lime-500/5'
    };
    if (selectedRole === 'ADMIN') return {
      accentText: 'text-blue-400',
      accentBg: 'bg-blue-500',
      borderFocus: 'focus:border-blue-500/80 focus:ring-blue-500/20',
      btnBg: 'bg-blue-500 hover:bg-blue-400 text-white focus:ring-blue-500',
      badgeBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      iconCircle: 'border-blue-500 text-blue-400 bg-blue-500/5'
    };
    if (selectedRole === 'TEACHER') return {
      accentText: 'text-purple-400',
      accentBg: 'bg-purple-500',
      borderFocus: 'focus:border-purple-500/80 focus:ring-purple-500/20',
      btnBg: 'bg-purple-500 hover:bg-purple-400 text-white focus:ring-purple-500',
      badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
      iconCircle: 'border-purple-500 text-purple-400 bg-purple-500/5'
    };
    if (selectedRole === 'PARENT') return {
      accentText: 'text-amber-400',
      accentBg: 'bg-amber-500',
      borderFocus: 'focus:border-amber-500/80 focus:ring-amber-500/20',
      btnBg: 'bg-amber-500 hover:bg-amber-400 text-slate-950 focus:ring-amber-500',
      badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
      iconCircle: 'border-amber-500 text-amber-400 bg-amber-500/5'
    };
    return {
      accentText: 'text-lime-400',
      accentBg: 'bg-lime-500',
      borderFocus: 'focus:border-lime-500/80 focus:ring-lime-500/20',
      btnBg: 'bg-lime-500 hover:bg-lime-400 text-slate-950 focus:ring-lime-500',
      badgeBg: 'bg-lime-500/10 border-lime-500/30 text-lime-400',
      iconCircle: 'border-lime-500 text-lime-400 bg-lime-500/5'
    };
  };

  const specs = getThemeSpecs();

  return (
    <div className="min-h-screen bg-grid-pattern flex flex-col justify-between selection:bg-lime-500/20 selection:text-lime-400 relative overflow-hidden">
      
      {/* Dynamic Theme Styles Injection */}
      <style>{`
        :root {
          --bg-page: #05070a;
          --bg-card: #0b101d;
          --bg-card-inner: #05070b;
          --border-color: #182030;
          --border-subtle: rgba(24, 32, 48, 0.6);

          --text-main: #ffffff;
          --text-muted: #94a3b8;
          --text-subtle: #64748b;

          --brand-lime: #82e612;
          --brand-lime-glow: rgba(130, 230, 18, 0.15);
          --grid-line: rgba(255, 255, 255, 0.025);
        }

        [data-theme="light"] {
          --bg-page: #f8fafc;
          --bg-card: #ffffff;
          --bg-card-inner: #ffffff;
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
          --bg-card-inner: #050505;
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
          background-color: var(--bg-page) !important;
          color: var(--text-main) !important;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .text-theme-main {
          color: var(--text-main);
        }

        .text-theme-muted {
          color: var(--text-muted);
        }

        .border-theme {
          border-color: var(--border-color);
        }

        .bg-theme-card-inner {
          background-color: var(--bg-card-inner);
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
          <div className="w-10 h-10 rounded-xl bg-theme-card-inner border border-theme flex items-center justify-center p-2 shadow-sm group-hover:border-lime-500/50 transition">
            <svg className="w-6 h-6 text-theme-main sync-icon" viewBox="0 0 24 24" strokeWidth="1.8">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/>
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

        {/* Header Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden sm:inline text-xs text-theme-muted font-medium">New here?</span>
          
          <button 
            onClick={() => showNotification("Registrations are closed.")}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-theme text-xs font-bold text-theme-main hover:text-lime-400 transition-all flex items-center gap-2 bg-theme-card-inner hover:bg-lime-500/10 cursor-pointer"
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
            className="w-9 h-9 rounded-xl border border-theme bg-theme-card-inner flex items-center justify-center text-theme-muted hover:text-theme-main transition cursor-pointer"
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
            
            {/* Conditional Sub-text / Header */}
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

            {/* Feature Bullets List */}
            {selectedRole === null ? (
              /* Grid Layout (Default) */
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-theme">
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-theme-card-inner border border-theme flex items-center justify-center text-theme-main mb-2">
                    <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                    </svg>
                  </div>
                  <h4 className="text-xs font-bold text-theme-main">Global Community</h4>
                  <p className="text-[11px] text-theme-muted">Connect worldwide</p>
                </div>

                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-theme-card-inner border border-theme flex items-center justify-center text-theme-main mb-2">
                    <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                  </div>
                  <h4 className="text-xs font-bold text-theme-main">Smart Learning</h4>
                  <p className="text-[11px] text-theme-muted">Learn. Grow. Succeed.</p>
                </div>

                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-theme-card-inner border border-theme flex items-center justify-center text-theme-main mb-2">
                    <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <h4 className="text-xs font-bold text-theme-main">Secure & Trusted</h4>
                  <p className="text-[11px] text-theme-muted">Your data is safe</p>
                </div>

                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-theme-card-inner border border-theme flex items-center justify-center text-theme-main mb-2">
                    <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                    </svg>
                  </div>
                  <h4 className="text-xs font-bold text-theme-main">Better Outcomes</h4>
                  <p className="text-[11px] text-theme-muted">Track your progress</p>
                </div>
              </div>
            ) : (
              /* Vertical List (Credentials Mode) */
              <div className="space-y-4 pt-4 border-t border-theme">
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full border ${specs.iconCircle} flex items-center justify-center text-xs shrink-0`}>
                    <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-theme-main">Smart Learning</h4>
                    <p className="text-[11px] text-theme-muted mt-0.5">Personalized education for a better future.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full border ${specs.iconCircle} flex items-center justify-center text-xs shrink-0`}>
                    <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-theme-main">Secure & Trusted</h4>
                    <p className="text-[11px] text-theme-muted mt-0.5">Your data is protected with top security.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full border ${specs.iconCircle} flex items-center justify-center text-xs shrink-0`}>
                    <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-theme-main">Global Community</h4>
                    <p className="text-[11px] text-theme-muted mt-0.5">Connect, learn and grow together worldwide.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Learners circular badge or Illustration block */}
            {selectedRole === null ? (
              /* Learners Badge (Default) */
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
              /* Custom CSS SVG-drawn School Night Illustration */
              <div className="w-full h-48 rounded-2xl bg-gradient-to-b from-slate-950 to-indigo-950/40 border border-theme relative overflow-hidden flex items-end justify-center pt-8">
                {/* Stars */}
                <div className="absolute top-4 left-6 w-1 h-1 bg-white rounded-full opacity-60"></div>
                <div className="absolute top-10 right-12 w-1.5 h-1.5 bg-white rounded-full opacity-45"></div>
                <div className="absolute top-16 left-1/3 w-1 h-1 bg-white rounded-full opacity-80"></div>
                <div className="absolute top-8 right-1/4 w-1 h-1 bg-white rounded-full opacity-50"></div>
                
                {/* Moon */}
                <div className="absolute top-4 right-10 w-6 h-6 bg-amber-200/20 rounded-full blur-[1px] flex items-center justify-center">
                  <div className="w-4 h-4 bg-amber-100 rounded-full"></div>
                </div>

                {/* Glow */}
                <div className="absolute bottom-0 right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>

                {/* Buildings Silhouettes */}
                <div className="w-full flex items-end justify-center px-8 gap-3 relative z-10">
                  {/* Left Building */}
                  <div className="w-14 h-16 bg-slate-950 border-t border-x border-slate-900 rounded-t-lg flex flex-col justify-around py-2.5 px-2">
                    <div className="flex gap-1 justify-center">
                      <div className="w-2 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div>
                      <div className="w-2 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div>
                    </div>
                    <div className="flex gap-1 justify-center">
                      <div className="w-2 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div>
                      <div className="w-2 h-3 bg-slate-900 rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* Middle Main Building */}
                  <div className="w-20 h-24 bg-slate-950 border-t border-x border-slate-900 rounded-t-xl flex flex-col justify-between py-3 px-2.5 relative">
                    <div className="w-5 h-5 bg-slate-900 border border-slate-800 rounded-full absolute -top-2.5 left-7.5 flex items-center justify-center text-[7px] text-slate-500">⏰</div>
                    <div className="flex gap-1.5 justify-center">
                      <div className="w-2.5 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div>
                      <div className="w-2.5 h-3 bg-slate-900 rounded-sm"></div>
                      <div className="w-2.5 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div>
                    </div>
                    <div className="flex gap-1.5 justify-center">
                      <div className="w-2.5 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div>
                      <div className="w-2.5 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div>
                      <div className="w-2.5 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div>
                    </div>
                    <div className="w-5 h-7 bg-slate-900 rounded-t-md mx-auto border-t border-x border-slate-800"></div>
                  </div>

                  {/* Right Building */}
                  <div className="w-14 h-18 bg-slate-950 border-t border-x border-slate-900 rounded-t-lg flex flex-col justify-around py-2.5 px-2">
                    <div className="flex gap-1 justify-center">
                      <div className="w-2 h-3 bg-slate-900 rounded-sm"></div>
                      <div className="w-2 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div>
                    </div>
                    <div className="flex gap-1 justify-center">
                      <div className="w-2 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div>
                      <div className="w-2 h-3 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]"></div>
                    </div>
                  </div>
                </div>

                {/* Avatar Overlay inside illustration */}
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

          {/* Right Portal Grid / Form Container */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-6 sm:p-8 border border-theme shadow-2xl relative transition-all duration-300 min-h-[500px] flex flex-col justify-between" style={{ backgroundColor: 'var(--bg-card)' }}>
              
              {selectedRole === null ? (
                /* CHOOSE PORTAL CARD GRID */
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span style={{ color: 'var(--brand-lime)' }} className="text-[11px] font-extrabold tracking-widest uppercase block mb-1">
                      WELCOME BACK
                    </span>
                    <h2 className="text-2xl font-extrabold text-theme-main">Choose your portal</h2>
                    <p className="text-xs text-theme-muted mt-0.5">Select your role to sign in to your account</p>
                  </div>

                  {/* 2x2 Portals Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto">
                    
                    {/* Student Portal Card */}
                    <div className="p-5 rounded-2xl border border-theme bg-theme-card-inner hover:border-lime-500/50 transition flex flex-col items-center text-center group">
                      <div className="w-12 h-12 rounded-full bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 mb-3 group-hover:scale-105 transition">
                        <svg className="w-6 h-6 sync-icon" viewBox="0 0 24 24" stroke-width="1.8">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                          <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/>
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold text-lime-400 mb-1">Student Portal</h3>
                      <p className="text-[11px] text-theme-muted mb-4 leading-relaxed">
                        Access your classes, assignments, results, timetable and more.
                      </p>
                      <button 
                        onClick={() => { setSelectedRole('STUDENT'); setUsername(''); setPassword(''); setError(''); }}
                        className="mt-auto w-full py-2 px-4 rounded-xl border border-lime-500/40 hover:border-lime-400 text-xs font-semibold text-lime-400 hover:bg-lime-500/10 transition flex items-center justify-center gap-1.5 cursor-pointer bg-transparent"
                      >
                        Sign in
                        <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </button>
                    </div>

                    {/* Admin Portal Card */}
                    <div className="p-5 rounded-2xl border border-theme bg-theme-card-inner hover:border-blue-500/50 transition flex flex-col items-center text-center group">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-105 transition">
                        <svg className="w-6 h-6 sync-icon" viewBox="0 0 24 24" stroke-width="1.8">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                          <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold text-blue-400 mb-1">Admin Portal</h3>
                      <p className="text-[11px] text-theme-muted mb-4 leading-relaxed">
                        Manage users, academics, reports and system settings.
                      </p>
                      <button 
                        onClick={() => { setSelectedRole('ADMIN'); setUsername(''); setPassword(''); setError(''); }}
                        className="mt-auto w-full py-2 px-4 rounded-xl border border-blue-500/40 hover:border-blue-400 text-xs font-semibold text-blue-400 hover:bg-blue-500/10 transition flex items-center justify-center gap-1.5 cursor-pointer bg-transparent"
                      >
                        Sign in
                        <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </button>
                    </div>

                    {/* Teacher Portal Card */}
                    <div className="p-5 rounded-2xl border border-theme bg-theme-card-inner hover:border-purple-500/50 transition flex flex-col items-center text-center group">
                      <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-105 transition">
                        <svg className="w-6 h-6 sync-icon" viewBox="0 0 24 24" stroke-width="1.8">
                          <rect x="2" y="3" width="20" height="12" rx="2"/>
                          <circle cx="12" cy="19" r="2"/>
                          <path d="M12 9v4"/>
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold text-purple-400 mb-1">Teacher Portal</h3>
                      <p className="text-[11px] text-theme-muted mb-4 leading-relaxed">
                        Manage classes, students, assignments and evaluations.
                      </p>
                      <button 
                        onClick={() => { setSelectedRole('TEACHER'); setUsername(''); setPassword(''); setError(''); }}
                        className="mt-auto w-full py-2 px-4 rounded-xl border border-purple-500/40 hover:border-purple-400 text-xs font-semibold text-purple-400 hover:bg-purple-500/10 transition flex items-center justify-center gap-1.5 cursor-pointer bg-transparent"
                      >
                        Sign in
                        <svg className="w-3.5 h-3.5 sync-icon" viewBox="0 0 24 24" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </button>
                    </div>

                    {/* Parent Portal Card */}
                    <div className="p-5 rounded-2xl border border-theme bg-theme-card-inner hover:border-amber-500/50 transition flex flex-col items-center text-center group">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition">
                        <svg className="w-6 h-6 sync-icon" viewBox="0 0 24 24" stroke-width="1.8">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold text-amber-400 mb-1">Parent Portal</h3>
                      <p className="text-[11px] text-theme-muted mb-4 leading-relaxed">
                        Track your child's progress, attendance, fees and more.
                      </p>
                      <button 
                        onClick={() => { setSelectedRole('PARENT'); setUsername(''); setPassword(''); setError(''); }}
                        className="mt-auto w-full py-2 px-4 rounded-xl border border-amber-500/40 hover:border-amber-400 text-xs font-semibold text-amber-400 hover:bg-amber-500/10 transition flex items-center justify-center gap-1.5 cursor-pointer bg-transparent"
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
                        <div className="w-full border-t border-theme"></div>
                      </div>
                      <span className="relative px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase" style={{ backgroundColor: 'var(--bg-card)' }}>OR</span>
                    </div>

                    <button 
                      onClick={() => showNotification("Registrations are closed on this instance.")}
                      className="w-full py-3 px-4 rounded-xl border border-theme bg-theme-card-inner text-xs font-bold text-theme-main transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/>
                        <line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/>
                      </svg>
                      Create account
                    </button>

                    <div className="text-center text-xs text-theme-muted">
                      Don't have an account? 
                      <button onClick={() => showNotification("Please contact admin for registrations.")} style={{ color: 'var(--brand-lime)' }} className="font-bold hover:underline ml-1 cursor-pointer bg-transparent">Sign up</button>
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
                      className="inline-flex items-center gap-2 text-xs font-bold text-theme-muted hover:text-theme-main transition cursor-pointer"
                    >
                      <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                      Back to portals
                    </button>
                  </div>

                  {/* Centered User Header */}
                  <div className="text-center space-y-3">
                    <div className={`mx-auto w-12 h-12 rounded-full border ${specs.iconCircle} flex items-center justify-center`}>
                      <svg className="w-6 h-6 sync-icon" viewBox="0 0 24 24" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-theme-main">Sign in</h2>
                      <p className="text-xs text-theme-muted mt-1">Enter your credentials to access your account</p>
                    </div>
                  </div>

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    {error && (
                      <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-xs p-3.5 rounded-xl">
                        {error}
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Email Address / Username field */}
                      <div>
                        <label className="block text-[10px] font-bold text-theme-muted uppercase tracking-wider mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                            <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                            </svg>
                          </div>
                          <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your email address"
                            className={`block w-full pl-10 pr-3 py-3 border border-theme rounded-xl bg-theme-card-inner text-theme-main placeholder-slate-600 focus:outline-none focus:ring-2 transition-all text-xs ${specs.borderFocus}`}
                          />
                        </div>
                      </div>

                      {/* Password field */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-[10px] font-bold text-theme-muted uppercase tracking-wider">
                            Password
                          </label>
                          <button 
                            type="button"
                            onClick={() => showNotification("Contact administrator to retrieve password.")}
                            className={`text-[10px] font-bold hover:underline ${specs.badgeText} cursor-pointer bg-transparent`}
                          >
                            Forgot Password?
                          </button>
                        </div>
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
                            placeholder="Enter your password"
                            className={`block w-full pl-10 pr-10 py-3 border border-theme rounded-xl bg-theme-card-inner text-theme-main placeholder-slate-600 focus:outline-none focus:ring-2 transition-all text-xs ${specs.borderFocus}`}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 cursor-pointer hover:text-slate-350">
                            <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Remember me check */}
                    <div className="flex items-center gap-2.5 py-1">
                      <input 
                        type="checkbox" 
                        id="rememberMe"
                        className="rounded border-theme bg-theme-card-inner focus:ring-lime-500 h-4 w-4"
                      />
                      <label htmlFor="rememberMe" className="text-xs text-theme-muted cursor-pointer">Remember me</label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5 ${specs.btnBg}`}
                      >
                        {loading ? 'Verifying...' : 'Sign in'}
                        <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </button>
                    </div>
                  </form>

                  {/* Social & Demo login buttons */}
                  <div className="space-y-4 pt-4 border-t border-theme">
                    
                    <div className="relative text-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-theme"></div>
                      </div>
                      <span className="relative px-2.5 text-[9px] font-bold tracking-widest text-slate-600 uppercase" style={{ backgroundColor: 'var(--bg-card)' }}>Or sign in with</span>
                    </div>

                    <div className="space-y-2">
                      {/* Microsoft */}
                      <button 
                        type="button"
                        onClick={() => handleQuickDemoLogin(selectedRole)}
                        className="w-full py-2.5 border border-theme bg-theme-card-inner hover:bg-slate-100/5 text-xs text-theme-main rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 23 23">
                          <rect x="0" y="0" width="11" height="11" fill="#f25022"/>
                          <rect x="12" y="0" width="11" height="11" fill="#7fba00"/>
                          <rect x="0" y="12" width="11" height="11" fill="#00a4ef"/>
                          <rect x="12" y="12" width="11" height="11" fill="#ffb900"/>
                        </svg>
                        <span>Continue with Microsoft</span>
                      </button>

                      {/* Apple */}
                      <button 
                        type="button"
                        onClick={() => handleQuickDemoLogin(selectedRole)}
                        className="w-full py-2.5 border border-theme bg-theme-card-inner hover:bg-slate-100/5 text-xs text-theme-main rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0 fill-current text-theme-main" viewBox="0 0 24 24">
                          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.51 12.06 1.005 1.45 2.187 3.076 3.755 3.017 1.51-.062 2.079-.974 3.906-.974 1.826 0 2.36.974 3.934.94 1.602-.027 2.646-1.477 3.627-2.9 1.135-1.655 1.604-3.255 1.63-3.342-.03-.013-3.136-1.202-3.167-4.773-.027-2.983 2.444-4.417 2.557-4.483-1.402-2.052-3.57-2.285-4.331-2.342-1.954-.157-3.35 1.03-4.1.988zM15.975 4.108c.828-1.002 1.385-2.4 1.23-3.793-1.197.047-2.647.795-3.504 1.802-.756.873-1.42 2.29-1.242 3.666 1.332.103 2.69-.672 3.516-1.675z"/>
                        </svg>
                        <span>Continue with Apple</span>
                      </button>
                    </div>

                    <div className="text-center text-xs text-theme-muted">
                      Don't have an account? <button type="button" onClick={() => showNotification("Please contact school admin.")} style={{ color: 'var(--brand-lime)' }} className="font-bold hover:underline cursor-pointer bg-transparent">Create Account</button>
                    </div>

                  </div>

                </div>
              )}

            </div>
          </div>

        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-theme-muted border-t border-theme mt-6 z-10">
        <div>
          © 2025 Bright Future School. All rights reserved.
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button onClick={() => showNotification('Privacy Policy Document')} className="hover:text-theme-main transition cursor-pointer bg-transparent">Privacy Policy</button>
          <span className="text-slate-700">|</span>
          <button onClick={() => showNotification('Terms of Service Document')} className="hover:text-theme-main transition cursor-pointer bg-transparent">Terms of Service</button>
          <span className="text-slate-700">|</span>
          <button onClick={() => showNotification('Help Center & Support Desk')} className="hover:text-theme-main transition cursor-pointer bg-transparent">Help Center</button>
        </div>
      </footer>

      {/* Notification Toast */}
      {toastText && (
        <div id="toastNotification" className="fixed bottom-6 right-6 z-50 transform translate-y-0 opacity-100 transition-all duration-300">
          <div className="px-4 py-3 rounded-2xl bg-slate-900/95 border border-lime-500/50 shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs text-white">
            <div className="w-6 h-6 rounded-full bg-lime-500/20 text-lime-400 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span>{toastText}</span>
          </div>
        </div>
      )}

    </div>
  );
}
