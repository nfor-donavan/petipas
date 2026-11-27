import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem('petipas_language') || null);
  const [ageGroup, setAgeGroup] = useState(localStorage.getItem('petipas_ageGroup') || null);
  const [theme, setTheme] = useState(localStorage.getItem('petipas_theme') || 'light');
  const [textSize, setTextSize] = useState(localStorage.getItem('petipas_textSize') || 'normal');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    if (language) localStorage.setItem('petipas_language', language);
    // Tell browsers and screen readers which language the page is in
    document.documentElement.lang = language || 'en';
  }, [language]);

  useEffect(() => {
    if (ageGroup) localStorage.setItem('petipas_ageGroup', ageGroup);
  }, [ageGroup]);

  useEffect(() => {
    localStorage.setItem('petipas_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('petipas_textSize', textSize);
    document.documentElement.setAttribute('data-textsize', textSize);
  }, [textSize]);

  // Keep the online/offline indicator accurate while the app is open
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  function toggleTheme() {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <AppContext.Provider value={{
      language, setLanguage, ageGroup, setAgeGroup,
      theme, toggleTheme, textSize, setTextSize, isOnline,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
