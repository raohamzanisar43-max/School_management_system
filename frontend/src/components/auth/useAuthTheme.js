import { useState, useEffect } from 'react';

export default function useAuthTheme() {
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light' | 'night'
  const [toastText, setToastText] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark' || theme === 'night');
  }, [theme]);

  useEffect(() => {
    if (!toastText) return;
    const timer = setTimeout(() => setToastText(null), 3500);
    return () => clearTimeout(timer);
  }, [toastText]);

  const showNotification = (msg) => setToastText(msg);

  const toggleNextTheme = () => {
    const themes = ['dark', 'light', 'night'];
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(nextTheme);
    showNotification(`Switched to ${nextTheme.toUpperCase()} mode.`);
  };

  return { theme, toggleNextTheme, toastText, showNotification };
}
