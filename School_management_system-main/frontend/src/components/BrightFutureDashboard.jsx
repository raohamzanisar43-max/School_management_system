import React, { useState } from 'react';

// ============================================================
// Exact React port of the "BrightFuture Student Portal - Dashboard"
// static HTML mockup (Tailwind CDN + FontAwesome version).
// FontAwesome + Plus Jakarta Sans are loaded globally in index.html.
// ============================================================

const STUDENT_NAME = 'Ali Raza';
const STUDENT_GRADE = 'Grade 10';
const AVATAR_URL = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150';

const QUICK_ACCESS_CARDS = [
  {
    key: 'lms',
    title: 'LMS Lectures & HW',
    desc: 'Access your courses, watch lectures and submit homework.',
    icon: 'fa-solid fa-book-open',
    iconWrap: 'bg-indigo-500 dark:bg-emerald-500/10 text-white dark:text-emerald-400',
    title_color: 'dark:text-emerald-400',
    btnBorder: 'border-indigo-200 dark:border-emerald-500/40',
    btnText: 'text-indigo-600 dark:text-emerald-400',
    btnHover: 'hover:bg-indigo-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-slate-900',
  },
  {
    key: 'exam',
    title: 'Smart Exam Hall',
    desc: 'Take exams and practice tests in a secure environment.',
    icon: 'fa-solid fa-clipboard-check',
    iconWrap: 'bg-sky-500 dark:bg-sky-500/10 text-white dark:text-sky-400',
    title_color: 'dark:text-sky-400',
    btnBorder: 'border-sky-200 dark:border-sky-500/40',
    btnText: 'text-sky-600 dark:text-sky-400',
    btnHover: 'hover:bg-sky-600 hover:text-white dark:hover:bg-sky-500 dark:hover:text-slate-900',
  },
  {
    key: 'quran',
    title: 'Quran Progression Log',
    desc: 'Track your Quran recitation, memorization and Tajweed progress.',
    icon: 'fa-solid fa-book-quran',
    iconWrap: 'bg-emerald-500 dark:bg-purple-500/10 text-white dark:text-purple-400',
    title_color: 'dark:text-purple-400',
    btnBorder: 'border-emerald-200 dark:border-purple-500/40',
    btnText: 'text-emerald-600 dark:text-purple-400',
    btnHover: 'hover:bg-emerald-600 hover:text-white dark:hover:bg-purple-500 dark:hover:text-slate-900',
  },
  {
    key: 'skills',
    title: 'Future Skills Lab',
    desc: 'Explore future-ready skills and complete trainings.',
    icon: 'fa-solid fa-lightbulb',
    iconWrap: 'bg-amber-500 dark:bg-teal-500/10 text-white dark:text-teal-400',
    title_color: 'dark:text-teal-400',
    btnBorder: 'border-amber-200 dark:border-teal-500/40',
    btnText: 'text-amber-600 dark:text-teal-400',
    btnHover: 'hover:bg-amber-600 hover:text-white dark:hover:bg-teal-500 dark:hover:text-slate-900',
  },
  {
    key: 'billing',
    title: 'Tuition Billing',
    desc: 'View invoices, payment history and due dates.',
    icon: 'fa-solid fa-dollar-sign',
    iconWrap: 'bg-rose-500 dark:bg-amber-500/10 text-white dark:text-amber-400',
    title_color: 'dark:text-amber-400',
    btnBorder: 'border-rose-200 dark:border-amber-500/40',
    btnText: 'text-rose-600 dark:text-amber-400',
    btnHover: 'hover:bg-rose-600 hover:text-white dark:hover:bg-amber-500 dark:hover:text-slate-900',
  },
  {
    key: 'message',
    title: 'Message Tutor',
    desc: 'Chat with your tutors and get your doubts cleared.',
    icon: 'fa-solid fa-comment-dots',
    iconWrap: 'bg-teal-500 dark:bg-rose-500/10 text-white dark:text-rose-400',
    title_color: 'dark:text-rose-400',
    btnBorder: 'border-teal-200 dark:border-rose-500/40',
    btnText: 'text-teal-600 dark:text-rose-400',
    btnHover: 'hover:bg-teal-600 hover:text-white dark:hover:bg-rose-500 dark:hover:text-slate-900',
  },
  {
    key: 'gemini',
    title: 'Gemini AI Buddy',
    desc: 'Your AI learning companion for help and guidance.',
    icon: 'fa-solid fa-robot',
    iconWrap: 'bg-indigo-600 dark:bg-blue-500/10 text-white dark:text-blue-400',
    title_color: 'dark:text-blue-400',
    btnBorder: 'border-indigo-200 dark:border-blue-500/40',
    btnText: 'text-indigo-600 dark:text-blue-400',
    btnHover: 'hover:bg-indigo-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-slate-900',
    extra: 'sm:col-span-2 xl:col-span-1',
  },
];

