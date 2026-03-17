import { useEffect, useState } from "react";
import { SanctionCalculatorTabs } from "@/components/compliance/calculator/SanctionCalculatorTabs";
import { useIframeHeight } from "@/hooks/useIframeHeight";
import { EmailGate } from "@/components/compliance/EmailGate";

export default function CalculadoraSancionesPage() {
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [sanctionRange, setSanctionRange] = useState("");

  useIframeHeight();

  useEffect(() => {
    // Hide global footer, header, nav
    const footer = document.querySelector('footer');
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    if (footer) (footer as HTMLElement).style.display = 'none';
    if (header) (header as HTMLElement).style.display = 'none';
    if (nav) (nav as HTMLElement).style.display = 'none';

    return () => {
      const footer = document.querySelector('footer');
      const header = document.querySelector('header');
      const nav = document.querySelector('nav');
      if (footer) (footer as HTMLElement).style.display = '';
      if (header) (header as HTMLElement).style.display = '';
      if (nav) (nav as HTMLElement).style.display = '';
    };
  }, []);

  const handleScrollToCalculator = () => {
    const el = document.getElementById("calculadora-section");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="compliance-theme min-h-screen pb-12">
      {/* Hero */}
      <div className="hero">
        <div className="urgency-bar">
          En 2024, la Inspección de Trabajo impuso 20,2M€ en multas por registro horario. ¿Cuánto te puede costar?
        </div>

        <div className="container">
          <div className="text-center py-6">
            <div className="kicker mx-auto">
              <span className="kicker-dot"></span>
              LISOS · Ley de Infracciones y Sanciones
            </div>

            <h1 className="hero-title font-bold">
              Calculadora de Sanciones Laborales 2026
            </h1>
            <p className="text-xl md:text-2xl font-semibold mt-2 mb-2" style={{ color: 'var(--dark-muted)' }}>
              ¿Cuánto puede multarte la Inspección?
            </p>

            <p className="lead mb-8 max-w-2xl mx-auto">
              Selecciona los incumplimientos y calcula el rango estimado según la LISOS.
            </p>

            <button
              onClick={handleScrollToCalculator}
              className="btn btn-green btn-lg btn-breathing mb-4 text-lg font-semibold mx-auto"
            >
              Calcular posibles sanciones →
            </button>

            <p className="text-sm mb-8" style={{ color: 'var(--dark-muted)' }}>
              Estimación orientativa en segundos
            </p>

            {/* Mini Stats */}
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">7.500€</span>
                <span className="hero-stat-label">Sanción máxima por infracción</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">12.000€</span>
                <span className="hero-stat-label">Condena judicial media por trabajador</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">20,2M€</span>
                <span className="hero-stat-label">En multas impuestas solo en 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator */}
      <div id="calculadora-section" className="container mt-8">
        <div className="tool-card">
          <SanctionCalculatorTabs
            onResultCalculated={(min, max) => {
              const range = `${min.toLocaleString("es-ES")}€ – ${max.toLocaleString("es-ES")}€`;
              setSanctionRange(range);
              setShowEmailCapture(true);
            }}
          />
        </div>

        {/* Optional email capture after result */}
        {showEmailCapture && (
          <div className="mt-8">
            <div className="glass card-lg text-center py-8 px-6">
              <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>
                ¿Quieres recibir este informe?
              </h3>
              <p className="mb-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                Te enviamos el detalle de sanciones estimadas a tu email.
              </p>
              <EmailGateInline
                source="calculadora"
                templateSlug="calculadora-sanciones"
                extraData={{ empresa: sanctionRange }}
                onComplete={() => setShowEmailCapture(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Simplified inline email capture (not full-screen gate)
function EmailGateInline({ source, templateSlug, extraData, onComplete }: {
  source: string;
  templateSlug: string;
  extraData?: Record<string, string>;
  onComplete: () => void;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;

    setLoading(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      await supabase.from("plantilla_leads").insert({
        email: email.trim(),
        plantilla_slug: templateSlug,
        source,
        ...extraData,
      } as any);
      setDone(true);
      setTimeout(onComplete, 2000);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return <p className="text-sm font-medium" style={{ color: "var(--green)" }}>✓ Enviado. Revisa tu bandeja de entrada.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
      <input
        type="email"
        required
        placeholder="tu@empresa.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-full border text-sm"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      />
      <button type="submit" disabled={loading} className="btn btn-green whitespace-nowrap">
        {loading ? "..." : "Enviar"}
      </button>
    </form>
  );
}
