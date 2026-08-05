import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Award, Moon, Wallet, AlertTriangle, GraduationCap, CheckCircle, LogOut,
  Calendar, BookOpen, CreditCard, ChevronRight, FileText, Printer,
  MessageSquare, Sparkles, Settings, Send, LayoutGrid, Search, Bell, TrendingUp
} from 'lucide-react';

const EVAL_SCORE = { EXCELLENT: 100, GOOD: 80, IMPROVING: 60 };

export default function ParentDashboard() {
  const { user, logout, switchRole } = useAuth();
  const [assessmentResults, setAssessmentResults] = useState([]);
  const [islamicProfile, setIslamicProfile] = useState(null);
  const [islamicLogs, setIslamicLogs] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Billing payment states
  const [selectedInvoiceToPay, setSelectedInvoiceToPay] = useState(null);

  // Chat & AI states
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInputText, setChatInputText] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { id: 1, sender: 'ai', text: "👋 Welcome! I am your AI Family Advisor. Ask me for recommendations or strategies to guide your child Zayd based on his performance and logs." }
  ]);
  const [aiInputText, setAiInputText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [geminiKeyInput, setGeminiKeyInput] = useState(localStorage.getItem('gemini_api_key') || '');
  const [showApiKeySetting, setShowApiKeySetting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const results = await api.getAssessmentResults(3); // default child Zayd
      const ip = await api.getIslamicProfile(3);
      const logs = await api.getDailyProgressLogs(ip?.id || 1);
      const invs = await api.getInvoices(3);
      const attend = await api.getAttendanceLogs(1); // Zayd's `students` record id is 1
      const subs = await api.getSubmissions();

      setAssessmentResults(results);
      setIslamicProfile(ip);
      setIslamicLogs(logs);
      setInvoices(invs);
      setAttendanceLogs(attend);
      setSubmissions(subs);

      // Load conversation thread with Teacher Ahmed Bilal (ID 2)
      try {
        const msgs = await api.getChatMessages(2);
        setChatMessages(msgs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handlePayInvoice = async (method) => {
    if (!selectedInvoiceToPay) return;
    await api.payInvoice(selectedInvoiceToPay.id, method);

    // Update local state
    setInvoices(invoices.map(inv => inv.id === selectedInvoiceToPay.id ? { ...inv, status: 'PAID', payment_method: method } : inv));
    setSelectedInvoiceToPay(null);
    alert('Bill payment processed successfully through ' + method.replace('_', ' ') + '!');
  };

  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;
    try {
      const newMsg = await api.sendChatMessage(2, chatInputText.trim()); // Teacher Ahmed Bilal (ID 2)
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
      const aiReply = await api.askAI(userPrompt, 'PARENT');
      const aiMsg = { id: Date.now() + 1, sender: 'ai', text: aiReply };
      setAiMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errMsg = { id: Date.now() + 1, sender: 'ai', text: "❌ Failed to query AI. Check internet connectivity or the API key config in settings." };
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

  // --- Derived Dashboard metrics ---
  const outstandingInvoices = invoices.filter(inv => inv.status === 'UNPAID');
  const outstandingTotal = outstandingInvoices.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
  const nextDueInvoice = outstandingInvoices.sort((a, b) => new Date(a.due_date) - new Date(b.due_date))[0];
  const daysUntilDue = nextDueInvoice ? Math.ceil((new Date(nextDueInvoice.due_date) - new Date('2026-08-04')) / (1000 * 60 * 60 * 24)) : null;

  const presentCount = attendanceLogs.filter(a => a.status === 'PRESENT' || a.status === 'LATE').length;
  const attendancePct = attendanceLogs.length ? Math.round((presentCount / attendanceLogs.length) * 100) : 0;
  const absentCount = attendanceLogs.filter(a => a.status === 'ABSENT').length;

  const quranAvg = islamicLogs.length ? Math.round(islamicLogs.reduce((s, l) => s + (EVAL_SCORE[l.evaluation_grade] || 70), 0) / islamicLogs.length) : 0;
  const homeworkAvg = submissions.filter(s => s.student === 3 && s.grade).length
    ? Math.round(submissions.filter(s => s.student === 3 && s.grade).reduce((s, sub) => s + (sub.grade === 'A' ? 95 : sub.grade === 'B' ? 85 : 75), 0) / submissions.filter(s => s.student === 3 && s.grade).length)
    : 90;
  const overallScore = assessmentResults[0]?.score || 85;

  const growthPoints = [
    { label: 'Assessment', value: overallScore },
    { label: 'Homework', value: homeworkAvg },
    { label: 'Quran', value: quranAvg },
    { label: 'Overall', value: Math.round((overallScore + homeworkAvg + quranAvg) / 3) },
  ];
  const chartW = 320, chartH = 120, pad = 12;
  const maxVal = 100, minVal = 50;
  const pointCoords = growthPoints.map((p, i) => {
    const x = pad + (i * (chartW - pad * 2)) / (growthPoints.length - 1);
    const y = chartH - pad - ((p.value - minVal) / (maxVal - minVal)) * (chartH - pad * 2);
    return { x, y, ...p };
  });
  const linePath = pointCoords.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${pointCoords[pointCoords.length - 1].x} ${chartH} L ${pointCoords[0].x} ${chartH} Z`;

  const latestResults = [
    submissions.find(s => s.student === 3 && s.grade) && { title: 'Single-Digit Addition Sheet', score: homeworkAvg, date: '2 days ago' },
    assessmentResults[0] && { title: assessmentResults[0].assessment?.title || 'Admission Assessment', score: Math.round(overallScore), date: 'Recent' },
  ].filter(Boolean);

  const conicStops = `#10b981 0% ${attendancePct}%, #f1f5f9 ${attendancePct}% 100%`;

  const NAV_ITEMS = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { key: 'academics', label: 'Academic Report Cards', icon: Award },
    { key: 'islamic', label: 'Daily Quran Recitations', icon: Moon },
    { key: 'billing', label: 'Outstanding Invoices', icon: Wallet, badge: outstandingInvoices.length },
    { key: 'chat', label: 'Message Teacher', icon: MessageSquare },
    { key: 'ai', label: 'Nova Family Advisor', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex font-sans">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-gradient-to-b from-violet-700 to-purple-900 text-white">
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
            <img src="/3.png" alt="Bright Future logo" className="h-6 w-6 object-contain rounded-lg" />
          </div>
          <div>
            <h1 className="text-sm font-bold font-outfit tracking-tight leading-tight">Bright Future</h1>
            <p className="text-[10px] text-violet-200 uppercase tracking-widest font-semibold">Parent Portal</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1">
          {NAV_ITEMS.map(({ key, label, icon: Icon, badge }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === key ? 'bg-white text-violet-700 shadow-sm' : 'text-violet-100 hover:bg-white/10 hover:text-white'}`}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              <span className="text-left flex-1 min-w-0 truncate whitespace-nowrap">{label}</span>
              {!!badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${activeTab === key ? 'bg-violet-100 text-violet-700' : 'bg-rose-400 text-violet-950'}`}>{badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center font-bold text-xs shrink-0">
            {(user?.name || 'AB').split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">{user?.name}</p>
            <p className="text-[10px] text-violet-200">Primary Parent</p>
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
              placeholder="Search reports, invoices, messages..."
              className="w-full bg-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs ml-auto">
            <span className="px-2 text-gray-400 font-semibold">Quick View:</span>
            <button onClick={() => switchRole('ADMIN')} className="px-2.5 py-1 hover:bg-white rounded-lg transition text-violet-600 font-medium cursor-pointer">Admin</button>
            <button onClick={() => switchRole('TEACHER')} className="px-2.5 py-1 hover:bg-white rounded-lg transition text-emerald-600 font-medium cursor-pointer">Teacher</button>
            <button onClick={() => switchRole('STUDENT')} className="px-2.5 py-1 hover:bg-white rounded-lg transition text-amber-600 font-medium cursor-pointer">Student</button>
          </div>

          <button className="relative w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition cursor-pointer" title="Notifications">
            <Bell className="h-[18px] w-[18px]" />
            {outstandingInvoices.length > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>}
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
          {/* Tab: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Welcome back, {(user?.name || 'Guardian').split(' ')[0]}</h2>
                <p className="text-gray-500 text-sm mt-1">Here is an overview of Zayd's week.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Child profile card */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-14 h-14 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-lg shrink-0">ZB</div>
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-gray-900 truncate">Zayd Ahmed Bilal</h3>
                          <p className="text-xs text-gray-500">Grade 1 Student · Primary Math Explorers</p>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => setActiveTab('academics')} className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-xl transition cursor-pointer">View Portfolio</button>
                        <button onClick={() => setActiveTab('chat')} className="px-4 py-2 border border-gray-200 hover:border-gray-300 text-gray-600 text-xs font-bold rounded-xl transition cursor-pointer">Contact Teacher</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-gray-100">
                      <div className="bg-gray-50 rounded-xl p-3.5">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Class Rank</p>
                        <p className="text-lg font-black text-gray-900 mt-1">3<span className="text-xs font-medium text-gray-400">rd of 12</span></p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3.5">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Avg Score</p>
                        <p className="text-lg font-black text-emerald-600 mt-1">{overallScore}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Growth chart */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-bold text-gray-900">Academic Growth</h3>
                      <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg">Current Term</span>
                    </div>
                    <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-32">
                      <defs>
                        <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d={areaPath} fill="url(#growthFill)" />
                      <path d={linePath} fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      {pointCoords.map(p => (
                        <circle key={p.label} cx={p.x} cy={p.y} r="3.5" fill="#ffffff" stroke="#7c3aed" strokeWidth="2" />
                      ))}
                    </svg>
                    <div className="flex justify-between mt-1">
                      {growthPoints.map(p => (
                        <span key={p.label} className="text-[10px] text-gray-400 font-medium">{p.label}</span>
                      ))}
                    </div>
                  </div>

                  {/* Latest Results */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-4">Latest Results</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {latestResults.map(r => (
                        <div key={r.title} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">{r.title}</p>
                            <p className="text-[11px] text-gray-400">{r.date}</p>
                          </div>
                          <span className="ml-auto text-sm font-black text-emerald-600 shrink-0">{r.score}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Fee Status */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-4">Fee Status</h3>
                    {outstandingInvoices.length > 0 ? (
                      <>
                        <p className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">Outstanding Balance</p>
                        <p className="text-2xl font-black text-rose-600 mt-1">Rs. {outstandingTotal.toLocaleString()}</p>
                        <p className={`text-xs mt-1 flex items-center gap-1 ${daysUntilDue < 0 ? 'text-rose-500 font-semibold' : 'text-gray-400'}`}>
                          <Calendar className="h-3 w-3" />
                          {daysUntilDue == null ? 'Due date pending' : daysUntilDue < 0 ? `Overdue by ${Math.abs(daysUntilDue)} days` : daysUntilDue === 0 ? 'Due today' : `Due in ${daysUntilDue} days`}
                        </p>
                        <button
                          onClick={() => setSelectedInvoiceToPay(nextDueInvoice)}
                          className="w-full mt-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Wallet className="h-4 w-4" />
                          Pay Now
                        </button>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <CheckCircle className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">All invoices are settled. Great job!</p>
                      </div>
                    )}
                  </div>

                  {/* Attendance donut */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-4">Attendance</h3>
                    <div className="flex items-center justify-center">
                      <div className="relative w-28 h-28 rounded-full flex items-center justify-center" style={{ background: `conic-gradient(${conicStops})` }}>
                        <div className="w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center">
                          <span className="text-lg font-black text-emerald-600">{attendancePct}%</span>
                          <span className="text-[8px] text-gray-400 uppercase font-bold tracking-wider">Present</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-3">{absentCount} {absentCount === 1 ? 'day' : 'days'} absent this term</p>
                  </div>

                  {/* Messages preview */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-gray-900">Messages</h3>
                      <button onClick={() => setActiveTab('chat')} className="text-xs font-semibold text-violet-600 hover:underline cursor-pointer">See All</button>
                    </div>
                    <div className="space-y-3">
                      {chatMessages.slice(-2).map(msg => {
                        const isMe = msg.sender === 4;
                        return (
                          <div key={msg.id} className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${isMe ? 'bg-violet-50 text-violet-600' : 'bg-emerald-50 text-emerald-600'}`}>{isMe ? 'You' : 'AB'}</div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-gray-900">{isMe ? 'You' : 'Ustadh Ahmed Bilal'}</p>
                              <p className="text-[11px] text-gray-500 line-clamp-2">{msg.message}</p>
                            </div>
                          </div>
                        );
                      })}
                      {chatMessages.length === 0 && <p className="text-xs text-gray-400">No messages yet.</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: ACADEMIC PERFORMANCE (Report Cards) */}
          {activeTab === 'academics' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Academic Performance Logs</h2>
                <p className="text-gray-500 text-sm mt-1">Review verified report cards, learning diagnostics, and teacher recommendations.</p>
              </div>

              {/* Assessment details list */}
              <div className="space-y-6">
                {assessmentResults.map(res => (
                  <div key={res.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 gap-4">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-violet-50 text-violet-600 border border-violet-100 rounded-md uppercase tracking-wider">Evaluation Result</span>
                        <h3 className="text-lg font-bold font-outfit text-gray-900 mt-1.5">{res.assessment?.title}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Assigned Student: Zayd Ahmed Bilal (Grade 1)</p>
                      </div>

                      <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-center">
                        <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Overall Score</span>
                        <h4 className="text-2xl font-black text-emerald-600 font-outfit mt-0.5">{res.score}%</h4>
                      </div>
                    </div>

                    {/* Strengths & Weaknesses grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 bg-emerald-50/60 border border-emerald-100 rounded-2xl space-y-2">
                        <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                          <CheckCircle className="h-4 w-4" />
                          Key Strengths & Merits
                        </h4>
                        <p className="text-gray-600 text-xs leading-relaxed font-medium">
                          {res.strengths}
                        </p>
                      </div>

                      <div className="p-5 bg-rose-50/60 border border-rose-100 rounded-2xl space-y-2">
                        <h4 className="text-xs font-bold text-rose-600 uppercase tracking-widest flex items-center gap-1.5">
                          <AlertTriangle className="h-4 w-4" />
                          Growth Areas & Weaknesses
                        </h4>
                        <p className="text-gray-600 text-xs leading-relaxed font-medium">
                          {res.weaknesses}
                        </p>
                      </div>
                    </div>

                    {/* Learning gaps & Recommendations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 bg-amber-50/60 border border-amber-100 rounded-2xl space-y-2">
                        <h4 className="text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1.5">
                          <BookOpen className="h-4 w-4" />
                          Identified Learning Gaps
                        </h4>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          {res.learning_gaps}
                        </p>
                      </div>

                      <div className="p-5 bg-indigo-50/60 border border-indigo-100 rounded-2xl space-y-2">
                        <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-1.5">
                          <ChevronRight className="h-4 w-4 text-indigo-600" />
                          Tutor Recommendations
                        </h4>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          {res.recommendations}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: DAILY QURAN RECITATION LOG */}
          {activeTab === 'islamic' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Quran Recitation Tracker</h2>
                <p className="text-gray-500 text-sm mt-1">Monitor daily Quran recitation logs, memorization pages, and tutor comments.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stats panel */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-1 space-y-6">
                  <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                    <Moon className="h-[18px] w-[18px] text-violet-600" />
                    Hifz Progress Metrics
                  </h3>

                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-center">
                    <span className="text-[10px] text-gray-400 block uppercase tracking-widest font-bold">Recited Surah</span>
                    <h4 className="text-lg font-bold font-outfit text-gray-900 mt-1.5">Surah {islamicProfile?.current_surah}</h4>
                    <p className="text-xs text-violet-600 font-semibold mt-1">Starting Ayah {islamicProfile?.current_ayat}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Total Memorized Pages</span>
                      <span className="font-bold text-gray-900">{islamicProfile?.hifz_completed_pages} / 600</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-violet-500 h-full rounded-full" style={{ width: `${(islamicProfile?.hifz_completed_pages / 600) * 100}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Logs list */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-2 space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                    <Calendar className="h-[18px] w-[18px] text-violet-600" />
                    Daily Recitation Progress Log
                  </h3>
                  <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
                    {islamicLogs.map(log => (
                      <div key={log.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5">
                            <span className="text-[9px] font-bold px-2 py-0.5 bg-violet-50 text-violet-600 rounded-md uppercase tracking-wider">{log.type}</span>
                            <span className="text-xs text-gray-500 font-medium">{log.date}</span>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 mt-1.5">Surah {log.surah_name} (Ayat {log.from_ayat} to {log.to_ayat})</h4>
                          <p className="text-xs text-gray-500 italic">Tarbiyah notes: "{log.tarbiyah_notes}"</p>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-wider shrink-0">
                          {log.evaluation_grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: BILLING & INVOICES */}
          {activeTab === 'billing' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Outstanding Tuition Bills</h2>
                <p className="text-gray-500 text-sm mt-1">Review student invoice statements and pay balances via mock online gateways.</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-3xl mx-auto space-y-4">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center justify-between">
                  <span>Invoice Billing Log</span>
                  <span className="text-xs font-bold text-violet-600">Child: Zayd Ahmed Bilal</span>
                </h3>

                <div className="space-y-3">
                  {invoices.map(inv => (
                    <div key={inv.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between gap-4">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-900">Invoice ID: BF-00{inv.id}</span>
                          <span className="text-gray-300 text-xs">•</span>
                          <span className="text-xs text-gray-500 font-semibold">Due: {inv.due_date}</span>
                        </div>
                        <p className="text-xs text-gray-500">Homeschooling fee package for level Level 1 Primary.</p>
                      </div>

                      <div className="flex items-center gap-6 shrink-0">
                        <div className="text-right">
                          <p className="text-sm font-extrabold text-gray-900">Rs. {parseFloat(inv.amount).toLocaleString()}</p>
                          <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 ${inv.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {inv.status}
                          </span>
                        </div>

                        {inv.status === 'UNPAID' ? (
                          <button
                            onClick={() => setSelectedInvoiceToPay(inv)}
                            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                          >
                            Pay Bill
                          </button>
                        ) : (
                          <button
                            onClick={() => alert('Printing invoice receipt BF-00' + inv.id + '...')}
                            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 rounded-xl transition cursor-pointer"
                            title="Print Receipt"
                          >
                            <Printer className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: MESSAGE TEACHER */}
          {activeTab === 'chat' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Message Teacher</h2>
                <p className="text-gray-500 text-sm mt-1">Direct message channel with Zayd's primary tutor Ustadh Ahmed Bilal.</p>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 max-w-3xl mx-auto flex flex-col h-[500px]">
                {/* Chat Header */}
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-bold font-outfit">AB</div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Ustadh Ahmed Bilal</h4>
                      <span className="text-[10px] text-emerald-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        Online
                      </span>
                    </div>
                  </div>
                </div>

                {/* Messages log */}
                <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-2">
                  {chatMessages.map(msg => {
                    const isMe = msg.sender === 4; // Parent Ahmed Bilal Senior (ID 4)
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md rounded-2xl px-4 py-2.5 text-xs ${isMe ? 'bg-violet-600 text-white font-medium rounded-tr-none' : 'bg-gray-100 text-gray-700 rounded-tl-none'}`}>
                          <p>{msg.message}</p>
                          <span className={`block text-[8px] mt-1.5 text-right ${isMe ? 'text-violet-100' : 'text-gray-400'}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Message input form */}
                <form onSubmit={handleSendChatMessage} className="border-t border-gray-100 pt-4 flex gap-3">
                  <input
                    type="text"
                    required
                    value={chatInputText}
                    onChange={(e) => setChatInputText(e.target.value)}
                    placeholder="Type your message to Ustadh..."
                    className="flex-1 px-4 py-3 border border-gray-200 bg-gray-50 text-xs text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-200"
                  />
                  <button type="submit" className="p-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition cursor-pointer">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Tab: NOVA FAMILY ADVISOR */}
          {activeTab === 'ai' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Nova Family Advisor</h2>
                  <p className="text-gray-500 text-sm mt-1">Get parenting strategies, learning gaps diagnostics, and home activities advice from AI.</p>
                </div>
                <button
                  onClick={() => setShowApiKeySetting(!showApiKeySetting)}
                  className="flex items-center gap-2 px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  <Settings className="h-4 w-4 text-violet-600" />
                  AI Settings
                </button>
              </div>

              {/* Gemini Key Config Panel */}
              {showApiKeySetting && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-xl mx-auto space-y-4 animate-slide-up mb-4">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Settings className="h-4 w-4 text-violet-600" />
                    Google Gemini API Key Config
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Paste your Gemini API key below to unlock real-time custom AI responses. Your key is saved locally in your browser's localStorage.</p>
                  <form onSubmit={handleSaveGeminiKey} className="flex flex-col sm:flex-row gap-3 items-end">
                    <input
                      type="password"
                      value={geminiKeyInput}
                      onChange={(e) => setGeminiKeyInput(e.target.value)}
                      placeholder="AIzaSy..."
                      className="flex-1 w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-xl text-xs text-gray-900"
                    />
                    <button type="submit" className="py-2 px-4 bg-violet-600 hover:bg-violet-700 rounded-xl text-xs font-bold text-white cursor-pointer transition">
                      Save Key
                    </button>
                  </form>
                </div>
              )}

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 max-w-3xl mx-auto flex flex-col h-[500px]">
                {/* Chat Header */}
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-50 border border-violet-100 rounded-xl flex items-center justify-center text-violet-600 font-bold">
                      <Sparkles className="h-5 w-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Gemini Advisor</h4>
                      <span className="text-[9px] text-violet-600 font-bold uppercase tracking-wider">
                        {localStorage.getItem('gemini_api_key') ? 'Live Gemini Engine Enabled' : 'Simulated Sandbox Mode'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Log Area */}
                <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-2">
                  {aiMessages.map(msg => {
                    const isUser = msg.sender === 'user';
                    return (
                      <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xl rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line ${isUser ? 'bg-violet-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-700 rounded-tl-none'}`}>
                          <p>{msg.text}</p>
                        </div>
                      </div>
                    );
                  })}
                  {aiLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-gray-500 flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        <span>Gemini is advising...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input area */}
                <form onSubmit={handleSendAiMessage} className="border-t border-gray-100 pt-4 flex gap-3">
                  <input
                    type="text"
                    required
                    value={aiInputText}
                    onChange={(e) => setAiInputText(e.target.value)}
                    placeholder="Ask Gemini for child advising tips (e.g. how to improve spelling, home tasks timeline)..."
                    className="flex-1 px-4 py-3 border border-gray-200 bg-gray-50 text-xs text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-200"
                  />
                  <button type="submit" disabled={aiLoading} className="p-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition cursor-pointer disabled:opacity-50">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Pay Invoice Modal (available from any tab) */}
      {selectedInvoiceToPay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-6 shadow-2xl animate-scale-in">
            <div className="text-center">
              <h3 className="text-lg font-bold font-outfit text-gray-900">Process Bill Payment</h3>
              <p className="text-xs text-gray-500 mt-1">Paying invoice BF-00{selectedInvoiceToPay.id} for Rs. {parseFloat(selectedInvoiceToPay.amount).toLocaleString()}</p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <button
                onClick={() => handlePayInvoice('BANK_TRANSFER')}
                className="w-full py-3 px-4 bg-gray-50 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 rounded-xl text-xs font-bold text-gray-900 text-left transition flex items-center gap-2.5 cursor-pointer"
              >
                <Wallet className="h-5 w-5 text-indigo-600" />
                Direct Bank Transfer
              </button>
              <button
                onClick={() => handlePayInvoice('CREDIT_CARD')}
                className="w-full py-3 px-4 bg-gray-50 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 rounded-xl text-xs font-bold text-gray-900 text-left transition flex items-center gap-2.5 cursor-pointer"
              >
                <CreditCard className="h-5 w-5 text-violet-600" />
                Credit / Debit Card Online
              </button>
            </div>

            <button
              onClick={() => setSelectedInvoiceToPay(null)}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
