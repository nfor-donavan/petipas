import { useState } from 'react';
import { Heart, Utensils, MessageCircle, Gamepad2, Shield, Layers } from 'lucide-react';
import { useApp } from '../AppContext';
import { tips } from '../data/tips';
import BackButton from '../components/BackButton';

const categories = [
  { id: 'all', en: 'All', fr: 'Tout', icon: Layers },
  { id: 'health', en: 'Health', fr: 'Santé', icon: Heart },
  { id: 'nutrition', en: 'Nutrition', fr: 'Nutrition', icon: Utensils },
  { id: 'communication', en: 'Communication', fr: 'Communication', icon: MessageCircle },
  { id: 'play', en: 'Play', fr: 'Jeu', icon: Gamepad2 },
  { id: 'discipline', en: 'Discipline', fr: 'Discipline', icon: Shield },
];

export default function Tips() {
  const { language, ageGroup } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTips = tips.filter(tip =>
    tip.ageGroup === ageGroup && (activeCategory === 'all' || tip.category === activeCategory)
  );

  const text = {
    en: { title: "Parenting Tips", filter: "Filter by category", empty: "No tips yet for this category — check back soon!" },
    fr: { title: "Astuces parentales", filter: "Filtrer par catégorie", empty: "Pas encore d'astuces pour cette catégorie — revenez bientôt !" }
  };
  const t = text[language] || text.en;

  return (
    <main className="container">
      <BackButton />
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>{t.title}</h1>

      <div role="group" aria-label={t.filter} style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', marginBottom: '1.5rem', paddingBottom: '0.5rem' }}>
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              type="button" key={cat.id} aria-pressed={isActive}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1.1rem',
                borderRadius: '22px', whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0,
                fontSize: '0.9rem', fontWeight: 600,
                border: isActive ? '2px solid var(--accent)' : '2px solid var(--border-strong)',
                background: isActive ? 'var(--accent)' : 'var(--surface)',
                color: isActive ? 'var(--on-accent)' : 'var(--text)',
              }}
            >
              <Icon size={15} aria-hidden="true" />
              {cat[language] || cat.en}
            </button>
          );
        })}
      </div>

      {filteredTips.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '3rem' }}>{t.empty}</p>
      )}

      {filteredTips.map(tip => {
        const content = tip[language] || tip.en;
        return (
          <article className="card" key={tip.id} style={{ borderLeft: '4px solid var(--accent)' }}>
            <h2 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>{content.title}</h2>
            <p style={{ lineHeight: 1.5 }}>{content.content}</p>
          </article>
        );
      })}
    </main>
  );
}
