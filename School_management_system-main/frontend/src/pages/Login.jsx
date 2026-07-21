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
    <div className="min-h-screen bg-[#0a0e11] text-white flex items-center justify-center">
      {/* Grid background */}
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#0a0e11]/80 backdrop-blur border-b border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-[#0a0e11]">📦</span>
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight">BRIGHT FUTURE SCHOOL</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">New here?</span>
            <button className="px-6 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition text-sm font-medium">
              Create account
            </button>
            <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 transition">
              🌙
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full flex pt-24">
        {/* Left Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between px-12 py-16">
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                STUDENT SUCCESS, WORLDWIDE
              </div>
              <h1 className="text-6xl font-bold leading-tight">
                Every future
                <br />
                <span className="text-emerald-400">starts connected.</span>
              </h1>
              <p className="text-lg text-slate-300 mt-6">
                A unified portal to access everything you need. Choose your portal and sign in to continue your learning journey.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <Globe className="w-6 h-6 text-emerald-400" />
              <div className="text-sm font-semibold">Global Community</div>
              <p className="text-xs text-slate-400">Connect worldwide</p>
            </div>
            <div className="space-y-2">
              <BookOpen className="w-6 h-6 text-emerald-400" />
              <div className="text-sm font-semibold">Smart Learning</div>
              <p className="text-xs text-slate-400">Learn. Grow. Succeed.</p>
            </div>
            <div className="space-y-2">
              <Shield className="w-6 h-6 text-emerald-400" />
              <div className="text-sm font-semibold">Secure & Trusted</div>
              <p className="text-xs text-slate-400">Your data is safe</p>
            </div>
            <div className="space-y-2">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              <div className="text-sm font-semibold">Better Outcomes</div>
              <p className="text-xs text-slate-400">Track your progress</p>
            </div>
          </div>

          {/* Avatar group & Stats */}
          <div className="flex items-center gap-3 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 border-2 border-[#0a0e11]" />
              ))}
            </div>
            <span className="text-sm text-slate-300"><span className="font-bold text-white">21,500+</span> learners already connected</span>
          </div>

          {/* Footer links */}
          <div className="flex gap-6 text-xs text-slate-400 pt-8 border-t border-white/10">
            <span>© 2025 All rights reserved.</span>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Help Center</a>
          </div>
        </div>

        {/* Right Portal Selection */}
        <div className="w-full lg:w-1/2 px-6 sm:px-12 py-12 lg:py-16 lg:border-l border-white/10 flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="space-y-3 text-center lg:text-left">
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                WELCOME BACK
              </div>
              <h2 className="text-4xl font-bold">Choose your portal</h2>
              <p className="text-slate-400">Select your role to sign in to your account</p>
            </div>

            {/* Portal Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: 'STUDENT', icon: '🎓', title: 'Student Portal', description: 'Access your classes, assignments, results, timetable and more.' },
                { key: 'ADMIN', icon: '👤', title: 'Admin Portal', description: 'Manage users, academics, reports and system settings.' },
                { key: 'TEACHER', icon: '👨‍🏫', title: 'Teacher Portal', description: 'Manage classes, students, assignments and evaluations.' },
                { key: 'PARENT', icon: '👨‍👩‍👧', title: 'Parent Portal', description: 'Track your child\'s progress, attendance, fees and more.' }
              ].map((portal) => (
                <button
                  key={portal.key}
                  onClick={() => handlePortalLogin(portal.key)}
                  className="group relative border border-white/10 rounded-2xl p-6 hover:border-white/20 transition space-y-4 text-left bg-gradient-to-br from-white/5 to-white/0"
                >
                  {/* Icon background */}
                  <div className={`w-14 h-14 rounded-xl opacity-80 group-hover:opacity-100 transition flex items-center justify-center text-2xl ${ portal.key === 'STUDENT' ? 'bg-gradient-to-br from-emerald-400 to-emerald-500' : portal.key === 'ADMIN' ? 'bg-gradient-to-br from-blue-400 to-blue-500' : portal.key === 'TEACHER' ? 'bg-gradient-to-br from-purple-400 to-purple-500' : 'bg-gradient-to-br from-amber-400 to-amber-500'}`}>
                    {portal.icon}
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-white">{portal.title}</h3>
                    <p className="text-xs leading-relaxed text-slate-400">
                      {portal.description}
                    </p>
                  </div>

                  {/* Sign in button */}
                  <button className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1 pt-2 border-t border-white/10 group-hover:border-emerald-400/20 w-full justify-center py-2">
                    Sign in <span>→</span>
                  </button>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-grow bg-white/10" />
              <span className="text-xs text-slate-500">OR</span>
              <div className="h-px flex-grow bg-white/10" />
            </div>

            {/* Create account button */}
            <button className="w-full border border-white/20 rounded-lg py-3 font-semibold hover:bg-white/5 transition flex items-center justify-center gap-2">
              <span>👤</span> Create account
            </button>

            {/* Sign up link */}
            <p className="text-center text-sm text-slate-400">
              Don't have an account? <a href="#" className="text-emerald-400 hover:text-emerald-300 font-semibold transition">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
