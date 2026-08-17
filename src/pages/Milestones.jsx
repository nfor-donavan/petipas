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
  const progressPercent = list.length
    ? Math.round((completedCount / list.length) * 100)
    : 0;

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
          background: "var(--card)",
          borderRadius: "16px",
          padding: "1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.6rem",
          }}
        >
          <span style={{ fontWeight: 700, color: "var(--text)" }}>
            {completedCount} / {list.length}
          </span>
          <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            {t.progress}
          </span>
        </div>
        <div
          style={{
            height: "10px",
            background: "rgba(0,0,0,0.08)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progressPercent}%`,
              background: "linear-gradient(90deg, var(--accent), #F7B76D)",
              borderRadius: "10px",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
        {list.map((milestone, index) => {
          const isChecked = !!checked[index];
          const label = milestone[language] || milestone.en;
          return (
            <div
              key={index}
              onClick={() => toggleMilestone(index)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                cursor: "pointer",
                padding: "1rem 1.1rem",
                borderRadius: "14px",
                background: isChecked ? "var(--card)" : "var(--surface)",
                border: isChecked
                  ? "1.5px solid transparent"
                  : "1.5px solid var(--border)",
                transition: "all 0.15s ease",
              }}
            >
              {isChecked ? (
                <CheckCircle2
                  size={22}
                  color="#4CAF50"
                  style={{ flexShrink: 0 }}
                />
              ) : (
                <Circle
                  size={22}
                  color="var(--border)"
                  style={{ flexShrink: 0 }}
                />
              )}
              <span
                style={{
                  textDecoration: isChecked ? "line-through" : "none",
                  color: isChecked ? "var(--text-muted)" : "var(--text)",
                  fontWeight: 500,
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
