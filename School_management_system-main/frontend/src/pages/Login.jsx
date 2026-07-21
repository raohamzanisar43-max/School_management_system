import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, BookOpen, User, Users, Lock, HelpCircle } from 'lucide-react';

export default function Login() {
  const { login, switchRole } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activePortal, setActivePortal] = useState('student');

  const portalMeta = {
    student: {
      tagline: 'Student Success',
      headline: 'Starts clear.',
      title: 'Bright Future Student Access',
      subtitle: 'View your personalized dashboard, upcoming assignments, and semester grades.'
    },
    parent: {
      tagline: 'Parental Insight',
      headline: 'Your child’s future is bright.',
      title: 'Bright Future Parent Access',
      subtitle: 'Monitor academic milestones and connect directly with your child’s mentors.'
    },
    teacher: {
      tagline: 'Faculty Leadership',
      headline: 'Empower the next generation.',
      title: 'Bright Future Staff Access',
      subtitle: 'Manage your digital classroom, curate curriculum, and log student assessments.'
    },
    admin: {
      tagline: 'System Management',
      headline: 'Scaling for academic excellence.',
      title: 'Bright Future Admin Access',
      subtitle: 'Configure institutional settings, security protocols, and global user reporting.'
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (role) => {
    switchRole(role);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0D1612] text-white overflow-x-hidden" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <div className="fixed inset-0 z-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(#23382D 1px, transparent 1px), linear-gradient(90deg, #23382D 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        backgroundPosition: 'center center'
      }} />

      <nav className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#B6F34C] relative overflow-hidden">
            <div className="h-6 w-6 rounded-full border-[3px] border-[#0D1612] relative">
              <div className="absolute -top-2 left-1/2 h-2 w-[2px] -translate-x-1/2 bg-[#0D1612]" />
              <div className="absolute left-1/2 top-1/2 h-2 w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-90 bg-[#0D1612]" />
            </div>
          </div>
          <div>
            <span className="block text-xl font-semibold tracking-[0.2em] text-white">BRIGHT FUTURE</span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-slate-300">Academic Excellence</span>
          </div>
        </div>
        <button className="rounded-full border border-white/20 px-6 py-2 text-xs font-semibold text-white transition-all hover:bg-white hover:text-black">
          Create account
        </button>
      </nav>

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-12 px-6 py-4 lg:flex-row">
        <section className="flex flex-col justify-center lg:w-[55%]">
          <div className="mb-12 space-y-4">
            <span className="text-[12px] uppercase tracking-[0.3em] text-[#B6F34C]">{portalMeta[activePortal].tagline}</span>
            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Every day <br />
              <span className="text-[#B6F34C]">{portalMeta[activePortal].headline}</span>
            </h1>
            <p className="max-w-md text-lg text-[#8B9E90]">Select your destination portal to manage your academic journey with Bright Future.</p>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { key: 'student', icon: '🎓', label: 'Student Portal', subtitle: 'Grades, tasks & schedules.' },
                { key: 'parent', icon: '🏠', label: 'Parent Portal', subtitle: 'Progress & communication.' },
                { key: 'teacher', icon: '💻', label: 'Teacher Portal', subtitle: 'Classroom & resources.' },
                { key: 'admin', icon: '🛡️', label: 'Admin Portal', subtitle: 'Systems & reporting.' }
              ].map((portal) => (
                <button
                  key={portal.key}
                  onClick={() => setActivePortal(portal.key)}
                  className={`flex flex-col gap-6 rounded-xl border p-6 text-left transition-all ${activePortal === portal.key ? 'border-[#B6F34C] bg-[#14211B] shadow-[0_0_20px_rgba(182,243,76,0.15)]' : 'border-[#23382D] bg-[#14211B] hover:-translate-y-1 hover:border-[#B6F34C]/40'}`}
                >
                  <span className="text-3xl">{portal.icon}</span>
                  <div>
                    <h3 className="mb-1 text-sm font-bold text-white">{portal.label}</h3>
                    <p className="text-[11px] leading-snug text-[#8B9E90]">{portal.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <p className="text-lg font-bold text-white">Choose access type to proceed</p>
              <div className="h-[1px] flex-grow bg-white/10" />
              <span className="text-2xl text-[#B6F34C]">⟶</span>
            </div>
          </div>
        </section>

        <section className="flex w-full items-center justify-center lg:w-[45%]">
          <div className="relative w-full max-w-[440px] overflow-hidden rounded-2xl border border-[#23382D] bg-[#14211B] p-8 shadow-2xl md:p-10">
            <div className="absolute -mt-16 -mr-16 top-0 right-0 h-32 w-32 rounded-full bg-[#B6F34C]/5 blur-3xl" />

            <header className="relative mb-10">
              <span className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-[#8B9E90]">Institutional Login</span>
              <h2 className="mb-3 text-3xl font-semibold tracking-tight text-white">{portalMeta[activePortal].title}</h2>
              <p className="text-sm leading-relaxed text-[#8B9E90]">{portalMeta[activePortal].subtitle}</p>
            </header>

            <form className="relative space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#8B9E90]">School Email</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="name@brightfuture.edu"
                  className="w-full rounded-lg border border-[#23382D] bg-[#080E0B] px-4 py-3.5 text-white placeholder:text-slate-500 transition-all focus:border-white/30 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#8B9E90]">Password</label>
                  <a href="#" className="text-[11px] font-semibold text-[#B6F34C] hover:underline">Forgot Access?</a>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-[#23382D] bg-[#080E0B] px-4 py-3.5 text-white placeholder:text-slate-500 transition-all focus:border-white/30 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="remember" className="h-4 w-4 rounded border-[#23382D] bg-[#080E0B] accent-[#B6F34C]" />
                <label htmlFor="remember" className="text-xs text-[#8B9E90]">Stay connected on this device</label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#B6F34C] py-4 text-sm font-bold uppercase tracking-widest text-[#0D1612] transition-all hover:opacity-95 disabled:opacity-60"
              >
                {loading ? 'Verifying Credentials...' : 'Enter Portal'}
                <span>→</span>
              </button>
            </form>

            <div className="my-8 flex items-center gap-4 text-[#23382D]">
              <div className="h-px flex-grow bg-white/5" />
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#8B9E90]">External Auth</span>
              <div className="h-px flex-grow bg-white/5" />
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleQuickLogin('ADMIN')}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/5 py-3 transition-all hover:bg-white/5"
              >
                <span className="text-xs font-semibold text-white">Admin Quick Sign-In</span>
              </button>
              <button
                onClick={() => handleQuickLogin('TEACHER')}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/5 py-3 transition-all hover:bg-white/5"
              >
                <span className="text-xs font-semibold text-white">Teacher Quick Sign-In</span>
              </button>
              <button
                onClick={() => handleQuickLogin('STUDENT')}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/5 py-3 transition-all hover:bg-white/5"
              >
                <span className="text-xs font-semibold text-white">Student Quick Sign-In</span>
              </button>
              <button
                onClick={() => handleQuickLogin('PARENT')}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/5 py-3 transition-all hover:bg-white/5"
              >
                <span className="text-xs font-semibold text-white">Parent Quick Sign-In</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/5 px-6 py-8 text-[10px] font-mono uppercase tracking-wider text-[#8B9E90] md:flex-row">
        <p>© 2026 BRIGHT FUTURE EDUCATIONAL PLATFORMS.</p>
        <div className="flex gap-8">
          <a href="#" className="transition-colors hover:text-white">Security</a>
          <a href="#" className="transition-colors hover:text-white">Privacy</a>
          <a href="#" className="transition-colors hover:text-white">Network Status</a>
        </div>
      </footer>
    </div>
  );
}
