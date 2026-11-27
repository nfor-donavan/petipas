import { useState, useEffect } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { useApp } from '../AppContext';
import { milestones } from '../data/tips';
import BackButton from '../components/BackButton';

export default function Milestones() {
  const { language, ageGroup } = useApp();
  const [checked, setChecked] = useState({});
  const storageKey = `petipas_milestones_${ageGroup}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setChecked(saved ? JSON.parse(saved) : {});
  }, [storageKey]);

  function toggleMilestone(index) {
    const updated = { ...checked, [index]: !checked[index] };
    setChecked(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  }

  const list = milestones[ageGroup] || [];
  const completedCount = list.filter((_, i) => checked[i]).length;
  const progressPercent = list.length ? Math.round((completedCount / list.length) * 100) : 0;

  const text = {
    en: { title: "Milestone Tracker", progress: "milestones completed", list: "Developmental milestones" },
    fr: { title: "Suivi des étapes", progress: "étapes complétées", list: "Étapes de développement" }
  };
  const t = text[language] || text.en;

  return (
    <main className="container">
      <BackButton />
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>{t.title}</h1>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
          <span style={{ fontWeight: 700 }}>{completedCount} / {list.length}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.progress}</span>
        </div>
        <div
          role="progressbar" aria-valuemin={0} aria-valuemax={list.length} aria-valuenow={completedCount}
          aria-label={`${completedCount} / ${list.length} ${t.progress}`}
          style={{ height: '10px', background: 'rgba(128,128,128,0.25)', borderRadius: '10px', overflow: 'hidden' }}
        >
          <div style={{
            height: '100%', width: `${progressPercent}%`, borderRadius: '10px',
            background: 'var(--accent)', transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      <div role="group" aria-label={t.list} style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
        {list.map((milestone, index) => {
          const isChecked = !!checked[index];
          const label = milestone[language] || milestone.en;
          return (
            <button
              type="button" key={index} role="checkbox" aria-checked={isChecked}
              onClick={() => toggleMilestone(index)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer',
                padding: '1rem 1.1rem', borderRadius: '14px', width: '100%', textAlign: 'left',
                fontSize: '1rem', fontWeight: 500,
                background: isChecked ? 'var(--card)' : 'var(--surface)',
                border: isChecked ? '2px solid var(--ok)' : '2px solid var(--border-strong)',
                color: isChecked ? 'var(--text-muted)' : 'var(--text)',
              }}
            >
              {isChecked
                ? <CheckCircle2 size={22} color="var(--ok)" style={{ flexShrink: 0 }} aria-hidden="true" />
                : <Circle size={22} color="var(--text-muted)" style={{ flexShrink: 0 }} aria-hidden="true" />}
              <span style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>{label}</span>
            </button>
          );
        })}
      </div>
    </main>
  );
}
