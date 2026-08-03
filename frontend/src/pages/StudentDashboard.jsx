import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  LayoutGrid, Video, BookOpen, ClipboardCheck, Moon, Rocket, Wallet, MessageSquare,
  Sparkles, Settings, LogOut, Search, Bell, GraduationCap, CheckCircle, FileText,
  Award, Calendar, Upload, Shield, Camera, Send, AlertTriangle, Plus, Printer,
  CreditCard, Clock, TrendingUp, Landmark
} from 'lucide-react';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { key: 'classrooms', label: 'Classrooms', icon: Video },
  { key: 'lms', label: 'LMS Lectures & HW', icon: BookOpen },
  { key: 'exam', label: 'Smart Exam Hall', icon: ClipboardCheck },
  { key: 'quran', label: 'Quran Progression Log', icon: Moon },
  { key: 'skills', label: 'Future Skills Lab', icon: Rocket },
  { key: 'billing', label: 'Tuition Billing', icon: Wallet },
  { key: 'messages', label: 'Message Tutor', icon: MessageSquare },
  { key: 'ai', label: 'AI Tutor', icon: Sparkles },
];

const GRADE_SCORE = { 'A+': 100, 'A': 95, 'A-': 90, 'B': 85, 'B-': 80, 'C': 75, 'Fail': 50 };
const EVAL_SCORE = { EXCELLENT: 100, GOOD: 80, IMPROVING: 60 };

