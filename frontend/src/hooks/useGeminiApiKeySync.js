import { useEffect } from 'react';

export default function useGeminiApiKeySync() {
  useEffect(() => {
    const key = import.meta.env.VITE_GEMINI_API_KEY;
    if (key) {
      localStorage.setItem('gemini_api_key', key);
    }
  }, []);
}
