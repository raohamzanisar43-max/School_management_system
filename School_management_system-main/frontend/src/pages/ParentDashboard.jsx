import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Award, Moon, Wallet, AlertTriangle, GraduationCap, CheckCircle, LogOut,
  Calendar, BookOpen, CreditCard, ChevronRight, FileText, Check, Printer,
  MessageSquare, Sparkles, Settings, Send
} from 'lucide-react';

export default function ParentDashboard() {
  const { user, logout, switchRole } = useAuth();
  const [assessmentResults, setAssessmentResults] = useState([]);
  const [islamicProfile, setIslamicProfile] = useState(null);
  const [islamicLogs, setIslamicLogs] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [activeTab, setActiveTab] = useState('academics');

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
      
      setAssessmentResults(results);
      setIslamicProfile(ip);
      setIslamicLogs(logs);
      setInvoices(invs);

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navigation Header */}
      <header className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pink-600/20 border border-pink-500/30 rounded-xl text-pink-400">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-outfit tracking-tight">Bright Future</h1>
            <p className="text-[10px] text-pink-400 uppercase tracking-widest font-semibold">Parent Portal</p>
          </div>
        </div>

        {/* Profile Switching Debug Panel */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 border border-slate-800 rounded-xl text-xs">
            <span className="px-2 text-slate-500 font-semibold">Quick View:</span>
            <button onClick={() => switchRole('ADMIN')} className="px-2.5 py-1 hover:bg-slate-800 hover:text-white rounded-lg transition text-indigo-400 font-medium cursor-pointer">Admin</button>
            <button onClick={() => switchRole('TEACHER')} className="px-2.5 py-1 hover:bg-slate-800 hover:text-white rounded-lg transition text-emerald-400 font-medium cursor-pointer">Teacher</button>
            <button onClick={() => switchRole('STUDENT')} className="px-2.5 py-1 hover:bg-slate-800 hover:text-white rounded-lg transition text-amber-400 font-medium cursor-pointer">Student</button>
          </div>

          <div className="flex items-center gap-3 border-l border-slate-800 pl-6">
            <div className="text-right">
              <p className="text-sm font-semibold text-white">{user?.name}</p>
              <p className="text-xs text-slate-400">Guardian</p>
            </div>
            <button 
              onClick={logout} 
              className="p-2 bg-slate-900 hover:bg-red-500/20 border border-slate-800 hover:border-red-500/30 rounded-xl text-slate-400 hover:text-red-400 transition cursor-pointer"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 border-r border-slate-800/80 p-6 flex flex-col gap-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">Child Tracker</p>
          <button
            onClick={() => setActiveTab('academics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'academics' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <Award className="h-5 w-5" />
            Academic Report Cards
          </button>
          <button
            onClick={() => setActiveTab('islamic')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'islamic' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <Moon className="h-5 w-5" />
            Daily Quran Recitations
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'billing' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <Wallet className="h-5 w-5" />
            Outstanding Invoices
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'chat' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <MessageSquare className="h-5 w-5" />
            Message Teacher
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'ai' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <Sparkles className="h-5 w-5" />
            Nova Family Advisor
          </button>
        </aside>

        {/* Dashboard Views */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Tab 1: ACADEMIC PERFORMANCE (Report Cards) */}
          {activeTab === 'academics' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-extrabold font-outfit text-white">Academic Performance Logs</h2>
                <p className="text-slate-400 text-sm mt-1">Review verified report cards, learning diagnostics, and teacher recommendations.</p>
              </div>

              {/* Assessment details list */}
              <div className="space-y-6">
                {assessmentResults.map(res => (
                  <div key={res.id} className="glass p-6 rounded-3xl space-y-6 border border-slate-800 hover-glow transition-all duration-300">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800/80 pb-4 gap-4">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-md uppercase tracking-wider">Evaluation Result</span>
                        <h3 className="text-xl font-bold font-outfit text-white mt-1.5">{res.assessment?.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Assigned Student: Zayd Ahmed Bilal (Grade 1)</p>
                      </div>

                      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-center">
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Overall Score</span>
                        <h4 className="text-2xl font-black text-emerald-400 font-outfit mt-0.5">{res.score}%</h4>
                      </div>
                    </div>

                    {/* Strengths & Weaknesses grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl space-y-2">
                        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                          <CheckCircle className="h-4 w-4" />
                          Key Strengths & Merits
                        </h4>
                        <p className="text-slate-300 text-xs leading-relaxed font-medium">
                          {res.strengths}
                        </p>
                      </div>

                      <div className="p-5 bg-rose-500/5 border border-rose-500/20 rounded-2xl space-y-2">
                        <h4 className="text-xs font-bold text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
                          <AlertTriangle className="h-4 w-4" />
                          Growth Areas & Weaknesses
                        </h4>
                        <p className="text-slate-300 text-xs leading-relaxed font-medium">
                          {res.weaknesses}
                        </p>
                      </div>
                    </div>

                    {/* Learning gaps & Recommendations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl space-y-2">
                        <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                          <BookOpen className="h-4 w-4" />
                          Identified Learning Gaps
                        </h4>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          {res.learning_gaps}
                        </p>
                      </div>

                      <div className="p-5 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl space-y-2">
                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                          <ChevronRight className="h-4 w-4 text-indigo-400" />
                          Tutor Recommendations
                        </h4>
                        <p className="text-slate-300 text-xs leading-relaxed">
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
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-extrabold font-outfit text-white">Quran Recitation Tracker</h2>
                <p className="text-slate-400 text-sm mt-1">Monitor daily Quran recitation logs, memorization pages, and tutor comments.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats panel */}
                <div className="glass p-6 rounded-2xl lg:col-span-1 space-y-6">
                  <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                    <Moon className="h-5 w-5 text-pink-400" />
                    Hifz Progress Metrics
                  </h3>

                  <div className="p-4 bg-slate-900 border border-slate-805 rounded-xl text-center">
                    <span className="text-[10px] text-slate-500 block uppercase tracking-widest font-bold">Recited Surah</span>
                    <h4 className="text-lg font-bold font-outfit text-white mt-1.5">Surah {islamicProfile?.current_surah}</h4>
                    <p className="text-xs text-pink-400 font-semibold mt-1">Starting Ayah {islamicProfile?.current_ayat}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Total Memorized Pages</span>
                      <span className="font-bold text-white">{islamicProfile?.hifz_completed_pages} / 600</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div className="bg-pink-500 h-full rounded-full" style={{ width: `${(islamicProfile?.hifz_completed_pages / 600) * 100}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Logs list */}
                <div className="glass p-6 rounded-2xl lg:col-span-2 space-y-4">
                  <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-pink-400" />
                    Daily Recitation Progress Log
                  </h3>
                  <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
                    {islamicLogs.map(log => (
                      <div key={log.id} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5">
                            <span className="text-[9px] font-bold px-2 py-0.5 bg-pink-500/10 text-pink-400 rounded-md uppercase tracking-wider">{log.type}</span>
                            <span className="text-xs text-slate-400 font-medium">{log.date}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white mt-1.5">Surah {log.surah_name} (Ayat {log.from_ayat} to {log.to_ayat})</h4>
                          <p className="text-xs text-slate-400 italic">Tarbiyah notes: "{log.tarbiyah_notes}"</p>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
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
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-extrabold font-outfit text-white">Outstanding Tuition Bills</h2>
                <p className="text-slate-400 text-sm mt-1">Review student invoice statements and pay balances via mock online gateways.</p>
              </div>

              <div className="glass p-6 rounded-2xl max-w-3xl mx-auto space-y-4">
                <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800/80 pb-3 flex items-center justify-between">
                  <span>Invoice Billing Log</span>
                  <span className="text-xs font-bold text-pink-400">Child: Zayd Ahmed Bilal</span>
                </h3>

                <div className="space-y-3">
                  {invoices.map(inv => (
                    <div key={inv.id} className="p-4 bg-slate-900 border border-slate-805 rounded-xl flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">Invoice ID: BF-00{inv.id}</span>
                          <span className="text-slate-700 text-xs">•</span>
                          <span className="text-xs text-slate-500 font-semibold">Due: {inv.due_date}</span>
                        </div>
                        <p className="text-xs text-slate-400">Homeschooling fee package for level Level 1 Primary.</p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm font-extrabold text-white">Rs. {parseFloat(inv.amount).toLocaleString()}</p>
                          <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 ${inv.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                            {inv.status}
                          </span>
                        </div>

                        {inv.status === 'UNPAID' ? (
                          <button
                            onClick={() => setSelectedInvoiceToPay(inv)}
                            className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold rounded-xl transition hover-glow cursor-pointer"
                          >
                            Pay Bill
                          </button>
                        ) : (
                          <button
                            onClick={() => alert('Printing invoice receipt BF-00' + inv.id + '...')}
                            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-850 text-slate-450 hover:text-white rounded-xl transition cursor-pointer"
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

              {/* Pay Invoice Modal */}
              {selectedInvoiceToPay && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
                  <div className="glass p-6 rounded-3xl max-w-sm w-full space-y-6 animate-scale-in">
                    <div className="text-center">
                      <h3 className="text-lg font-bold font-outfit text-white">Process Bill Payment</h3>
                      <p className="text-xs text-slate-400 mt-1">Paying invoice BF-00{selectedInvoiceToPay.id} for Rs. {parseFloat(selectedInvoiceToPay.amount).toLocaleString()}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      <button
                        onClick={() => handlePayInvoice('BANK_TRANSFER')}
                        className="w-full py-3 px-4 bg-slate-900 border border-slate-800 hover:border-pink-505 hover:bg-slate-800/60 rounded-xl text-xs font-bold text-white text-left transition flex items-center gap-2.5 cursor-pointer"
                      >
                        <Wallet className="h-5 w-5 text-indigo-400" />
                        Direct Bank Transfer
                      </button>
                      <button
                        onClick={() => handlePayInvoice('CREDIT_CARD')}
                        className="w-full py-3 px-4 bg-slate-900 border border-slate-800 hover:border-pink-505 hover:bg-slate-800/60 rounded-xl text-xs font-bold text-white text-left transition flex items-center gap-2.5 cursor-pointer"
                      >
                        <CreditCard className="h-5 w-5 text-pink-400" />
                        Credit / Debit Card Online
                      </button>
                    </div>

                    <button
                      onClick={() => setSelectedInvoiceToPay(null)}
                      className="w-full py-2 bg-slate-850 hover:bg-slate-800 text-slate-400 rounded-xl text-xs font-semibold transition cursor-pointer"
                    >
                      Close Modal
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab: MESSAGE TEACHER */}
          {activeTab === 'chat' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-extrabold font-outfit text-white">Message Teacher</h2>
                <p className="text-slate-400 text-sm mt-1">Direct message channel with Zayd's primary tutor Ustadh Ahmed Bilal.</p>
              </div>

              <div className="glass rounded-3xl p-6 max-w-3xl mx-auto flex flex-col h-[500px]">
                {/* Chat Header */}
                <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 font-bold font-outfit">AB</div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Ustadh Ahmed Bilal</h4>
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
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
                        <div className={`max-w-md rounded-2xl px-4 py-2.5 text-xs ${isMe ? 'bg-pink-650 text-white font-medium rounded-tr-none bg-pink-600' : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'}`}>
                          <p>{msg.message}</p>
                          <span className={`block text-[8px] mt-1.5 text-right ${isMe ? 'text-slate-200/80' : 'text-slate-500'}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Message input form */}
                <form onSubmit={handleSendChatMessage} className="border-t border-slate-800 pt-4 flex gap-3">
                  <input
                    type="text"
                    required
                    value={chatInputText}
                    onChange={(e) => setChatInputText(e.target.value)}
                    placeholder="Type your message to Ustadh..."
                    className="flex-1 px-4 py-3 border border-slate-700 bg-slate-900 text-xs text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                  <button type="submit" className="p-3 bg-pink-650 bg-pink-600 hover:bg-pink-500 text-white rounded-xl transition cursor-pointer">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Tab: NOVA FAMILY ADVISOR */}
          {activeTab === 'ai' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-extrabold font-outfit text-white">Nova Family Advisor</h2>
                  <p className="text-slate-400 text-sm mt-1">Get parenting strategies, learning gaps diagnostics, and home activities advice from AI.</p>
                </div>
                <button
                  onClick={() => setShowApiKeySetting(!showApiKeySetting)}
                  className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  <Settings className="h-4 w-4 text-violet-400" />
                  AI Settings
                </button>
              </div>

              {/* Gemini Key Config Panel */}
              {showApiKeySetting && (
                <div className="glass p-6 rounded-2xl max-w-xl mx-auto space-y-4 animate-slide-up mb-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Settings className="h-4 w-4 text-violet-400" />
                    Google Gemini API Key Config
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Paste your Gemini API key below to unlock real-time custom AI responses. Your key is saved locally in your browser's localStorage.</p>
                  <form onSubmit={handleSaveGeminiKey} className="flex flex-col sm:flex-row gap-3 items-end">
                    <input
                      type="password"
                      value={geminiKeyInput}
                      onChange={(e) => setGeminiKeyInput(e.target.value)}
                      placeholder="AIzaSy..."
                      className="flex-1 w-full px-3 py-2 border border-slate-700 bg-slate-900 rounded-xl text-xs text-white"
                    />
                    <button type="submit" className="py-2 px-4 bg-violet-600 hover:bg-violet-500 rounded-xl text-xs font-bold text-white cursor-pointer transition">
                      Save Key
                    </button>
                  </form>
                </div>
              )}

              <div className="glass rounded-3xl p-6 max-w-3xl mx-auto flex flex-col h-[500px]">
                {/* Chat Header */}
                <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-600/20 border border-violet-500/30 rounded-xl flex items-center justify-center text-violet-400 font-bold">
                      <Sparkles className="h-5 w-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Gemini Advisor</h4>
                      <span className="text-[9px] text-violet-400 font-bold uppercase tracking-wider">
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
                        <div className={`max-w-xl rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line ${isUser ? 'bg-violet-600 text-white rounded-tr-none' : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none'}`}>
                          <p>{msg.text}</p>
                        </div>
                      </div>
                    );
                  })}
                  {aiLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-400 flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        <span>Gemini is advising...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input area */}
                <form onSubmit={handleSendAiMessage} className="border-t border-slate-800 pt-4 flex gap-3">
                  <input
                    type="text"
                    required
                    value={aiInputText}
                    onChange={(e) => setAiInputText(e.target.value)}
                    placeholder="Ask Gemini for child advising tips (e.g. how to improve spelling, home tasks timeline)..."
                    className="flex-1 px-4 py-3 border border-slate-700 bg-slate-900 text-xs text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                  <button type="submit" disabled={aiLoading} className="p-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition cursor-pointer disabled:opacity-50">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
