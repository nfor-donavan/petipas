import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sun, Moon, RefreshCw, Globe, Info } from "lucide-react";
import { useApp } from "../AppContext";

export default function Settings() {
  const { language, setLanguage, theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  const text = {
    en: {
      title: "Settings",
      appearance: "Appearance",
      light: "Light",
      dark: "Dark",
      languageLabel: "Language",
      sync: "Sync when online",
      lastSync: "Last synced: Never",
      about:
        "PetiPas v1.0 — Built for offline-first positive parenting support.",
    },
    fr: {
      title: "Paramètres",
      appearance: "Apparence",
      light: "Clair",
      dark: "Sombre",
      languageLabel: "Langue",
      sync: "Synchroniser en ligne",
      lastSync: "Dernière synchro : Jamais",
      about:
        "PetiPas v1.0 — Conçu pour un soutien parental positif hors ligne.",
    },
  };
  const t = text[language] || text.en;

  function handleSync() {
    alert(language === "fr" ? "Synchronisation réussie !" : "Sync complete!");
  }

  return (
    <div className="container">
      <button
        onClick={() => navigate("/home")}
        style={{
          background: "var(--card)",
          border: "none",
          cursor: "pointer",
          marginBottom: "1.25rem",
          color: "var(--text)",
          width: "38px",
          height: "38px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ArrowLeft size={20} />
      </button>

      <h1 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>{t.title}</h1>

      <div className="card">
        <h3 style={{ marginBottom: "0.9rem", fontSize: "0.95rem" }}>
          {t.appearance}
        </h3>
        <div style={{ display: "flex", gap: "0.6rem" }}>
          <button
            onClick={() => theme !== "light" && toggleTheme()}
            style={toggleBtnStyle(theme === "light")}
          >
            <Sun size={17} /> {t.light}
          </button>
          <button
            onClick={() => theme !== "dark" && toggleTheme()}
            style={toggleBtnStyle(theme === "dark")}
          >
            <Moon size={17} /> {t.dark}
          </button>
        </div>
      </div>

      <div className="card">
        <h3
          style={{
            marginBottom: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.95rem",
          }}
        >
          <Globe size={17} /> {t.languageLabel}
        </h3>
        <div style={{ display: "flex", gap: "0.6rem" }}>
          <button
            onClick={() => setLanguage("en")}
            style={toggleBtnStyle(language === "en")}
          >
            🇬🇧 English
          </button>
          <button
            onClick={() => setLanguage("fr")}
            style={toggleBtnStyle(language === "fr")}
          >
            🇫🇷 Français
          </button>
        </div>
      </div>

      <button
        onClick={handleSync}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          width: "100%",
          padding: "1rem",
          borderRadius: "14px",
          border: "none",
          background: "var(--accent)",
          color: "white",
          fontWeight: 600,
          fontSize: "1rem",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(244,162,89,0.3)",
          marginTop: "0.25rem",
        }}
      >
        <RefreshCw size={18} /> {t.sync}
      </button>
      <p
        style={{
          textAlign: "center",
          marginTop: "0.75rem",
          fontSize: "0.82rem",
          color: "var(--text-muted)",
        }}
      >
        {t.lastSync}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.5rem",
          marginTop: "2rem",
          padding: "1rem",
          borderRadius: "12px",
          background: "var(--card)",
          fontSize: "0.82rem",
          color: "var(--text-muted)",
        }}
      >
        <Info size={16} style={{ flexShrink: 0, marginTop: "2px" }} />
        <span>{t.about}</span>
      </div>
    </div>
  );
}

function toggleBtnStyle(active) {
  return {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    padding: "0.75rem",
    borderRadius: "10px",
    border: active ? "2px solid var(--accent)" : "1.5px solid var(--border)",
    background: active ? "rgba(244,162,89,0.08)" : "var(--surface)",
    color: "var(--text)",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.9rem",
  };
}
