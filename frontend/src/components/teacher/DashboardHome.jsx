import React from 'react';
import { BookOpen, Users, ClipboardList, BarChart3, CalendarCheck, Calendar, Megaphone } from 'lucide-react';
import { StatCard, SectionCard, ProgressBar } from '../DashboardChrome';
import { TODAY_SCHEDULE, MY_CLASSES, PENDING_ASSIGNMENTS, RECENT_NOTICES, UPCOMING_EVENTS, STATUS_STYLE } from './constants';

export default function DashboardHome({ teacherName, announcements, accent, onNavigate }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold font-outfit text-white">Good Morning, {teacherName.split(' ')[0]}! 👋</h2>
          <p className="text-slate-400 text-sm mt-1">Here's an overview of your classes and tasks.</p>
        </div>
        <div className="px-4 py-2 rounded-xl border border-[#182030] bg-[#0b101d] text-xs font-semibold text-slate-300 flex items-center gap-2 shrink-0">
          <Calendar className="h-3.5 w-3.5 text-purple-400" />
          Thursday, 15 May 2026
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={BookOpen} label="My Classes" value={MY_CLASSES.length} sub="All classes assigned" accent={accent} />
        <StatCard icon={Users} label="Total Students" value="128" sub="Across all classes" accent={accent} />
        <StatCard icon={ClipboardList} label="Pending Assignments" value="18" sub="To review & grade" accent={accent} />
        <StatCard icon={BarChart3} label="Average Performance" value="72%" sub="Across all classes" accent={{ ...accent, text: 'text-amber-400', softBg: 'bg-amber-500/10', softBorder: 'border-amber-500/30' }} />
        <StatCard icon={CalendarCheck} label="Attendance Today" value="95%" sub="Excellent!" valueClass="text-rose-400" accent={{ ...accent, text: 'text-rose-400', softBg: 'bg-rose-500/10', softBorder: 'border-rose-500/30' }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <SectionCard title="Today's Schedule" icon={Calendar} accent={accent} action={<button onClick={() => onNavigate('timetable')} className={`text-xs font-semibold ${accent.text} hover:underline cursor-pointer`}>View Timetable</button>}>
          <div className="space-y-3">
            {TODAY_SCHEDULE.map((s, i) => (
              <div key={i} className="p-3 bg-[#05070a] border border-[#182030] rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500">{s.time}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${STATUS_STYLE[s.status]}`}>{s.status}</span>
                </div>
                <p className="text-xs font-bold text-white mt-1.5">{s.subject}</p>
                <p className="text-[11px] text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="My Classes" icon={Users} accent={accent} action={<button onClick={() => onNavigate('classes')} className={`text-xs font-semibold ${accent.text} hover:underline cursor-pointer`}>View All</button>}>
          <div className="space-y-4">
            {MY_CLASSES.map(c => (
              <div key={c.name}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-200">{c.name} <span className="text-slate-500">· {c.students} Students</span></span>
                  <span className="font-bold text-white">{c.pct}%</span>
                </div>
                <ProgressBar value={c.pct} color={accent.barColor} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Pending Assignments" icon={ClipboardList} accent={accent} action={<button onClick={() => onNavigate('assignments')} className={`text-xs font-semibold ${accent.text} hover:underline cursor-pointer`}>View All</button>}>
          <div className="space-y-3">
            {PENDING_ASSIGNMENTS.map((a, i) => (
              <div key={i} className="p-3 bg-[#05070a] border border-[#182030] rounded-xl flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{a.title}</p>
                  <p className="text-[10px] text-slate-500">{a.cls}</p>
                </div>
                <span className="text-[9px] font-bold text-amber-400 shrink-0">{a.due}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Recent Notices" icon={Megaphone} accent={accent} action={<button onClick={() => onNavigate('resources')} className={`text-xs font-semibold ${accent.text} hover:underline cursor-pointer`}>View All</button>}>
          <div className="space-y-3">
            {(announcements.length ? announcements.slice(0, 3).map(a => ({ title: a.title, date: new Date(a.created_at).toLocaleDateString() })) : RECENT_NOTICES).map((n, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[#05070a] border border-[#182030] rounded-xl">
                <div className={`w-8 h-8 rounded-lg ${accent.softBg} flex items-center justify-center shrink-0`}><Megaphone className={`h-4 w-4 ${accent.text}`} /></div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{n.title}</p>
                  <p className="text-[10px] text-slate-500">{n.date}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Upcoming Events" icon={Calendar} accent={accent}>
          <div className="space-y-3">
            {UPCOMING_EVENTS.map((ev, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[#05070a] border border-[#182030] rounded-xl">
                <div className="w-11 h-11 rounded-lg bg-[#0b101d] border border-[#182030] flex flex-col items-center justify-center shrink-0">
                  <span className="text-[8px] font-bold text-rose-400">{ev.month}</span>
                  <span className="text-sm font-black text-white leading-none">{ev.day}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{ev.title}</p>
                  <p className="text-[10px] text-slate-500">{ev.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
