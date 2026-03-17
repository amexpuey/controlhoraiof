import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.string().trim().email("Introduce un email válido").max(255);

interface EmailGateProps {
  onComplete: () => void;
  source: string;
  templateSlug: string;
  extraData?: Record<string, string>;
}

export function EmailGate({ onComplete, source, templateSlug, extraData }: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }

    setLoading(true);
    try {
      await supabase.from("plantilla_leads").insert({
        email: parsed.data,
        plantilla_slug: templateSlug,
        source,
        ...extraData,
      } as any);

      onComplete();
    } catch {
      setError("Error al guardar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass card-lg text-center py-10 px-6">
      <div
        className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
        style={{ background: "var(--green-bg)", border: "1px solid var(--green-light)" }}
      >
        <Mail className="w-8 h-8" style={{ color: "var(--green)" }} />
      </div>

      <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
        Tu diagnóstico está listo
      </h3>
      <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
        Introduce tu email para ver tu nivel de riesgo completo
      </p>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
        <div>
          <Input
            type="email"
            required
            placeholder="tu@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-center"
            style={{ borderColor: error ? "var(--danger)" : undefined }}
          />
          {error && (
            <p className="text-xs mt-1" style={{ color: "var(--danger)" }}>{error}</p>
          )}
        </div>

        <button type="submit" disabled={loading} className="btn btn-green btn-lg w-full">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ver mi resultado"}
        </button>

        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Sin spam. Solo recursos de cumplimiento normativo.
        </p>
      </form>
    </div>
  );
}
