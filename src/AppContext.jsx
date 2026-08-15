import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("petipas_language") || null,
  );
  const [ageGroup, setAgeGroup] = useState(
    localStorage.getItem("petipas_ageGroup") || null,
  );
  const [theme, setTheme] = useState(
    localStorage.getItem("petipas_theme") || "light",
  );

  useEffect(() => {
    if (language) localStorage.setItem("petipas_language", language);
  }, [language]);

  useEffect(() => {
    if (ageGroup) localStorage.setItem("petipas_ageGroup", ageGroup);
  }, [ageGroup]);

  useEffect(() => {
    localStorage.setItem("petipas_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        ageGroup,
        setAgeGroup,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
