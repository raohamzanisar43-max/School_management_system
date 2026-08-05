import React, { useState } from 'react';
import { Plus, Megaphone, Trash2 } from 'lucide-react';
import { SectionCard } from '../ui/SectionCard';

export default function AnnouncementsView({ announcements, onPost, onDelete, accent }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;
    onPost(title.trim(), message.trim());
    setTitle('');
    setMessage('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <SectionCard title="Post Announcement" icon={Plus} accent={accent} className="lg:col-span-1">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. Sports Day 2026" className="block w-full px-3 py-2.5 border border-[#182030] rounded-xl bg-[#05070a] text-white placeholder-slate-600 text-xs focus:outline-none" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Message</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={4} placeholder="Write announcement details..." className="block w-full px-3 py-2.5 border border-[#182030] rounded-xl bg-[#05070a] text-white placeholder-slate-600 text-xs focus:outline-none" />
          </div>
          <button type="submit" className={`w-full py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${accent.solid}`}>Post Announcement</button>
        </form>
      </SectionCard>
      <SectionCard title="Recent Announcements" icon={Megaphone} accent={accent} className="lg:col-span-2">
        <div className="space-y-3">
          {announcements.map(a => (
            <div key={a.id} className="p-4 bg-[#05070a] border border-[#182030] rounded-xl flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{a.title}</h4>
                  <span className="text-[9px] text-slate-500">{new Date(a.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{a.message}</p>
              </div>
              <button onClick={() => onDelete(a.id)} className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer shrink-0" title="Delete">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {announcements.length === 0 && <p className="text-xs text-slate-500 italic text-center py-6">No announcements yet.</p>}
        </div>
      </SectionCard>
    </div>
  );
}
