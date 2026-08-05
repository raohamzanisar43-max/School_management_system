import React from 'react';
import { Landmark, CreditCard } from 'lucide-react';

export default function PaymentModal({ invoice, onPay, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-[#0b101d] border border-[#182030] p-6 rounded-3xl max-w-sm w-full space-y-6 shadow-2xl">
        <div className="text-center">
          <h3 className="text-lg font-bold text-white">Process Bill Payment</h3>
          <p className="text-xs text-slate-500 mt-1">Paying invoice BF-00{invoice.id} for Rs. {parseFloat(invoice.amount).toLocaleString()}</p>
        </div>
        <div className="grid grid-cols-1 gap-2.5">
          <button onClick={() => onPay('BANK_TRANSFER')} className="w-full py-3 px-4 bg-[#05070a] border border-[#182030] hover:border-violet-500/40 rounded-xl text-xs font-bold text-white text-left transition flex items-center gap-2.5 cursor-pointer">
            <Landmark className="h-5 w-5 text-violet-400" /> Direct Bank Transfer
          </button>
          <button onClick={() => onPay('CREDIT_CARD')} className="w-full py-3 px-4 bg-[#05070a] border border-[#182030] hover:border-violet-500/40 rounded-xl text-xs font-bold text-white text-left transition flex items-center gap-2.5 cursor-pointer">
            <CreditCard className="h-5 w-5 text-emerald-400" /> Credit / Debit Card
          </button>
        </div>
        <button onClick={onClose} className="w-full py-2 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl text-xs font-semibold transition cursor-pointer">Close</button>
      </div>
    </div>
  );
}
