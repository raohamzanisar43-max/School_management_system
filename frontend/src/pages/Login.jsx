import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Shield, BookOpen, User, Users, Lock, HelpCircle, 
  GraduationCap, Monitor, Globe, TrendingUp, ArrowLeft, ArrowRight, Plus 
} from 'lucide-react';

export default function Login() {
  const { login, switchRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState(null); // 'STUDENT' | 'TEACHER' | 'ADMIN' | 'PARENT' | null
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    } catch (err) {
      setError('Failed to log in with demo credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Get color themes dynamically based on selected role
  const getThemeClass = () => {
    if (selectedRole === 'STUDENT') return {
      border: 'border-emerald-500/20',
      focus: 'focus:ring-emerald-500 focus:border-emerald-500',
      btn: 'bg-emerald-600 hover:bg-emerald-500 focus:ring-emerald-500',
      text: 'text-emerald-400',
      glow: 'shadow-emerald-500/10'
    };
    if (selectedRole === 'ADMIN') return {
      border: 'border-blue-500/20',
      focus: 'focus:ring-blue-500 focus:border-blue-500',
      btn: 'bg-blue-600 hover:bg-blue-500 focus:ring-blue-500',
      text: 'text-blue-400',
      glow: 'shadow-blue-500/10'
    };
    if (selectedRole === 'TEACHER') return {
      border: 'border-violet-500/20',
      focus: 'focus:ring-violet-500 focus:border-violet-500',
      btn: 'bg-violet-600 hover:bg-violet-500 focus:ring-violet-500',
      text: 'text-violet-400',
      glow: 'shadow-violet-500/10'
    };
    if (selectedRole === 'PARENT') return {
      border: 'border-amber-500/20',
      focus: 'focus:ring-amber-500 focus:border-amber-500',
      btn: 'bg-amber-600 hover:bg-amber-500 focus:ring-amber-500',
      text: 'text-amber-400',
      glow: 'shadow-amber-500/10'
    };
    return {
      border: 'border-slate-800',
      focus: 'focus:ring-indigo-500 focus:border-indigo-500',
      btn: 'bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500',
      text: 'text-indigo-400',
      glow: 'shadow-indigo-500/10'
    };
  };

  const theme = getThemeClass();

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-950 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* LEFT COLUMN: HERO INFORMATION */}
      <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-12 lg:p-16 border-r border-slate-900/60 relative z-10">
        
        {/* Brand Header */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-white text-slate-950 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-white/5">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="font-extrabold font-outfit text-white tracking-widest text-sm uppercase">Bright Future School</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">New here?</span>
            <button className="px-4 py-2 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-white rounded-xl transition cursor-pointer">
              Create account
            </button>
          </div>
        </div>

        {/* Hero Middle Content */}
        <div className="my-auto py-12 max-w-xl space-y-8">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Student Success, Worldwide</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-outfit text-white tracking-tight leading-tight">
            Every future <br />
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">starts connected.</span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md">
            A unified portal to access everything you need. Choose your portal and sign in to continue your learning journey.
          </p>
          
          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Global Community</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Connect worldwide</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Smart Learning</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Learn. Grow. Succeed.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Secure & Trusted</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Your data is safe</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Better Outcomes</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Track your progress</p>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-3 pt-4">
            <div className="flex -space-x-2 overflow-hidden">
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-[9px] font-bold text-white uppercase">zk</div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-[9px] font-bold text-white uppercase">ab</div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-[9px] font-bold text-white uppercase">ys</div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-[9px] font-bold text-white uppercase">hm</div>
            </div>
            <span className="text-xs text-slate-400">
              <strong className="text-emerald-400">21,500+</strong> learners already connected
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 border-t border-slate-900/60 pt-6">
          <span>© 2025 All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400 transition">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-slate-400 transition">Terms of Service</a>
            <span>|</span>
            <a href="#" className="hover:text-slate-400 transition">Help Center</a>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: INTERACTIVE FORM CONTAINER */}
      <div className="lg:col-span-5 flex items-center justify-center p-6 sm:p-12 relative z-10">
        
        {/* Render Card Grid or login form */}
        <div className="glass rounded-3xl p-8 max-w-md w-full border border-slate-800 shadow-2xl backdrop-blur-md relative overflow-hidden animate-slide-up">
          
          {selectedRole === null ? (
            /* VIEW 1: PORTAL CHOOSE GRID */
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">Welcome Back</span>
                <h2 className="text-2xl font-extrabold font-outfit text-white">Choose your portal</h2>
                <p className="text-slate-400 text-xs mt-1">Select your role to sign in to your account</p>
              </div>

              {/* 2x2 grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Student */}
                <div className="p-4 bg-slate-900/40 border border-slate-800 hover:border-emerald-500/20 rounded-2xl flex flex-col justify-between gap-4 transition group">
                  <div className="space-y-2">
                    <div className="h-10 w-10 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl flex items-center justify-center">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold text-emerald-400">Student Portal</h3>
                    <p className="text-[10px] text-slate-500 leading-normal">Access your classes, assignments, results, timetable and more.</p>
                  </div>
                  <button 
                    onClick={() => { setSelectedRole('STUDENT'); setUsername(''); setPassword(''); }}
                    className="w-full py-2 bg-transparent hover:bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500 text-emerald-400 rounded-xl text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Sign in <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* Admin */}
                <div className="p-4 bg-slate-900/40 border border-slate-800 hover:border-blue-500/20 rounded-2xl flex flex-col justify-between gap-4 transition group">
                  <div className="space-y-2">
                    <div className="h-10 w-10 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl flex items-center justify-center">
                      <Monitor className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold text-blue-400">Admin Portal</h3>
                    <p className="text-[10px] text-slate-500 leading-normal">Manage users, academics, reports and system settings.</p>
                  </div>
                  <button 
                    onClick={() => { setSelectedRole('ADMIN'); setUsername(''); setPassword(''); }}
                    className="w-full py-2 bg-transparent hover:bg-blue-500/5 border border-blue-500/20 hover:border-blue-500 text-blue-400 rounded-xl text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Sign in <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* Teacher */}
                <div className="p-4 bg-slate-900/40 border border-slate-800 hover:border-violet-500/20 rounded-2xl flex flex-col justify-between gap-4 transition group">
                  <div className="space-y-2">
                    <div className="h-10 w-10 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-xl flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold text-violet-400">Teacher Portal</h3>
                    <p className="text-[10px] text-slate-500 leading-normal">Manage classes, students, assignments and evaluations.</p>
                  </div>
                  <button 
                    onClick={() => { setSelectedRole('TEACHER'); setUsername(''); setPassword(''); }}
                    className="w-full py-2 bg-transparent hover:bg-violet-500/5 border border-violet-500/20 hover:border-violet-500 text-violet-400 rounded-xl text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Sign in <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* Parent */}
                <div className="p-4 bg-slate-900/40 border border-slate-800 hover:border-amber-500/20 rounded-2xl flex flex-col justify-between gap-4 transition group">
                  <div className="space-y-2">
                    <div className="h-10 w-10 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold text-amber-400">Parent Portal</h3>
                    <p className="text-[10px] text-slate-500 leading-normal">Track your child's progress, attendance, fees and more.</p>
                  </div>
                  <button 
                    onClick={() => { setSelectedRole('PARENT'); setUsername(''); setPassword(''); }}
                    className="w-full py-2 bg-transparent hover:bg-amber-500/5 border border-amber-500/20 hover:border-amber-500 text-amber-400 rounded-xl text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Sign in <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

              </div>

              {/* Divider & Bottom Options */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="h-px bg-slate-850 grow"></div>
                  <span className="text-[10px] text-slate-600 font-bold uppercase">or</span>
                  <div className="h-px bg-slate-850 grow"></div>
                </div>

                <button className="w-full py-3 border border-slate-800 hover:border-slate-700 bg-transparent text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer">
                  <Plus className="h-4 w-4" /> Create account
                </button>

                <p className="text-center text-[11px] text-slate-500">
                  Don't have an account? <a href="#" className="text-emerald-400 font-bold hover:underline">Sign up</a>
                </p>
              </div>
            </div>
          ) : (
            /* VIEW 2: FORM FOR SELECTED PORTAL */
            <div className="space-y-6 animate-fade-in">
              <button 
                onClick={() => { setSelectedRole(null); setError(''); }}
                className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> Back to portals
              </button>

              <div>
                <span className={`text-[10px] font-bold ${theme.text} uppercase tracking-widest block mb-1`}>Portal Sign In</span>
                <h2 className="text-2xl font-extrabold font-outfit text-white">
                  {selectedRole.charAt(0) + selectedRole.slice(1).toLowerCase()} Portal
                </h2>
                <p className="text-slate-400 text-xs mt-1">Enter your credentials to manage your workflow</p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-xs p-3.5 rounded-xl">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <User className="h-4.5 w-4.5" />
                      </div>
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={`Enter your ${selectedRole.toLowerCase()} username`}
                        className={`block w-full pl-10 pr-3 py-3 border border-slate-800 rounded-xl bg-slate-900/60 text-white placeholder-slate-650 focus:outline-none focus:ring-2 transition-all text-xs ${theme.focus}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Lock className="h-4.5 w-4.5" />
                      </div>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`block w-full pl-10 pr-3 py-3 border border-slate-800 rounded-xl bg-slate-900/60 text-white placeholder-slate-650 focus:outline-none focus:ring-2 transition-all text-xs ${theme.focus}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold text-white shadow-lg transition-all cursor-pointer disabled:opacity-50 ${theme.btn} ${theme.glow}`}
                  >
                    {loading ? 'Verifying...' : 'Sign In'}
                  </button>
                </div>
              </form>

              {/* Demo Sign-In shortcut for testing */}
              <div className={`mt-6 pt-6 border-t border-slate-850 text-center`}>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin(selectedRole)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl text-[10px] font-bold transition cursor-pointer`}
                >
                  <HelpCircle className="h-4 w-4" /> Quick Demo Sign-In
                </button>
                <p className="text-[9px] text-slate-600 mt-2">
                  Demo Credentials are pre-configured in local memory fallback
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
