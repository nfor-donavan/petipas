import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Utensils,
  MessageCircle,
  Gamepad2,
  Shield,
} from "lucide-react";
import { useApp } from "../AppContext";
import { tips } from "../data/tips";

const categories = [
  { id: "all", en: "All", fr: "Tout", icon: null },
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
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        <ArrowLeft size={24} />
      </button>

      <h1>{t.title}</h1>

      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          overflowX: "auto",
          margin: "1.25rem 0",
          paddingBottom: "0.5rem",
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
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                border: isActive ? "none" : "1px solid #ddd",
                background: isActive ? "#F4A259" : "white",
                color: isActive ? "white" : "#555",
                whiteSpace: "nowrap",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              {Icon && <Icon size={16} />}
              {cat[language] || cat.en}
            </button>
          );
        })}
      </div>

      {filteredTips.length === 0 && (
        <p style={{ color: "#888", textAlign: "center", marginTop: "2rem" }}>
          {t.empty}
        </p>
      )}

      {filteredTips.map((tip) => {
        const content = tip[language] || tip.en;
        return (
          <div className="card" key={tip.id}>
            <h3>{content.title}</h3>
            <p style={{ marginTop: "0.5rem", color: "#555" }}>
              {content.content}
            </p>
          </div>
        );
      })}
    </div>
  );
}