export default function StudentDashboard() {
  const { user, logout, switchRole } = useAuth();

  const [activePage, setActivePage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Data state
  const [lessons, setLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [attendanceLogs, setAttendanceLogs] = useState([]);

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
      const subs = await api.getSubmissions();
      const attend = await api.getAttendanceLogs(1); // Zayd's `students` record id is 1

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
      setSubmissions(subs);
      setAttendanceLogs(attend);

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

  // --- Derived Dashboard metrics ---
  const presentCount = attendanceLogs.filter(a => a.status === 'PRESENT' || a.status === 'LATE').length;
  const attendancePct = attendanceLogs.length ? Math.round((presentCount / attendanceLogs.length) * 100) : 0;

  const quranAvg = islamicLogs.length ? Math.round(islamicLogs.reduce((s, l) => s + (EVAL_SCORE[l.evaluation_grade] || 70), 0) / islamicLogs.length) : 0;
  const homeworkAvg = submissions.filter(s => s.student === 3 && s.grade).length
    ? Math.round(submissions.filter(s => s.student === 3 && s.grade).reduce((s, sub) => s + (GRADE_SCORE[sub.grade] || 80), 0) / submissions.filter(s => s.student === 3 && s.grade).length)
    : 90;
  const skillsAvg = skillProgress.length ? Math.round(skillProgress.reduce((s, p) => s + p.progress_percent, 0) / skillProgress.length) : 0;
  const overallScore = Math.round((homeworkAvg + quranAvg) / 2);

  const recentAssignments = assignments.map(a => {
    const sub = submissions.find(s => s.assignment === a.id && s.student === 3);
    let status = 'Not Started';
    if (sub) status = sub.grade ? 'Graded' : 'Pending';
    return { ...a, className: 'Mathematics Grade 1', status };
  }).sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

  const classProgress = [
    { label: 'Mathematics Grade 1', value: homeworkAvg, color: 'bg-indigo-500' },
    { label: 'Quran Recitation Track', value: quranAvg, color: 'bg-emerald-500' },
    { label: 'Future Skills Lab', value: skillsAvg, color: 'bg-amber-500' },
  ];

  const STATUS_STYLE = {
    Graded: 'bg-emerald-50 text-emerald-600',
    Pending: 'bg-amber-50 text-amber-600',
    'Not Started': 'bg-gray-100 text-gray-500',
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex font-sans">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-indigo-600 text-white">
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold font-outfit tracking-tight leading-tight">Bright Future</h1>
            <p className="text-[10px] text-indigo-200 uppercase tracking-widest font-semibold">Student Portal</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActivePage(key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${activePage === key ? 'bg-white text-indigo-700 shadow-sm' : 'text-indigo-100 hover:bg-white/10 hover:text-white'}`}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              <span className="text-left flex-1 min-w-0 truncate whitespace-nowrap">{label}</span>
              {key === 'lms' && pendingAssignments.length > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${activePage === key ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-400 text-indigo-950'}`}>{pendingAssignments.length}</span>
              )}
            </button>
          ))}
          <button
            onClick={() => setActivePage('settings')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${activePage === 'settings' ? 'bg-white text-indigo-700 shadow-sm' : 'text-indigo-100 hover:bg-white/10 hover:text-white'}`}
          >
            <Settings className="h-[18px] w-[18px] shrink-0" />
            <span className="text-left flex-1 min-w-0 truncate whitespace-nowrap">Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center font-bold text-xs shrink-0">
            {studentName.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">{studentName}</p>
            <p className="text-[10px] text-indigo-200 truncate">{studentGrade}</p>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 sm:px-8 py-3.5 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="h-4 w-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for lessons, homework, classes..."
              className="w-full bg-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs ml-auto">
            <span className="px-2 text-gray-400 font-semibold">Quick View:</span>
            <button onClick={() => switchRole('ADMIN')} className="px-2.5 py-1 hover:bg-white rounded-lg transition text-violet-600 font-medium cursor-pointer">Admin</button>
            <button onClick={() => switchRole('TEACHER')} className="px-2.5 py-1 hover:bg-white rounded-lg transition text-emerald-600 font-medium cursor-pointer">Teacher</button>
            <button onClick={() => switchRole('PARENT')} className="px-2.5 py-1 hover:bg-white rounded-lg transition text-pink-600 font-medium cursor-pointer">Parent</button>
          </div>

          <button onClick={() => setActivePage('messages')} className="relative w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition cursor-pointer" title="Messages">
            <Bell className="h-[18px] w-[18px]" />
            {pendingAssignments.length > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>}
          </button>

          <button
            onClick={logout}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-rose-50 flex items-center justify-center text-gray-500 hover:text-rose-500 transition cursor-pointer"
            title="Logout"
          >
            <LogOut className="h-[18px] w-[18px]" />
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {/* ================= PAGE: DASHBOARD ================= */}
          {activePage === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Good Morning, {studentName.split(' ')[0]}!</h2>
                  <p className="text-gray-500 text-sm mt-1">Keep going! Your future is bright. Let's make today a great day for learning.</p>
                </div>
                <button onClick={() => setActivePage('lms')} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-xs font-bold text-white transition cursor-pointer shrink-0">
                  Continue Learning
                </button>
              </div>

              {/* Profile summary card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg shrink-0">
                    {studentName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-gray-900 truncate">{studentName}</h3>
                    <p className="text-xs text-gray-500">{studentGrade} · Primary Math Explorers</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Avg Score</p>
                    <p className="text-lg font-black text-indigo-600 mt-0.5">{overallScore}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Attendance</p>
                    <p className="text-lg font-black text-emerald-600 mt-0.5">{attendancePct}%</p>
                  </div>
                  <div className="text-center flex flex-col items-center">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold flex items-center gap-1"><TrendingUp className="h-3 w-3" />Rank</p>
                    <p className="text-lg font-black text-gray-900 mt-0.5">3<span className="text-xs font-medium text-gray-400">rd of 12</span></p>
                  </div>
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Video} label="My Classes" value={lessons.length} sub="Scheduled lecture modules" iconBg="bg-indigo-50" iconColor="text-indigo-600" />
                <StatCard icon={CheckCircle} label="Attendance" value={`${attendancePct}%`} sub="Present this term" iconBg="bg-emerald-50" iconColor="text-emerald-600" />
                <StatCard icon={ClipboardCheck} label="Pending Homework" value={pendingAssignments.length} sub={pendingAssignments.length > 0 ? 'Requires action' : 'All caught up'} iconBg="bg-rose-50" iconColor="text-rose-600" valueColor={pendingAssignments.length > 0 ? 'text-rose-600' : 'text-gray-900'} />
                <StatCard icon={Award} label="Overall Grade" value={`${overallScore}%`} sub="Across homework & Quran" iconBg="bg-amber-50" iconColor="text-amber-600" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Assignments */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-gray-900">Recent Assignments</h3>
                    <button onClick={() => setActivePage('lms')} className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="text-[11px] uppercase tracking-wider text-gray-400 border-b border-gray-100">
                          <th className="pb-2.5 font-semibold">Assignment Name</th>
                          <th className="pb-2.5 font-semibold">Class</th>
                          <th className="pb-2.5 font-semibold">Due Date</th>
                          <th className="pb-2.5 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentAssignments.map(a => (
                          <tr key={a.id} className="border-b border-gray-50 last:border-0">
                            <td className="py-3 font-semibold text-gray-800">{a.title}</td>
                            <td className="py-3 text-gray-500">{a.className}</td>
                            <td className="py-3 text-gray-500 whitespace-nowrap">{new Date(a.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                            <td className="py-3"><span className={`text-[10px] font-bold px-2 py-1 rounded-full ${STATUS_STYLE[a.status]}`}>{a.status}</span></td>
                          </tr>
                        ))}
                        {recentAssignments.length === 0 && (
                          <tr><td colSpan={4} className="py-4 text-center text-xs text-gray-400 italic">No assignments yet.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Class Progress */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Class Progress</h3>
                  <p className="text-xs text-gray-400 mb-4">Overall completion rate</p>
                  <div className="space-y-4">
                    {classProgress.map(cp => (
                      <div key={cp.label} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600 font-medium">{cp.label}</span>
                          <span className="font-bold text-gray-900">{cp.value}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`${cp.color} h-full rounded-full`} style={{ width: `${cp.value}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Tutor + Announcements row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <h4 className="font-bold text-sm text-gray-900">Ask your AI Tutor</h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">I can help you with lessons, homework, explanations and more.</p>
                  <button onClick={() => setActivePage('ai')} className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition cursor-pointer">Chat with Tutor</button>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <h4 className="font-bold text-sm text-gray-900">Today's Classes</h4>
                    </div>
                    <button onClick={() => setActivePage('classrooms')} className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer">View All</button>
                  </div>
                  <div className="space-y-3">
                    {lessons.length > 0 ? lessons.slice(0, 2).map(l => (
                      <div key={l.id} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-indigo-600 font-bold flex items-center gap-1"><Clock className="h-3 w-3" /> {l.scheduled_time ? new Date(l.scheduled_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'TBD'}</span>
                          <span className="font-semibold text-gray-800 line-clamp-1">{l.title}</span>
                        </div>
                      </div>
                    )) : (
                      <p className="text-xs text-gray-400 italic">No classes scheduled yet.</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <h4 className="font-bold text-sm text-gray-900">Announcements</h4>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                      <span>School closed on Friday for Teacher Training.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
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
                  <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Virtual Classrooms</h2>
                  <p className="text-gray-500 text-sm mt-1">Join your scheduled live classes and view recordings.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">{lessons.length} Classes</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {lessons.map((l, idx) => (
                  <div key={l.id} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      {idx === 0 && l.zoom_link ? (
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold">LIVE NOW</span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold">UPCOMING</span>
                      )}
                      <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="h-3 w-3" /> {l.scheduled_time ? new Date(l.scheduled_time).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'TBD'}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{l.title}</h3>
                      <p className="text-xs text-gray-500">Course #{l.course}</p>
                    </div>
                    <div className="pt-2">
                      {l.zoom_link ? (
                        <a href={l.zoom_link} target="_blank" rel="noreferrer" className="block text-center w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all">Join Class Now</a>
                      ) : (
                        <button className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-400 text-xs font-semibold cursor-not-allowed">No Live Link Yet</button>
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
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">LMS Lectures & Assignments</h2>
                <p className="text-gray-500 text-sm mt-1">Watch recorded lectures and upload your completed assignments.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 lg:col-span-1 space-y-3">
                  <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                    <BookOpen className="h-[18px] w-[18px] text-indigo-600" />
                    Lecture Modules
                  </h3>
                  <div className="space-y-2">
                    {lessons.map(l => (
                      <button
                        key={l.id}
                        onClick={() => setActiveLesson(l)}
                        className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between gap-3 cursor-pointer ${activeLesson?.id === l.id ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-gray-50 border-gray-100 text-gray-700 hover:bg-gray-100'}`}
                      >
                        <span className="font-bold text-xs line-clamp-1">{l.title}</span>
                        <Video className="h-4 w-4 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {activeLesson ? (
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[9px] font-extrabold bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-0.5 rounded-md uppercase tracking-wider">Course #{activeLesson.course}</span>
                          <h3 className="text-lg font-bold text-gray-900 mt-1.5">{activeLesson.title}</h3>
                        </div>
                        {activeLesson.zoom_link && (
                          <a href={activeLesson.zoom_link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg transition shrink-0">
                            <Video className="h-3.5 w-3.5" />
                            Join Live Class
                          </a>
                        )}
                      </div>

                      {activeLesson.video_url && (
                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-900 border border-gray-200 shadow-inner">
                          <iframe src={activeLesson.video_url} title={activeLesson.title} allowFullScreen className="w-full h-full border-none"></iframe>
                        </div>
                      )}

                      <div className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                        <p>{activeLesson.content_body}</p>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 space-y-4">
                      <h4 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                        <FileText className="h-[18px] w-[18px] text-indigo-600" />
                        Attached Homework Tasks
                      </h4>

                      {assignments.length > 0 ? (
                        <div className="space-y-4">
                          {assignments.map(ass => {
                            const sub = submissions.find(s => s.assignment === ass.id && s.student === 3);
                            return (
                              <div key={ass.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-3">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="space-y-1">
                                    <h5 className="text-sm font-bold text-gray-900">{ass.title}</h5>
                                    <p className="text-xs text-gray-500">{ass.instructions}</p>
                                    <p className="text-[10px] text-gray-400 font-semibold">Due Date: {new Date(ass.due_date).toLocaleString()}</p>
                                  </div>
                                  <div>
                                    {sub ? (
                                      <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                                        <CheckCircle className="h-3.5 w-3.5" />
                                        Submitted
                                      </span>
                                    ) : (
                                      <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full">Pending</span>
                                    )}
                                  </div>
                                </div>

                                {sub && sub.grade && (
                                  <div className="p-3 bg-white rounded-lg border border-gray-100 text-xs">
                                    <div className="flex items-center justify-between font-bold text-emerald-600 mb-1">
                                      <span>Grade Result: {sub.grade}</span>
                                    </div>
                                    <p className="text-gray-500 italic">Teacher's Note: "{sub.teacher_feedback}"</p>
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
                                            className="block w-full px-3 py-2 border border-gray-200 bg-white rounded-xl text-xs text-gray-800"
                                          />
                                        </div>
                                        <div className="flex gap-2">
                                          <button type="submit" disabled={isSubmittingHW} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer transition">Submit</button>
                                          <button type="button" onClick={() => setUploadingAssignmentId(null)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl text-xs cursor-pointer">Cancel</button>
                                        </div>
                                      </form>
                                    ) : (
                                      <button onClick={() => setUploadingAssignmentId(ass.id)} className="flex items-center gap-2 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition cursor-pointer">
                                        <Upload className="h-3.5 w-3.5" />
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
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Smart Exam Hall</h2>
                <p className="text-gray-500 text-sm mt-1">Sit scheduled exams under secure, AI-assisted proctoring environments.</p>
              </div>

              {!examStarted ? (
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 max-w-xl mx-auto space-y-5">
                  <div className="p-4 bg-amber-50 border border-amber-100 text-amber-700 rounded-xl flex gap-3 text-xs">
                    <Shield className="h-4 w-4 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-bold">AI Proctoring Policy</h4>
                      <p className="mt-1 leading-relaxed">This exam session utilizes automatic screen visibility trackers and webcam logs to prevent academic dishonesty. Switching browser tabs, leaving the camera frame, or detection of voice transcripts will flag a violation log immediately.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-gray-900">Available Exams</h3>
                    {exams && exams.length > 0 ? (
                      exams.map(exam => (
                        <div key={exam.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between gap-4">
                          <div>
                            <h4 className="text-sm font-bold text-gray-900">{exam.title}</h4>
                            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                              <span>Duration: {exam.duration_minutes} minutes</span>
                              <span>•</span>
                              <span className="text-emerald-600 font-medium">Proctor Active</span>
                            </div>
                          </div>
                          <button onClick={() => handleStartExam(exam)} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition cursor-pointer shrink-0">Start Exam</button>
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
                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 space-y-3">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Camera className="h-3.5 w-3.5 text-rose-500" />
                        AI Proctor Webcam Feed
                      </h4>
                      <div className="aspect-video w-full rounded-xl bg-gray-900 border border-gray-800 relative flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                          <div className="w-16 h-16 border-2 border-emerald-500 rounded-full animate-ping"></div>
                        </div>
                        <Camera className="h-10 w-10 text-gray-700" />
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center bg-slate-950/80 px-2 py-1.5 rounded-lg border border-gray-800 text-[9px] font-bold">
                          <span className="flex items-center gap-1 text-emerald-400">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                            ACTIVE
                          </span>
                          <span className="text-gray-400">Face Detected: Yes</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-100 space-y-2">
                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Simulate Proctor Triggers</p>
                        <div className="grid grid-cols-1 gap-2">
                          <button onClick={() => triggerMockViolation('TAB_SWITCH')} className="py-1.5 px-2 bg-gray-50 border border-gray-100 hover:border-amber-300 text-gray-500 hover:text-gray-900 rounded-lg text-[10px] text-left transition cursor-pointer">⚠️ Flag Tab Switch</button>
                          <button onClick={() => triggerMockViolation('FACE_NOT_FOUND')} className="py-1.5 px-2 bg-gray-50 border border-gray-100 hover:border-amber-300 text-gray-500 hover:text-gray-900 rounded-lg text-[10px] text-left transition cursor-pointer">⚠️ Flag No Face</button>
                          <button onClick={() => triggerMockViolation('SPEECH_DETECTED')} className="py-1.5 px-2 bg-gray-50 border border-gray-100 hover:border-amber-300 text-gray-500 hover:text-gray-900 rounded-lg text-[10px] text-left transition cursor-pointer">⚠️ Flag Speech Detected</button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 space-y-3">
                      <h4 className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center justify-between">
                        <span>Incident Log</span>
                        <span className="px-2 py-0.5 bg-rose-50 text-rose-500 text-[10px] rounded-full border border-rose-100">{violationsCount} Flagged</span>
                      </h4>
                      <div className="space-y-2.5 max-h-[200px] overflow-y-auto pr-1">
                        {violationsLog.length > 0 ? (
                          violationsLog.map(v => (
                            <div key={v.id} className="p-2.5 bg-rose-50/60 border border-rose-100 rounded-lg text-[10px]">
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
                      <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8 text-center space-y-6 animate-scale-in">
                        <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-emerald-500 mx-auto">
                          <CheckCircle className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">Exam Session Submitted</h3>
                          <p className="text-gray-500 text-sm mt-1">Your attempt has been finalized and processed by AI engines.</p>
                        </div>
                        <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl max-w-sm mx-auto">
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Evaluated Score</span>
                          <h4 className="text-4xl font-extrabold text-gray-900 mt-2">{examScore}%</h4>
                          <span className="text-[10px] text-gray-500 block mt-2">Incidents: {violationsCount} logged</span>
                        </div>
                        <button onClick={() => { setExamStarted(false); setActiveExam(null); }} className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition cursor-pointer">Return to Hall</button>
                      </div>
                    ) : (
                      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 space-y-6 flex flex-col justify-between min-h-[450px]">
                        {activeExam && activeExam.questions && activeExam.questions.length > 0 ? (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900">{activeExam.title}</h3>
                                <span className="text-xs text-gray-500">Question {currentQuestionIndex + 1} of {activeExam.questions.length}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 border border-gray-100 rounded-xl">
                                <Clock className="h-3.5 w-3.5 text-amber-500" />
                                <span>Timer: 24:12</span>
                              </div>
                            </div>

                            <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                              <p className="text-sm font-semibold text-gray-900 leading-relaxed">{activeExam.questions[currentQuestionIndex]?.text}</p>
                            </div>

                            {activeExam.questions[currentQuestionIndex]?.type === 'MCQ' ? (
                              <div className="grid grid-cols-1 gap-3">
                                {(activeExam.questions[currentQuestionIndex]?.options || []).map(opt => (
                                  <button
                                    key={opt}
                                    onClick={() => setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: opt })}
                                    className={`w-full text-left p-4 rounded-xl border text-xs font-medium transition cursor-pointer ${selectedAnswers[currentQuestionIndex] === opt ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-gray-50 border-gray-100 hover:border-gray-300 text-gray-700'}`}
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
                                className="block w-full px-3 py-2.5 border border-gray-200 bg-white rounded-xl text-sm text-gray-800 focus:outline-none"
                              />
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-12 text-gray-500">
                            <AlertTriangle className="h-8 w-8 text-amber-500 mb-3 mx-auto" />
                            <p className="text-sm font-semibold">No questions found in this exam.</p>
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                          <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0} className="px-4 py-2 border border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-semibold text-gray-600 transition cursor-pointer disabled:opacity-50">Previous</button>
                          {activeExam && activeExam.questions && currentQuestionIndex === activeExam.questions.length - 1 ? (
                            <button onClick={handleFinishExam} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer">Submit Exam Attempt</button>
                          ) : (
                            <button onClick={handleNextQuestion} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer">Next Question</button>
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
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Quran Progression Log</h2>
                <p className="text-gray-500 text-sm mt-1">Monitor daily revision (Sabqi) and new memorization progress.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 lg:col-span-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                      <Moon className="h-[18px] w-[18px] text-indigo-600" />
                      Hifz Progression
                    </h3>

                    <div className="p-4 bg-gray-50 rounded-xl text-center border border-gray-100">
                      <span className="text-[10px] text-gray-500 block uppercase tracking-widest font-bold">Current recitation</span>
                      <h4 className="text-lg font-bold text-gray-900 mt-1.5">Surah {islamicProfile?.current_surah}</h4>
                      <p className="text-xs text-indigo-600 font-semibold mt-1">Starting Ayah {islamicProfile?.current_ayat}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 font-medium">Hifz Pages Memorized</span>
                        <span className="font-bold text-gray-900">{islamicProfile?.hifz_completed_pages} / 600</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${(islamicProfile?.hifz_completed_pages / 600) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl text-[10px] text-emerald-700 mt-5 leading-relaxed">
                    ✨ <strong>Tajweed Level: {islamicProfile?.tajweed_level}</strong>. Keep practicing pronunciation rules to level up!
                  </div>
                </div>

                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 lg:col-span-2 space-y-3">
                  <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">Recitation History Logs</h3>
                  {islamicLogs && islamicLogs.length > 0 ? (
                    islamicLogs.map(log => (
                      <div key={log.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md uppercase tracking-wider">{log.type}</span>
                            <span className="text-xs text-gray-500 font-medium">{log.date}</span>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 mt-1.5">Surah {log.surah_name} (Ayat {log.from_ayat} to {log.to_ayat})</h4>
                          <p className="text-xs text-gray-500 italic">Tarbiyah note: "{log.tarbiyah_notes}"</p>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-wider shrink-0">{log.evaluation_grade}</span>
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
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Future Skills Lab</h2>
                <p className="text-gray-500 text-sm mt-1">Develop technical capabilities in AI models, prompt engineering, and Python coding scripts.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 lg:col-span-1 space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                    <Plus className="h-[18px] w-[18px] text-indigo-600" />
                    Submit Portfolio Project
                  </h3>
                  <form onSubmit={handleSubmitProject} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Technical Track</label>
                      <select value={newProjTrack} onChange={(e) => setNewProjTrack(parseInt(e.target.value))} className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-800 text-sm focus:outline-none">
                        <option value={1}>Artificial Intelligence (AI)</option>
                        <option value={2}>Python Coding</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Project Title</label>
                      <input type="text" required value={newProjTitle} onChange={(e) => setNewProjTitle(e.target.value)} placeholder="e.g. Chatbot System Prompt Diagram" className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-800 text-sm focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Project Repository URL</label>
                      <input type="url" required value={newProjUrl} onChange={(e) => setNewProjUrl(e.target.value)} placeholder="https://github.com/..." className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-800 text-sm focus:outline-none" />
                    </div>
                    <button type="submit" className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer">Publish Portfolio File</button>
                  </form>
                </div>

                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 lg:col-span-2 space-y-5">
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="text-sm font-bold text-gray-900">Current Track Progress</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skillProgress.map(sp => (
                      <div key={sp.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md tracking-wider">{sp.track_details?.name}</span>
                          <span className="text-xs text-gray-500">Active: {new Date(sp.last_active).toLocaleDateString()}</span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900">{sp.track_details?.description}</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Syllabus Covered</span>
                            <span className="font-bold text-indigo-600">{sp.progress_percent}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${sp.progress_percent}%` }}></div>
                          </div>
                        </div>
                        <p className="text-[10px] text-gray-500 font-semibold">Completed Projects: {sp.completed_projects_count}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Portfolio Submission Logs</h4>
                    <div className="space-y-2">
                      {projects.map(proj => (
                        <div key={proj.id} className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <h5 className="text-xs font-bold text-gray-900">{proj.title}</h5>
                            <span className="text-[9px] text-gray-500 font-semibold truncate block">{proj.project_url}</span>
                          </div>
                          <div className="text-right shrink-0">
                            {proj.grade ? (
                              <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 uppercase">Graded: {proj.grade}</span>
                            ) : (
                              <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full border border-amber-100 uppercase">Awaiting Review</span>
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
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Tuition Billing & Invoices</h2>
                <p className="text-gray-500 text-sm mt-1">Review monthly tuition receipts and process outstanding payments.</p>
              </div>

              <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 space-y-4 max-w-3xl mx-auto">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center justify-between">
                  <span>Tuition Invoice List</span>
                  <span className="text-xs font-bold text-indigo-600">Active student: {studentName}</span>
                </h3>

                <div className="space-y-3">
                  {invoices.map(inv => (
                    <div key={inv.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-900">Invoice ID: BF-00{inv.id}</span>
                          <span className="text-gray-300 text-xs">•</span>
                          <span className="text-xs text-gray-500 font-semibold">Due: {inv.due_date}</span>
                        </div>
                        <p className="text-xs text-gray-500">Homeschool Primary Level Monthly Fee Package</p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm font-extrabold text-gray-900">Rs. {parseFloat(inv.amount).toLocaleString()}</p>
                          <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 ${inv.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{inv.status}</span>
                        </div>

                        {inv.status === 'UNPAID' ? (
                          <button onClick={() => setSelectedInvoiceToPay(inv)} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition cursor-pointer">Pay Invoice</button>
                        ) : (
                          <button onClick={() => alert('Printing receipt BF-00' + inv.id + '...')} className="p-2 bg-white hover:bg-gray-100 border border-gray-100 hover:border-gray-200 text-gray-500 hover:text-gray-900 rounded-xl transition cursor-pointer" title="Print Receipt">
                            <Printer className="h-4 w-4" />
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 animate-fade-in">
                  <div className="bg-white border border-gray-100 p-6 rounded-3xl max-w-sm w-full space-y-6 shadow-2xl animate-scale-in">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-900">Select Payment Method</h3>
                      <p className="text-xs text-gray-500 mt-1">Paying Invoice BF-00{selectedInvoiceToPay.id} for Rs. {parseFloat(selectedInvoiceToPay.amount).toLocaleString()}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      <button onClick={() => handlePayInvoice('BANK_TRANSFER')} className="w-full py-3 px-4 bg-gray-50 border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 rounded-xl text-xs font-bold text-gray-900 text-left transition flex items-center gap-2.5 cursor-pointer">
                        <Landmark className="h-5 w-5 text-indigo-600" />
                        Direct Local Bank Transfer
                      </button>
                      <button onClick={() => handlePayInvoice('CREDIT_CARD')} className="w-full py-3 px-4 bg-gray-50 border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 rounded-xl text-xs font-bold text-gray-900 text-left transition flex items-center gap-2.5 cursor-pointer">
                        <CreditCard className="h-5 w-5 text-emerald-600" />
                        Credit / Debit Card Online
                      </button>
                    </div>

                    <button onClick={() => setSelectedInvoiceToPay(null)} className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl text-xs font-semibold transition cursor-pointer">Close Modal</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= PAGE: MESSAGE TUTOR ================= */}
          {activePage === 'messages' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Message Your Tutor</h2>
                <p className="text-gray-500 text-sm mt-1">Direct instant messaging with subject teachers.</p>
              </div>

              <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden h-[480px] flex flex-col max-w-3xl mx-auto">
                <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">T</div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Your Tutor</h4>
                    <p className="text-[11px] text-emerald-600">● Online</p>
                  </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                  {chatMessages.map(msg => {
                    const isMe = msg.sender === 3;
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs rounded-2xl px-4 py-2.5 ${isMe ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                          <p>{msg.message}</p>
                          <span className={`block text-[8px] mt-1.5 text-right ${isMe ? 'text-indigo-100' : 'text-gray-400'}`}>
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

                <form onSubmit={handleSendChatMessage} className="p-3 border-t border-gray-100 flex items-center gap-2">
                  <input
                    id="chat-input"
                    type="text"
                    required
                    value={chatInputText}
                    onChange={(e) => setChatInputText(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-100 border border-transparent rounded-xl px-4 py-2 text-xs text-gray-800 focus:outline-none"
                  />
                  <button type="submit" className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition cursor-pointer">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ================= PAGE: AI TUTOR ================= */}
          {activePage === 'ai' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center flex-wrap gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold font-outfit text-gray-900 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-violet-600" />
                    AI Tutor: Study Assistant
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">Ask any question regarding your subjects, homework, or Quran Tajweed.</p>
                </div>
                <button onClick={() => setShowApiKeySetting(!showApiKeySetting)} className="flex items-center gap-2 px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 rounded-xl text-xs font-semibold transition cursor-pointer">
                  <Settings className="h-4 w-4 text-violet-600" />
                  Gemini Settings
                </button>
              </div>

              {showApiKeySetting && (
                <div className="bg-white border border-gray-100 shadow-sm p-5 rounded-2xl max-w-xl mx-auto space-y-4 animate-slide-up">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Settings className="h-4 w-4 text-violet-600" />
                    Google Gemini API Key Config
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Paste your Gemini API key below to unlock real-time, custom AI responses. Your key is stored locally in your browser's localStorage and is sent directly to Google APIs.</p>
                  <form onSubmit={handleSaveGeminiKey} className="flex flex-col sm:flex-row gap-3 items-end">
                    <input type="password" value={geminiKeyInput} onChange={(e) => setGeminiKeyInput(e.target.value)} placeholder="AIzaSy..." className="flex-1 w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-xl text-xs text-gray-800" />
                    <button type="submit" className="py-2 px-4 bg-violet-600 hover:bg-violet-700 rounded-xl text-xs font-bold text-white cursor-pointer transition">Save Key</button>
                  </form>
                </div>
              )}

              <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-5 max-w-3xl mx-auto flex flex-col h-[500px]">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-50 border border-violet-100 rounded-xl flex items-center justify-center text-violet-600">
                      <Sparkles className="h-5 w-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">AI Study Buddy</h4>
                      <span className="text-[9px] text-violet-600 font-bold uppercase tracking-wider">
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
                        <div className={`max-w-md rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line ${isUser ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                          <p>{msg.text}</p>
                        </div>
                      </div>
                    );
                  })}
                  {aiLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-2xl px-4 py-3 text-xs text-gray-500 flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        <span>Thinking...</span>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSendAiMessage} className="border-t border-gray-100 pt-4 flex gap-3">
                  <input
                    type="text"
                    required
                    value={aiInputText}
                    onChange={(e) => setAiInputText(e.target.value)}
                    placeholder="Ask AI tutor something (e.g. explain variables in coding, help with math 3+2)..."
                    className="flex-1 px-4 py-3 border border-gray-200 bg-gray-50 text-xs text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-200"
                  />
                  <button type="submit" disabled={aiLoading} className="p-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition cursor-pointer disabled:opacity-50">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ================= PAGE: SETTINGS ================= */}
          {activePage === 'settings' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Settings & Preferences</h2>
                <p className="text-gray-500 text-sm mt-1">Manage account settings and notification alerts.</p>
              </div>

              <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-6 max-w-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Email Notifications</h4>
                    <p className="text-xs text-gray-500">Receive homework reminders and exam results via email.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600" />
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-gray-900">Developer Quick View</h4>
                  <p className="text-xs text-gray-500">Preview other dashboard roles instantly for testing.</p>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => switchRole('ADMIN')} className="px-3.5 py-1.5 rounded-xl bg-gray-100 text-violet-600 text-xs font-semibold hover:bg-gray-200 cursor-pointer transition">Admin View</button>
                    <button onClick={() => switchRole('TEACHER')} className="px-3.5 py-1.5 rounded-xl bg-gray-100 text-emerald-600 text-xs font-semibold hover:bg-gray-200 cursor-pointer transition">Teacher View</button>
                    <button onClick={() => switchRole('PARENT')} className="px-3.5 py-1.5 rounded-xl bg-gray-100 text-pink-600 text-xs font-semibold hover:bg-gray-200 cursor-pointer transition">Parent View</button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Sign out</h4>
                    <p className="text-xs text-gray-500">End your current session on this device.</p>
                  </div>
                  <button onClick={logout} className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs cursor-pointer transition flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
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

function StatCard({ icon: Icon, label, value, sub, iconBg, iconColor, valueColor }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider truncate">{label}</p>
        <h3 className={`text-xl font-bold font-outfit mt-1 ${valueColor || 'text-gray-900'}`}>{value}</h3>
        <p className="text-[10px] text-gray-400 font-medium mt-1 truncate">{sub}</p>
      </div>
      <div className={`p-3 rounded-xl shrink-0 ${iconBg} ${iconColor}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );
}
