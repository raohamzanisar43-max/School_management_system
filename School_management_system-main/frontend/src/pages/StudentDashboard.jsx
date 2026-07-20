import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, Video, FileText, CheckCircle, Moon, Brain, Play, LogOut,
  Send, Upload, Clock, AlertTriangle, Shield, Check, Wallet, Printer, Camera,
  MessageSquare, Sparkles, Settings, CreditCard, Plus
} from 'lucide-react';

export default function StudentDashboard() {
  const { user, logout, switchRole } = useAuth();
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

  // Active View Tab
  const [activeTab, setActiveTab] = useState('lessons');

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
    { id: 1, sender: 'ai', text: "👋 Hello Zayd! I am your Bright Future AI Tutor. Ask me anything about Math, Python loops, or Quran Surahs, and let's learn together!" }
  ]);
  const [aiInputText, setAiInputText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [geminiKeyInput, setGeminiKeyInput] = useState(localStorage.getItem('gemini_api_key') || '');
  const [showApiKeySetting, setShowApiKeySetting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const progs = await api.getPrograms();
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

      // Load chat thread
      try {
        const chatMsgs = await api.getChatMessages(2);
        setChatMessages(chatMsgs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Fetch assignments when lesson changes
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
    
    // Submit homework to service
    const subData = {
      assignment: uploadingAssignmentId,
      student: 3,
      fileName: mockFileName
    };
    const newSub = await api.submitAssignment(subData);
    setSubmissions([newSub, ...submissions.filter(s => s.assignment !== uploadingAssignmentId)]);
    setUploadingAssignmentId(null);
    setIsSubmittingHW(false);
    alert('Worksheet file submitted successfully to Instructor Ahmed Bilal!');
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
    
    // Refresh skill progress metrics
    const skp = await api.getSkillProgress(3);
    setSkillProgress(skp);
  };

  // Exam simulator trigger
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

  // Simulated AI proctoring violations
  const triggerMockViolation = async (type) => {
    const confidence = (Math.random() * 5 + 95).toFixed(2); // 95% - 100%
    const newV = {
      id: violationsLog.length + 1,
      attempt: 1,
      timestamp: new Date().toLocaleTimeString(),
      violation_type: type,
      confidence_score: confidence
    };
    
    // Log to simulated backend
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
    // Score calculations
    let scoreCount = 0;
    activeExam.questions.forEach((q, idx) => {
      if (q.type === 'MCQ' && selectedAnswers[idx] === q.correct_answer) {
        scoreCount += 1;
      } else if (q.type === 'SUBJECTIVE') {
        scoreCount += 1; // Auto pass subjective for simulation
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
    
    // Add user message
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Nav */}
      <header className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-600/20 border border-amber-500/30 rounded-xl text-amber-400">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-outfit tracking-tight">Bright Future</h1>
            <p className="text-[10px] text-amber-400 uppercase tracking-widest font-semibold">Student Portal</p>
          </div>
        </div>

        {/* Profile / Switching */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 border border-slate-800 rounded-xl text-xs">
            <span className="px-2 text-slate-500 font-semibold">Quick View:</span>
            <button onClick={() => switchRole('ADMIN')} className="px-2.5 py-1 hover:bg-slate-800 hover:text-white rounded-lg transition text-indigo-400 font-medium cursor-pointer">Admin</button>
            <button onClick={() => switchRole('TEACHER')} className="px-2.5 py-1 hover:bg-slate-800 hover:text-white rounded-lg transition text-emerald-400 font-medium cursor-pointer">Teacher</button>
            <button onClick={() => switchRole('PARENT')} className="px-2.5 py-1 hover:bg-slate-800 hover:text-white rounded-lg transition text-pink-400 font-medium cursor-pointer">Parent</button>
          </div>

          <div className="flex items-center gap-3 border-l border-slate-800 pl-6">
            <div className="text-right">
              <p className="text-sm font-semibold text-white">{user?.name}</p>
              <p className="text-xs text-slate-400 font-medium">Grade 1 Pupil</p>
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

      {/* Main layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 border-r border-slate-800/80 p-6 flex flex-col gap-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">Classrooms</p>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'lessons' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <BookOpen className="h-5 w-5" />
            LMS Lectures & HW
          </button>
          <button
            onClick={() => setActiveTab('exam')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'exam' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <Shield className="h-5 w-5" />
            Smart Exam Hall
          </button>
          <button
            onClick={() => setActiveTab('islamic')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'islamic' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <Moon className="h-5 w-5" />
            Quran Progression Log
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'skills' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <Brain className="h-5 w-5" />
            Future Skills Lab
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'billing' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <Wallet className="h-5 w-5" />
            Tuition Billing
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'chat' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <MessageSquare className="h-5 w-5" />
            Message Tutor
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'ai' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <Sparkles className="h-5 w-5" />
            AI Tutor
          </button>
        </aside>

        {/* Views */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* View 1: LMS Lectures */}
          {activeTab === 'lessons' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-extrabold font-outfit text-white">LMS Classroom Center</h2>
                <p className="text-slate-400 text-sm mt-1">Review lecture video sessions, join live Zoom calls, and submit homework sheets.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Lesson syllabus index */}
                <div className="glass p-6 rounded-2xl lg:col-span-1 space-y-4">
                  <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800/80 pb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-amber-400" />
                    Lecture Modules
                  </h3>
                  <div className="space-y-2.5">
                    {lessons.map(l => (
                      <button
                        key={l.id}
                        onClick={() => setActiveLesson(l)}
                        className={`w-full text-left p-4 rounded-xl border transition flex items-center justify-between gap-3 cursor-pointer ${activeLesson?.id === l.id ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-900/60 border-slate-850 text-slate-300 hover:bg-slate-800'}`}
                      >
                        <span className="font-bold text-xs line-clamp-1">{l.title}</span>
                        <Play className="h-4 w-4 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lesson body & assignments */}
                {activeLesson ? (
                  <div className="lg:col-span-2 space-y-8">
                    {/* Active lesson video & text */}
                    <div className="glass p-6 rounded-2xl space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[9px] font-extrabold bg-amber-500/15 text-amber-400 border border-amber-500/25 px-2 py-0.5 rounded-md uppercase tracking-wider">MAT-01 Mathematics</span>
                          <h3 className="text-xl font-bold font-outfit text-white mt-1.5">{activeLesson.title}</h3>
                        </div>
                        {activeLesson.zoom_link && (
                          <a
                            href={activeLesson.zoom_link} target="_blank" rel="noreferrer"
                            className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/10 live-pulse transition cursor-pointer"
                          >
                            <Video className="h-4 w-4" />
                            Join Live Class
                          </a>
                        )}
                      </div>

                      {/* Embedded Video Player Mock */}
                      {activeLesson.video_url && (
                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner relative group">
                          <iframe
                            src={activeLesson.video_url}
                            title={activeLesson.title}
                            allowFullScreen
                            className="w-full h-full border-none"
                          ></iframe>
                        </div>
                      )}

                      <div className="text-slate-300 text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                        <p>{activeLesson.content_body}</p>
                      </div>
                    </div>

                    {/* Active lesson homework tasks */}
                    <div className="glass p-6 rounded-2xl space-y-4">
                      <h4 className="text-base font-bold font-outfit text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-indigo-400" />
                        Attached Homework Tasks
                      </h4>

                      {assignments.length > 0 ? (
                        <div className="space-y-4">
                          {assignments.map(ass => {
                            // Find if submitted
                            const sub = submissions.find(s => s.assignment === ass.id && s.student === 3);
                            return (
                              <div key={ass.id} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="space-y-1">
                                    <h5 className="text-sm font-bold text-white">{ass.title}</h5>
                                    <p className="text-xs text-slate-400">{ass.instructions}</p>
                                    <p className="text-[10px] text-slate-500 font-semibold">Due Date: {new Date(ass.due_date).toLocaleString()}</p>
                                  </div>

                                  <div>
                                    {sub ? (
                                      <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                                        <CheckCircle className="h-4 w-4" />
                                        Submitted
                                      </span>
                                    ) : (
                                      <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
                                        Pending
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {sub && sub.grade && (
                                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 text-xs">
                                    <div className="flex items-center justify-between font-bold text-emerald-400 mb-1">
                                      <span>Grade Result: {sub.grade}</span>
                                      <span className="text-[10px] text-slate-500">Graded by Ahmed Bilal</span>
                                    </div>
                                    <p className="text-slate-400 italic">Teacher's Note: "{sub.teacher_feedback}"</p>
                                  </div>
                                )}

                                {!sub && (
                                  <div>
                                    {uploadingAssignmentId === ass.id ? (
                                      <form onSubmit={handleSubmitHW} className="flex flex-col sm:flex-row gap-3 items-end pt-2">
                                        <div className="flex-1 w-full">
                                          <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">File Upload Attachment</label>
                                          <input
                                            type="text"
                                            value={mockFileName}
                                            onChange={(e) => setMockFileName(e.target.value)}
                                            className="block w-full px-3 py-2 border border-slate-700 bg-slate-950 rounded-xl text-xs text-white"
                                          />
                                        </div>
                                        <div className="flex gap-2">
                                          <button type="submit" disabled={isSubmittingHW} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer transition">
                                            Submit
                                          </button>
                                          <button type="button" onClick={() => setUploadingAssignmentId(null)} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl text-xs cursor-pointer">
                                            Cancel
                                          </button>
                                        </div>
                                      </form>
                                    ) : (
                                      <button
                                        onClick={() => setUploadingAssignmentId(ass.id)}
                                        className="flex items-center gap-2 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                                      >
                                        <Upload className="h-4 w-4" />
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
                        <p className="text-xs text-slate-500 italic py-2">No homework worksheets attached to this lesson module.</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="lg:col-span-2 text-center text-slate-500 py-12">Select a lecture module to begin learning.</p>
                )}
              </div>
            </div>
          )}

          {/* View 2: SMART PROCTORED EXAM HALL */}
          {activeTab === 'exam' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-extrabold font-outfit text-white">Smart Exam Hall</h2>
                <p className="text-slate-400 text-sm mt-1">Sit scheduled exams under secure, AI-assisted proctoring environments.</p>
              </div>

              {!examStarted ? (
                <div className="glass p-8 rounded-2xl max-w-xl mx-auto space-y-6">
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-xl flex gap-3 text-xs">
                    <Shield className="h-6 w-6 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold">AI Proctoring Policy</h4>
                      <p className="mt-1 leading-relaxed">This exam session utilizes automatic screen visibility trackers and webcam logs to prevent academic dishonesty. Switching browser tabs, leaving the camera frame, or detection of voice transcripts will flag a violation log immediately.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-base font-bold font-outfit text-white">Available Exams</h3>
                    {exams && exams.length > 0 ? (
                      exams.map(exam => (
                        <div key={exam.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
                          <div>
                            <h4 className="text-sm font-bold text-white">{exam.title}</h4>
                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                              <span>Duration: {exam.duration_minutes} minutes</span>
                              <span>•</span>
                              <span className="text-emerald-400 font-medium">Proctor Active</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleStartExam(exam)}
                            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition hover-glow cursor-pointer"
                          >
                            Start Exam
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 italic py-4 text-center">No scheduled exams available in the curriculum database.</p>
                    )}
                  </div>
                </div>
              ) : (
                /* Secure Exam Interface */
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Left Column: Webcam Monitor & AI violations log */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Simulated Web Cam */}
                    <div className="glass p-4 rounded-2xl space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Camera className="h-4 w-4 text-rose-500" />
                        AI Proctor Webcam Feed
                      </h4>
                      <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 relative flex items-center justify-center overflow-hidden">
                        {/* Interactive simulation avatar */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                          <div className="w-16 h-16 border-2 border-emerald-500 rounded-full animate-ping"></div>
                        </div>
                        <Camera className="h-10 w-10 text-slate-700" />
                        
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center bg-slate-950/80 px-2 py-1.5 rounded-lg border border-slate-800 text-[9px] font-bold">
                          <span className="flex items-center gap-1 text-emerald-400">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                            ACTIVE
                          </span>
                          <span className="text-slate-400">Face Detected: Yes</span>
                        </div>
                      </div>

                      {/* Proctor Violations Logger Controls for Testing */}
                      <div className="pt-2 border-t border-slate-800 space-y-2">
                        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Simulate Proctor Triggers</p>
                        <div className="grid grid-cols-1 gap-2">
                          <button onClick={() => triggerMockViolation('TAB_SWITCH')} className="py-1.5 px-2 bg-slate-900 border border-slate-800 hover:border-amber-500/20 text-slate-400 hover:text-white rounded-lg text-[10px] text-left transition cursor-pointer">
                            ⚠️ Flag Tab Switch
                          </button>
                          <button onClick={() => triggerMockViolation('FACE_NOT_FOUND')} className="py-1.5 px-2 bg-slate-900 border border-slate-800 hover:border-amber-500/20 text-slate-400 hover:text-white rounded-lg text-[10px] text-left transition cursor-pointer">
                            ⚠️ Flag No Face
                          </button>
                          <button onClick={() => triggerMockViolation('SPEECH_DETECTED')} className="py-1.5 px-2 bg-slate-900 border border-slate-800 hover:border-amber-500/20 text-slate-400 hover:text-white rounded-lg text-[10px] text-left transition cursor-pointer">
                            ⚠️ Flag Speech Detected
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Violations Log Panel */}
                    <div className="glass p-4 rounded-2xl space-y-3">
                      <h4 className="text-xs font-bold text-rose-400 uppercase tracking-widest flex items-center justify-between">
                        <span>Incident Log</span>
                        <span className="px-2 py-0.5 bg-rose-500/10 text-rose-400 text-[10px] rounded-full border border-rose-500/20">{violationsCount} Flagged</span>
                      </h4>

                      <div className="space-y-2.5 max-h-[200px] overflow-y-auto pr-1">
                        {violationsLog.length > 0 ? (
                          violationsLog.map(v => (
                            <div key={v.id} className="p-2.5 bg-rose-500/5 border border-rose-500/20 rounded-lg text-[10px]">
                              <div className="flex justify-between font-bold text-rose-400">
                                <span>{v.violation_type.replace('_', ' ')}</span>
                                <span>{v.timestamp}</span>
                              </div>
                              <p className="text-slate-400 mt-1">Confidence: {v.confidence_score}%</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-[10px] text-slate-500 italic py-2 text-center">No proctor incidents recorded yet.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Active Question Panel */}
                  <div className="lg:col-span-3 space-y-6">
                    {examFinished ? (
                      /* Exam Result Card */
                      <div className="glass p-8 rounded-3xl text-center space-y-6 animate-scale-in">
                        <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 mx-auto">
                          <Check className="h-9 w-9" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold font-outfit text-white">Exam Session Submitted</h3>
                          <p className="text-slate-400 text-sm mt-1">Your attempt has been finalized and processed by AI engines.</p>
                        </div>

                        <div className="p-6 bg-slate-900 border border-slate-805 rounded-2xl max-w-sm mx-auto">
                          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Evaluated Score</span>
                          <h4 className="text-4xl font-extrabold text-white font-outfit mt-2">{examScore}%</h4>
                          <span className="text-[10px] text-slate-500 block mt-2">Incidents: {violationsCount} logged</span>
                        </div>

                        <button
                          onClick={() => {
                            setExamStarted(false);
                            setActiveExam(null);
                          }}
                          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition cursor-pointer"
                        >
                          Return to Hall
                        </button>
                      </div>
                    ) : (
                      /* Exam Question Content */
                      <div className="glass p-6 rounded-2xl space-y-6 flex flex-col justify-between min-h-[450px]">
                        {activeExam && activeExam.questions && activeExam.questions.length > 0 ? (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-slate-800/80 pb-4">
                              <div>
                                <h3 className="text-lg font-bold font-outfit text-white">{activeExam.title}</h3>
                                <span className="text-xs text-slate-400">Question {currentQuestionIndex + 1} of {activeExam.questions.length}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 border border-slate-800 rounded-xl">
                                <Clock className="h-4 w-4 text-amber-400" />
                                <span>Timer: 24:12</span>
                              </div>
                            </div>

                            {/* Question body */}
                            <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-xl">
                              <p className="text-sm font-semibold text-white leading-relaxed">
                                {activeExam.questions[currentQuestionIndex]?.text}
                              </p>
                            </div>

                            {/* Answers */}
                            {activeExam.questions[currentQuestionIndex]?.type === 'MCQ' ? (
                              <div className="grid grid-cols-1 gap-3">
                                {(activeExam.questions[currentQuestionIndex]?.options || []).map(opt => (
                                  <button
                                    key={opt}
                                    onClick={() => setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: opt })}
                                    className={`w-full text-left p-4 rounded-xl border text-xs font-medium transition cursor-pointer ${selectedAnswers[currentQuestionIndex] === opt ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'}`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <div>
                                <textarea
                                  value={subjectiveAnswer}
                                  onChange={(e) => setSubjectiveAnswer(e.target.value)}
                                  rows={4}
                                  placeholder="Write your explanation answer here..."
                                  className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-sm text-white focus:outline-none"
                                />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-12 text-slate-500">
                            <AlertTriangle className="h-10 w-10 mx-auto text-amber-500 mb-3" />
                            <p className="text-sm font-semibold">No questions found in this exam.</p>
                          </div>
                        )}

                        {/* Navigation controls */}
                        <div className="flex justify-between items-center pt-6 border-t border-slate-800/80">
                          <button
                            onClick={handlePrevQuestion}
                            disabled={currentQuestionIndex === 0}
                            className="px-4 py-2 border border-slate-800 hover:border-slate-700 bg-slate-900 hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-300 transition cursor-pointer disabled:opacity-50"
                          >
                            Previous
                          </button>
                          
                          {activeExam && activeExam.questions && currentQuestionIndex === activeExam.questions.length - 1 ? (
                            <button
                              onClick={handleFinishExam}
                              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition hover-glow cursor-pointer"
                            >
                              Submit Exam Attempt
                            </button>
                          ) : (
                            <button
                              onClick={handleNextQuestion}
                              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                            >
                              Next Question
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* View 3: QURAN RECITATION LOG */}
          {activeTab === 'islamic' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-extrabold font-outfit text-white">Daily Quran Recitation Log</h2>
                <p className="text-slate-400 text-sm mt-1">Read character feedback (Tarbiyah) and review daily progress metrics.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quran statistics */}
                <div className="glass p-6 rounded-2xl lg:col-span-1 flex flex-col justify-between">
                  <div className="space-y-5">
                    <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800/80 pb-3 flex items-center gap-2">
                      <Moon className="h-5 w-5 text-emerald-400" />
                      Hifz Progression
                    </h3>

                    <div className="p-4 bg-slate-900 rounded-xl text-center border border-slate-805">
                      <span className="text-[10px] text-slate-500 block uppercase tracking-widest font-bold">Current recitation</span>
                      <h4 className="text-xl font-bold font-outfit text-white mt-1.5">Surah {islamicProfile?.current_surah}</h4>
                      <p className="text-xs text-emerald-400 font-semibold mt-1">Starting Ayah {islamicProfile?.current_ayat}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-medium">Hifz Pages Memorized</span>
                        <span className="font-bold text-white">{islamicProfile?.hifz_completed_pages} / 600</span>
                      </div>
                      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(islamicProfile?.hifz_completed_pages / 600) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-[10px] text-emerald-300 mt-6 leading-relaxed">
                    ✨ <strong>Tadjweed Level: {islamicProfile?.tajweed_level}</strong>. Keep practicing pronunciation rules to level up!
                  </div>
                </div>

                {/* Recitation log queue */}
                <div className="glass p-6 rounded-2xl lg:col-span-2 space-y-4">
                  <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800/80 pb-3">Recitation History Logs</h3>
                    {islamicLogs && islamicLogs.length > 0 ? (
                      islamicLogs.map(log => (
                        <div key={log.id} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-bold px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-md uppercase tracking-wider">{log.type}</span>
                              <span className="text-xs text-slate-500 font-medium">{log.date}</span>
                            </div>
                            <h4 className="text-sm font-bold text-white mt-1.5">Surah {log.surah_name} (Ayat {log.from_ayat} to {log.to_ayat})</h4>
                            <p className="text-xs text-slate-400 italic">Tarbiyah note: "{log.tarbiyah_notes}"</p>
                          </div>
                          <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                            {log.evaluation_grade}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 italic py-4 text-center">No daily recitation logs found.</p>
                    )}
                </div>
              </div>
            </div>
          )}

          {/* View 4: FUTURE SKILLS LAB */}
          {activeTab === 'skills' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-extrabold font-outfit text-white">Future Skills Lab</h2>
                <p className="text-slate-400 text-sm mt-1">Develop technical capabilities in AI models, prompt engineering, and Python coding scripts.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Submit project panel */}
                <div className="glass p-6 rounded-2xl lg:col-span-1 space-y-4">
                  <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800/80 pb-3 flex items-center gap-2">
                    <Plus className="h-5 w-5 text-amber-400" />
                    Submit Portfolio Project
                  </h3>
                  <form onSubmit={handleSubmitProject} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Technical Track</label>
                      <select 
                        value={newProjTrack} onChange={(e) => setNewProjTrack(parseInt(e.target.value))}
                        className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none"
                      >
                        <option value={1}>Artificial Intelligence (AI)</option>
                        <option value={2}>Python Coding</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Project Title</label>
                      <input 
                        type="text" required value={newProjTitle} onChange={(e) => setNewProjTitle(e.target.value)}
                        placeholder="e.g. Chatbot System Prompt Diagram"
                        className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Project Repository URL</label>
                      <input 
                        type="url" required value={newProjUrl} onChange={(e) => setNewProjUrl(e.target.value)}
                        placeholder="https://github.com/..."
                        className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none"
                      />
                    </div>
                    <button type="submit" className="w-full py-2.5 border border-transparent rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 transition cursor-pointer">
                      Publish Portfolio File
                    </button>
                  </form>
                </div>

                {/* Progress bars list */}
                <div className="glass p-6 rounded-2xl lg:col-span-2 space-y-6">
                  <div className="border-b border-slate-800/80 pb-3">
                    <h3 className="text-base font-bold font-outfit text-white">Current Track Progress</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skillProgress.map(sp => (
                      <div key={sp.id} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-md tracking-wider">{sp.track_details?.name}</span>
                          <span className="text-xs text-slate-500">Active: {new Date(sp.last_active).toLocaleDateString()}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white">{sp.track_details?.description}</h4>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>Syllabus Covered</span>
                            <span className="font-bold text-indigo-400">{sp.progress_percent}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                            <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${sp.progress_percent}%` }}></div>
                          </div>
                        </div>

                        <p className="text-[10px] text-slate-500 font-semibold">Completed Projects: {sp.completed_projects_count}</p>
                      </div>
                    ))}
                  </div>

                  {/* Submitted projects history */}
                  <div className="pt-4 border-t border-slate-800/80 space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Portfolio Submission Logs</h4>
                    <div className="space-y-2">
                      {projects.map(proj => (
                        <div key={proj.id} className="p-3 bg-slate-900/40 border border-slate-805 rounded-xl flex items-center justify-between gap-4">
                          <div>
                            <h5 className="text-xs font-bold text-white">{proj.title}</h5>
                            <span className="text-[9px] text-slate-500 font-semibold">{proj.project_url}</span>
                          </div>
                          <div className="text-right">
                            {proj.grade ? (
                              <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 uppercase">
                                Graded: {proj.grade}
                              </span>
                            ) : (
                              <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 uppercase">
                                Awaiting Review
                              </span>
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

          {/* View 5: TUITION BILLING */}
          {activeTab === 'billing' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-extrabold font-outfit text-white">Tuition Billing & Invoices</h2>
                <p className="text-slate-400 text-sm mt-1">Review monthly homeschooling tuition receipts and process outstanding payments.</p>
              </div>

              <div className="glass p-6 rounded-2xl space-y-4 max-w-3xl mx-auto">
                <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800/80 pb-3 flex items-center justify-between">
                  <span>Tuition Invoice List</span>
                  <span className="text-xs font-bold text-amber-400">Active student: Zayd Ahmed Bilal</span>
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
                        <p className="text-xs text-slate-400">Homeschool Primary Level Monthly Fee Package</p>
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
                            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition hover-glow cursor-pointer"
                          >
                            Pay Invoice
                          </button>
                        ) : (
                          <button
                            onClick={() => alert('Printing receipt BF-00' + inv.id + '...')}
                            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl transition cursor-pointer"
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

              {/* Pay Invoice Modal Mockup */}
              {selectedInvoiceToPay && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
                  <div className="glass p-6 rounded-3xl max-w-sm w-full space-y-6 animate-scale-in">
                    <div className="text-center">
                      <h3 className="text-lg font-bold font-outfit text-white">Select Payment Method</h3>
                      <p className="text-xs text-slate-400 mt-1">Paying Invoice BF-00{selectedInvoiceToPay.id} for Rs. {parseFloat(selectedInvoiceToPay.amount).toLocaleString()}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      <button
                        onClick={() => handlePayInvoice('BANK_TRANSFER')}
                        className="w-full py-3 px-4 bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-slate-800/60 rounded-xl text-xs font-bold text-white text-left transition flex items-center gap-2.5 cursor-pointer"
                      >
                        <Wallet className="h-5 w-5 text-indigo-400" />
                        Direct Local Bank Transfer
                      </button>
                      <button
                        onClick={() => handlePayInvoice('CREDIT_CARD')}
                        className="w-full py-3 px-4 bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-slate-800/60 rounded-xl text-xs font-bold text-white text-left transition flex items-center gap-2.5 cursor-pointer"
                      >
                        <CreditCard className="h-5 w-5 text-emerald-400" />
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

          {/* View 6: CHAT WITH TUTOR */}
          {activeTab === 'chat' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-extrabold font-outfit text-white">Message Instructor</h2>
                <p className="text-slate-400 text-sm mt-1">Communicate directly with Ustadh Ahmed Bilal for course queries and grading help.</p>
              </div>

              <div className="glass rounded-3xl p-6 max-w-3xl mx-auto flex flex-col h-[500px]">
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

                {/* Messages list */}
                <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-2">
                  {chatMessages.map(msg => {
                    const isMe = msg.sender === 3;
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md rounded-2xl px-4 py-2.5 text-xs ${isMe ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none' : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'}`}>
                          <p>{msg.message}</p>
                          <span className={`block text-[8px] mt-1.5 text-right ${isMe ? 'text-slate-700' : 'text-slate-500'}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Message input */}
                <form onSubmit={handleSendChatMessage} className="border-t border-slate-800 pt-4 flex gap-3">
                  <input
                    type="text"
                    required
                    value={chatInputText}
                    onChange={(e) => setChatInputText(e.target.value)}
                    placeholder="Type your message to Ustadh..."
                    className="flex-1 px-4 py-3 border border-slate-700 bg-slate-900 text-xs text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button type="submit" className="p-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition cursor-pointer">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* View 7: GEMINI AI BUDDY */}
          {activeTab === 'ai' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-extrabold font-outfit text-white">AI Study Buddy</h2>
                  <p className="text-slate-400 text-sm mt-1">Ask questions, explain lessons, or practice coding exercises with AI.</p>
                </div>
                <button
                  onClick={() => setShowApiKeySetting(!showApiKeySetting)}
                  className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  <Settings className="h-4 w-4 text-violet-400" />
                  Gemini Settings
                </button>
              </div>

              {/* Gemini Key Config Panel */}
              {showApiKeySetting && (
                <div className="glass p-6 rounded-2xl max-w-xl mx-auto space-y-4 animate-slide-up mb-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Settings className="h-4 w-4 text-violet-400" />
                    Google Gemini API Key Config
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Paste your Gemini API key below to unlock real-time, custom AI responses. Your key is stored locally in your browser's localStorage and is sent directly to Google APIs.</p>
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
                      <h4 className="text-sm font-bold text-white">Gemini Study Buddy</h4>
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
                        <span>Gemini is thinking...</span>
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
                    placeholder="Ask AI study buddy something (e.g. explain variables in coding, help with math 3+2)..."
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
