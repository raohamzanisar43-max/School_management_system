import React from 'react';
import { Wallet, Printer } from 'lucide-react';
import { SectionCard } from '../DashboardChrome';

export default function FeesView({ invoices, onPayInvoice, accent }) {
  return (
    <SectionCard title="Fee Payments" icon={Wallet} accent={accent}>
      <div className="space-y-3 max-w-2xl">
        {invoices.map(inv => (
          <div key={inv.id} className="p-4 bg-[#05070a] border border-[#182030] rounded-xl flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-white">Invoice BF-00{inv.id}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Due: {inv.due_date}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-extrabold text-white">Rs. {parseFloat(inv.amount).toLocaleString()}</p>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${inv.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>{inv.status}</span>
              </div>
              {inv.status === 'UNPAID' ? (
                <button onClick={() => onPayInvoice(inv)} className={`px-4 py-2 rounded-xl text-xs font-bold text-white cursor-pointer ${accent.solid}`}>Pay Bill</button>
              ) : (
                <button className="p-2 border border-[#182030] rounded-xl text-slate-400 hover:text-white transition cursor-pointer"><Printer className="h-4 w-4" /></button>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
