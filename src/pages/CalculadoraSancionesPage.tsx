import { useEffect, useState } from "react";
import { SanctionCalculatorTabs } from "@/components/compliance/calculator/SanctionCalculatorTabs";
import { useIframeHeight } from "@/hooks/useIframeHeight";
import { EstimatedSanctions } from "@/components/compliance/calculator/SanctionForm";

export default function CalculadoraSancionesPage() {
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [lastResult, setLastResult] = useState<EstimatedSanctions | null>(null);

  useIframeHeight();

  useEffect(() => {
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
      <div className="container pt-6">
        <div className="tool-card">
          <SanctionCalculatorTabs
            onResultCalculated={(result: EstimatedSanctions) => {
              setLastResult(result);
              setShowEmailCapture(true);
            }}
          />
        </div>

        {/* Optional email capture after result */}
        {showEmailCapture && lastResult && (
          <div className="mt-8">
            <div className="glass card-lg text-center py-8 px-6">
              <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>
                ¿Quieres recibir este informe detallado por email?
              </h3>
              <p className="mb-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                Te enviamos el detalle de sanciones ITSS + riesgo judicial estimado.
              </p>
              <EmailGateInline
                result={lastResult}
                onComplete={() => setShowEmailCapture(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EmailGateInline({ result, onComplete }: {
  result: EstimatedSanctions;
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

      // 1. Save lead to Supabase
      await supabase.from("plantilla_leads").insert({
        email: email.trim(),
        plantilla_slug: "calculadora-sanciones",
        source: "calculadora",
        empresa: JSON.stringify({
          itss_min: result.itssMin,
          itss_max: result.itssMax,
          judicial_min: result.judicialMin,
          judicial_max: result.judicialMax,
          total_min: result.totalMin,
          total_max: result.totalMax,
          work_centers: result.workCenters,
          employees: result.employeesAffected,
          months: result.monthsWithoutRecord,
          infractions: result.itssSanctions.map(s => s.label),
        }),
      } as any);

      // 2. Send report email via edge function
      supabase.functions.invoke('notify-calculator-lead', {
        body: {
          email: email.trim(),
          itss_min: result.itssMin,
          itss_max: result.itssMax,
          judicial_min: result.judicialMin,
          judicial_max: result.judicialMax,
          total_min: result.totalMin,
          total_max: result.totalMax,
          work_centers: result.workCenters,
          employees: result.employeesAffected,
          months: result.monthsWithoutRecord,
          infractions: result.itssSanctions.map(s => s.label),
          itss_sanctions: result.itssSanctions.map(s => ({
            label: s.label,
            level: s.level,
            base_min: s.minPerCenter,
            base_max: s.maxPerCenter,
          })),
        },
      });

      setDone(true);
      setTimeout(onComplete, 3000);
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
