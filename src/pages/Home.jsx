import { useNavigate } from "react-router-dom";
import { useApp } from "../AppContext";
import { tips } from "../data/tips";

export default function Home() {
  const { language, ageGroup } = useApp();
  const navigate = useNavigate();

  const todayTip = tips.find((t) => t.ageGroup === ageGroup) || tips[0];
  const isOnline = navigator.onLine;

  const text = {
    en: {
      greeting: "Welcome back",
      todayTip: "Today's Tip",
      browseTips: "Browse Tips",
      milestones: "Track Milestones",
      community: "Community",
      offline: "Offline Content",
      status: isOnline ? "Online" : "Offline — content still available",
    },
    fr: {
      greeting: "Bon retour",
      todayTip: "Astuce du jour",
      browseTips: "Parcourir les astuces",
      milestones: "Suivre les étapes",
      community: "Communauté",
      offline: "Contenu hors ligne",
      status: isOnline
        ? "En ligne"
        : "Hors ligne — contenu toujours disponible",
    },
  };

  const t = text[language] || text.en;
  const tipContent = todayTip[language] || todayTip.en;

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            fontSize: "0.85rem",
            color: isOnline ? "#4CAF50" : "#E08E3E",
            fontWeight: 600,
          }}
        >
          ● {t.status}
        </div>
        <button
          onClick={() => navigate("/settings")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text)",
          }}
        >
          ⚙️
        </button>
      </div>

      <h1>{t.greeting} 👋</h1>

      <div className="card" style={{ marginTop: "1.5rem" }}>
        <h3>{t.todayTip}</h3>
        <p style={{ marginTop: "0.5rem", fontWeight: "bold" }}>
          {tipContent.title}
        </p>
        <p style={{ marginTop: "0.5rem", color: "#555" }}>
          {tipContent.content}
        </p>
      </div>

      <div style={{ display: "grid", gap: "0.75rem", marginTop: "1.5rem" }}>
        <button className="btn" onClick={() => navigate("/tips")}>
          {t.browseTips}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/milestones")}
        >
          {t.milestones}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/community")}
        >
          {t.community}
        </button>
      </div>
    </div>
  );
}
