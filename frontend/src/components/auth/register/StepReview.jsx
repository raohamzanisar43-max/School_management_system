import React from 'react';

export default function StepReview({ fullName, email, role, phone, dob, gender, city, country }) {
  return (
    <div className="space-y-5">
      <h3 className="text-xs font-bold text-theme-main uppercase tracking-widest border-b border-theme pb-2">Review Account Details</h3>

      <div className="p-4 rounded-xl border border-theme bg-theme-card-inner space-y-3.5 text-xs text-theme-main">
        <div className="flex justify-between border-b border-theme pb-1.5"><span className="text-theme-muted">Full Name:</span><span className="font-bold">{fullName}</span></div>
        <div className="flex justify-between border-b border-theme pb-1.5"><span className="text-theme-muted">Email Address:</span><span className="font-bold">{email}</span></div>
        <div className="flex justify-between border-b border-theme pb-1.5"><span className="text-theme-muted">Selected Role:</span><span className="font-bold text-lime-400">{role}</span></div>
        <div className="flex justify-between border-b border-theme pb-1.5"><span className="text-theme-muted">Phone Number:</span><span className="font-bold">{phone}</span></div>
        <div className="flex justify-between border-b border-theme pb-1.5"><span className="text-theme-muted">Date of Birth:</span><span className="font-bold">{dob}</span></div>
        <div className="flex justify-between border-b border-theme pb-1.5"><span className="text-theme-muted">Gender:</span><span className="font-bold">{gender}</span></div>
        <div className="flex justify-between"><span className="text-theme-muted">Location:</span><span className="font-bold">{city}, {country}</span></div>
      </div>
    </div>
  );
}
