import React from 'react';

export default function Toast({ text }) {
  if (!text) return null;
  return (
    <div id="toastNotification" className="fixed bottom-6 right-6 z-50 transform translate-y-0 opacity-100 transition-all duration-300">
      <div className="px-4 py-3 rounded-2xl bg-slate-900/95 border border-lime-500/50 shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs text-white">
        <div className="w-6 h-6 rounded-full bg-lime-500/20 text-lime-400 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <span>{text}</span>
      </div>
    </div>
  );
}
