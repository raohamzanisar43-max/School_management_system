import React, { useState } from 'react';
import { FileText, Award } from 'lucide-react';
import { SectionCard } from '../ui/SectionCard';

export default function GradesView({ submissions, students, onGrade, accent }) {
  const [target, setTarget] = useState(null);
  const [grade, setGrade] = useState('A');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!target) return;
    onGrade(target.id, grade, feedback);
    setTarget(null);
    setFeedback('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <SectionCard title="Homework Submissions" icon={FileText} accent={accent} className="lg:col-span-2">
        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
          {submissions.map(sub => {
            const stu = students.find(s => s.id === sub.student || s.user === sub.student);
            return (
              <div key={sub.id} className="p-4 bg-[#05070a] border border-[#182030] rounded-xl flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-purple-400">{stu?.name || `Student #${sub.student}`}</p>
                  <p className="text-sm font-bold text-white mt-0.5">{sub.file_attachment}</p>
                  {sub.grade && <p className="text-xs text-emerald-400 mt-1">Graded: {sub.grade} — "{sub.teacher_feedback}"</p>}
                </div>
                {!sub.grade && (
                  <button onClick={() => setTarget(sub)} className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white transition cursor-pointer shrink-0 ${accent.solid}`}>Grade</button>
                )}
              </div>
            );
          })}
        </div>
      </SectionCard>
      <SectionCard title="Evaluation Board" icon={Award} accent={accent}>
        {target ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-slate-400">Grading submission #{target.id}</p>
            <select value={grade} onChange={e => setGrade(e.target.value)} className="block w-full px-3 py-2.5 border border-[#182030] rounded-xl bg-[#05070a] text-white text-sm focus:outline-none">
              <option>A+</option><option>A</option><option>B</option><option>C</option><option>Fail</option>
            </select>
            <textarea required value={feedback} onChange={e => setFeedback(e.target.value)} rows={3} placeholder="Feedback notes..." className="block w-full px-3 py-2.5 border border-[#182030] rounded-xl bg-[#05070a] text-white text-sm focus:outline-none" />
            <div className="flex gap-2">
              <button type="submit" className={`flex-1 py-2 rounded-xl text-xs font-bold text-white cursor-pointer ${accent.solid}`}>Submit</button>
              <button type="button" onClick={() => setTarget(null)} className="px-3 py-2 bg-white/5 rounded-xl text-xs text-slate-400 cursor-pointer">Cancel</button>
            </div>
          </form>
        ) : (
          <p className="text-xs text-slate-500 text-center py-8">Select a submission to grade.</p>
        )}
      </SectionCard>
    </div>
  );
}
