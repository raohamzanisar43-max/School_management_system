export function SectionCard({ title, action, icon: Icon, accent, children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-[#182030] bg-[#0b101d] p-5 sm:p-6 ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            {Icon && <Icon className={`h-4 w-4 ${accent?.text || 'text-slate-400'}`} />}
            {title}
          </h3>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
