import React from 'react';
import { DollarSign, Wallet, FileText, BarChart3 } from 'lucide-react';
import { StatCard } from '../ui/StatCard';
import { SectionCard } from '../ui/SectionCard';
import { PROGRAM_META } from './constants';

export default function ReportsView({ students, invoices, salaries, accent }) {
  const totalPaid = invoices.filter(i => i.status === 'PAID').reduce((s, i) => s + parseFloat(i.amount), 0);
  const totalUnpaid = invoices.filter(i => i.status === 'UNPAID').reduce((s, i) => s + parseFloat(i.amount), 0);
  const programDistribution = Object.keys(PROGRAM_META)
    .map(key => ({ key, ...PROGRAM_META[key], count: students.filter(s => s.current_level === key).length }))
    .filter(p => p.count > 0);
  const programTotal = programDistribution.reduce((s, p) => s + p.count, 0) || 1;
  let cumulative = 0;
  const conicStops = programDistribution.map(p => {
    const pct = (p.count / programTotal) * 100;
    const start = cumulative;
    cumulative += pct;
    return `${p.dot} ${start}% ${cumulative}%`;
  }).join(', ');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={DollarSign} label="Revenue Collected" value={`Rs. ${totalPaid.toLocaleString()}`} sub="From tuition bills" accent={accent} valueClass="text-emerald-400" />
        <StatCard icon={Wallet} label="Pending Outstanding" value={`Rs. ${totalUnpaid.toLocaleString()}`} sub="Requires follow-up" accent={accent} valueClass="text-rose-400" />
        <StatCard icon={FileText} label="Total Invoiced" value={invoices.length} sub="invoices issued" accent={accent} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Program Enrollment" icon={BarChart3} accent={accent}>
          <div className="flex items-center justify-center py-2">
            <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ background: `conic-gradient(${conicStops})` }}>
              <div className="w-22 h-22 rounded-full bg-[#0b101d] flex flex-col items-center justify-center" style={{ width: '88px', height: '88px' }}>
                <span className="text-lg font-black text-white">{students.length}</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Total</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            {programDistribution.map(p => (
              <div key={p.key} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-300 font-medium"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.dot }}></span>{p.label}</span>
                <span className="font-bold text-white">{Math.round((p.count / programTotal) * 100)}% <span className="text-slate-500 font-medium">({p.count})</span></span>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Teacher Payroll" icon={Wallet} accent={accent}>
          <div className="space-y-3">
            {salaries.map(sal => (
              <div key={sal.id} className="p-4 bg-[#05070a] border border-[#182030] rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{sal.teacher_name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{new Date(sal.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-white">Rs. {(parseFloat(sal.base_salary) + parseFloat(sal.allowances)).toLocaleString()}</p>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${sal.is_paid ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>{sal.is_paid ? 'PAID' : 'PENDING'}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
