import React from 'react';
import { Users, Calendar, Award, Wallet, CheckCircle, CalendarClock, MessageSquare, Megaphone, LayoutGrid, Download } from 'lucide-react';
import { SectionCard, PersonCard } from '../DashboardChrome';
import { TODAY_SCHEDULE, EXAM_RESULTS } from './constants';

export default function DashboardHome({ parentName, child, chatMessages, announcements, isPaidThisMonth, nextDue, onNavigate, onPayInvoice, accent }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-2xl border border-[#182030] bg-gradient-to-br from-[#0b101d] to-[#140b1d] p-6 flex items-center justify-between gap-5">
        <div>
          <h2 className="text-2xl font-extrabold font-outfit text-white">Good Morning, {parentName.split(' ')[0]}! 👋</h2>
          <p className="text-slate-400 text-sm mt-1.5">Stay connected with your child's learning journey.</p>
        </div>
        <div className={`w-16 h-16 rounded-full ${accent.softBg} border ${accent.softBorder} flex items-center justify-center shrink-0`}>
          <Users className={`h-7 w-7 ${accent.text}`} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <SectionCard title="Current Child" icon={Users} accent={accent} className="lg:col-span-2">
          <PersonCard
            name={child.name}
            rounded="rounded-2xl"
            accent={accent}
            meta={<p className="text-xs text-slate-500 mt-0.5">Grade 8 · Roll No. 1024</p>}
            trailing={<button onClick={() => onNavigate('children')} className={`ml-auto px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${accent.solid}`}>View Profile</button>}
          />
        </SectionCard>

        <SectionCard title="Today's Schedule" icon={Calendar} accent={accent} action={<button onClick={() => onNavigate('children')} className={`text-xs font-semibold ${accent.text} hover:underline cursor-pointer`}>View Full Timetable</button>}>
          <div className="space-y-2.5">
            {TODAY_SCHEDULE.map(s => (
              <div key={s.subject} className="flex items-center justify-between p-2.5 bg-[#05070a] border border-[#182030] rounded-xl">
                <span className="text-xs font-bold text-white flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }}></span>{s.subject}</span>
                <span className="text-[10px] text-slate-500">{s.time}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <SectionCard title="Recent Exam Results" icon={Award} accent={accent} className="lg:col-span-2" action={<button onClick={() => onNavigate('results')} className={`text-xs font-semibold ${accent.text} hover:underline cursor-pointer`}>View Full Results</button>}>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-500 border-b border-[#182030]"><th className="pb-2 font-semibold">Subject</th><th className="pb-2 font-semibold text-right">Marks</th></tr>
            </thead>
            <tbody>
              {EXAM_RESULTS.map(r => (
                <tr key={r.subject} className="border-b border-[#182030]/60 last:border-0">
                  <td className="py-2.5 font-semibold text-slate-200">{r.subject}</td>
                  <td className="py-2.5 text-right font-bold text-emerald-400">{r.marks}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>

        <SectionCard title="Fee Status" icon={Wallet} accent={accent}>
          {isPaidThisMonth ? (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2.5">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
              <span className="text-sm font-bold text-emerald-400">Paid This Month</span>
            </div>
          ) : (
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Next Due Date</p>
              <p className="text-sm font-bold text-rose-400 mt-1 flex items-center gap-1.5"><CalendarClock className="h-3.5 w-3.5" />{nextDue?.due_date}</p>
              <button onClick={() => onPayInvoice(nextDue)} className={`w-full mt-3 py-2 rounded-lg text-[11px] font-bold text-white cursor-pointer ${accent.solid}`}>View Invoice</button>
            </div>
          )}
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Teacher Messages" icon={MessageSquare} accent={accent} action={<button onClick={() => onNavigate('messages')} className={`text-xs font-semibold ${accent.text} hover:underline cursor-pointer`}>View All</button>}>
          <div className="space-y-3">
            {chatMessages.slice(-3).reverse().map(msg => (
              <div key={msg.id} className="flex items-start gap-3 p-3 bg-[#05070a] border border-[#182030] rounded-xl">
                <div className={`w-8 h-8 rounded-full ${accent.softBg} flex items-center justify-center shrink-0`}><MessageSquare className={`h-3.5 w-3.5 ${accent.text}`} /></div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-200 line-clamp-2">{msg.message}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{new Date(msg.timestamp).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {chatMessages.length === 0 && <p className="text-xs text-slate-500 italic text-center py-4">No messages yet.</p>}
          </div>
        </SectionCard>

        <SectionCard title="School Announcements" icon={Megaphone} accent={accent} action={<button onClick={() => onNavigate('announcements')} className={`text-xs font-semibold ${accent.text} hover:underline cursor-pointer`}>View All</button>}>
          <div className="space-y-2.5">
            {announcements.slice(0, 4).map(a => (
              <div key={a.id} className="flex items-center justify-between gap-3 text-xs">
                <span className="flex items-center gap-2 text-slate-300 min-w-0"><span className={`w-1.5 h-1.5 rounded-full ${accent.dot} shrink-0`}></span><span className="truncate">{a.title}</span></span>
                <span className="text-[10px] text-slate-500 shrink-0">{new Date(a.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Quick Actions" icon={LayoutGrid} accent={accent}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button className="p-4 bg-[#05070a] border border-[#182030] rounded-xl flex flex-col items-center gap-2 hover:border-violet-500/40 transition cursor-pointer">
            <Download className={`h-5 w-5 ${accent.text}`} />
            <span className="text-[11px] font-semibold text-slate-200 text-center">Download Report Card</span>
          </button>
          <button className="p-4 bg-[#05070a] border border-[#182030] rounded-xl flex flex-col items-center gap-2 hover:border-violet-500/40 transition cursor-pointer">
            <CalendarClock className={`h-5 w-5 ${accent.text}`} />
            <span className="text-[11px] font-semibold text-slate-200 text-center">Book Teacher Meeting</span>
          </button>
          <button onClick={() => onNavigate('messages')} className="p-4 bg-[#05070a] border border-[#182030] rounded-xl flex flex-col items-center gap-2 hover:border-violet-500/40 transition cursor-pointer">
            <MessageSquare className={`h-5 w-5 ${accent.text}`} />
            <span className="text-[11px] font-semibold text-slate-200 text-center">Contact Teacher</span>
          </button>
          <button onClick={() => onNavigate('children')} className="p-4 bg-[#05070a] border border-[#182030] rounded-xl flex flex-col items-center gap-2 hover:border-violet-500/40 transition cursor-pointer">
            <Calendar className={`h-5 w-5 ${accent.text}`} />
            <span className="text-[11px] font-semibold text-slate-200 text-center">View Timetable</span>
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
