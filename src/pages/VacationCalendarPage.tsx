
import React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { SEOHead } from "@/components/seo/SEOHead";
import { BreadcrumbNav } from "@/components/seo/BreadcrumbNav";
import VacationCalendar from "@/components/templates/vacation-calendar/VacationCalendar";

export default function VacationCalendarPage() {
  return (
    <>
      <SEOHead
        title="Calendario de vacaciones para equipos | Plantilla interactiva gratis"
        description="Planifica las vacaciones de tu equipo con este calendario interactivo. Control de días, solapamientos, festivos y 4 tipos de ausencia."
      />
      <AppHeader />
      <div className="container" style={{ paddingTop: 32, paddingBottom: 48 }}>
        <BreadcrumbNav
          items={[
            { label: "Plantillas", href: "/plantillas" },
            { label: "Calendario de vacaciones" },
          ]}
        />
        <div style={{ marginTop: 20 }}>
          <VacationCalendar />
        </div>
      </div>
    </>
  );
}
