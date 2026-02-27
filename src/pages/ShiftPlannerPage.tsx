
import React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { SEOHead } from "@/components/seo/SEOHead";
import { BreadcrumbNav } from "@/components/seo/BreadcrumbNav";
import ShiftPlanner from "@/components/templates/shift-planner/ShiftPlanner";

export default function ShiftPlannerPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Plantillas", href: "/plantillas" },
    { label: "Planificador de turnos" },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--white)' }}>
      <SEOHead
        title="Planificador de Turnos Rotativos Gratis | FichajeEmpresas"
        description="Planifica turnos rotativos de tu equipo con este planificador visual gratuito. Rotación automática, vista semanal y mensual, contador de horas y exportación."
        canonical="https://fichajeempresas.es/plantillas/planificador-turnos"
      />

      <AppHeader />

      <div className="container" style={{ paddingTop: '24px', paddingBottom: '64px' }}>
        <BreadcrumbNav items={breadcrumbs} />

        <div style={{ marginTop: '24px', marginBottom: '32px' }}>
          <div className="kicker" style={{ marginBottom: '12px' }}>
            <span className="kicker-dot" />
            Herramienta gratuita
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.3, color: 'var(--text)', marginBottom: '8px' }}>
            Planificador de <span className="accent">Turnos Rotativos</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.6 }}>
            Organiza los turnos de tu equipo de forma visual. Asigna turnos con un clic, 
            genera rotaciones automáticas y controla las horas de cada empleado.
          </p>
        </div>

        <ShiftPlanner />
      </div>
    </div>
  );
}
