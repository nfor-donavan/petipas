import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../AppContext";

const ageGroups = ["0-1", "1-3", "3-5", "5-8"];

export default function Onboarding() {
  const { setLanguage, setAgeGroup } = useApp();
  const [step, setStep] = useState(1);
  const [selectedLang, setSelectedLang] = useState(null);
  const navigate = useNavigate();

  function handleLangSelect(lang) {
    setSelectedLang(lang);
    setStep(2);
  }

  function handleAgeSelect(age) {
    setLanguage(selectedLang);
    setAgeGroup(age);
    navigate("/home");
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {step === 1 && (
        <>
          <h1>Welcome to PetiPas</h1>
          <p>Choose your language / Choisissez votre langue</p>
          <button
            onClick={() => handleLangSelect("en")}
            style={{ margin: "0.5rem", padding: "1rem 2rem" }}
          >
            English
          </button>
          <button
            onClick={() => handleLangSelect("fr")}
            style={{ margin: "0.5rem", padding: "1rem 2rem" }}
          >
            Français
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h1>
            {selectedLang === "fr" ? "Âge de votre enfant" : "Your child's age"}
          </h1>
          {ageGroups.map((age) => (
            <button
              key={age}
              onClick={() => handleAgeSelect(age)}
              style={{
                display: "block",
                margin: "0.5rem auto",
                padding: "1rem 2rem",
                width: "200px",
              }}
            >
              {age} {selectedLang === "fr" ? "ans" : "years"}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
