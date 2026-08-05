import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getThemeSpecs } from '../components/auth/themeSpecs';
import useAuthTheme from '../components/auth/useAuthTheme';
import useLoginForm from '../components/auth/useLoginForm';
import useRegisterWizard from '../components/auth/useRegisterWizard';
import ThemeStyles from '../components/auth/ThemeStyles';
import AuthHeader from '../components/auth/AuthHeader';
import AuthFooter from '../components/auth/AuthFooter';
import Toast from '../components/auth/Toast';
import LoginHero from '../components/auth/LoginHero';
import RegisterHero from '../components/auth/RegisterHero';
import PortalGrid from '../components/auth/PortalGrid';
import LoginCredentialsForm from '../components/auth/LoginCredentialsForm';
import RegisterWizard from '../components/auth/RegisterWizard';

export default function Login() {
  const { login } = useAuth();
  const [mode, setMode] = useState('LOGIN'); // 'LOGIN' | 'REGISTER'
  const [selectedRole, setSelectedRole] = useState(null);

  const { theme, toggleNextTheme, toastText, showNotification } = useAuthTheme();
  const form = useLoginForm(login, showNotification);
  const reg = useRegisterWizard(login, showNotification, (email, password) => {
    setMode('LOGIN');
    form.setUsername(email);
    form.setPassword(password);
  });

  const goHome = () => { setSelectedRole(null); setMode('LOGIN'); };
  const switchToRegister = () => { setMode('REGISTER'); reg.resetToStep1(); };
  const switchToLogin = () => { setMode('LOGIN'); setSelectedRole(null); form.setError(''); };
  const selectRole = (role) => { setSelectedRole(role); form.reset(); };

  const specs = getThemeSpecs(mode === 'LOGIN' ? selectedRole : reg.role);

  return (
    <div className="min-h-screen bg-grid-pattern flex flex-col justify-between selection:bg-lime-500/20 selection:text-lime-400 relative overflow-hidden">
      <ThemeStyles />
      <AuthHeader mode={mode} onGoHome={goHome} onSwitchToRegister={switchToRegister} onSwitchToLogin={switchToLogin} theme={theme} onToggleTheme={toggleNextTheme} />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-2 sm:py-4 flex-1 flex items-center z-10">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full min-h-[75vh]">
          <div className="lg:col-span-5 space-y-6">
            {mode === 'LOGIN' ? <LoginHero selectedRole={selectedRole} specs={specs} /> : <RegisterHero onBackToHome={goHome} />}
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl p-6 sm:p-8 border border-theme shadow-2xl relative transition-all duration-300 min-h-[500px] flex flex-col justify-between" style={{ backgroundColor: 'var(--bg-card)' }}>
              {mode === 'LOGIN' ? (
                selectedRole === null ? (
                  <PortalGrid onSelectRole={selectRole} onSwitchToRegister={switchToRegister} />
                ) : (
                  <LoginCredentialsForm
                    selectedRole={selectedRole}
                    specs={specs}
                    form={form}
                    onBack={() => { setSelectedRole(null); form.setError(''); }}
                    onForgotPassword={() => showNotification('Contact administrator to retrieve password.')}
                    onSwitchToRegister={switchToRegister}
                  />
                )
              ) : (
                <RegisterWizard reg={reg} />
              )}
            </div>
          </div>
        </section>
      </main>

      <AuthFooter onShowNotification={showNotification} />
      <Toast text={toastText} />
    </div>
  );
}
