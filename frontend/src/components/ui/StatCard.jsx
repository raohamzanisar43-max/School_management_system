export function StatCard({ icon: Icon, label, value, sub, accent, valueClass }) {
  return (
    <div className="rounded-2xl border border-[#182030] bg-[#0b101d] p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-xl ${accent.softBg} border ${accent.softBorder} flex items-center justify-center`}>
          <Icon className={`h-4 w-4 ${accent.text}`} />
        </div>
      </div>
      <p className={`text-xl font-extrabold font-outfit ${valueClass || 'text-white'}`}>{value}</p>
      <p className="text-xs font-semibold text-slate-300 mt-1">{label}</p>
      {sub && <p className="text-[10px] text-slate-500 mt-1">{sub}</p>}
    </div>
  );
}
