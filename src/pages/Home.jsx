import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, Users, Settings as SettingsIcon } from 'lucide-react';
import { useApp } from '../AppContext';
import { tips } from '../data/tips';

export default function Home() {
  const { language, ageGroup, isOnline } = useApp();
  const navigate = useNavigate();

  const todayTip = tips.find(t => t.ageGroup === ageGroup) || tips[0];

  const text = {
    en: {
      greeting: "Welcome back", todayTip: "Today's tip", browseTips: "Browse Tips",
      milestones: "Track Milestones", community: "Community", settings: "Settings",
      status: isOnline ? "Online" : "Offline — content still available"
    },
    fr: {
      greeting: "Bon retour", todayTip: "Astuce du jour", browseTips: "Parcourir les astuces",
      milestones: "Suivre les étapes", community: "Communauté", settings: "Paramètres",
      status: isOnline ? "En ligne" : "Hors ligne — contenu toujours disponible"
    }
  };
  const t = text[language] || text.en;
  const tipContent = todayTip[language] || todayTip.en;
  const statusColor = isOnline ? 'var(--ok)' : 'var(--accent-strong)';

  const menuItems = [
    { icon: BookOpen, label: t.browseTips, path: '/tips', primary: true },
    { icon: CheckCircle2, label: t.milestones, path: '/milestones' },
    { icon: Users, label: t.community, path: '/community' },
  ];

  return (
    <main className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div role="status" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: statusColor, fontWeight: 600 }}>
          <span aria-hidden="true" style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusColor }} />
          {t.status}
        </div>
        <button
          type="button"
          onClick={() => navigate('/settings')}
          aria-label={t.settings}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <SettingsIcon size={22} aria-hidden="true" />
        </button>
      </div>

      <h1 style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}>
        {t.greeting} <span aria-hidden="true">👋</span>
      </h1>

      <section className="card" aria-label={t.todayTip} style={{
        background: 'linear-gradient(135deg, var(--hero-from) 0%, var(--hero-to) 100%)',
        border: '1px solid rgba(244,162,89,0.3)',
      }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-strong)', marginBottom: '0.5rem' }}>
          {t.todayTip}
        </p>
        <p style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.4rem', color: 'var(--text)' }}>{tipContent.title}</p>
        <p style={{ lineHeight: 1.5 }}>{tipContent.content}</p>
      </section>

      <nav style={{ display: 'grid', gap: '0.75rem', marginTop: '1.5rem' }}>
        {menuItems.map(({ icon: Icon, label, path, primary }) => (
          <button
            type="button" key={path} onClick={() => navigate(path)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem',
              borderRadius: '14px',
              border: primary ? 'none' : '2px solid var(--border-strong)',
              background: primary ? 'var(--accent)' : 'var(--surface)',
              color: primary ? 'var(--on-accent)' : 'var(--text)',
              fontSize: '1rem', fontWeight: 600, cursor: 'pointer', width: '100%', textAlign: 'left',
            }}
          >
            <Icon size={20} aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>
    </main>
  );
}
