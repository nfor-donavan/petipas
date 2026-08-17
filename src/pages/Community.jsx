import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Calendar, BookOpenCheck } from "lucide-react";
import { useApp } from "../AppContext";
import { communityPosts } from "../data/tips";

const postIcons = [Calendar, BookOpenCheck];

export default function Community() {
  const { language } = useApp();
  const navigate = useNavigate();

  const text = {
    en: {
      title: "Community",
      subtitle: "Connect with facilitators and other parents",
    },
    fr: {
      title: "Communauté",
      subtitle: "Connectez-vous avec des facilitateurs et d'autres parents",
    },
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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          marginBottom: "0.3rem",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: "var(--card)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Users size={20} color="var(--accent)" />
        </div>
        <h1 style={{ fontSize: "1.5rem" }}>{t.title}</h1>
      </div>
      <p
        style={{
          color: "var(--text-muted)",
          marginBottom: "1.5rem",
          fontSize: "0.9rem",
        }}
      >
        {t.subtitle}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {communityPosts.map((post, i) => {
          const content = post[language] || post.en;
          const Icon = postIcons[i % postIcons.length];
          return (
            <div
              className="card"
              key={post.id}
              style={{ position: "relative", paddingTop: "1.1rem" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.6rem",
                }}
              >
                <Icon size={16} color="var(--accent)" />
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--accent)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                  }}
                >
                  {post.author}
                </p>
              </div>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "0.4rem" }}>
                {content.title}
              </h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.5 }}>
                {content.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
