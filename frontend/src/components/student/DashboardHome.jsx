import React from 'react';
import {
  ChevronRight, Sparkles, ClipboardCheck, Target, Star, AlertTriangle, Circle,
  BookOpen, FileText, Download, Share2, CheckCircle, Calendar,
} from 'lucide-react';
import { SectionCard } from '../ui/SectionCard';
import { STRENGTHS, WEAKNESSES, LEARNING_GAPS, SUBJECT_LEVELS, REASSESSMENT_STEPS } from './constants';

export default function DashboardHome({ studentName, overallScore, assessmentDate, accent, onNavigate }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-2xl border border-[#182030] bg-gradient-to-br from-[#0b101d] to-[#0a1408] p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <h2 className="text-2xl font-extrabold font-outfit text-white">Welcome back, {studentName.split(' ')[0]} 👋</h2>
          <p className="text-slate-400 text-sm mt-1.5 max-w-md">Complete your learning assessment to unlock your personalized learning journey.</p>
          <button onClick={() => onNavigate('assessment')} className={`mt-4 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${accent.solid}`}>
            Start Assessment <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className={`w-20 h-20 rounded-full ${accent.softBg} border ${accent.softBorder} flex items-center justify-center shrink-0`}>
          <Sparkles className={`h-9 w-9 ${accent.text}`} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SectionCard title="Assessment Progress" icon={ClipboardCheck} accent={accent}>
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 rounded-full flex items-center justify-center shrink-0" style={{ background: `conic-gradient(${accent.barColor} 0% 75%, #1e293b 75% 100%)` }}>
              <div className="w-[72px] h-[72px] rounded-full bg-[#0b101d] flex items-center justify-center">
                <span className="text-lg font-black text-white">75%</span>
              </div>
            </div>
            <div className="space-y-2 flex-1 min-w-0">
              <p className="text-xs text-slate-400">Remaining Questions <span className="font-bold text-white float-right">15</span></p>
              <p className="text-xs text-slate-400">Estimated Time Left <span className="font-bold text-white float-right">25 min</span></p>
              <button onClick={() => onNavigate('assessment')} className={`w-full mt-2 py-2 rounded-lg text-[11px] font-bold transition cursor-pointer ${accent.solid}`}>Continue Assessment</button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Assessment Report" icon={Target} accent={accent}>
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 rounded-full flex items-center justify-center shrink-0" style={{ background: `conic-gradient(#a78bfa 0% ${overallScore}%, #1e293b ${overallScore}% 100%)` }}>
              <div className="w-[72px] h-[72px] rounded-full bg-[#0b101d] flex flex-col items-center justify-center">
                <span className="text-lg font-black text-white">{overallScore}%</span>
                <span className="text-[8px] text-slate-500 uppercase font-bold">Good</span>
              </div>
            </div>
            <div className="space-y-1.5 flex-1 min-w-0 text-xs">
              <p className="text-slate-400 flex justify-between">Learning Level <span className="font-bold text-violet-400">Intermediate</span></p>
              <p className="text-slate-400 flex justify-between">Confidence Level <span className="font-bold text-violet-400">High</span></p>
              <p className="text-slate-400 flex justify-between">Assessment Date <span className="font-bold text-white">{assessmentDate}</span></p>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <SectionCard title="Strengths" icon={Star} accent={accent}>
          <div className="flex flex-wrap gap-2">
            {STRENGTHS.map(s => <span key={s} className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-lime-500/10 text-lime-400 border border-lime-500/30">{s}</span>)}
          </div>
        </SectionCard>
        <SectionCard title="Weaknesses" icon={AlertTriangle} accent={accent}>
          <div className="flex flex-wrap gap-2">
            {WEAKNESSES.map(s => <span key={s} className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">{s}</span>)}
          </div>
        </SectionCard>
        <SectionCard title="Learning Gaps" icon={Circle} accent={accent} action={<button onClick={() => onNavigate('learning')} className={`text-xs font-semibold ${accent.text} hover:underline cursor-pointer`}>View All</button>}>
          <div className="space-y-2">
            {LEARNING_GAPS.map(g => (
              <div key={g.label} className="flex items-center justify-between text-xs">
                <span className="text-slate-300">{g.label}</span>
                <span className={`font-bold ${g.status === 'In Progress' ? 'text-amber-400' : 'text-slate-500'}`}>{g.status}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Personalized Learning Plan" icon={Target} accent={accent}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div><p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Assigned Curriculum</p><p className="text-sm font-bold text-white mt-1">Grade 8 - Customized</p></div>
          <div><p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Learning Path</p><p className="text-sm font-bold text-white mt-1">Personalized for you</p></div>
          <div><p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Recommended Level</p><p className="text-sm font-bold text-white mt-1">Intermediate</p></div>
          <div><p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Weekly Goal</p><p className="text-sm font-bold text-white mt-1">5 Lessons · 3 Quizzes · 2 Assignments</p></div>
        </div>
      </SectionCard>

      <SectionCard title="Subject-wise Level Assignment" icon={BookOpen} accent={accent} action={<button onClick={() => onNavigate('learning')} className={`text-xs font-semibold ${accent.text} hover:underline cursor-pointer`}>View All</button>}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {SUBJECT_LEVELS.map(s => (
            <div key={s.name} className="p-4 bg-[#05070a] border border-[#182030] rounded-xl space-y-2">
              <s.icon className="h-4 w-4" style={{ color: s.color }} />
              <p className="text-xs font-bold text-white truncate">{s.name}</p>
              <p className="text-[11px] font-semibold" style={{ color: s.color }}>{s.level}</p>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: '65%', backgroundColor: s.color }}></div></div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <SectionCard title="Automatically Assigned For You" icon={Sparkles} accent={accent} className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-[#05070a] border border-[#182030] rounded-xl">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Teacher</p>
              <p className="text-xs font-bold text-white mt-1">Mrs. Sarah Wilson</p>
              <button onClick={() => onNavigate('teachers')} className={`text-[10px] font-semibold ${accent.text} mt-1 cursor-pointer`}>View Profile</button>
            </div>
            <div className="p-3 bg-[#05070a] border border-[#182030] rounded-xl">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Course</p>
              <p className="text-xs font-bold text-white mt-1">Grade 8 Mathematics</p>
              <button onClick={() => onNavigate('courses')} className={`text-[10px] font-semibold ${accent.text} mt-1 cursor-pointer`}>View Course</button>
            </div>
            <div className="p-3 bg-[#05070a] border border-[#182030] rounded-xl">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Timetable</p>
              <p className="text-xs font-bold text-white mt-1">Mon - Fri 09:00 AM</p>
              <button onClick={() => onNavigate('timetable')} className={`text-[10px] font-semibold ${accent.text} mt-1 cursor-pointer`}>View Timetable</button>
            </div>
            <div className="p-3 bg-[#05070a] border border-[#182030] rounded-xl">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Resources</p>
              <p className="text-xs font-bold text-white mt-1">Video Lessons, Quizzes</p>
              <button onClick={() => onNavigate('resources')} className={`text-[10px] font-semibold ${accent.text} mt-1 cursor-pointer`}>View Resources</button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="AI Recommendation" icon={Sparkles} accent={accent}>
          <div className="flex items-start gap-3">
            <div className={`w-9 h-9 rounded-xl ${accent.softBg} border ${accent.softBorder} flex items-center justify-center shrink-0`}><Sparkles className={`h-4 w-4 ${accent.text}`} /></div>
            <p className="text-xs text-slate-300 leading-relaxed">We recommend spending 30 minutes daily on English Grammar and completing Algebra Basics before moving to Advanced Mathematics.</p>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Parent Report" icon={FileText} accent={accent}>
          <p className="text-xs text-slate-400 mb-4">Assessment report has been shared with your parents.</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => onNavigate('reports')} className={`px-3.5 py-2 rounded-lg text-[11px] font-bold transition cursor-pointer flex items-center gap-1.5 ${accent.solid}`}><FileText className="h-3.5 w-3.5" />View Report</button>
            <button className="px-3.5 py-2 rounded-lg text-[11px] font-bold border border-[#182030] text-slate-300 hover:bg-white/5 transition cursor-pointer flex items-center gap-1.5"><Download className="h-3.5 w-3.5" />Download PDF</button>
            <button className="px-3.5 py-2 rounded-lg text-[11px] font-bold border border-[#182030] text-slate-300 hover:bg-white/5 transition cursor-pointer flex items-center gap-1.5"><Share2 className="h-3.5 w-3.5" />Share Again</button>
          </div>
        </SectionCard>

        <SectionCard title="Continuous Reassessment" icon={Calendar} accent={accent}>
          <div className="flex items-center justify-between relative pt-2">
            <div className="absolute top-6 left-4 right-4 h-px border-t-2 border-dashed border-[#182030] z-0"></div>
            {REASSESSMENT_STEPS.map(step => (
              <div key={step.label} className="flex flex-col items-center z-10 gap-1.5 flex-1">
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${step.status === 'Completed' ? 'bg-lime-500/15 border-lime-500 text-lime-400' : 'bg-[#0b101d] border-[#182030] text-slate-500'}`}>
                  {step.status === 'Completed' ? <CheckCircle className="h-4 w-4" /> : <Circle className="h-3.5 w-3.5" />}
                </div>
                <span className="text-[9px] font-bold text-slate-300 text-center leading-tight">{step.label}</span>
                <span className={`text-[8px] font-semibold ${step.status === 'Completed' ? 'text-lime-400' : 'text-slate-600'}`}>{step.status}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
