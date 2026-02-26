
import { ExternalLink } from "lucide-react";

interface InwoutBlogCTAProps {
  variant?: "inline" | "sidebar" | "footer";
  ctaText?: string;
  ctaUrl?: string;
}

export default function InwoutBlogCTA({
  variant = "footer",
  ctaText = "Prueba INWOUT gratis",
  ctaUrl = "https://app.inwout.com/register",
}: InwoutBlogCTAProps) {
  if (variant === "sidebar") {
    return (
      <div className="rounded-xl p-5 text-white" style={{ background: "linear-gradient(135deg, #0A1628 0%, #132340 100%)" }}>
        <h4 className="text-base font-bold mb-2">¿Buscas una solución de fichaje?</h4>
        <p className="text-sm text-white/60 mb-4 leading-relaxed">
          INWOUT simplifica el control horario para tu empresa. Sin complicaciones.
        </p>
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-sm transition-all"
          style={{ background: "#0fb89f", color: "#0A1628" }}
        >
          {ctaText} <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="my-8 rounded-xl p-6 text-white" style={{ background: "linear-gradient(135deg, #0A1628 0%, #132340 100%)" }}>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1">
            <h4 className="text-lg font-bold mb-1">Controla el fichaje de tu equipo fácilmente</h4>
            <p className="text-sm text-white/60">App móvil + web + geolocalización. Todo en una sola plataforma.</p>
          </div>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all hover:opacity-90"
            style={{ background: "#0fb89f", color: "#0A1628" }}
          >
            {ctaText} <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  // footer variant
  return (
    <div className="mt-10 rounded-xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #0A1628 0%, #132340 100%)" }}>
      <h3 className="text-xl font-bold mb-2">¿Listo para simplificar el control horario?</h3>
      <p className="text-white/60 mb-6 max-w-lg mx-auto">
        Más de 1.000 empresas ya usan INWOUT para cumplir la normativa y gestionar el fichaje de sus equipos.
      </p>
      <a
        href={ctaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-bold transition-all hover:opacity-90"
        style={{ background: "#0fb89f", color: "#0A1628" }}
      >
        {ctaText} <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
