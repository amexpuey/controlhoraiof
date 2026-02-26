
import React from "react";
import { CheckCircle, Target, TrendingUp, Users, BookOpen, BarChart3 } from "lucide-react";
import evaluationImg from "@/assets/talent-guide-evaluation.jpg";
import growthImg from "@/assets/talent-guide-growth.jpg";

export const IntroductionCard: React.FC = () => {
  const benefits = [
    { icon: <Users className="h-5 w-5" style={{ color: 'var(--green)' }} />, text: "Ayudar a tu equipo a crecer profesionalmente" },
    { icon: <Target className="h-5 w-5" style={{ color: 'var(--green)' }} />, text: "Planificar y dar seguimiento a objetivos claros" },
    { icon: <BarChart3 className="h-5 w-5" style={{ color: 'var(--green)' }} />, text: "Evaluar el desempeño de tus colaboradores" },
    { icon: <BookOpen className="h-5 w-5" style={{ color: 'var(--green)' }} />, text: "Estructurar planes de formación efectivos" },
    { icon: <TrendingUp className="h-5 w-5" style={{ color: 'var(--green)' }} />, text: "Tomar decisiones informadas basadas en datos" },
  ];

  const advantages = [
    "Ahorrar tiempo con plantillas ya estructuradas",
    "Mejorar la experiencia de los colaboradores",
    "Aumentar la retención del talento",
    "Fomentar el crecimiento organizacional",
  ];

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Two-column intro with image */}
      <div className="setup-grid" style={{ marginBottom: '32px' }}>
        <div className="setup-content">
          <p className="s-label">¿Qué puedes hacer?</p>
          <h2 style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}>
            Todo lo que necesitas para gestionar el talento
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
            Si ya has llegado hasta aquí, es porque tu equipo te importa de verdad. Esta guía te dará las herramientas para sacar lo mejor de cada persona.
          </p>
          <ul className="check-list">
            {benefits.map((b, i) => (
              <li key={i}>
                <span className="check-icon">✓</span>
                <span>{b.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="setup-visual">
          <img src={evaluationImg} alt="Evaluación de desempeño del equipo" />
        </div>
      </div>

      {/* Benefits section with image */}
      <div className="setup-grid" style={{ direction: 'rtl' }}>
        <div className="setup-content" style={{ direction: 'ltr' }}>
          <p className="s-label">Beneficios</p>
          <h2 style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}>
            Resultados que notarás desde el primer día
          </h2>
          <ul className="check-list">
            {advantages.map((a, i) => (
              <li key={i}>
                <span className="check-icon">✓</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="setup-visual" style={{ direction: 'ltr' }}>
          <img src={growthImg} alt="Crecimiento profesional y desarrollo de carrera" />
        </div>
      </div>
    </div>
  );
};
