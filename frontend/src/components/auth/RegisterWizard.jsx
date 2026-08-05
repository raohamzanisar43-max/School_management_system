import React from 'react';
import StepperHeader from './register/StepperHeader';
import StepAccountInfo from './register/StepAccountInfo';
import StepPersonalInfo from './register/StepPersonalInfo';
import StepContactInfo from './register/StepContactInfo';
import StepReview from './register/StepReview';

export default function RegisterWizard({ reg }) {
  const { step, error, loading, next, back, submit } = reg;
  return (
    <div className="space-y-6 flex-1 flex flex-col justify-between animate-fade-in">
      <div className="text-center space-y-3">
        <div className="mx-auto w-12 h-12 rounded-full border border-theme text-theme-main bg-theme-card-inner flex items-center justify-center">
          <svg className="w-6 h-6 sync-icon" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="17" y1="11" x2="23" y2="11" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-theme-main">Create your account</h2>
          <p className="text-xs text-theme-muted mt-1">Join Bright Future School and start your journey</p>
        </div>
      </div>

      <StepperHeader registerStep={step} />

      <form onSubmit={e => e.preventDefault()} className="space-y-5 my-auto">
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-xs p-3.5 rounded-xl">{error}</div>}

        {step === 1 && (
          <StepAccountInfo
            fullName={reg.fullName} onFullNameChange={reg.setFullName}
            email={reg.email} onEmailChange={reg.setEmail}
            password={reg.password} onPasswordChange={reg.setPassword}
            showPass={reg.showPass} onToggleShowPass={() => reg.setShowPass(!reg.showPass)}
            confirmPassword={reg.confirmPassword} onConfirmPasswordChange={reg.setConfirmPassword}
            showConfirmPass={reg.showConfirmPass} onToggleShowConfirmPass={() => reg.setShowConfirmPass(!reg.showConfirmPass)}
            role={reg.role} onRoleChange={reg.setRole}
            agree={reg.agree} onAgreeChange={reg.setAgree}
          />
        )}

        {step === 2 && (
          <StepPersonalInfo
            phone={reg.phone} onPhoneChange={reg.setPhone}
            dob={reg.dob} onDobChange={reg.setDob}
            gender={reg.gender} onGenderChange={reg.setGender}
          />
        )}

        {step === 3 && (
          <StepContactInfo
            address={reg.address} onAddressChange={reg.setAddress}
            city={reg.city} onCityChange={reg.setCity}
            country={reg.country} onCountryChange={reg.setCountry}
          />
        )}

        {step === 4 && (
          <StepReview
            fullName={reg.fullName} email={reg.email} role={reg.role}
            phone={reg.phone} dob={reg.dob} gender={reg.gender}
            city={reg.city} country={reg.country}
          />
        )}

        <div className="flex justify-between items-center pt-4">
          {step > 1 && (
            <button type="button" onClick={back} className="px-5 py-3 border border-theme text-theme-main bg-theme-card-inner rounded-xl text-xs font-bold transition cursor-pointer hover:bg-slate-100/5">
              Back
            </button>
          )}

          {step < 4 ? (
            <button type="button" onClick={next} className="ml-auto px-6 py-3 bg-lime-500 hover:bg-lime-400 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer">
              Next <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>
          ) : (
            <button type="button" onClick={submit} disabled={loading} className="ml-auto px-6 py-3 bg-lime-500 hover:bg-lime-400 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer">
              {loading ? 'Creating...' : 'Create Account'} <svg className="w-4 h-4 sync-icon" viewBox="0 0 24 24" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
