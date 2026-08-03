import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Plus, FileText, CheckCircle, Moon, Brain, LogOut,
  Calendar, Award, MessageSquare, Video, ClipboardList, Sparkles, Settings, Send,
  LayoutGrid, Users, Search, Bell, GraduationCap
} from 'lucide-react';

const GRADE_SCORE = { 'A+': 100, 'A': 95, 'A-': 90, 'B': 85, 'B-': 80, 'C': 75, 'Fail': 50, 'Pass': 90, 'Distinction': 98, 'Needs Revision': 60 };
const EVAL_SCORE = { EXCELLENT: 100, GOOD: 80, IMPROVING: 60 };

export default function TeacherDashboard() {
  const { user, logout, switchRole } = useAuth();
  const [classrooms, setClassrooms] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [students, setStudents] = useState([]);
  const [islamicProfile, setIslamicProfile] = useState(null);
  const [islamicLogs, setIslamicLogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skillProgress, setSkillProgress] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Lesson Creator state
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonBody, setLessonBody] = useState('');
  const [lessonVideo, setLessonVideo] = useState('');
  const [lessonZoom, setLessonZoom] = useState('https://zoom.us/j/mockclassroom1');

  // Assignment Creator state
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [assignTitle, setAssignTitle] = useState('');
  const [assignInstructions, setAssignInstructions] = useState('');
  const [assignDueDate, setAssignDueDate] = useState('2026-08-28T18:00');

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
      const [lessonsData, assignData, subsData, clsrms, studs, attend, ip, projs, skillProg] = await Promise.all([
        api.getLessons(), api.getAssignments(), api.getSubmissions(), api.getClassrooms(),
        api.getStudents(), api.getAttendanceLogs(), api.getIslamicProfile(3), api.getProjects(), api.getSkillProgress(3),
      ]);
      const logs = await api.getDailyProgressLogs(ip?.id || 1);

      setLessons(lessonsData);
      setAssignments(assignData);
      setSubmissions(subsData);
      setClassrooms(clsrms);
      setStudents(studs);
      setAttendanceLogs(attend);
      setIslamicProfile(ip);
      setIslamicLogs(logs);
      setProjects(projs);
      setSkillProgress(skillProg);

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
    setAssignments([...assignments, newA]);
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

  // --- Derived Dashboard metrics ---
  const myClassrooms = classrooms.filter(c => c.teacher === (user?.name || 'Ustadh Ahmed Bilal'));
  const myClassrooms_ = myClassrooms.length > 0 ? myClassrooms : classrooms.slice(0, 1);
  const myStudentNames = [...new Set(myClassrooms_.flatMap(c => c.students))];
  const myStudentIds = students.filter(s => myStudentNames.includes(s.name)).map(s => s.id);
  const totalStudents = myStudentIds.length || myStudentNames.length;

  const latestDate = attendanceLogs.reduce((max, a) => (a.date > max ? a.date : max), attendanceLogs[0]?.date || '');
  const classAttendanceLogs = attendanceLogs.filter(a => a.date === latestDate && myStudentIds.includes(a.student));
  const avgAttendance = classAttendanceLogs.length ? Math.round((classAttendanceLogs.filter(a => a.status === 'PRESENT' || a.status === 'LATE').length / classAttendanceLogs.length) * 100) : 96;

  const pendingGradingCount = submissions.filter(s => !s.grade).length;
  const gradedSubs = submissions.filter(s => s.grade);
  const classAverage = gradedSubs.length ? Math.round(gradedSubs.reduce((sum, s) => sum + (GRADE_SCORE[s.grade] || 80), 0) / gradedSubs.length) : null;

  const recentAssignments = assignments.map(a => {
    const lesson = lessons.find(l => l.id === a.lesson);
    const subsForA = submissions.filter(s => s.assignment === a.id);
    let status = 'Not Started';
    if (subsForA.length > 0) status = subsForA.every(s => s.grade) ? 'Graded' : 'Pending';
    return { ...a, className: lesson?.title?.includes('Subtraction') || lesson?.title?.includes('Number') ? 'Mathematics Grade 1' : 'Mathematics Grade 1', status };
  }).sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

  const skillsAvg = skillProgress.length ? Math.round(skillProgress.reduce((s, p) => s + p.progress_percent, 0) / skillProgress.length) : 0;
  const assignmentCompletion = assignments.length ? Math.round((assignments.filter(a => submissions.some(s => s.assignment === a.id)).length / assignments.length) * 100) : 0;
  const quranAvg = islamicLogs.length ? Math.round(islamicLogs.reduce((s, l) => s + (EVAL_SCORE[l.evaluation_grade] || 70), 0) / islamicLogs.length) : 0;

  const classProgress = [
    { label: 'Mathematics Grade 1', value: assignmentCompletion, color: 'bg-indigo-500' },
    { label: 'Quran Recitation Track', value: quranAvg, color: 'bg-emerald-500' },
    { label: 'Future Skills Lab', value: skillsAvg, color: 'bg-amber-500' },
  ];

  const STATUS_STYLE = {
    Graded: 'bg-emerald-50 text-emerald-600',
    Pending: 'bg-amber-50 text-amber-600',
    'Not Started': 'bg-gray-100 text-gray-500',
  };

  const NAV_ITEMS = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { key: 'lessons', label: 'LMS Lesson Planner', icon: Video },
    { key: 'grading', label: 'Grading Center', icon: ClipboardList, badge: pendingGradingCount },
    { key: 'islamic', label: 'Quran Recitation Log', icon: Moon },
    { key: 'skills', label: 'Future Skills Lab', icon: Brain, badge: projects.filter(p => !p.grade).length },
    { key: 'chat', label: 'Student Messages', icon: MessageSquare },
    { key: 'ai', label: 'AI Planner', icon: Sparkles },
  ];

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
            <p className="text-[10px] text-indigo-200 uppercase tracking-widest font-semibold">Teacher Workspace</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ key, label, icon: Icon, badge }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === key ? 'bg-white text-indigo-700 shadow-sm' : 'text-indigo-100 hover:bg-white/10 hover:text-white'}`}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              <span className="text-left flex-1 min-w-0 truncate whitespace-nowrap">{label}</span>
              {!!badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${activeTab === key ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-400 text-indigo-950'}`}>{badge}</span>
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
            <p className="text-[10px] text-indigo-200">Lead Instructor</p>
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
              placeholder="Search students, classes..."
              className="w-full bg-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs ml-auto">
            <span className="px-2 text-gray-400 font-semibold">Quick View:</span>
            <button onClick={() => switchRole('ADMIN')} className="px-2.5 py-1 hover:bg-white rounded-lg transition text-violet-600 font-medium cursor-pointer">Admin</button>
            <button onClick={() => switchRole('STUDENT')} className="px-2.5 py-1 hover:bg-white rounded-lg transition text-amber-600 font-medium cursor-pointer">Student</button>
            <button onClick={() => switchRole('PARENT')} className="px-2.5 py-1 hover:bg-white rounded-lg transition text-pink-600 font-medium cursor-pointer">Parent</button>
          </div>

          <button className="relative w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition cursor-pointer" title="Notifications">
            <Bell className="h-[18px] w-[18px]" />
            {pendingGradingCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>}
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Good Morning, {(user?.name || 'Ustadh').split(' ')[0]}!</h2>
                  <p className="text-gray-500 text-sm mt-1">Here's what's happening in your classes today.</p>
                </div>
                <button onClick={() => setActiveTab('lessons')} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-xs font-bold text-white transition cursor-pointer shrink-0">
                  <Plus className="h-4 w-4" />
                  New Assignment
                </button>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Users} label="Total Students" value={totalStudents} sub="+2 from last month" iconBg="bg-indigo-50" iconColor="text-indigo-600" />
                <StatCard icon={CheckCircle} label="Avg. Attendance" value={`${avgAttendance}%`} sub={latestDate || 'No records yet'} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
                <StatCard icon={ClipboardList} label="Assignments to Grade" value={pendingGradingCount} sub={pendingGradingCount > 0 ? 'Requires action' : 'All caught up'} iconBg="bg-rose-50" iconColor="text-rose-600" valueColor={pendingGradingCount > 0 ? 'text-rose-600' : 'text-gray-900'} />
                <StatCard icon={Award} label="Class Average" value={classAverage ? `${classAverage}%` : 'N/A'} sub="Across graded work" iconBg="bg-amber-50" iconColor="text-amber-600" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Assignments */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-gray-900">Recent Assignments</h3>
                    <button onClick={() => setActiveTab('lessons')} className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer">View All</button>
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
                            <td className="py-3 text-gray-500 whitespace-nowrap">{new Date(a.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {new Date(a.due_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                            <td className="py-3"><span className={`text-[10px] font-bold px-2 py-1 rounded-full ${STATUS_STYLE[a.status]}`}>{a.status}</span></td>
                          </tr>
                        ))}
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
                  <button onClick={() => setActiveTab('grading')} className="text-xs font-semibold text-indigo-600 hover:underline mt-5 flex items-center gap-1 cursor-pointer">
                    View Detailed Reports →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab: LESSONS & ASSIGNMENTS */}
          {activeTab === 'lessons' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">LMS Lesson Planner</h2>
                <p className="text-gray-500 text-sm mt-1">Develop curriculum lessons, upload lecture links, and assign student worksheets.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Lesson creation form */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                    <Plus className="h-[18px] w-[18px] text-indigo-600" />
                    Publish New Lesson
                  </h3>
                  <form onSubmit={handleCreateLesson} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Lesson Title</label>
                      <input
                        type="text" required value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)}
                        placeholder="e.g. Addition Word Problems"
                        className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Lesson Explanation Body</label>
                      <textarea
                        required value={lessonBody} onChange={(e) => setLessonBody(e.target.value)} rows={3}
                        placeholder="Provide simple explanations or instructions for children..."
                        className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">YouTube Video URL</label>
                        <input
                          type="url" value={lessonVideo} onChange={(e) => setLessonVideo(e.target.value)}
                          placeholder="e.g. https://youtube.com/..."
                          className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Live Session Zoom Link</label>
                        <input
                          type="url" required value={lessonZoom} onChange={(e) => setLessonZoom(e.target.value)}
                          placeholder="https://zoom.us/..."
                          className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                      </div>
                    </div>
                    <button type="submit" className="w-full py-2.5 border border-transparent rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer">
                      Publish Lesson
                    </button>
                  </form>
                </div>

                {/* Assignment Creator Form */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                    <Plus className="h-[18px] w-[18px] text-indigo-600" />
                    Attach Homework/Assignment
                  </h3>
                  <form onSubmit={handleCreateAssignment} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Select Parent Lesson</label>
                      <select
                        value={selectedLessonId} onChange={(e) => setSelectedLessonId(e.target.value)}
                        className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      >
                        {lessons.map(l => (
                          <option key={l.id} value={l.id}>{l.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Assignment Title</label>
                      <input
                        type="text" required value={assignTitle} onChange={(e) => setAssignTitle(e.target.value)}
                        placeholder="e.g. Addition Worksheet 1"
                        className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Instructions</label>
                      <textarea
                        required value={assignInstructions} onChange={(e) => setAssignInstructions(e.target.value)} rows={2}
                        placeholder="List task instructions..."
                        className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Due Date & Time</label>
                      <input
                        type="datetime-local" required value={assignDueDate} onChange={(e) => setAssignDueDate(e.target.value)}
                        className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </div>
                    <button type="submit" className="w-full py-2.5 border border-transparent rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer">
                      Post Assignment
                    </button>
                  </form>
                </div>
              </div>

              {/* Published assignments list */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                  <FileText className="h-[18px] w-[18px] text-indigo-600" />
                  Published Assignments
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {assignments.map(a => (
                    <div key={a.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-gray-900">{a.title}</h4>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">Due {new Date(a.due_date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{a.instructions}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: GRADING */}
          {activeTab === 'grading' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Grading Center</h2>
                <p className="text-gray-500 text-sm mt-1">Review, grade, and write feedback for student homework assignments.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List of submissions */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-2 space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                    <FileText className="h-[18px] w-[18px] text-indigo-600" />
                    Homework Submissions
                  </h3>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {submissions.map(sub => {
                      const studentRecord = students.find(s => s.id === sub.student || s.user === sub.student);
                      const assignmentRecord = assignments.find(a => a.id === sub.assignment);
                      return (
                        <div key={sub.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-start justify-between gap-4">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-indigo-600">{studentRecord?.name || `Student ID: ${sub.student}`}</span>
                              <span className="text-gray-300 text-xs">•</span>
                              <span className="text-xs text-gray-500">Submitted: {new Date(sub.submitted_at).toLocaleDateString()}</span>
                            </div>
                            <h4 className="text-sm font-bold text-gray-900">{assignmentRecord?.title || 'Homework Assignment'}</h4>
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                              Attachment: <a href="#" className="text-indigo-600 hover:underline">{sub.file_attachment}</a>
                            </p>
                            {sub.grade && (
                              <div className="bg-white p-2.5 rounded-lg border border-gray-100 text-xs text-gray-500 mt-2">
                                <span className="font-bold text-emerald-600 mr-2">Grade: {sub.grade}</span>
                                Feedback: "{sub.teacher_feedback}"
                              </div>
                            )}
                          </div>

                          {!sub.grade && (
                            <button
                              onClick={() => setSelectedSubId(sub.id)}
                              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-xs font-bold text-white transition cursor-pointer shrink-0"
                            >
                              Grade Task
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Grading form */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-1">
                  <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2 mb-4">
                    <Award className="h-[18px] w-[18px] text-amber-600" />
                    Evaluation Board
                  </h3>
                  {selectedSubId ? (
                    <form onSubmit={handleGradeSubmission} className="space-y-4">
                      <div>
                        <p className="text-xs text-gray-500">Grading Submission #{selectedSubId}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Select Grade</label>
                        <select
                          value={gradeScore} onChange={(e) => setGradeScore(e.target.value)}
                          className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        >
                          <option value="A+">A+ (Outstanding)</option>
                          <option value="A">A (Excellent)</option>
                          <option value="B">B (Good)</option>
                          <option value="C">C (Satisfactory)</option>
                          <option value="Fail">F (Needs Improvement)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Feedback Notes</label>
                        <textarea
                          required value={gradeFeedback} onChange={(e) => setGradeFeedback(e.target.value)} rows={3}
                          placeholder="Provide constructive feedback for student..."
                          className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="submit" className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-xs font-bold text-white transition cursor-pointer">Submit Grade</button>
                        <button type="button" onClick={() => setSelectedSubId(null)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs text-gray-500 transition cursor-pointer">Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-8 text-gray-400 text-xs space-y-2">
                      <MessageSquare className="h-8 w-8 mx-auto text-gray-300" />
                      <p>Select a student submission from the list to assign grades and provide notes.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab: ISLAMIC RECITATION */}
          {activeTab === 'islamic' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Daily Quran Tracker</h2>
                <p className="text-gray-500 text-sm mt-1">Log Nazra reading, Hifz memorization pages, and write character notes (Tarbiyah).</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quran Recitation Logger Form */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-1 space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                    <Moon className="h-[18px] w-[18px] text-indigo-600" />
                    Log Today's Recitation
                  </h3>
                  <form onSubmit={handleAddQuranLog} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Evaluation Mode</label>
                      <select
                        value={quranLogType} onChange={(e) => setQuranLogType(e.target.value)}
                        className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      >
                        <option value="HIFAZ">Hifz (Memorization)</option>
                        <option value="NAZRA">Nazra (Reading)</option>
                        <option value="TAJWEED">Tajweed (Rules Practice)</option>
                        <option value="TARBIYAH">Tarbiyah (Character Review)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Surah Name</label>
                      <input
                        type="text" required value={quranSurah} onChange={(e) => setQuranSurah(e.target.value)}
                        placeholder="e.g. Al-Baqarah"
                        className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">From Ayat</label>
                        <input
                          type="number" required value={quranFromAyat} onChange={(e) => setQuranFromAyat(e.target.value)}
                          className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">To Ayat</label>
                        <input
                          type="number" required value={quranToAyat} onChange={(e) => setQuranToAyat(e.target.value)}
                          className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Evaluation</label>
                      <select
                        value={quranGrade} onChange={(e) => setQuranGrade(e.target.value)}
                        className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none"
                      >
                        <option value="EXCELLENT">Excellent (Flawless)</option>
                        <option value="GOOD">Good (Minor Mistakes)</option>
                        <option value="IMPROVING">Needs Practice</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tarbiyah/Character Notes</label>
                      <textarea
                        value={quranNotes} onChange={(e) => setQuranNotes(e.target.value)} rows={2}
                        placeholder="Write comments on manners, focus, and dedication..."
                        className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none"
                      />
                    </div>
                    <button type="submit" className="w-full py-2.5 border border-transparent rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer">
                      Save Log Entry
                    </button>
                  </form>
                </div>

                {/* Quran Log List */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-2 space-y-4">
                  <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <Calendar className="h-[18px] w-[18px] text-amber-600" />
                      Student Recitation History
                    </h3>
                    <div className="text-xs text-gray-500 font-semibold bg-gray-50 px-3 py-1 rounded-md">
                      Current: <span className="text-indigo-600">{islamicProfile?.current_surah} (Ayah {islamicProfile?.current_ayat})</span>
                    </div>
                  </div>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {islamicLogs.map(log => (
                      <div key={log.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md uppercase tracking-wider">{log.type}</span>
                            <span className="text-xs text-gray-500 font-medium">{log.date}</span>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 mt-1.5">Surah {log.surah_name} (Ayat {log.from_ayat} to {log.to_ayat})</h4>
                          <p className="text-xs text-gray-500 mt-1 italic">Tarbiyah: "{log.tarbiyah_notes}"</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ${log.evaluation_grade === 'EXCELLENT' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
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
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Future Skills Portfolio</h2>
                <p className="text-gray-500 text-sm mt-1">Review student coding scripts, robotics simulations, and project files.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List of submissions */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-2 space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                    <Brain className="h-[18px] w-[18px] text-indigo-600" />
                    Submissions Queue
                  </h3>
                  <div className="space-y-3">
                    {projects.map(proj => (
                      <div key={proj.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold text-indigo-600">{proj.track_details?.name_display || 'Track: ' + proj.track}</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-gray-400">Submitted: {new Date(proj.submitted_at).toLocaleDateString()}</span>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 mt-1">Project: {proj.title}</h4>
                          <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1.5">
                            Repo URL: <a href={proj.project_url} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">{proj.project_url}</a>
                          </p>
                          {proj.grade && (
                            <div className="bg-white p-2.5 rounded-lg border border-gray-100 text-xs text-gray-500 mt-2">
                              <span className="font-bold text-emerald-600 mr-2">Review: {proj.grade}</span>
                              "{proj.teacher_review}"
                            </div>
                          )}
                        </div>

                        {!proj.grade && (
                          <button
                            onClick={() => setSelectedProjId(proj.id)}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-xs font-bold text-white transition cursor-pointer shrink-0"
                          >
                            Add Review
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Form */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-1">
                  <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2 mb-4">
                    <Award className="h-[18px] w-[18px] text-amber-600" />
                    Project Grading
                  </h3>
                  {selectedProjId ? (
                    <form onSubmit={handleReviewProject} className="space-y-4">
                      <div>
                        <p className="text-xs text-gray-500">Reviewing Project #{selectedProjId}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Verdict</label>
                        <select
                          value={projectGrade} onChange={(e) => setProjectGrade(e.target.value)}
                          className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none"
                        >
                          <option value="Pass">Pass (Completed Successfully)</option>
                          <option value="Distinction">Distinction (Exemplary Submission)</option>
                          <option value="Needs Revision">Needs Revision (Redo code modules)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Teacher Review Notes</label>
                        <textarea
                          required value={projectReview} onChange={(e) => setProjectReview(e.target.value)} rows={3}
                          placeholder="Write feedback details on coding style, architecture..."
                          className="block w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="submit" className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-xs font-bold text-white transition cursor-pointer">Submit Review</button>
                        <button type="button" onClick={() => setSelectedProjId(null)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs text-gray-500 transition cursor-pointer">Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-8 text-gray-400 text-xs space-y-2">
                      <MessageSquare className="h-8 w-8 mx-auto text-gray-300" />
                      <p>Select a project submission from the queue to start review operations.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab: STUDENT MESSAGES */}
          {activeTab === 'chat' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-extrabold font-outfit text-gray-900">Student Chat Rooms</h2>
                <p className="text-gray-500 text-sm mt-1">Direct message channel with student Zayd Ahmed Bilal (Grade 1).</p>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 max-w-3xl mx-auto flex flex-col h-[500px]">
                {/* Chat Header */}
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center text-amber-600 font-bold font-outfit">ZB</div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Zayd Ahmed Bilal</h4>
                      <span className="text-[10px] text-emerald-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
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
                        <div className={`max-w-md rounded-2xl px-4 py-2.5 text-xs ${isMe ? 'bg-indigo-600 text-white font-medium rounded-tr-none' : 'bg-gray-100 text-gray-700 rounded-tl-none'}`}>
                          <p>{msg.message}</p>
                          <span className={`block text-[8px] mt-1.5 text-right ${isMe ? 'text-indigo-100' : 'text-gray-400'}`}>
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
                    placeholder="Type your reply to Zayd..."
                    className="flex-1 px-4 py-3 border border-gray-200 bg-gray-50 text-xs text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                  <button type="submit" className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition cursor-pointer">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Tab: GEMINI AI PLANNER */}
          {activeTab === 'ai' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-extrabold font-outfit text-gray-900">AI Lesson Co-Pilot</h2>
                  <p className="text-gray-500 text-sm mt-1">Generate primary school lesson summaries, quizzes, and homework exercises with AI.</p>
                </div>
                <button
                  onClick={() => setShowApiKeySetting(!showApiKeySetting)}
                  className="flex items-center gap-2 px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  <Settings className="h-4 w-4 text-violet-600" />
                  Gemini Settings
                </button>
              </div>

              {/* API Key Modal Config */}
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
                      <h4 className="text-sm font-bold text-gray-900">Gemini Lesson Planner</h4>
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
                        <span>Gemini is planning...</span>
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
                    placeholder="Ask Gemini to draft a lesson, outline a syllabus track, or generate check-quizzes..."
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
