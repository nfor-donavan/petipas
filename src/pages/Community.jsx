import { Users, Calendar, BookOpenCheck } from 'lucide-react';
import { useApp } from '../AppContext';
import { communityPosts } from '../data/tips';
import BackButton from '../components/BackButton';

const postIcons = [Calendar, BookOpenCheck];

export default function Community() {
  const { language } = useApp();

  const text = {
    en: { title: "Community", subtitle: "Connect with facilitators and other parents" },
    fr: { title: "Communauté", subtitle: "Connectez-vous avec des facilitateurs et d'autres parents" }
  };
  const t = text[language] || text.en;

  return (
    <main className="container">
      <BackButton />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
        <div aria-hidden="true" style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Users size={20} color="var(--accent-strong)" />
        </div>
        <h1 style={{ fontSize: '1.5rem' }}>{t.title}</h1>
      </div>
      <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>{t.subtitle}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {communityPosts.map((post, i) => {
          const content = post[language] || post.en;
          const Icon = postIcons[i % postIcons.length];
          return (
            <article className="card" key={post.id} style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <Icon size={16} color="var(--accent-strong)" aria-hidden="true" />
                <p style={{ fontSize: '0.85rem', color: 'var(--accent-strong)', fontWeight: 700 }}>{post.author}</p>
              </div>
              <h2 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>{content.title}</h2>
              <p style={{ lineHeight: 1.5 }}>{content.content}</p>
            </article>
          );
        })}
      </div>
    </main>
  );
}
