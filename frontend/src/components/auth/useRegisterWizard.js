import { useState } from 'react';
import * as authService from '../../services/authService';

export default function useRegisterWizard(login, showNotification, onNeedsManualLogin) {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [role, setRole] = useState('STUDENT');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('MALE');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('United States');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resetToStep1 = () => { setStep(1); setError(''); };

  const next = () => {
    setError('');
    if (step === 1) {
      if (!fullName || !email || !password || !confirmPassword) return setError('Please fill out all fields.');
      if (password !== confirmPassword) return setError('Passwords do not match.');
      if (password.length < 8) return setError('Password must be at least 8 characters long.');
      if (!agree) return setError('You must agree to the Terms of Service & Privacy Policy.');
    } else if (step === 2) {
      if (!phone || !dob) return setError('Please provide your phone number and date of birth.');
    } else if (step === 3) {
      if (!address || !city || !country) return setError('Please fill out all contact information fields.');
    }
    setStep(prev => prev + 1);
  };

  const back = () => setStep(prev => prev - 1);

  const submit = async () => {
    setError('');
    setLoading(true);
    const nameParts = fullName.trim().split(/\s+/);
    const registerData = {
      username: email, password, first_name: nameParts[0] || '', last_name: nameParts.slice(1).join(' ') || '',
      email, role, phone_number: phone,
    };
    try {
      await authService.register(registerData);
      showNotification('Account created successfully!');
      try {
        await login(email, password);
        showNotification('Welcome! Logged in automatically.');
      } catch (loginErr) {
        onNeedsManualLogin(email, password);
        setStep(1);
      }
    } catch (err) {
      console.error('Registration failed:', err);
      const serverMsg = err.response?.data
        ? Object.entries(err.response.data).map(([k, v]) => `${k}: ${v}`).join('; ')
        : 'Failed to create account. Email might already exist.';
      setError(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return {
    step, error, loading, resetToStep1, next, back, submit,
    fullName, setFullName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword,
    showPass, setShowPass, showConfirmPass, setShowConfirmPass,
    role, setRole, phone, setPhone, dob, setDob, gender, setGender,
    address, setAddress, city, setCity, country, setCountry, agree, setAgree,
  };
}
