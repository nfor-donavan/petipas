import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';

const ageGroups = [
  { value: "0-1", en: "0–1 years", fr: "0–1 ans" },
  { value: "1-3", en: "1–3 years", fr: "1–3 ans" },
  { value: "3-5", en: "3–5 years", fr: "3–5 ans" },
  { value: "5-8", en: "5–8 years", fr: "5–8 ans" },
];

const choiceStyle = {
  background: 'var(--surface)',
  border: '2px solid var(--accent-strong)',
  borderRadius: '14px',
  padding: '1rem',
  fontSize: '1.05rem',
  fontWeight: 600,
  color: 'var(--text)',
  cursor: 'pointer',
  width: '100%',
};

export default function Onboarding() {
  const { setLanguage, setAgeGroup } = useApp();
  const [step, setStep] = useState(1);
  const [selectedLang, setSelectedLang] = useState(null);
  const navigate = useNavigate();

  function handleLangSelect(lang) {
    setSelectedLang(lang);
    setLanguage(lang); // page language and text switch right away
    setStep(2);
  }

  function handleAgeSelect(age) {
    setAgeGroup(age);
    navigate('/home');
  }

  return (
    <main style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      background: 'linear-gradient(180deg, var(--bg) 0%, var(--hero-to) 100%)',
      padding: '2rem 1.5rem',
    }}>
      <img
        src="/logo.png"
        alt="PetiPas"
        style={{ width: '96px', height: '96px', marginBottom: '1.5rem', borderRadius: '22px', boxShadow: '0 8px 24px rgba(244,162,89,0.25)' }}
      />

      {step === 1 && (
        <>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>Welcome to PetiPas</h1>
          <p style={{ marginBottom: '2rem' }}>Choose your language / Choisissez votre langue</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '320px' }}>
            <button type="button" onClick={() => handleLangSelect('en')} style={choiceStyle}>
              <span aria-hidden="true">🇬🇧 </span><span lang="en">English</span>
            </button>
            <button type="button" onClick={() => handleLangSelect('fr')} style={choiceStyle}>
              <span aria-hidden="true">🇫🇷 </span><span lang="fr">Français</span>
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '2rem' }}>
            {selectedLang === 'fr' ? "Âge de votre enfant" : "Your child's age"}
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '320px' }}>
            {ageGroups.map((age) => (
              <button type="button" key={age.value} onClick={() => handleAgeSelect(age.value)} style={choiceStyle}>
                {selectedLang === 'fr' ? age.fr : age.en}
              </button>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
