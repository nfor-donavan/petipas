import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { useApp } from "../AppContext";
import { milestones } from "../data/tips";

export default function Milestones() {
  const { language, ageGroup } = useApp();
  const navigate = useNavigate();
  const [checked, setChecked] = useState({});

  const storageKey = `petipas_milestones_${ageGroup}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setChecked(JSON.parse(saved));
  }, [storageKey]);

  function toggleMilestone(index) {
    const updated = { ...checked, [index]: !checked[index] };
    setChecked(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  }

  const list = milestones[ageGroup] || [];
  const completedCount = Object.values(checked).filter(Boolean).length;

  const text = {
    en: { title: "Milestone Tracker", progress: "milestones completed" },
    fr: { title: "Suivi des étapes", progress: "étapes complétées" },
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
          background: "#F4A259",
          color: "white",
          borderRadius: "12px",
          padding: "1rem",
          margin: "1.25rem 0",
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        {completedCount} / {list.length} {t.progress}
      </div>

      {list.map((milestone, index) => {
        const isChecked = !!checked[index];
        const label = milestone[language] || milestone.en;
        return (
          <div
            key={index}
            onClick={() => toggleMilestone(index)}
            className="card"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              cursor: "pointer",
              opacity: isChecked ? 0.7 : 1,
            }}
          >
            {isChecked ? (
              <CheckCircle2 size={22} color="#4CAF50" />
            ) : (
              <Circle size={22} color="#ccc" />
            )}
            <span
              style={{
                textDecoration: isChecked ? "line-through" : "none",
                fontWeight: 500,
              }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
