import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Utensils,
  MessageCircle,
  Gamepad2,
  Shield,
  Layers,
} from "lucide-react";
import { useApp } from "../AppContext";
import { tips } from "../data/tips";

const categories = [
  { id: "all", en: "All", fr: "Tout", icon: Layers },
  { id: "health", en: "Health", fr: "Santé", icon: Heart },
  { id: "nutrition", en: "Nutrition", fr: "Nutrition", icon: Utensils },
  {
    id: "communication",
    en: "Communication",
    fr: "Communication",
    icon: MessageCircle,
  },
  { id: "play", en: "Play", fr: "Jeu", icon: Gamepad2 },
  { id: "discipline", en: "Discipline", fr: "Discipline", icon: Shield },
];

export default function Tips() {
  const { language, ageGroup } = useApp();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTips = tips.filter((tip) => {
    const matchesAge = tip.ageGroup === ageGroup;
    const matchesCategory =
      activeCategory === "all" || tip.category === activeCategory;
    return matchesAge && matchesCategory;
  });

  const text = {
    en: {
      title: "Parenting Tips",
      empty: "No tips yet for this category — check back soon!",
    },
    fr: {
      title: "Astuces parentales",
      empty: "Pas encore d'astuces pour cette catégorie — revenez bientôt !",
    },
  };
  const t = text[language] || text.en;

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

      <h1 style={{ fontSize: "1.5rem", marginBottom: "1.25rem" }}>{t.title}</h1>

      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          overflowX: "auto",
          marginBottom: "1.5rem",
          paddingBottom: "0.5rem",
          scrollbarWidth: "none",
        }}
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.55rem 1.1rem",
                borderRadius: "20px",
                border: isActive ? "none" : "1.5px solid var(--border)",
                background: isActive ? "var(--accent)" : "var(--surface)",
                color: isActive ? "white" : "var(--text-muted)",
                whiteSpace: "nowrap",
                cursor: "pointer",
                fontSize: "0.88rem",
                fontWeight: 600,
                flexShrink: 0,
                boxShadow: isActive
                  ? "0 3px 10px rgba(244,162,89,0.3)"
                  : "none",
                transition: "all 0.15s ease",
              }}
            >
              <Icon size={15} />
              {cat[language] || cat.en}
            </button>
          );
        })}
      </div>

      {filteredTips.length === 0 && (
        <div
          style={{
            textAlign: "center",
            marginTop: "3rem",
            color: "var(--text-muted)",
          }}
        >
          <p>{t.empty}</p>
        </div>
      )}

      {filteredTips.map((tip) => {
        const content = tip[language] || tip.en;
        return (
          <div
            className="card"
            key={tip.id}
            style={{
              borderLeft: "4px solid var(--accent)",
            }}
          >
            <h3 style={{ fontSize: "1.05rem", marginBottom: "0.4rem" }}>
              {content.title}
            </h3>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.5 }}>
              {content.content}
            </p>
          </div>
        );
      })}
    </div>
  );
}
