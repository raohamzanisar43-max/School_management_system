import { useState } from 'react';
import { Send } from 'lucide-react';
import { SectionCard } from './SectionCard';

export function ChatPanel({ title, icon, accent, messages, isMine, onSend, placeholder = 'Type your message...', emptyText = 'No messages yet.' }) {
  const [input, setInput] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput('');
  };
  return (
    <SectionCard title={title} icon={icon} accent={accent}>
      <div className="flex flex-col h-[420px]">
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${isMine(msg) ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md rounded-2xl px-4 py-2.5 text-xs ${isMine(msg) ? `${accent.solid} rounded-tr-none` : 'bg-white/5 text-slate-200 rounded-tl-none'}`}>{msg.message}</div>
            </div>
          ))}
          {messages.length === 0 && <p className="text-xs text-slate-500 italic text-center py-6">{emptyText}</p>}
        </div>
        <form onSubmit={handleSubmit} className="border-t border-[#182030] pt-4 flex gap-3">
          <input value={input} onChange={e => setInput(e.target.value)} placeholder={placeholder} className="flex-1 px-4 py-3 border border-[#182030] bg-[#05070a] text-xs text-white rounded-xl focus:outline-none" />
          <button type="submit" className={`p-3 rounded-xl text-white cursor-pointer ${accent.solid}`}><Send className="h-4 w-4" /></button>
        </form>
      </div>
    </SectionCard>
  );
}
