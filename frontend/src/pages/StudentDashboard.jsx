import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AVATAR_URL = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: 'fa-house', color: 'text-green-500' },
  { key: 'classrooms', label: 'Classrooms', icon: 'fa-school', color: 'text-indigo-500' },
  { key: 'lms', label: 'LMS Lectures & HW', icon: 'fa-book-open', color: 'text-blue-500' },
  { key: 'exam', label: 'Smart Exam Hall', icon: 'fa-clipboard-check', color: 'text-amber-500' },
  { key: 'quran', label: 'Quran Progression Log', icon: 'fa-book-quran', color: 'text-green-400' },
  { key: 'skills', label: 'Future Skills Lab', icon: 'fa-rocket', color: 'text-pink-500' },
  { key: 'billing', label: 'Tuition Billing', icon: 'fa-credit-card', color: 'text-amber-400' },
  { key: 'messages', label: 'Message Tutor', icon: 'fa-comment-dots', color: 'text-sky-400' },
  { key: 'ai', label: 'AI Tutor', icon: 'fa-robot', color: 'text-teal-400' },
];

const QUICK_ACCESS = [
  { key: 'classrooms', title: 'Classrooms', desc: 'Join your classes and view schedules.', icon: 'fa-school', bg: 'bg-green-500', chip: 'bg-green-50 dark:bg-green-950/40 text-green-500', border: 'hover:border-green-500/50' },
  { key: 'lms', title: 'LMS Lectures & HW', desc: 'Access your lectures, notes and homework.', icon: 'fa-book-open', bg: 'bg-blue-500', chip: 'bg-blue-50 dark:bg-blue-950/40 text-blue-500', border: 'hover:border-blue-500/50' },
  { key: 'exam', title: 'Smart Exam Hall', desc: 'Take your exams and check results.', icon: 'fa-clipboard-check', bg: 'bg-purple-600', chip: 'bg-purple-50 dark:bg-purple-950/40 text-purple-500', border: 'hover:border-purple-500/50' },
  { key: 'quran', title: 'Quran Progression Log', desc: 'Track your daily Quran learning progress.', icon: 'fa-book-quran', bg: 'bg-green-600', chip: 'bg-green-50 dark:bg-green-950/40 text-green-500', border: 'hover:border-green-500/50' },
  { key: 'skills', title: 'Future Skills Lab', desc: 'Learn coding, AI and future skills.', icon: 'fa-rocket', bg: 'bg-pink-500', chip: 'bg-pink-50 dark:bg-pink-950/40 text-pink-500', border: 'hover:border-pink-500/50' },
  { key: 'billing', title: 'Tuition Billing', desc: 'View your fee details and payment history.', icon: 'fa-credit-card', bg: 'bg-amber-500', chip: 'bg-amber-50 dark:bg-amber-950/40 text-amber-500', border: 'hover:border-amber-500/50' },
  { key: 'messages', title: 'Message Tutor', desc: 'Chat with your teachers anytime.', icon: 'fa-comment-dots', bg: 'bg-sky-500', chip: 'bg-sky-50 dark:bg-sky-950/40 text-sky-500', border: 'hover:border-sky-500/50' },
  { key: 'ai', title: 'AI Tutor', desc: 'Ask anything and get instant help.', icon: 'fa-robot', bg: 'bg-teal-500', chip: 'bg-teal-50 dark:bg-teal-950/40 text-teal-500', border: 'hover:border-teal-500/50' },
];

