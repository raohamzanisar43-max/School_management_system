import React from 'react';

export default function AuthFooter({ onShowNotification }) {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-theme-muted border-t border-theme mt-6 z-10">
      <div>
        © 2025 Bright Future School. All rights reserved.
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <button onClick={() => onShowNotification('Privacy Policy Document')} className="hover:text-theme-main transition cursor-pointer bg-transparent">Privacy Policy</button>
        <span className="text-slate-700">|</span>
        <button onClick={() => onShowNotification('Terms of Service Document')} className="hover:text-theme-main transition cursor-pointer bg-transparent">Terms of Service</button>
        <span className="text-slate-700">|</span>
        <button onClick={() => onShowNotification('Help Center & Support Desk')} className="hover:text-theme-main transition cursor-pointer bg-transparent">Help Center</button>
      </div>
    </footer>
  );
}
