import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sun, Moon, RefreshCw, Globe } from "lucide-react";
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
    },
    fr: {
      title: "Paramètres",
      appearance: "Apparence",
      light: "Clair",
      dark: "Sombre",
      languageLabel: "Langue",
      sync: "Synchroniser en ligne",
      lastSync: "Dernière synchro : Jamais",
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
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: "1rem",
          color: "var(--text)",
        }}
      >
        <ArrowLeft size={24} />
      </button>

      <h1>{t.title}</h1>

      <div className="card" style={{ marginTop: "1.5rem" }}>
        <h3 style={{ marginBottom: "0.75rem" }}>{t.appearance}</h3>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => theme !== "light" && toggleTheme()}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              padding: "0.75rem",
              borderRadius: "10px",
              border:
                theme === "light"
                  ? "2px solid var(--accent)"
                  : "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            <Sun size={18} /> {t.light}
          </button>
          <button
            onClick={() => theme !== "dark" && toggleTheme()}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              padding: "0.75rem",
              borderRadius: "10px",
              border:
                theme === "dark"
                  ? "2px solid var(--accent)"
                  : "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            <Moon size={18} /> {t.dark}
          </button>
        </div>
      </div>

      <div className="card">
        <h3
          style={{
            marginBottom: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <Globe size={18} /> {t.languageLabel}
        </h3>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setLanguage("en")}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "10px",
              border:
                language === "en"
                  ? "2px solid var(--accent)"
                  : "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("fr")}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "10px",
              border:
                language === "fr"
                  ? "2px solid var(--accent)"
                  : "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Français
          </button>
        </div>
      </div>

      <button
        className="btn"
        onClick={handleSync}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          marginTop: "0.5rem",
        }}
      >
        <RefreshCw size={18} /> {t.sync}
      </button>
      <p
        style={{
          textAlign: "center",
          marginTop: "0.75rem",
          fontSize: "0.85rem",
        }}
      >
        {t.lastSync}
      </p>
    </div>
  );
}
