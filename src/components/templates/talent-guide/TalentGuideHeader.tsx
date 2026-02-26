
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const TalentGuideHeader: React.FC = () => {
  return (
    <div>
      <Link 
        to="/plantillas" 
        className="btn btn-outline-light" 
        style={{ marginBottom: '20px', fontSize: '13px', padding: '6px 14px' }}
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a plantillas
      </Link>
      <div className="kicker">
        <span className="kicker-dot" />
        Plantilla interactiva
      </div>
      <h1 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}>
        Guía de Talento: <span className="accent">Desempeño y Objetivos</span>
      </h1>
      <p className="lead">
        Evalúa el desempeño, planifica formaciones y realiza seguimiento de objetivos para tus colaboradores con esta herramienta interactiva.
      </p>
    </div>
  );
};
