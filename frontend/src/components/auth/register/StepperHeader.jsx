import React from 'react';

const STEPS = [
  { n: 1, label: 'Account Info' },
  { n: 2, label: 'Personal Info' },
  { n: 3, label: 'Contact Info' },
  { n: 4, label: 'Review' },
];

export default function StepperHeader({ registerStep }) {
  return (
    <div className="flex items-center justify-center max-w-md mx-auto w-full px-4 py-2">
      <div className="flex items-center w-full justify-between relative">
        <div className="absolute top-4 left-4 right-4 h-px border-t-2 border-dashed border-theme z-0"></div>
        {STEPS.map(step => (
          <div key={step.n} className="flex flex-col items-center z-10">
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-300 ${registerStep >= step.n ? 'border-lime-500 bg-lime-500/10 text-lime-400' : 'border-theme bg-theme-card-inner text-theme-muted'}`}>{step.n}</div>
            <span className={`text-[9px] font-bold mt-1.5 transition-all duration-300 ${registerStep === step.n ? 'text-lime-400' : 'text-theme-muted'}`}>{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