const SCHEDULE_ITEMS = [
  { key: 'math', title: 'Math Lecture', time: '09:00 AM - 10:00 AM', dot: 'bg-indigo-600 dark:bg-emerald-500', badge: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400', label: 'Live' },
  { key: 'physics', title: 'Physics Lecture', time: '11:00 AM - 12:00 PM', dot: 'bg-emerald-500 dark:bg-rose-400', badge: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400', label: 'Live' },
  { key: 'english', title: 'English Class', time: '01:00 PM - 02:00 PM', dot: 'bg-sky-500', badge: 'bg-sky-100 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400', label: 'Upcoming' },
  { key: 'quran', title: 'Quran Session', time: '04:00 PM - 05:00 PM', dot: 'bg-amber-500', badge: 'bg-sky-100 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400', label: 'Upcoming' },
];

const PROGRESS_LEGEND = [
  { key: 'lectures', label: 'Lectures', dot: 'bg-indigo-500', value: '80%' },
  { key: 'assignments', label: 'Assignments', dot: 'bg-sky-500', value: '70%' },
  { key: 'exams', label: 'Exams', dot: 'bg-emerald-500', value: '85%' },
  { key: 'quran', label: 'Quran', dot: 'bg-amber-500', value: '75%' },
];

export default function BrightFutureDashboard() {
  const [theme, setTheme] = useState('day'); // 'day' | 'night'
  const [searchQuery, setSearchQuery] = useState('');
  const [modal, setModal] = useState({ open: false, title: '', description: '' });

  const isNight = theme === 'night';
  const toggleTheme = () => setTheme(isNight ? 'day' : 'night');

  const openModule = (title) => {
    setModal({
      open: true,
      title,
      description: `You are opening the ${title} module. Here you can access all associated resources, tracking systems, and interactive tools for ${STUDENT_GRADE}.`,
    });
  };
  const showProgressModal = () => openModule('Student Learning Analytics');
  const closeModal = () => setModal({ open: false, title: '', description: '' });

  const query = searchQuery.trim().toLowerCase();

  return (
    <div className={isNight ? 'dark' : ''}>
      <div
        className="rounded-3xl overflow-hidden bg-[#F4F6FB] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 transition-colors duration-300"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* TOP NAVBAR */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <i className="fa-solid fa-magnifying-glass text-sm"></i>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lectures, assignments, or topics..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#161F30] border border-slate-200/80 dark:border-slate-700/60 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-emerald-500 transition shadow-sm"
            />
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center justify-between sm:justify-end space-x-4">
            {/* Theme Toggle Pill Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#161F30] border border-slate-200/80 dark:border-slate-700/60 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition shadow-sm cursor-pointer"
            >
              <i className={`fa-solid ${isNight ? 'fa-sun text-amber-400' : 'fa-moon text-indigo-500'} text-sm`}></i>
              <span>{isNight ? 'Day Mode' : 'Night Mode'}</span>
            </button>

            <div className="flex items-center space-x-3">
              {/* Notification Bell */}
              <div className="relative">
                <button className="w-10 h-10 rounded-xl bg-white dark:bg-[#161F30] border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-emerald-400 transition shadow-sm cursor-pointer">
                  <i className="fa-regular fa-bell text-base"></i>
                </button>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 dark:bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-[#0B0F19]">
                  3
                </span>
              </div>

              {/* User Profile Info */}
              <div className="flex items-center space-x-3 pl-2">
                <img src={AVATAR_URL} alt={STUDENT_NAME} className="w-10 h-10 rounded-full border-2 border-indigo-500 dark:border-emerald-400 object-cover shadow-sm" />
                <div className="hidden md:block">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{STUDENT_NAME}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{STUDENT_GRADE}</p>
                </div>
                <i className="fa-solid fa-chevron-down text-xs text-slate-400 ml-1"></i>
              </div>
            </div>
          </div>
        </header>

        {/* WELCOME BANNER */}
        <div className="relative rounded-2xl bg-gradient-to-r from-violet-100/80 via-purple-50/60 to-indigo-100/60 dark:from-[#161F30] dark:via-[#161F30] dark:to-[#161F30] dark:border dark:border-slate-700/60 p-6 sm:p-8 overflow-hidden shadow-sm transition-all duration-300">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              {isNight ? 'Welcome back' : 'Hello'}, {STUDENT_NAME}! <span className="inline-block">👋</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Let's continue your learning journey today.
            </p>
          </div>

          <div className="hidden sm:block absolute right-4 bottom-0 top-0 w-64 opacity-90 dark:opacity-40 pointer-events-none">
            <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M120 140C155 140 180 115 180 80C180 45 155 20 120 20C85 20 60 45 60 80C60 115 85 140 120 140Z" fill="#818CF8" fillOpacity="0.15" />
              <rect x="110" y="80" width="45" height="30" rx="4" fill="#6366F1" />
              <rect x="113" y="83" width="39" height="22" rx="2" fill="#E0E7FF" />
              <path d="M130 110L100 140H165L135 110H130Z" fill="#94A3B8" />
              <circle cx="150" cy="55" r="14" fill="#FCA5A5" />
              <path d="M136 75C136 68 142 63 150 63C158 63 164 68 164 75V95H136V75Z" fill="#4F46E5" />
              <path d="M80 40L83 46L89 49L83 52L80 58L77 52L71 49L77 46L80 40Z" fill="#F59E0B" />
              <path d="M170 30L172 34L176 36L172 38L170 42L168 38L164 36L168 34L170 30Z" fill="#818CF8" />
            </svg>
          </div>
        </div>

        {/* DASHBOARD CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* QUICK ACCESS SECTION */}
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-4 flex items-center justify-between">
                <span>Quick Access</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {QUICK_ACCESS_CARDS.map((card) => {
                  const matches = !query || (card.title + ' ' + card.desc).toLowerCase().includes(query);
                  return (
                    <div
                      key={card.key}
                      className={`${matches ? 'flex' : 'hidden'} flex-col justify-between group bg-white dark:bg-[#161F30] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all duration-300 ${card.extra || ''}`}
                    >
                      <div>
                        <div className={`w-14 h-14 rounded-2xl ${card.iconWrap} flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                          <i className={card.icon}></i>
                        </div>
                        <h4 className={`font-bold text-slate-900 ${card.title_color} text-center text-sm mb-2`}>{card.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed mb-4">{card.desc}</p>
                      </div>
                      <div className="text-center pt-2">
                        <button
                          onClick={() => openModule(card.title)}
                          className={`w-8 h-8 rounded-full border ${card.btnBorder} ${card.btnText} inline-flex items-center justify-center ${card.btnHover} transition-colors text-xs cursor-pointer`}
                        >
                          <i className="fa-solid fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LEARNING SUMMARY BANNER */}
            <div className="bg-white dark:bg-[#161F30] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-sm transition-all duration-300">
              {!isNight ? (
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-5">Your Learning Summary</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                    <div className="flex items-center space-x-3 pt-2 sm:pt-0 sm:px-2">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg flex-shrink-0">
                        <i className="fa-solid fa-book-open"></i>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Lectures Completed</p>
                        <span className="text-2xl font-black text-slate-900">48</span>
                        <span className="text-[11px] font-bold text-indigo-600 block">This Week</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 pt-3 sm:pt-0 sm:px-2">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-lg flex-shrink-0">
                        <i className="fa-solid fa-clipboard-check"></i>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Assignments Done</p>
                        <span className="text-2xl font-black text-slate-900">23</span>
                        <span className="text-[11px] font-bold text-sky-600 block">This Week</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 pt-3 sm:pt-0 sm:px-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg flex-shrink-0">
                        <i className="fa-solid fa-bullseye"></i>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Exam Score Avg.</p>
                        <span className="text-2xl font-black text-slate-900">87%</span>
                        <span className="text-[11px] font-bold text-emerald-600 block">Excellent</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 pt-3 sm:pt-0 sm:px-2">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg flex-shrink-0">
                        <i className="fa-solid fa-trophy"></i>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Current Level</p>
                        <span className="text-2xl font-black text-slate-900">{STUDENT_GRADE}</span>
                        <span className="text-[11px] font-bold text-amber-600 block">Keep it up!</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                      <i className="fa-solid fa-chart-line"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                        <span>You're on the right track!</span>
                        <span className="text-base">🚀</span>
                      </h3>
                      <p className="text-sm text-slate-400">Keep learning and continue to achieve your goals.</p>
                    </div>
                  </div>
                  <button
                    onClick={showProgressModal}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-xs font-semibold transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>View Full Progress</span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* TODAY'S SCHEDULE CARD */}
            <div className="bg-white dark:bg-[#161F30] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center space-x-2">
                  <i className="fa-regular fa-calendar-check text-indigo-600 dark:text-indigo-400 text-base"></i>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Today's Schedule</h3>
                </div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-slate-400">{isNight ? 'View All' : 'May 21, 2025'}</span>
              </div>

              <div className="space-y-4">
                {SCHEDULE_ITEMS.map((item) => (
                  <div key={item.key} className="flex items-start justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <div className="flex items-start space-x-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.dot} mt-1.5 flex-shrink-0`}></span>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.time}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-md ${item.badge} text-[11px] font-bold`}>{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert('Opening full timetable...'); }}
                  className="inline-flex items-center space-x-2 text-indigo-600 dark:text-emerald-400 font-bold text-xs hover:underline cursor-pointer"
                >
                  <span>View Full Timetable</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </a>
              </div>
            </div>

            {/* OVERALL PROGRESS DONUT CHART CARD */}
            <div className="bg-white dark:bg-[#161F30] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Overall Progress</h3>
                <a href="#" onClick={(e) => { e.preventDefault(); showProgressModal(); }} className="text-xs font-bold text-indigo-600 dark:text-slate-400 hover:underline cursor-pointer">View Details</a>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="relative w-32 h-32 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="12" className="text-slate-100 dark:text-slate-800" fill="transparent" />
                    <circle cx="50" cy="50" r="38" stroke="#6366F1" strokeWidth="12" strokeDasharray="238.76" strokeDashoffset="50" fill="transparent" className="donut-ring" />
                    <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="12" strokeDasharray="238.76" strokeDashoffset="110" fill="transparent" className="donut-ring" />
                    <circle cx="50" cy="50" r="38" stroke="#0EA5E9" strokeWidth="12" strokeDasharray="238.76" strokeDashoffset="170" fill="transparent" className="donut-ring" />
                    <circle cx="50" cy="50" r="38" stroke="#F59E0B" strokeWidth="12" strokeDasharray="238.76" strokeDashoffset="210" fill="transparent" className="donut-ring" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-2xl font-black text-slate-900 dark:text-white block leading-none">78%</span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">Overall</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs font-medium pl-4">
                  {PROGRESS_LEGEND.map((item) => (
                    <div key={item.key} className="flex items-center justify-between space-x-6">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${item.dot}`}></span>
                        <span className="text-slate-600 dark:text-slate-300">{item.label}</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* DAY MODE ENCOURAGEMENT BANNER CARD */}
            {!isNight && (
              <div className="bg-indigo-50/60 dark:bg-transparent rounded-2xl p-5 border border-indigo-100/80 dark:border-transparent flex items-center space-x-4">
                <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center text-emerald-500 text-3xl">
                  <i className="fa-solid fa-book-bookmark text-emerald-500"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                    <span>You're doing great!</span>
                    <span className="text-amber-400">🌟</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                    Keep up the hard work and achieve your goals.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <footer className="pt-8 pb-4 text-center text-xs text-slate-400 dark:text-slate-500 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-center space-x-1">
          <span>© 2025 BrightFuture School. All rights reserved.</span>
          <i className="fa-solid fa-heart text-indigo-500 text-[10px]"></i>
        </footer>

        {/* INTERACTIVE MODAL */}
        {modal.open && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
            <div
              className="bg-white dark:bg-[#161F30] border border-slate-200 dark:border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl transform transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center text-lg">
                    <i className="fa-solid fa-circle-info"></i>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{modal.title}</h3>
                </div>
                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                  <i className="fa-solid fa-xmark text-lg"></i>
                </button>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{modal.description}</p>

              <div className="flex items-center justify-end space-x-3">
                <button onClick={closeModal} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer">
                  Close
                </button>
                <button onClick={closeModal} className="px-4 py-2 rounded-xl bg-indigo-600 dark:bg-emerald-500 text-white dark:text-slate-900 text-xs font-bold hover:bg-indigo-700 dark:hover:bg-emerald-400 transition cursor-pointer">
                  Proceed to Portal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
