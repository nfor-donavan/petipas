import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import { useApp } from "../AppContext";
import { communityPosts } from "../data/tips";

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
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        <ArrowLeft size={24} />
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Users size={26} color="#F4A259" />
        <h1>{t.title}</h1>
      </div>
      <p
        style={{ color: "#888", marginTop: "0.25rem", marginBottom: "1.5rem" }}
      >
        {t.subtitle}
      </p>

      {communityPosts.map((post) => {
        const content = post[language] || post.en;
        return (
          <div className="card" key={post.id}>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#F4A259",
                fontWeight: 600,
                marginBottom: "0.4rem",
              }}
            >
              {post.author}
            </p>
            <h3>{content.title}</h3>
            <p style={{ marginTop: "0.5rem", color: "#555" }}>
              {content.content}
            </p>
          </div>
        );
      })}
    </div>
  );
}
