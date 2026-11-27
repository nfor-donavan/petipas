import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../AppContext';

export default function BackButton({ to = '/home' }) {
  const { language } = useApp();
  const navigate = useNavigate();
  const label = language === 'fr' ? 'Retour' : 'Back';

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      aria-label={label}
      style={{
        background: 'var(--card)', border: 'none', cursor: 'pointer',
        marginBottom: '1.25rem', color: 'var(--text)', width: '44px', height: '44px',
        borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <ArrowLeft size={20} aria-hidden="true" />
    </button>
  );
}
