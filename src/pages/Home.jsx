import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  CheckCircle2,
  Users,
  Settings as SettingsIcon,
} from "lucide-react";
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
      status: isOnline ? "Online" : "Offline — content still available",
    },
    fr: {
      greeting: "Bon retour",
      todayTip: "Astuce du jour",
      browseTips: "Parcourir les astuces",
      milestones: "Suivre les étapes",
      community: "Communauté",
      status: isOnline
        ? "En ligne"
        : "Hors ligne — contenu toujours disponible",
    },
  };

  const t = text[language] || text.en;
  const tipContent = todayTip[language] || todayTip.en;

  const menuItems = [
    { icon: BookOpen, label: t.browseTips, path: "/tips", primary: true },
    { icon: CheckCircle2, label: t.milestones, path: "/milestones" },
    { icon: Users, label: t.community, path: "/community" },
  ];

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.8rem",
            color: isOnline ? "#4CAF50" : "var(--accent)",
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: isOnline ? "#4CAF50" : "var(--accent)",
            }}
          />
          {t.status}
        </div>
        <button
          onClick={() => navigate("/settings")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text)",
            padding: "0.25rem",
          }}
        >
          <SettingsIcon size={22} />
        </button>
      </div>

      <h1 style={{ fontSize: "1.6rem", marginBottom: "1.25rem" }}>
        {t.greeting} 👋
      </h1>

      <div
        className="card"
        style={{
          background: "linear-gradient(135deg, #FFF3E6 0%, #FFE4C7 100%)",
          border: "1px solid rgba(244,162,89,0.2)",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "0.5rem",
          }}
        >
          {t.todayTip}
        </p>
        <p
          style={{
            fontWeight: 700,
            fontSize: "1.05rem",
            marginBottom: "0.4rem",
            color: "var(--text)",
          }}
        >
          {tipContent.title}
        </p>
        <p style={{ color: "var(--text-muted)", lineHeight: 1.5 }}>
          {tipContent.content}
        </p>
      </div>

      <div style={{ display: "grid", gap: "0.75rem", marginTop: "1.5rem" }}>
        {menuItems.map(({ icon: Icon, label, path, primary }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1rem 1.25rem",
              borderRadius: "14px",
              border: primary ? "none" : "2px solid var(--border)",
              background: primary ? "var(--accent)" : "var(--surface)",
              color: primary ? "white" : "var(--text)",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: primary ? "0 4px 12px rgba(244,162,89,0.3)" : "none",
              width: "100%",
              textAlign: "left",
            }}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
