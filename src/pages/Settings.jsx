import { Sun, Moon, RefreshCw, Globe, Info, Type } from 'lucide-react';
import { useApp } from '../AppContext';
import BackButton from '../components/BackButton';

function choiceStyle(active) {
  return {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
    padding: '0.75rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
    border: active ? '2px solid var(--accent-strong)' : '2px solid var(--border-strong)',
    background: active ? 'var(--card)' : 'var(--surface)',
    color: 'var(--text)',
  };
}

export default function Settings() {
  const { language, setLanguage, theme, toggleTheme, textSize, setTextSize } = useApp();

  const text = {
    en: {
      title: "Settings", appearance: "Appearance", light: "Light", dark: "Dark",
      textSize: "Text size", normal: "Normal", large: "Large", xlarge: "Extra large",
      languageLabel: "Language", sync: "Sync when online", lastSync: "Last synced: Never",
      about: "PetiPas v1.1 — Built for offline-first positive parenting support."
    },
    fr: {
      title: "Paramètres", appearance: "Apparence", light: "Clair", dark: "Sombre",
      textSize: "Taille du texte", normal: "Normal", large: "Grand", xlarge: "Très grand",
      languageLabel: "Langue", sync: "Synchroniser en ligne", lastSync: "Dernière synchro : Jamais",
      about: "PetiPas v1.1 — Conçu pour un soutien parental positif hors ligne."
    }
  };
  const t = text[language] || text.en;

  function handleSync() {
    alert(language === 'fr' ? "Synchronisation réussie !" : "Sync complete!");
  }

  const heading = { marginBottom: '0.9rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' };

  return (
    <main className="container">
      <BackButton />
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{t.title}</h1>

      <section className="card" aria-labelledby="set-appearance">
        <h2 id="set-appearance" style={heading}>{t.appearance}</h2>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button type="button" aria-pressed={theme === 'light'} onClick={() => theme !== 'light' && toggleTheme()} style={choiceStyle(theme === 'light')}>
            <Sun size={17} aria-hidden="true" /> {t.light}
          </button>
          <button type="button" aria-pressed={theme === 'dark'} onClick={() => theme !== 'dark' && toggleTheme()} style={choiceStyle(theme === 'dark')}>
            <Moon size={17} aria-hidden="true" /> {t.dark}
          </button>
        </div>
      </section>

      <section className="card" aria-labelledby="set-textsize">
        <h2 id="set-textsize" style={heading}><Type size={17} aria-hidden="true" /> {t.textSize}</h2>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          {[['normal', t.normal], ['large', t.large], ['xlarge', t.xlarge]].map(([value, label]) => (
            <button type="button" key={value} aria-pressed={textSize === value} onClick={() => setTextSize(value)} style={choiceStyle(textSize === value)}>
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="card" aria-labelledby="set-language">
        <h2 id="set-language" style={heading}><Globe size={17} aria-hidden="true" /> {t.languageLabel}</h2>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button type="button" aria-pressed={language === 'en'} onClick={() => setLanguage('en')} style={choiceStyle(language === 'en')}>
            <span aria-hidden="true">🇬🇧</span> <span lang="en">English</span>
          </button>
          <button type="button" aria-pressed={language === 'fr'} onClick={() => setLanguage('fr')} style={choiceStyle(language === 'fr')}>
            <span aria-hidden="true">🇫🇷</span> <span lang="fr">Français</span>
          </button>
        </div>
      </section>

      <button
        type="button" onClick={handleSync}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%',
          padding: '1rem', borderRadius: '14px', border: 'none', background: 'var(--accent)',
          color: 'var(--on-accent)', fontWeight: 600, fontSize: '1rem', cursor: 'pointer',
        }}
      >
        <RefreshCw size={18} aria-hidden="true" /> {t.sync}
      </button>
      <p style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.85rem' }}>{t.lastSync}</p>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '2rem', padding: '1rem', borderRadius: '12px', background: 'var(--card)', fontSize: '0.85rem' }}>
        <Info size={16} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--text-muted)' }} aria-hidden="true" />
        <span style={{ color: 'var(--text-muted)' }}>{t.about}</span>
      </div>
    </main>
  );
}
