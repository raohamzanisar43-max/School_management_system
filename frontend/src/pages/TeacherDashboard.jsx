import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, Plus, FileText, CheckCircle, Moon, Brain, Check, LogOut,
  Calendar, Award, MessageSquare, Video, ClipboardList, Sparkles, Settings, Send
} from 'lucide-react';

export default function TeacherDashboard() {
  const { user, logout, switchRole } = useAuth();
  const [classrooms, setClassrooms] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [islamicProfile, setIslamicProfile] = useState(null);
  const [islamicLogs, setIslamicLogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('lessons');

  // Lesson Creator state
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonBody, setLessonBody] = useState('');
  const [lessonVideo, setLessonVideo] = useState('');
  const [lessonZoom, setLessonZoom] = useState('https://zoom.us/j/mockclassroom1');

  // Assignment Creator state
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [assignTitle, setAssignTitle] = useState('');
  const [assignInstructions, setAssignInstructions] = useState('');
  const [assignDueDate, setAssignDueDate] = useState('2026-07-28T18:00');

  // Grading states
  const [selectedSubId, setSelectedSubId] = useState(null);
  const [gradeScore, setGradeScore] = useState('A');
  const [gradeFeedback, setGradeFeedback] = useState('');

  // Daily Quran tracker states
  const [quranLogType, setQuranLogType] = useState('HIFAZ');
  const [quranSurah, setQuranSurah] = useState('Al-Baqarah');
  const [quranFromAyat, setQuranFromAyat] = useState('143');
  const [quranToAyat, setQuranToAyat] = useState('145');
  const [quranGrade, setQuranGrade] = useState('EXCELLENT');
  const [quranNotes, setQuranNotes] = useState('Excellent reading speed and strong memorization recall.');

  // Skill Project Review state
  const [selectedProjId, setSelectedProjId] = useState(null);
  const [projectGrade, setProjectGrade] = useState('Pass');
  const [projectReview, setProjectReview] = useState('');

  // Chat & AI states
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInputText, setChatInputText] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { id: 1, sender: 'ai', text: "📋 Welcome Ustadh Ahmed Bilal! I am your AI Lesson Planner. Ask me to construct worksheets, syllabus guides, or check-quizzes, and I will generate them for you!" }
  ]);
  const [aiInputText, setAiInputText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [geminiKeyInput, setGeminiKeyInput] = useState(localStorage.getItem('gemini_api_key') || '');
  const [showApiKeySetting, setShowApiKeySetting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch core datasets
      const lessonsData = await api.getLessons();
      const subsData = await api.getSubmissions();
      const ip = await api.getIslamicProfile(3); // default to Zayd
      const logs = await api.getDailyProgressLogs(ip?.id || 1);
      const projs = await api.getProjects();

      setLessons(lessonsData);
      setSubmissions(subsData);
      setIslamicProfile(ip);
      setIslamicLogs(logs);
      setProjects(projs);
      
      if (lessonsData.length > 0) {
        setSelectedLessonId(lessonsData[0].id.toString());
      }

      // Load conversation thread with Zayd
      try {
        const msgs = await api.getChatMessages(3);
        setChatMessages(msgs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    const lData = {
      course: 2, // math grade 1
      title: lessonTitle,
      content_body: lessonBody,
      video_url: lessonVideo,
      zoom_link: lessonZoom,
      scheduled_time: new Date().toISOString()
    };
    const newL = await api.createLesson(lData);
    setLessons([...lessons, newL]);
    setLessonTitle('');
    setLessonBody('');
    setLessonVideo('');
    alert('Lesson "' + newL.title + '" created successfully!');
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    const aData = {
      lesson: parseInt(selectedLessonId),
      title: assignTitle,
      instructions: assignInstructions,
      due_date: new Date(assignDueDate).toISOString()
    };
    const newA = await api.createAssignment(aData);
    setAssignTitle('');
    setAssignInstructions('');
    alert('Assignment "' + newA.title + '" assigned to lesson!');
  };

  const handleGradeSubmission = async (e) => {
    e.preventDefault();
    if (!selectedSubId) return;
    const updatedSub = await api.gradeSubmission(selectedSubId, gradeScore, gradeFeedback);
    setSubmissions(submissions.map(s => s.id === updatedSub.id ? updatedSub : s));
    setSelectedSubId(null);
    setGradeFeedback('');
    alert('Submission graded successfully!');
  };

  const handleAddQuranLog = async (e) => {
    e.preventDefault();
    const logData = {
      profile: islamicProfile?.id || 1,
      type: quranLogType,
      surah_name: quranSurah,
      from_ayat: parseInt(quranFromAyat),
      to_ayat: parseInt(quranToAyat),
      evaluation_grade: quranGrade,
      tarbiyah_notes: quranNotes,
      date: new Date().toISOString().split('T')[0]
    };
    const newLog = await api.addDailyProgressLog(logData);
    setIslamicLogs([newLog, ...islamicLogs]);
    
    // update current surah display
    setIslamicProfile({
      ...islamicProfile,
      current_surah: newLog.surah_name,
      current_ayat: newLog.to_ayat
    });
    alert('Quran recitation log saved successfully!');
  };

  const handleReviewProject = async (e) => {
    e.preventDefault();
    if (!selectedProjId) return;
    const updatedProj = await api.reviewProject(selectedProjId, projectGrade, projectReview);
    setProjects(projects.map(p => p.id === updatedProj.id ? updatedProj : p));
    setSelectedProjId(null);
    setProjectReview('');
    alert('Project review graded!');
  };

  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;
    try {
      const newMsg = await api.sendChatMessage(3, chatInputText.trim()); // Student Zayd Bilal (ID 3)
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
      const aiReply = await api.askAI(userPrompt, 'TEACHER');
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
      {/* Header */}
      <header className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-600/20 border border-emerald-500/30 rounded-xl text-emerald-400">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-outfit tracking-tight">Bright Future</h1>
            <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold">Teacher Workspace</p>
          </div>
        </div>

        {/* User profile & Switcher */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 border border-slate-800 rounded-xl text-xs">
            <span className="px-2 text-slate-500 font-semibold">Quick View:</span>
            <button onClick={() => switchRole('ADMIN')} className="px-2.5 py-1 hover:bg-slate-800 hover:text-white rounded-lg transition text-indigo-400 font-medium cursor-pointer">Admin</button>
            <button onClick={() => switchRole('STUDENT')} className="px-2.5 py-1 hover:bg-slate-800 hover:text-white rounded-lg transition text-amber-400 font-medium cursor-pointer">Student</button>
            <button onClick={() => switchRole('PARENT')} className="px-2.5 py-1 hover:bg-slate-800 hover:text-white rounded-lg transition text-pink-400 font-medium cursor-pointer">Parent</button>
          </div>

          <div className="flex items-center gap-3 border-l border-slate-800 pl-6">
            <div className="text-right">
              <p className="text-sm font-semibold text-white">{user?.name}</p>
              <p className="text-xs text-slate-400">Instructor</p>
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
        {/* Sidebar */}
        <aside className="w-full md:w-64 border-r border-slate-800/80 p-6 flex flex-col gap-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">Tutor Hub</p>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'lessons' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <Video className="h-5 w-5" />
            LMS Lesson Planner
          </button>
          <button
            onClick={() => setActiveTab('grading')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'grading' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <ClipboardList className="h-5 w-5" />
            Grading Center
            {submissions.filter(s => !s.grade).length > 0 && (
              <span className="ml-auto bg-amber-500 text-slate-950 font-bold text-[10px] px-1.5 py-0.5 rounded-full">{submissions.filter(s => !s.grade).length}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('islamic')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'islamic' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <Moon className="h-5 w-5" />
            Quran Recitation Log
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'skills' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <Brain className="h-5 w-5" />
            Future Skills Lab
            {projects.filter(p => !p.grade).length > 0 && (
              <span className="ml-auto bg-amber-500 text-slate-950 font-bold text-[10px] px-1.5 py-0.5 rounded-full">{projects.filter(p => !p.grade).length}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'chat' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <MessageSquare className="h-5 w-5" />
            Student Messages
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'ai' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <Sparkles className="h-5 w-5" />
            Gemini AI Planner
          </button>
        </aside>

        {/* Workspace views */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Tab: LESSONS & ASSIGNMENTS */}
          {activeTab === 'lessons' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-extrabold font-outfit text-white">LMS Lesson Planner</h2>
                <p className="text-slate-400 text-sm mt-1">Develop curriculum lessons, upload lecture links, and assign student worksheets.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Lesson creation form */}
                <div className="glass p-6 rounded-2xl space-y-4">
                  <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800/80 pb-3 flex items-center gap-2">
                    <Plus className="h-5 w-5 text-emerald-400" />
                    Publish New Lesson
                  </h3>
                  <form onSubmit={handleCreateLesson} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Lesson Title</label>
                      <input 
                        type="text" required value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)}
                        placeholder="e.g. Addition Word Problems"
                        className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Lesson Explanation Body</label>
                      <textarea 
                        required value={lessonBody} onChange={(e) => setLessonBody(e.target.value)} rows={3}
                        placeholder="Provide simple explanations or instructions for children..."
                        className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">YouTube Video URL</label>
                        <input 
                          type="url" value={lessonVideo} onChange={(e) => setLessonVideo(e.target.value)}
                          placeholder="e.g. https://youtube.com/..."
                          className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Live Session Zoom Link</label>
                        <input 
                          type="url" required value={lessonZoom} onChange={(e) => setLessonZoom(e.target.value)}
                          placeholder="https://zoom.us/..."
                          className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                    <button type="submit" className="w-full py-2.5 border border-transparent rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 hover-glow transition cursor-pointer">
                      Publish Lesson
                    </button>
                  </form>
                </div>

                {/* Assignment Creator Form */}
                <div className="glass p-6 rounded-2xl space-y-4">
                  <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800/80 pb-3 flex items-center gap-2">
                    <Plus className="h-5 w-5 text-emerald-400" />
                    Attach Homework/Assignment
                  </h3>
                  <form onSubmit={handleCreateAssignment} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Select Parent Lesson</label>
                      <select
                        value={selectedLessonId} onChange={(e) => setSelectedLessonId(e.target.value)}
                        className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        {lessons.map(l => (
                          <option key={l.id} value={l.id}>{l.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Assignment Title</label>
                      <input 
                        type="text" required value={assignTitle} onChange={(e) => setAssignTitle(e.target.value)}
                        placeholder="e.g. Addition Worksheet 1"
                        className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Instructions</label>
                      <textarea
                        required value={assignInstructions} onChange={(e) => setAssignInstructions(e.target.value)} rows={2}
                        placeholder="List task instructions..."
                        className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Due Date & Time</label>
                      <input 
                        type="datetime-local" required value={assignDueDate} onChange={(e) => setAssignDueDate(e.target.value)}
                        className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <button type="submit" className="w-full py-2.5 border border-transparent rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 hover-glow transition cursor-pointer">
                      Post Assignment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Tab: GRADING */}
          {activeTab === 'grading' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-extrabold font-outfit text-white">Grading Center</h2>
                <p className="text-slate-400 text-sm mt-1">Review, grade, and write feedback for student homework assignments.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* List of submissions */}
                <div className="glass p-6 rounded-2xl lg:col-span-2 space-y-4">
                  <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800/80 pb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-emerald-400" />
                    Homework Submissions
                  </h3>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {submissions.map(sub => (
                      <div key={sub.id} className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-indigo-400">Student ID: {sub.student}</span>
                            <span className="text-slate-600 text-xs">•</span>
                            <span className="text-xs text-slate-400">Submitted: {new Date(sub.submitted_at).toLocaleDateString()}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white">Assignment: Addition Homework Sheet</h4>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            Attachment: <a href="#" className="text-emerald-400 hover:underline">{sub.file_attachment}</a>
                          </p>
                          {sub.grade && (
                            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-400 mt-2">
                              <span className="font-bold text-emerald-400 mr-2">Grade: {sub.grade}</span>
                              Feedback: "{sub.teacher_feedback}"
                            </div>
                          )}
                        </div>
                        
                        {!sub.grade && (
                          <button
                            onClick={() => setSelectedSubId(sub.id)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-bold text-white transition cursor-pointer"
                          >
                            Grade Task
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grading form */}
                <div className="glass p-6 rounded-2xl lg:col-span-1">
                  <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800/80 pb-3 flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-indigo-400" />
                    Evaluation Board
                  </h3>
                  {selectedSubId ? (
                    <form onSubmit={handleGradeSubmission} className="space-y-4">
                      <div>
                        <p className="text-xs text-slate-400">Grading Submission #{selectedSubId}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Select Grade</label>
                        <select
                          value={gradeScore} onChange={(e) => setGradeScore(e.target.value)}
                          className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        >
                          <option value="A+">A+ (Outstanding)</option>
                          <option value="A">A (Excellent)</option>
                          <option value="B">B (Good)</option>
                          <option value="C">C (Satisfactory)</option>
                          <option value="Fail">F (Needs Improvement)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Feedback Notes</label>
                        <textarea
                          required value={gradeFeedback} onChange={(e) => setGradeFeedback(e.target.value)} rows={3}
                          placeholder="Provide constructive feedback for student..."
                          className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="submit" className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white transition cursor-pointer">Submit Grade</button>
                        <button type="button" onClick={() => setSelectedSubId(null)} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs text-slate-400 transition cursor-pointer">Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-8 text-slate-500 text-xs space-y-2">
                      <MessageSquare className="h-8 w-8 mx-auto text-slate-600" />
                      <p>Select a student submission from the list to assign grades and provide notes.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab: ISLAMIC RECITATION */}
          {activeTab === 'islamic' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-extrabold font-outfit text-white">Daily Quran Tracker</h2>
                <p className="text-slate-400 text-sm mt-1">Log Nazra reading, Hifz memorization pages, and write character notes (Tarbiyah).</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quran Recitation Logger Form */}
                <div className="glass p-6 rounded-2xl lg:col-span-1 space-y-4">
                  <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800/80 pb-3 flex items-center gap-2">
                    <Moon className="h-5 w-5 text-emerald-400" />
                    Log Today's Recitation
                  </h3>
                  <form onSubmit={handleAddQuranLog} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Evaluation Mode</label>
                      <select
                        value={quranLogType} onChange={(e) => setQuranLogType(e.target.value)}
                        className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="HIFAZ">Hifz (Memorization)</option>
                        <option value="NAZRA">Nazra (Reading)</option>
                        <option value="TAJWEED">Tajweed (Rules Practice)</option>
                        <option value="TARBIYAH">Tarbiyah (Character Review)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Surah Name</label>
                      <input 
                        type="text" required value={quranSurah} onChange={(e) => setQuranSurah(e.target.value)}
                        placeholder="e.g. Al-Baqarah"
                        className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">From Ayat</label>
                        <input 
                          type="number" required value={quranFromAyat} onChange={(e) => setQuranFromAyat(e.target.value)}
                          className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">To Ayat</label>
                        <input 
                          type="number" required value={quranToAyat} onChange={(e) => setQuranToAyat(e.target.value)}
                          className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Evaluation</label>
                      <select
                        value={quranGrade} onChange={(e) => setQuranGrade(e.target.value)}
                        className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none"
                      >
                        <option value="EXCELLENT">Excellent (Flawless)</option>
                        <option value="GOOD">Good (Minor Mistakes)</option>
                        <option value="IMPROVING">Needs Practice</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tarbiyah/Character Notes</label>
                      <textarea
                        value={quranNotes} onChange={(e) => setQuranNotes(e.target.value)} rows={2}
                        placeholder="Write comments on manners, focus, and dedication..."
                        className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none"
                      />
                    </div>
                    <button type="submit" className="w-full py-2.5 border border-transparent rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition cursor-pointer">
                      Save Log Entry
                    </button>
                  </form>
                </div>

                {/* Quran Log List */}
                <div className="glass p-6 rounded-2xl lg:col-span-2 space-y-4">
                  <div className="border-b border-slate-800/80 pb-3 flex items-center justify-between">
                    <h3 className="text-base font-bold font-outfit text-white flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-indigo-400" />
                      Student Recitation History
                    </h3>
                    <div className="text-xs text-slate-400 font-semibold bg-slate-900 px-3 py-1 rounded-md">
                      Current: <span className="text-emerald-400">{islamicProfile?.current_surah} (Ayah {islamicProfile?.current_ayat})</span>
                    </div>
                  </div>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {islamicLogs.map(log => (
                      <div key={log.id} className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-md uppercase tracking-wider">{log.type}</span>
                            <span className="text-xs text-slate-400 font-medium">{log.date}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white mt-1.5">Surah {log.surah_name} (Ayat {log.from_ayat} to {log.to_ayat})</h4>
                          <p className="text-xs text-slate-400 mt-1 italic">Tarbiyah: "{log.tarbiyah_notes}"</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${log.evaluation_grade === 'EXCELLENT' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                          {log.evaluation_grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: FUTURE SKILLS REVIEW */}
          {activeTab === 'skills' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-extrabold font-outfit text-white">Future Skills Portfolio</h2>
                <p className="text-slate-400 text-sm mt-1">Review student coding scripts, robotics simulations, and project files.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* List of submissions */}
                <div className="glass p-6 rounded-2xl lg:col-span-2 space-y-4">
                  <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800/80 pb-3 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-emerald-400" />
                    Submissions Queue
                  </h3>
                  <div className="space-y-3">
                    {projects.map(proj => (
                      <div key={proj.id} className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold text-indigo-400">{proj.track_details?.name_display || 'Track: ' + proj.track}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-500">Submitted: {new Date(proj.submitted_at).toLocaleDateString()}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white mt-1">Project: {proj.title}</h4>
                          <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1.5">
                            Repo URL: <a href={proj.project_url} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">{proj.project_url}</a>
                          </p>
                          {proj.grade && (
                            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-400 mt-2">
                              <span className="font-bold text-emerald-400 mr-2">Review: {proj.grade}</span>
                              "{proj.teacher_review}"
                            </div>
                          )}
                        </div>

                        {!proj.grade && (
                          <button
                            onClick={() => setSelectedProjId(proj.id)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-bold text-white transition cursor-pointer"
                          >
                            Add Review
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Form */}
                <div className="glass p-6 rounded-2xl lg:col-span-1">
                  <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800/80 pb-3 flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-indigo-400" />
                    Project Grading
                  </h3>
                  {selectedProjId ? (
                    <form onSubmit={handleReviewProject} className="space-y-4">
                      <div>
                        <p className="text-xs text-slate-400">Reviewing Project #{selectedProjId}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Verdict</label>
                        <select
                          value={projectGrade} onChange={(e) => setProjectGrade(e.target.value)}
                          className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none"
                        >
                          <option value="Pass">Pass (Completed Successfully)</option>
                          <option value="Distinction">Distinction (Exemplary Submission)</option>
                          <option value="Needs Revision">Needs Revision (Redo code modules)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Teacher Review Notes</label>
                        <textarea
                          required value={projectReview} onChange={(e) => setProjectReview(e.target.value)} rows={3}
                          placeholder="Write feedback details on coding style, architecture..."
                          className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="submit" className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white transition cursor-pointer">Submit Review</button>
                        <button type="button" onClick={() => setSelectedProjId(null)} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs text-slate-400 transition cursor-pointer">Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-8 text-slate-500 text-xs space-y-2">
                      <MessageSquare className="h-8 w-8 mx-auto text-slate-600" />
                      <p>Select a project submission from the queue to start review operations.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab: STUDENT MESSAGES */}
          {activeTab === 'chat' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-extrabold font-outfit text-white">Student Chat Rooms</h2>
                <p className="text-slate-400 text-sm mt-1">Direct message channel with student Zayd Ahmed Bilal (Grade 1).</p>
              </div>

              <div className="glass rounded-3xl p-6 max-w-3xl mx-auto flex flex-col h-[500px]">
                {/* Chat Header */}
                <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 font-bold font-outfit">ZB</div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Zayd Ahmed Bilal</h4>
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                        Active Student
                      </span>
                    </div>
                  </div>
                </div>

                {/* Messages log */}
                <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-2">
                  {chatMessages.map(msg => {
                    const isMe = msg.sender === 2; // Teacher Ahmed Bilal (ID 2)
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md rounded-2xl px-4 py-2.5 text-xs ${isMe ? 'bg-emerald-600 text-white font-medium rounded-tr-none' : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'}`}>
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
                    placeholder="Type your reply to Zayd..."
                    className="flex-1 px-4 py-3 border border-slate-700 bg-slate-900 text-xs text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button type="submit" className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition cursor-pointer">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Tab: GEMINI AI PLANNER */}
          {activeTab === 'ai' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-extrabold font-outfit text-white">AI Lesson Co-Pilot</h2>
                  <p className="text-slate-400 text-sm mt-1">Generate primary school lesson summaries, quizzes, and homework exercises with AI.</p>
                </div>
                <button
                  onClick={() => setShowApiKeySetting(!showApiKeySetting)}
                  className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  <Settings className="h-4 w-4 text-violet-405" />
                  Gemini Settings
                </button>
              </div>

              {/* API Key Modal Config */}
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
                      <h4 className="text-sm font-bold text-white">Gemini Lesson Planner</h4>
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
                        <span>Gemini is planning...</span>
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
                    placeholder="Ask Gemini to draft a lesson, outline a syllabus track, or generate check-quizzes..."
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