export default function StudentDashboard() {
  const { user, logout, switchRole } = useAuth();

  // Shell / chrome state
  const [isDark, setIsDark] = useState(true);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const goToPage = (page) => {
    setActivePage(page);
    setMobileSidebarOpen(false);
  };

  // Data state
  const [lessons, setLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  // Student Islamic data
  const [islamicProfile, setIslamicProfile] = useState(null);
  const [islamicLogs, setIslamicLogs] = useState([]);

  // Skills Lab
  const [skillProgress, setSkillProgress] = useState([]);
  const [projects, setProjects] = useState([]);

  // Billing
  const [invoices, setInvoices] = useState([]);

  // Interactive Form state
  const [uploadingAssignmentId, setUploadingAssignmentId] = useState(null);
  const [mockFileName, setMockFileName] = useState('addition_exercise_done.pdf');
  const [isSubmittingHW, setIsSubmittingHW] = useState(false);

  // Skill Project submit state
  const [newProjTrack, setNewProjTrack] = useState(1); // default AI
  const [newProjTitle, setNewProjTitle] = useState('My Neural Network Diagram');
  const [newProjUrl, setNewProjUrl] = useState('https://github.com/zayd/neural-net-design');

  // Exam Simulator states
  const [exams, setExams] = useState([]);
  const [activeExam, setActiveExam] = useState(null);
  const [examStarted, setExamStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [subjectiveAnswer, setSubjectiveAnswer] = useState('');
  const [violationsCount, setViolationsCount] = useState(0);
  const [violationsLog, setViolationsLog] = useState([]);
  const [examFinished, setExamFinished] = useState(false);
  const [examScore, setExamScore] = useState(null);

  // Billing modals
  const [selectedInvoiceToPay, setSelectedInvoiceToPay] = useState(null);

  // Chat & AI states
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInputText, setChatInputText] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { id: 1, sender: 'ai', text: "👋 Hello! I am your Bright Future AI Tutor. Ask me anything about Math, Python loops, or Quran Surahs, and let's learn together!" }
  ]);
  const [aiInputText, setAiInputText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [geminiKeyInput, setGeminiKeyInput] = useState(localStorage.getItem('gemini_api_key') || '');
  const [showApiKeySetting, setShowApiKeySetting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const lessonsData = await api.getLessons();
      const ip = await api.getIslamicProfile(3);
      const logs = await api.getDailyProgressLogs(ip?.id || 1);
      const skp = await api.getSkillProgress(3);
      const projs = await api.getProjects(3);
      const invs = await api.getInvoices(3);
      const exms = await api.getExams();

      setLessons(lessonsData);
      if (lessonsData.length > 0) {
        setActiveLesson(lessonsData[0]);
      }
      setIslamicProfile(ip);
      setIslamicLogs(logs);
      setSkillProgress(skp);
      setProjects(projs);
      setInvoices(invs);
      setExams(exms);

      try {
        const chatMsgs = await api.getChatMessages(2);
        setChatMessages(chatMsgs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (activeLesson) {
      const fetchLessonAssignments = async () => {
        const assigns = await api.getAssignments(activeLesson.id);
        setAssignments(assigns);

        const subs = await api.getSubmissions();
        setSubmissions(subs);
      };
      fetchLessonAssignments();
    }
  }, [activeLesson]);

  const handleSubmitHW = async (e) => {
    e.preventDefault();
    if (!uploadingAssignmentId) return;
    setIsSubmittingHW(true);

    const subData = {
      assignment: uploadingAssignmentId,
      student: 3,
      fileName: mockFileName
    };
    const newSub = await api.submitAssignment(subData);
    setSubmissions([newSub, ...submissions.filter(s => s.assignment !== uploadingAssignmentId)]);
    setUploadingAssignmentId(null);
    setIsSubmittingHW(false);
    alert('Worksheet file submitted successfully to your Instructor!');
  };

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    const projData = {
      track: newProjTrack,
      student: 3,
      title: newProjTitle,
      project_url: newProjUrl
    };
    const newProj = await api.submitProject(projData);
    setProjects([newProj, ...projects]);
    setNewProjTitle('');
    alert('Project portfolio file uploaded! Graded updates will show in reviews.');

    const skp = await api.getSkillProgress(3);
    setSkillProgress(skp);
  };

  const handleStartExam = (exam) => {
    setActiveExam(exam);
    setExamStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setSubjectiveAnswer('');
    setViolationsCount(0);
    setViolationsLog([]);
    setExamFinished(false);
  };

  const triggerMockViolation = async (type) => {
    const confidence = (Math.random() * 5 + 95).toFixed(2);
    const newV = {
      id: violationsLog.length + 1,
      attempt: 1,
      timestamp: new Date().toLocaleTimeString(),
      violation_type: type,
      confidence_score: confidence
    };

    await api.logProctoringViolation({
      attempt: 1,
      violation_type: type,
      confidence_score: confidence
    });

    setViolationsLog([newV, ...violationsLog]);
    setViolationsCount(prev => prev + 1);

    let label = 'Violation Detected';
    if (type === 'TAB_SWITCH') label = 'Browser Tab Switch Detected!';
    if (type === 'FACE_NOT_FOUND') label = 'No Face Detected in Camera Feed!';
    if (type === 'SPEECH_DETECTED') label = 'Speech/Voice Detected by Microphone!';

    alert(`[AI PROCTORING ALERT] ${label}\nConfidence Score: ${confidence}%`);
  };

  const handleNextQuestion = () => {
    if (activeExam && activeExam.questions && currentQuestionIndex < activeExam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishExam = async () => {
    if (!activeExam || !activeExam.questions || activeExam.questions.length === 0) return;
    let scoreCount = 0;
    activeExam.questions.forEach((q, idx) => {
      if (q.type === 'MCQ' && selectedAnswers[idx] === q.correct_answer) {
        scoreCount += 1;
      } else if (q.type === 'SUBJECTIVE') {
        scoreCount += 1;
      }
    });

    const calculatedScore = ((scoreCount / activeExam.questions.length) * 100).toFixed(2);

    await api.submitExamAttempt({
      exam: activeExam.id,
      score: parseFloat(calculatedScore)
    });

    setExamScore(calculatedScore);
    setExamFinished(true);
  };

  const handlePayInvoice = async (method) => {
    if (!selectedInvoiceToPay) return;
    await api.payInvoice(selectedInvoiceToPay.id, method);

    setInvoices(invoices.map(inv => inv.id === selectedInvoiceToPay.id ? { ...inv, status: 'PAID', payment_method: method } : inv));
    setSelectedInvoiceToPay(null);
    alert('Bill payment processed successfully through ' + method.replace('_', ' ') + '!');
  };

  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;
    try {
      const newMsg = await api.sendChatMessage(2, chatInputText.trim());
      setChatMessages(prev => [...prev, newMsg]);
      setChatInputText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendAiMessage = async (e) => {
    e.preventDefault();
    if (!aiInputText.trim()) return;
    const userPrompt = aiInputText.trim();
    setAiInputText('');

    const userMsg = { id: Date.now(), sender: 'user', text: userPrompt };
    setAiMessages(prev => [...prev, userMsg]);
    setAiLoading(true);

    try {
      const aiReply = await api.askAI(userPrompt, 'STUDENT');
      const aiMsg = { id: Date.now() + 1, sender: 'ai', text: aiReply };
      setAiMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errMsg = { id: Date.now() + 1, sender: 'ai', text: "❌ Sorry, I had trouble contacting my neural engines. Please check your internet connection or Gemini API key setting." };
      setAiMessages(prev => [...prev, errMsg]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSaveGeminiKey = (e) => {
    e.preventDefault();
    if (geminiKeyInput.trim()) {
      localStorage.setItem('gemini_api_key', geminiKeyInput.trim());
      alert('Gemini API key saved locally! Real-time responses are now enabled.');
    } else {
      localStorage.removeItem('gemini_api_key');
      alert('Gemini API key cleared. Running in simulated fallback mode.');
    }
    setShowApiKeySetting(false);
  };

  const studentName = user?.name || 'Student';
  const studentGrade = user?.student_profile?.current_level
    ? `${user.student_profile.current_level.charAt(0)}${user.student_profile.current_level.slice(1).toLowerCase()} Level`
    : 'Grade 1 Pupil';

  const pendingAssignments = assignments.filter(a => !submissions.find(s => s.assignment === a.id && s.student === 3));

  return (
    <div className="bg-gray-100 text-gray-800 dark:bg-darkbg-main dark:text-gray-100 min-h-screen flex flex-col md:flex-row antialiased transition-colors duration-300">

      {/* SIDEBAR NAV */}
      <aside className={`w-full md:w-64 bg-white dark:bg-darkbg-sidebar border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between shrink-0 transition-all duration-300 z-30 fixed md:relative inset-y-0 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${desktopSidebarOpen ? '' : 'md:-ml-64'}`}>
        <div>
          <div className="p-5 flex items-center justify-between border-b border-gray-100 dark:border-gray-800/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-500 to-green-400 flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                <i className="fa-solid fa-graduation-cap text-lg"></i>
              </div>
              <div>
                <h1 className="font-extrabold text-sm tracking-tight text-gray-900 dark:text-white uppercase">BRIGHT FUTURE</h1>
                <p className="text-xs font-semibold text-green-600 dark:text-green-400 tracking-wider">SCHOOL</p>
              </div>
            </div>
            <button onClick={() => setMobileSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer">
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <nav className="p-3 space-y-1 text-sm font-medium">
            {NAV_ITEMS.map(item => (
              <button
                key={item.key}
                onClick={() => goToPage(item.key)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${activePage === item.key ? 'text-green-600 bg-green-50 dark:bg-green-950/40 dark:text-green-400 font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white'}`}
              >
                <i className={`fa-solid ${item.icon} w-5 text-center ${item.color}`}></i>
                <span>{item.label}</span>
              </button>
            ))}

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800/60">
              <button
                onClick={() => goToPage('settings')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${activePage === 'settings' ? 'text-green-600 bg-green-50 dark:bg-green-950/40 dark:text-green-400 font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white'}`}
              >
                <i className="fa-solid fa-gear w-5 text-center text-gray-400"></i>
                <span>Settings</span>
              </button>
            </div>
          </nav>
        </div>

        <div className="p-3">
          <div className="bg-gray-50 dark:bg-darkbg-card/70 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
              <i className="fa-solid fa-headset text-lg"></i>
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">Need Help?</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">We're here to help you!</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div onClick={() => setMobileSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-20 md:hidden"></div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">

        {/* TOP HEADER BAR */}
        <header className="sticky top-0 z-10 bg-white/90 dark:bg-darkbg-main/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800/80 px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button
              onClick={() => {
                if (window.innerWidth < 768) setMobileSidebarOpen(o => !o);
                else setDesktopSidebarOpen(o => !o);
              }}
              title="Toggle Main Menu"
              className="text-gray-600 dark:text-gray-300 p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-bars text-lg"></i>
            </button>
            <div className="relative w-full">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for lessons, homework, classes..."
                className="w-full bg-gray-100 dark:bg-darkbg-card border border-transparent focus:border-green-500 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button onClick={() => setIsDark(d => !d)} title="Toggle Day/Dark Mode" className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-darkbg-card text-gray-600 dark:text-gray-300 hover:text-green-500 transition-all cursor-pointer">
              <i className={`fa-solid ${isDark ? 'fa-moon' : 'fa-sun'} text-base`}></i>
            </button>

            <div className="relative">
              <button onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }} className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-darkbg-card text-gray-600 dark:text-gray-300 hover:text-green-500 transition-all cursor-pointer">
                <i className="fa-regular fa-bell text-base"></i>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">{pendingAssignments.length || 3}</span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl z-50 p-3">
                  <div className="flex justify-between items-center mb-2 px-1">
                    <h5 className="text-xs font-bold text-gray-900 dark:text-white">Notifications</h5>
                    <span className="text-[10px] text-green-500 font-medium cursor-pointer">Mark all read</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/30 text-gray-700 dark:text-gray-300">
                      <p className="font-semibold text-green-600 dark:text-green-400">Homework Reminder</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">{pendingAssignments[0]?.title || 'Worksheet'} due soon</p>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">
                      <p className="font-semibold text-gray-900 dark:text-white">Exam Graded</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">Check your latest result in Smart Exam Hall</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => goToPage('messages')} className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-darkbg-card text-gray-600 dark:text-gray-300 hover:text-green-500 transition-all cursor-pointer">
                <i className="fa-regular fa-envelope text-base"></i>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 text-white text-[10px] font-bold flex items-center justify-center">{chatMessages.length > 0 ? Math.min(chatMessages.length, 9) : 2}</span>
              </button>
            </div>

            <div className="relative">
              <button onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }} className="flex items-center gap-3 pl-2 border-l border-gray-200 dark:border-gray-800 cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center overflow-hidden">
                  <img src={AVATAR_URL} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{studentName}</div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400">{studentGrade}</div>
                </div>
                <i className="fa-solid fa-chevron-down text-xs text-gray-400 hidden sm:block"></i>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl z-50 p-2 text-xs">
                  <button onClick={() => { goToPage('settings'); setProfileOpen(false); }} className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300 flex items-center gap-2 cursor-pointer">
                    <i className="fa-solid fa-gear text-gray-400"></i> Settings
                  </button>
                  <div className="my-1 border-t border-gray-100 dark:border-gray-800"></div>
                  <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Quick View</div>
                  <button onClick={() => switchRole('ADMIN')} className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/60 text-indigo-500 font-medium cursor-pointer">Admin</button>
                  <button onClick={() => switchRole('TEACHER')} className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/60 text-green-500 font-medium cursor-pointer">Teacher</button>
                  <button onClick={() => switchRole('PARENT')} className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/60 text-pink-500 font-medium cursor-pointer">Parent</button>
                  <div className="my-1 border-t border-gray-100 dark:border-gray-800"></div>
                  <button onClick={logout} className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 font-semibold flex items-center gap-2 cursor-pointer">
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN DYNAMIC CONTENT CONTAINER */}
        <main className="p-4 md:p-8 space-y-6">

          {/* ================= PAGE: DASHBOARD ================= */}
          {activePage === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

                {/* STUDENT WELCOME BANNER */}
                <div className="lg:col-span-8 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-darkbg-card dark:to-[#0f182b] border border-green-200/60 dark:border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-sm">
                  <div className="space-y-4 z-10 max-w-md text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                      Welcome back, {studentName}! 👋
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-normal">
                      Keep going! Your future is bright. Let's make today a great day for learning.
                    </p>
                    <div className="pt-2">
                      <button onClick={() => goToPage('lms')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-all shadow-lg shadow-green-500/25 group cursor-pointer">
                        <span>Continue Learning</span>
                        <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 md:mt-0 relative shrink-0 w-64 h-48 md:h-52 flex items-center justify-center">
                    <svg className="w-full h-full drop-shadow-xl" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="20" y="180" width="280" height="12" rx="4" fill="#2d3748" />
                      <rect x="30" y="192" width="260" height="20" rx="2" fill="#1a202c" opacity="0.6" />

                      <path d="M45 180 L55 180 L52 155 L48 155 Z" fill="#e2e8f0" />
                      <path d="M50 155 C40 140 30 145 35 130 C45 135 48 145 50 155 Z" fill="#22c55e" />
                      <path d="M50 155 C60 140 70 145 65 130 C55 135 52 145 50 155 Z" fill="#16a34a" />
                      <path d="M50 155 C50 135 42 125 50 120 C58 125 50 135 50 155 Z" fill="#4ade80" />

                      <rect x="235" y="166" width="60" height="14" rx="2" fill="#f59e0b" />
                      <rect x="238" y="152" width="55" height="14" rx="2" fill="#10b981" />
                      <rect x="242" y="138" width="50" height="14" rx="2" fill="#3b82f6" />

                      <path d="M110 180 C110 130 210 130 210 180 Z" fill="#16a34a" />
                      <path d="M135 135 L160 180 L185 135 Z" fill="#15803d" opacity="0.4" />
                      <path d="M152 135 L152 155" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                      <path d="M168 135 L168 155" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

                      <path d="M120 172 L200 172 L195 182 L125 182 Z" fill="#ffffff" />
                      <line x1="160" y1="172" x2="160" y2="182" stroke="#cbd5e1" strokeWidth="2" />
                      <rect x="135" y="162" width="22" height="4" rx="1" transform="rotate(-25 135 162)" fill="#2563eb" />

                      <circle cx="160" cy="100" r="32" fill="#fcd34d" />
                      <path d="M128 98 C128 68 192 68 192 98 C185 75 135 75 128 98 Z" fill="#1e293b" />
                      <path d="M130 85 C140 70 170 70 188 82 C175 75 145 75 130 85 Z" fill="#0f172a" />
                      <g className="student-eyes">
                        <circle cx="148" cy="100" r="5" fill="#0f172a" />
                        <circle cx="172" cy="100" r="5" fill="#0f172a" />
                        <circle cx="149" cy="98" r="1.5" fill="#ffffff" />
                        <circle cx="173" cy="98" r="1.5" fill="#ffffff" />
                      </g>
                      <path d="M142 90 Q148 87 154 90" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                      <path d="M166 90 Q172 87 178 90" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                      <path d="M152 110 Q160 118 168 110" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    </svg>
                  </div>
                </div>

                {/* AI TUTOR AGENT CARD */}
                <div className="lg:col-span-4 bg-gradient-to-br from-sky-50 to-blue-100/60 dark:from-darkbg-card dark:to-[#0c1e38] border border-sky-200/70 dark:border-gray-800 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 tracking-wider uppercase">Hi! I'm</span>
                      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-1.5">
                        Tutor <i className="fa-solid fa-sparkles text-amber-400 text-sm animate-pulse"></i>
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Your AI study buddy</p>
                    </div>

                    <div className="bot-container w-24 h-24 relative shrink-0">
                      <svg className="w-full h-full bot-glow" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="botHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="100%" stopColor="#cbd5e1" />
                          </linearGradient>
                          <linearGradient id="visorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#0f172a" />
                            <stop offset="100%" stopColor="#1e293b" />
                          </linearGradient>
                          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e2e8f0" />
                            <stop offset="100%" stopColor="#94a3b8" />
                          </linearGradient>
                        </defs>

                        <line x1="100" y1="45" x2="100" y2="25" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                        <circle cx="100" cy="22" r="7" fill="#38bdf8" className="animate-ping" opacity="0.7" />
                        <circle cx="100" cy="22" r="6" fill="#0ea5e9" />

                        <rect x="65" y="125" width="70" height="50" rx="20" fill="url(#bodyGrad)" />
                        <path d="M100 138 L103 145 L110 145 L104 149 L106 156 L100 151 L94 156 L96 149 L90 145 L97 145 Z" fill="#3b82f6" />

                        <rect x="42" y="132" width="18" height="30" rx="9" fill="#94a3b8" transform="rotate(15 42 132)" />

                        <g className="bot-arm-right">
                          <rect x="140" y="130" width="18" height="36" rx="9" fill="#0ea5e9" />
                          <circle cx="149" cy="168" r="7" fill="#38bdf8" />
                        </g>

                        <rect x="45" y="45" width="110" height="80" rx="35" fill="url(#botHeadGrad)" stroke="#38bdf8" strokeWidth="2" />
                        <rect x="56" y="56" width="88" height="58" rx="24" fill="url(#visorGrad)" />

                        <g className="bot-eye">
                          <ellipse cx="80" cy="85" rx="10" ry="14" fill="#38bdf8" />
                          <ellipse cx="120" cy="85" rx="10" ry="14" fill="#38bdf8" />
                          <circle cx="82" cy="80" r="3" fill="#ffffff" />
                          <circle cx="122" cy="80" r="3" fill="#ffffff" />
                        </g>

                        <path d="M92 98 Q100 104 108 98" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-3 bg-white/80 dark:bg-darkbg-card/90 border border-sky-100 dark:border-gray-800 rounded-2xl p-3 text-xs text-gray-700 dark:text-gray-300">
                    <p className="font-semibold text-gray-900 dark:text-white mb-0.5">Ask me anything!</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">I can help you with lessons, homework, explanations and more.</p>
                  </div>

                  <button onClick={() => goToPage('ai')} className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs transition-all shadow-md shadow-sky-500/20 cursor-pointer">
                    <span>Chat with Tutor</span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </button>
                </div>
              </div>

              {/* 8-CARD QUICK ACCESS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {QUICK_ACCESS.map(card => (
                  <div key={card.key} onClick={() => goToPage(card.key)} className={`group cursor-pointer bg-white dark:bg-darkbg-card border border-gray-200/80 dark:border-gray-800 rounded-2xl p-5 ${card.border} hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[140px]`}>
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center text-white text-xl shadow-md`}>
                        <i className={`fa-solid ${card.icon}`}></i>
                      </div>
                      <div className={`w-8 h-8 rounded-full ${card.chip} flex items-center justify-center text-xs group-hover:translate-x-1 transition-transform`}>
                        <i className="fa-solid fa-arrow-right"></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-base">{card.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* BOTTOM WIDGETS ROW */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white dark:bg-darkbg-card border border-gray-200/80 dark:border-gray-800 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center">
                        <i className="fa-regular fa-calendar-days text-sm"></i>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">Today's Classes</h4>
                    </div>
                    <button onClick={() => goToPage('classrooms')} className="text-xs font-semibold text-green-600 dark:text-green-400 hover:underline cursor-pointer">View All</button>
                  </div>
                  <div className="space-y-3">
                    {lessons.length > 0 ? lessons.slice(0, 2).map(l => (
                      <div key={l.id} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/40">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-green-500 font-bold"><i className="fa-regular fa-clock"></i> {l.scheduled_time ? new Date(l.scheduled_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'TBD'}</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">{l.title}</span>
                        </div>
                      </div>
                    )) : (
                      <p className="text-xs text-gray-500 italic">No classes scheduled yet.</p>
                    )}
                  </div>
                </div>

                <div className="bg-white dark:bg-darkbg-card border border-gray-200/80 dark:border-gray-800 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                        <i className="fa-solid fa-list-check text-sm"></i>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">Homework</h4>
                    </div>
                    <button onClick={() => goToPage('lms')} className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer">View All</button>
                  </div>
                  <div className="space-y-3">
                    {pendingAssignments.length > 0 ? pendingAssignments.slice(0, 2).map(a => (
                      <div key={a.id} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/40 text-xs">
                        <span className="font-medium text-gray-800 dark:text-gray-200 line-clamp-1">{a.title}</span>
                        <span className="text-amber-500 font-semibold text-[11px] shrink-0 ml-2">Due {new Date(a.due_date).toLocaleDateString()}</span>
                      </div>
                    )) : (
                      <p className="text-xs text-gray-500 italic">No pending homework. Great job!</p>
                    )}
                  </div>
                </div>

                <div className="bg-white dark:bg-darkbg-card border border-gray-200/80 dark:border-gray-800 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <i className="fa-solid fa-bullhorn text-sm"></i>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">Announcements</h4>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></span>
                      <span>School closed on Friday for Teacher Training.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></span>
                      <span>Annual Science exhibition next week.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ================= PAGE: CLASSROOMS ================= */}
          {activePage === 'classrooms' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Virtual Classrooms</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Join your scheduled live classes and view recordings.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-semibold">{lessons.length} Classes</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {lessons.map((l, idx) => (
                  <div key={l.id} className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      {idx === 0 && l.zoom_link ? (
                        <span className="px-2.5 py-1 rounded-lg bg-green-500/10 text-green-500 text-xs font-bold">LIVE NOW</span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-500 text-xs font-bold">UPCOMING</span>
                      )}
                      <span className="text-xs text-gray-400"><i className="fa-regular fa-clock"></i> {l.scheduled_time ? new Date(l.scheduled_time).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'TBD'}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{l.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Course #{l.course}</p>
                    </div>
                    <div className="pt-2">
                      {l.zoom_link ? (
                        <a href={l.zoom_link} target="_blank" rel="noreferrer" className="block text-center w-full py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs font-semibold transition-all">Join Class Now</a>
                      ) : (
                        <button className="w-full py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400 text-xs font-semibold cursor-not-allowed">No Live Link Yet</button>
                      )}
                    </div>
                  </div>
                ))}
                {lessons.length === 0 && (
                  <p className="text-xs text-gray-500 italic py-4 col-span-full text-center">No classrooms scheduled in the curriculum database.</p>
                )}
              </div>
            </div>
          )}

          {/* ================= PAGE: LMS LECTURES & HW ================= */}
          {activePage === 'lms' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">LMS Lectures & Assignments</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Watch recorded lectures and upload your completed assignments.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-2xl p-5 lg:col-span-1 space-y-3">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
                    <i className="fa-solid fa-book-open text-green-500"></i>
                    Lecture Modules
                  </h3>
                  <div className="space-y-2">
                    {lessons.map(l => (
                      <button
                        key={l.id}
                        onClick={() => setActiveLesson(l)}
                        className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between gap-3 cursor-pointer ${activeLesson?.id === l.id ? 'bg-green-500/10 border-green-500 text-green-600 dark:text-green-400' : 'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                      >
                        <span className="font-bold text-xs line-clamp-1">{l.title}</span>
                        <i className="fa-solid fa-circle-play shrink-0"></i>
                      </button>
                    ))}
                  </div>
                </div>

                {activeLesson ? (
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[9px] font-extrabold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/25 px-2 py-0.5 rounded-md uppercase tracking-wider">Course #{activeLesson.course}</span>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1.5">{activeLesson.title}</h3>
                        </div>
                        {activeLesson.zoom_link && (
                          <a href={activeLesson.zoom_link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3.5 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-bold shadow-lg live-pulse transition shrink-0">
                            <i className="fa-solid fa-video"></i>
                            Join Live Class
                          </a>
                        )}
                      </div>

                      {activeLesson.video_url && (
                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-900 border border-gray-800 shadow-inner">
                          <iframe src={activeLesson.video_url} title={activeLesson.title} allowFullScreen className="w-full h-full border-none"></iframe>
                        </div>
                      )}

                      <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
                        <p>{activeLesson.content_body}</p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-4">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
                        <i className="fa-solid fa-file-lines text-indigo-500"></i>
                        Attached Homework Tasks
                      </h4>

                      {assignments.length > 0 ? (
                        <div className="space-y-4">
                          {assignments.map(ass => {
                            const sub = submissions.find(s => s.assignment === ass.id && s.student === 3);
                            return (
                              <div key={ass.id} className="p-4 bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl space-y-3">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="space-y-1">
                                    <h5 className="text-sm font-bold text-gray-900 dark:text-white">{ass.title}</h5>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{ass.instructions}</p>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold">Due Date: {new Date(ass.due_date).toLocaleString()}</p>
                                  </div>
                                  <div>
                                    {sub ? (
                                      <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                                        <i className="fa-solid fa-circle-check"></i>
                                        Submitted
                                      </span>
                                    ) : (
                                      <span className="text-xs font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">Pending</span>
                                    )}
                                  </div>
                                </div>

                                {sub && sub.grade && (
                                  <div className="p-3 bg-white dark:bg-darkbg-main/60 rounded-lg border border-gray-200 dark:border-gray-800 text-xs">
                                    <div className="flex items-center justify-between font-bold text-green-600 dark:text-green-400 mb-1">
                                      <span>Grade Result: {sub.grade}</span>
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 italic">Teacher's Note: "{sub.teacher_feedback}"</p>
                                  </div>
                                )}

                                {!sub && (
                                  <div>
                                    {uploadingAssignmentId === ass.id ? (
                                      <form onSubmit={handleSubmitHW} className="flex flex-col sm:flex-row gap-3 items-end pt-2">
                                        <div className="flex-1 w-full">
                                          <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">File Upload Attachment</label>
                                          <input
                                            type="text"
                                            value={mockFileName}
                                            onChange={(e) => setMockFileName(e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkbg-main rounded-xl text-xs text-gray-800 dark:text-white"
                                          />
                                        </div>
                                        <div className="flex gap-2">
                                          <button type="submit" disabled={isSubmittingHW} className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-bold cursor-pointer transition">Submit</button>
                                          <button type="button" onClick={() => setUploadingAssignmentId(null)} className="px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl text-xs cursor-pointer">Cancel</button>
                                        </div>
                                      </form>
                                    ) : (
                                      <button onClick={() => setUploadingAssignmentId(ass.id)} className="flex items-center gap-2 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition cursor-pointer">
                                        <i className="fa-solid fa-upload"></i>
                                        Upload Completed Worksheet
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-500 italic py-2">No homework worksheets attached to this lesson module.</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="lg:col-span-2 text-center text-gray-400 py-12">Select a lecture module to begin learning.</p>
                )}
              </div>
            </div>
          )}

          {/* ================= PAGE: SMART EXAM HALL ================= */}
          {activePage === 'exam' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Smart Exam Hall</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Sit scheduled exams under secure, AI-assisted proctoring environments.</p>
              </div>

              {!examStarted ? (
                <div className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6 max-w-xl mx-auto space-y-5">
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-300 rounded-xl flex gap-3 text-xs">
                    <i className="fa-solid fa-shield mt-0.5"></i>
                    <div>
                      <h4 className="font-bold">AI Proctoring Policy</h4>
                      <p className="mt-1 leading-relaxed">This exam session utilizes automatic screen visibility trackers and webcam logs to prevent academic dishonesty. Switching browser tabs, leaving the camera frame, or detection of voice transcripts will flag a violation log immediately.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Available Exams</h3>
                    {exams && exams.length > 0 ? (
                      exams.map(exam => (
                        <div key={exam.id} className="p-4 bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-between gap-4">
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">{exam.title}</h4>
                            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                              <span>Duration: {exam.duration_minutes} minutes</span>
                              <span>•</span>
                              <span className="text-green-600 dark:text-green-400 font-medium">Proctor Active</span>
                            </div>
                          </div>
                          <button onClick={() => handleStartExam(exam)} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition cursor-pointer shrink-0">Start Exam</button>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-500 italic py-4 text-center">No scheduled exams available in the curriculum database.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-1 space-y-5">
                    <div className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-2xl p-4 space-y-3">
                      <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <i className="fa-solid fa-camera text-rose-500"></i>
                        AI Proctor Webcam Feed
                      </h4>
                      <div className="aspect-video w-full rounded-xl bg-gray-900 border border-gray-800 relative flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                          <div className="w-16 h-16 border-2 border-green-500 rounded-full animate-ping"></div>
                        </div>
                        <i className="fa-solid fa-camera text-4xl text-gray-700"></i>
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center bg-slate-950/80 px-2 py-1.5 rounded-lg border border-gray-800 text-[9px] font-bold">
                          <span className="flex items-center gap-1 text-green-400">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                            ACTIVE
                          </span>
                          <span className="text-gray-400">Face Detected: Yes</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Simulate Proctor Triggers</p>
                        <div className="grid grid-cols-1 gap-2">
                          <button onClick={() => triggerMockViolation('TAB_SWITCH')} className="py-1.5 px-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-amber-500/40 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg text-[10px] text-left transition cursor-pointer">⚠️ Flag Tab Switch</button>
                          <button onClick={() => triggerMockViolation('FACE_NOT_FOUND')} className="py-1.5 px-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-amber-500/40 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg text-[10px] text-left transition cursor-pointer">⚠️ Flag No Face</button>
                          <button onClick={() => triggerMockViolation('SPEECH_DETECTED')} className="py-1.5 px-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-amber-500/40 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg text-[10px] text-left transition cursor-pointer">⚠️ Flag Speech Detected</button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-2xl p-4 space-y-3">
                      <h4 className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center justify-between">
                        <span>Incident Log</span>
                        <span className="px-2 py-0.5 bg-rose-500/10 text-rose-500 text-[10px] rounded-full border border-rose-500/20">{violationsCount} Flagged</span>
                      </h4>
                      <div className="space-y-2.5 max-h-[200px] overflow-y-auto pr-1">
                        {violationsLog.length > 0 ? (
                          violationsLog.map(v => (
                            <div key={v.id} className="p-2.5 bg-rose-500/5 border border-rose-500/20 rounded-lg text-[10px]">
                              <div className="flex justify-between font-bold text-rose-500">
                                <span>{v.violation_type.replace('_', ' ')}</span>
                                <span>{v.timestamp}</span>
                              </div>
                              <p className="text-gray-500 mt-1">Confidence: {v.confidence_score}%</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-[10px] text-gray-500 italic py-2 text-center">No proctor incidents recorded yet.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-3 space-y-5">
                    {examFinished ? (
                      <div className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-3xl p-8 text-center space-y-6 animate-scale-in">
                        <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center justify-center text-green-500 mx-auto">
                          <i className="fa-solid fa-check text-3xl"></i>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Exam Session Submitted</h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Your attempt has been finalized and processed by AI engines.</p>
                        </div>
                        <div className="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl max-w-sm mx-auto">
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Evaluated Score</span>
                          <h4 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2">{examScore}%</h4>
                          <span className="text-[10px] text-gray-500 block mt-2">Incidents: {violationsCount} logged</span>
                        </div>
                        <button onClick={() => { setExamStarted(false); setActiveExam(null); }} className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition cursor-pointer">Return to Hall</button>
                      </div>
                    ) : (
                      <div className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-6 flex flex-col justify-between min-h-[450px]">
                        {activeExam && activeExam.questions && activeExam.questions.length > 0 ? (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{activeExam.title}</h3>
                                <span className="text-xs text-gray-500">Question {currentQuestionIndex + 1} of {activeExam.questions.length}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 border border-gray-200 dark:border-gray-800 rounded-xl">
                                <i className="fa-regular fa-clock text-amber-500"></i>
                                <span>Timer: 24:12</span>
                              </div>
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-xl">
                              <p className="text-sm font-semibold text-gray-900 dark:text-white leading-relaxed">{activeExam.questions[currentQuestionIndex]?.text}</p>
                            </div>

                            {activeExam.questions[currentQuestionIndex]?.type === 'MCQ' ? (
                              <div className="grid grid-cols-1 gap-3">
                                {(activeExam.questions[currentQuestionIndex]?.options || []).map(opt => (
                                  <button
                                    key={opt}
                                    onClick={() => setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: opt })}
                                    className={`w-full text-left p-4 rounded-xl border text-xs font-medium transition cursor-pointer ${selectedAnswers[currentQuestionIndex] === opt ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'bg-gray-50 dark:bg-gray-900/60 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 text-gray-700 dark:text-gray-300'}`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <textarea
                                value={subjectiveAnswer}
                                onChange={(e) => setSubjectiveAnswer(e.target.value)}
                                rows={4}
                                placeholder="Write your explanation answer here..."
                                className="block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl text-sm text-gray-800 dark:text-white focus:outline-none"
                              />
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-12 text-gray-500">
                            <i className="fa-solid fa-triangle-exclamation text-3xl text-amber-500 mb-3"></i>
                            <p className="text-sm font-semibold">No questions found in this exam.</p>
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-6 border-t border-gray-100 dark:border-gray-800">
                          <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0} className="px-4 py-2 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 transition cursor-pointer disabled:opacity-50">Previous</button>
                          {activeExam && activeExam.questions && currentQuestionIndex === activeExam.questions.length - 1 ? (
                            <button onClick={handleFinishExam} className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-bold transition cursor-pointer">Submit Exam Attempt</button>
                          ) : (
                            <button onClick={handleNextQuestion} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer">Next Question</button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= PAGE: QURAN PROGRESSION LOG ================= */}
          {activePage === 'quran' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quran Progression Log</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Monitor daily revision (Sabqi) and new memorization progress.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-2xl p-5 lg:col-span-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
                      <i className="fa-solid fa-book-quran text-green-500"></i>
                      Hifz Progression
                    </h3>

                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center border border-gray-200 dark:border-gray-800">
                      <span className="text-[10px] text-gray-500 block uppercase tracking-widest font-bold">Current recitation</span>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-1.5">Surah {islamicProfile?.current_surah}</h4>
                      <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-1">Starting Ayah {islamicProfile?.current_ayat}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 font-medium">Hifz Pages Memorized</span>
                        <span className="font-bold text-gray-900 dark:text-white">{islamicProfile?.hifz_completed_pages} / 600</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: `${(islamicProfile?.hifz_completed_pages / 600) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-green-500/10 border border-green-500/25 rounded-xl text-[10px] text-green-700 dark:text-green-300 mt-5 leading-relaxed">
                    ✨ <strong>Tajweed Level: {islamicProfile?.tajweed_level}</strong>. Keep practicing pronunciation rules to level up!
                  </div>
                </div>

                <div className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-2xl p-5 lg:col-span-2 space-y-3">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">Recitation History Logs</h3>
                  {islamicLogs && islamicLogs.length > 0 ? (
                    islamicLogs.map(log => (
                      <div key={log.id} className="p-4 bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-md uppercase tracking-wider">{log.type}</span>
                            <span className="text-xs text-gray-500 font-medium">{log.date}</span>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white mt-1.5">Surah {log.surah_name} (Ayat {log.from_ayat} to {log.to_ayat})</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 italic">Tarbiyah note: "{log.tarbiyah_notes}"</p>
                        </div>
                        <span className="px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-[10px] font-bold rounded-full uppercase tracking-wider shrink-0">{log.evaluation_grade}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500 italic py-4 text-center">No daily recitation logs found.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= PAGE: FUTURE SKILLS LAB ================= */}
          {activePage === 'skills' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Future Skills Lab</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Develop technical capabilities in AI models, prompt engineering, and Python coding scripts.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-2xl p-5 lg:col-span-1 space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
                    <i className="fa-solid fa-plus text-green-500"></i>
                    Submit Portfolio Project
                  </h3>
                  <form onSubmit={handleSubmitProject} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Technical Track</label>
                      <select value={newProjTrack} onChange={(e) => setNewProjTrack(parseInt(e.target.value))} className="block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl text-gray-800 dark:text-white text-sm focus:outline-none">
                        <option value={1}>Artificial Intelligence (AI)</option>
                        <option value={2}>Python Coding</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Project Title</label>
                      <input type="text" required value={newProjTitle} onChange={(e) => setNewProjTitle(e.target.value)} placeholder="e.g. Chatbot System Prompt Diagram" className="block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl text-gray-800 dark:text-white text-sm focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Project Repository URL</label>
                      <input type="url" required value={newProjUrl} onChange={(e) => setNewProjUrl(e.target.value)} placeholder="https://github.com/..." className="block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl text-gray-800 dark:text-white text-sm focus:outline-none" />
                    </div>
                    <button type="submit" className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-green-500 hover:bg-green-600 transition cursor-pointer">Publish Portfolio File</button>
                  </form>
                </div>

                <div className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-2xl p-5 lg:col-span-2 space-y-5">
                  <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Current Track Progress</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skillProgress.map(sp => (
                      <div key={sp.id} className="p-4 bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-md tracking-wider">{sp.track_details?.name}</span>
                          <span className="text-xs text-gray-500">Active: {new Date(sp.last_active).toLocaleDateString()}</span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">{sp.track_details?.description}</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Syllabus Covered</span>
                            <span className="font-bold text-indigo-600 dark:text-indigo-400">{sp.progress_percent}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-900 rounded-full overflow-hidden">
                            <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${sp.progress_percent}%` }}></div>
                          </div>
                        </div>
                        <p className="text-[10px] text-gray-500 font-semibold">Completed Projects: {sp.completed_projects_count}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Portfolio Submission Logs</h4>
                    <div className="space-y-2">
                      {projects.map(proj => (
                        <div key={proj.id} className="p-3 bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <h5 className="text-xs font-bold text-gray-900 dark:text-white">{proj.title}</h5>
                            <span className="text-[9px] text-gray-500 font-semibold truncate block">{proj.project_url}</span>
                          </div>
                          <div className="text-right shrink-0">
                            {proj.grade ? (
                              <span className="text-[9px] font-bold px-2 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full border border-green-500/20 uppercase">Graded: {proj.grade}</span>
                            ) : (
                              <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20 uppercase">Awaiting Review</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= PAGE: TUITION BILLING ================= */}
          {activePage === 'billing' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tuition Billing & Invoices</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Review monthly tuition receipts and process outstanding payments.</p>
              </div>

              <div className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-4 max-w-3xl mx-auto">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center justify-between">
                  <span>Tuition Invoice List</span>
                  <span className="text-xs font-bold text-green-600 dark:text-green-400">Active student: {studentName}</span>
                </h3>

                <div className="space-y-3">
                  {invoices.map(inv => (
                    <div key={inv.id} className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-900 dark:text-white">Invoice ID: BF-00{inv.id}</span>
                          <span className="text-gray-300 dark:text-gray-700 text-xs">•</span>
                          <span className="text-xs text-gray-500 font-semibold">Due: {inv.due_date}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Homeschool Primary Level Monthly Fee Package</p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm font-extrabold text-gray-900 dark:text-white">Rs. {parseFloat(inv.amount).toLocaleString()}</p>
                          <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 ${inv.status === 'PAID' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-rose-500/10 text-rose-500'}`}>{inv.status}</span>
                        </div>

                        {inv.status === 'UNPAID' ? (
                          <button onClick={() => setSelectedInvoiceToPay(inv)} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition cursor-pointer">Pay Invoice</button>
                        ) : (
                          <button onClick={() => alert('Printing receipt BF-00' + inv.id + '...')} className="p-2 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl transition cursor-pointer" title="Print Receipt">
                            <i className="fa-solid fa-print"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {invoices.length === 0 && (
                    <p className="text-xs text-gray-500 italic py-4 text-center">No invoices found for this student.</p>
                  )}
                </div>
              </div>

              {selectedInvoiceToPay && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-fade-in">
                  <div className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 p-6 rounded-3xl max-w-sm w-full space-y-6 animate-scale-in">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Select Payment Method</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Paying Invoice BF-00{selectedInvoiceToPay.id} for Rs. {parseFloat(selectedInvoiceToPay.amount).toLocaleString()}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      <button onClick={() => handlePayInvoice('BANK_TRANSFER')} className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-xl text-xs font-bold text-gray-900 dark:text-white text-left transition flex items-center gap-2.5 cursor-pointer">
                        <i className="fa-solid fa-building-columns text-indigo-500"></i>
                        Direct Local Bank Transfer
                      </button>
                      <button onClick={() => handlePayInvoice('CREDIT_CARD')} className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-xl text-xs font-bold text-gray-900 dark:text-white text-left transition flex items-center gap-2.5 cursor-pointer">
                        <i className="fa-solid fa-credit-card text-green-500"></i>
                        Credit / Debit Card Online
                      </button>
                    </div>

                    <button onClick={() => setSelectedInvoiceToPay(null)} className="w-full py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl text-xs font-semibold transition cursor-pointer">Close Modal</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= PAGE: MESSAGE TUTOR ================= */}
          {activePage === 'messages' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Message Your Tutor</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Direct instant messaging with subject teachers.</p>
              </div>

              <div className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden h-[480px] flex flex-col max-w-3xl mx-auto">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-xs">T</div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">Your Tutor</h4>
                    <p className="text-[11px] text-green-500">● Online</p>
                  </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                  {chatMessages.map(msg => {
                    const isMe = msg.sender === 3;
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs rounded-2xl px-4 py-2.5 ${isMe ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}>
                          <p>{msg.message}</p>
                          <span className={`block text-[8px] mt-1.5 text-right ${isMe ? 'text-green-100' : 'text-gray-400'}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {chatMessages.length === 0 && (
                    <p className="text-center text-gray-400 italic py-6">No messages yet. Say hello!</p>
                  )}
                </div>

                <form onSubmit={handleSendChatMessage} className="p-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
                  <input
                    id="chat-input"
                    type="text"
                    required
                    value={chatInputText}
                    onChange={(e) => setChatInputText(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-100 dark:bg-darkbg-main border border-transparent rounded-xl px-4 py-2 text-xs text-gray-800 dark:text-gray-200 focus:outline-none"
                  />
                  <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-xl text-xs font-bold hover:bg-green-600 cursor-pointer">Send</button>
                </form>
              </div>
            </div>
          )}

          {/* ================= PAGE: AI TUTOR ================= */}
          {activePage === 'ai' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center flex-wrap gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <i className="fa-solid fa-sparkles text-sky-500"></i>
                    AI Tutor: AI Study Assistant
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Ask any question regarding your subjects, homework, or Quran Tajweed.</p>
                </div>
                <button onClick={() => setShowApiKeySetting(!showApiKeySetting)} className="flex items-center gap-2 px-3.5 py-1.5 bg-gray-100 dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl text-xs font-semibold transition cursor-pointer">
                  <i className="fa-solid fa-gear text-violet-500"></i>
                  Gemini Settings
                </button>
              </div>

              {showApiKeySetting && (
                <div className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 p-5 rounded-2xl max-w-xl mx-auto space-y-4 animate-slide-up">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <i className="fa-solid fa-gear text-violet-500"></i>
                    Google Gemini API Key Config
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Paste your Gemini API key below to unlock real-time, custom AI responses. Your key is stored locally in your browser's localStorage and is sent directly to Google APIs.</p>
                  <form onSubmit={handleSaveGeminiKey} className="flex flex-col sm:flex-row gap-3 items-end">
                    <input type="password" value={geminiKeyInput} onChange={(e) => setGeminiKeyInput(e.target.value)} placeholder="AIzaSy..." className="flex-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl text-xs text-gray-800 dark:text-white" />
                    <button type="submit" className="py-2 px-4 bg-violet-600 hover:bg-violet-500 rounded-xl text-xs font-bold text-white cursor-pointer transition">Save Key</button>
                  </form>
                </div>
              )}

              <div className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-3xl p-5 max-w-3xl mx-auto flex flex-col h-[500px]">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-500/10 border border-violet-500/30 rounded-xl flex items-center justify-center text-violet-500">
                      <i className="fa-solid fa-sparkles animate-pulse"></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">AI Study Buddy</h4>
                      <span className="text-[9px] text-violet-500 font-bold uppercase tracking-wider">
                        {localStorage.getItem('gemini_api_key') ? 'Live Gemini Engine Enabled' : 'Simulated Sandbox Mode'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-2">
                  {aiMessages.map(msg => {
                    const isUser = msg.sender === 'user';
                    return (
                      <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line ${isUser ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'}`}>
                          <p>{msg.text}</p>
                        </div>
                      </div>
                    );
                  })}
                  {aiLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        <span>Thinking...</span>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSendAiMessage} className="border-t border-gray-100 dark:border-gray-800 pt-4 flex gap-3">
                  <input
                    type="text"
                    required
                    value={aiInputText}
                    onChange={(e) => setAiInputText(e.target.value)}
                    placeholder="Ask AI tutor something (e.g. explain variables in coding, help with math 3+2)..."
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                  <button type="submit" disabled={aiLoading} className="p-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition cursor-pointer disabled:opacity-50">
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ================= PAGE: SETTINGS ================= */}
          {activePage === 'settings' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings & Preferences</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Manage theme modes, account settings, and notification alerts.</p>
              </div>

              <div className="bg-white dark:bg-darkbg-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-6 max-w-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">App Appearance Theme</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Switch between Dark Mode and Light Day Mode.</p>
                  </div>
                  <button onClick={() => setIsDark(d => !d)} className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs cursor-pointer transition">Toggle Light/Dark Mode</button>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">Email Notifications</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Receive homework reminders and exam results via email.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-green-500" />
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">Developer Quick View</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Preview other dashboard roles instantly for testing.</p>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => switchRole('ADMIN')} className="px-3.5 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Admin View</button>
                    <button onClick={() => switchRole('TEACHER')} className="px-3.5 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-green-600 dark:text-green-400 text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Teacher View</button>
                    <button onClick={() => switchRole('PARENT')} className="px-3.5 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Parent View</button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">Sign out</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">End your current session on this device.</p>
                  </div>
                  <button onClick={logout} className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 font-bold text-xs cursor-pointer transition flex items-center gap-2">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
