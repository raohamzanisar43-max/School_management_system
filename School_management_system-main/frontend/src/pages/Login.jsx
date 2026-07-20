import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, BookOpen, User, Users, Lock, HelpCircle } from 'lucide-react';

export default function Login() {
  const { login, switchRole } = useAuth();
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

  const handleQuickLogin = (role) => {
    switchRole(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-grid-pattern py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full space-y-8 animate-slide-up relative z-10">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center text-indigo-400 mb-4 shadow-lg hover-glow transition-all duration-300">
            <BookOpen className="h-9 w-9" />
          </div>
          <h2 className="text-4xl font-extrabold font-outfit text-white tracking-tight">
            Bright Future
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Homeschooling Management Platform
          </p>
        </div>

        {/* Login form container */}
        <div className="glass rounded-3xl p-8 shadow-2xl backdrop-blur-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-sm p-4 rounded-xl">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username (e.g. admin)"
                    className="block w-full pl-10 pr-3 py-3 border border-slate-700/50 rounded-xl bg-slate-900/60 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-3 py-3 border border-slate-700/50 rounded-xl bg-slate-900/60 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-indigo-500 hover-glow transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Quick-login shortcuts */}
          <div className="mt-8 pt-8 border-t border-slate-800/60">
            <h4 className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-indigo-400" />
              Demo Quick Sign-In
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleQuickLogin('ADMIN')}
                className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-800 hover:border-indigo-500/30 rounded-xl bg-slate-900/40 hover:bg-slate-800/40 text-slate-300 hover:text-white transition-all text-xs font-medium cursor-pointer"
              >
                <Shield className="h-4 w-4 text-indigo-400" />
                Admin Portal
              </button>
              <button
                onClick={() => handleQuickLogin('TEACHER')}
                className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-800 hover:border-emerald-500/30 rounded-xl bg-slate-900/40 hover:bg-slate-800/40 text-slate-300 hover:text-white transition-all text-xs font-medium cursor-pointer"
              >
                <Users className="h-4 w-4 text-emerald-400" />
                Teacher Portal
              </button>
              <button
                onClick={() => handleQuickLogin('STUDENT')}
                className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-800 hover:border-amber-500/30 rounded-xl bg-slate-900/40 hover:bg-slate-800/40 text-slate-300 hover:text-white transition-all text-xs font-medium cursor-pointer"
              >
                <User className="h-4 w-4 text-amber-400" />
                Student Portal
              </button>
              <button
                onClick={() => handleQuickLogin('PARENT')}
                className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-800 hover:border-pink-500/30 rounded-xl bg-slate-900/40 hover:bg-slate-800/40 text-slate-300 hover:text-white transition-all text-xs font-medium cursor-pointer"
              >
                <Users className="h-4 w-4 text-pink-400" />
                Parent Portal
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-500 mt-4">
              Credentials: admin / adminpassword (seeded database)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
