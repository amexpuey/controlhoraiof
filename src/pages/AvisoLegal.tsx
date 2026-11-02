import { SEOHead } from "@/components/seo/SEOHead";
import { AppHeader } from "@/components/layout/AppHeader";

export default function AvisoLegal() {
  return (
    <div className="min-h-screen" style={{ background: "var(--white)" }}>
      <SEOHead
        title="Aviso legal | FichajeEmpresas.es"
        description="Titular del sitio FichajeEmpresas.es: Solution Partnership Tcnik S.L., que edita el sitio bajo la marca INWOUT."
        canonical="https://fichajeempresas.es/aviso-legal"
      />
      <AppHeader />
      <main className="max-w-3xl mx-auto px-4 py-10 space-y-6" style={{ color: "var(--text)" }}>
        <h1 className="text-3xl font-bold">Aviso legal</h1>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Titular del sitio</h2>
          <ul className="space-y-1" style={{ color: "var(--text-secondary)" }}>
            <li><strong style={{ color: "var(--text)" }}>Titular:</strong> Solution Partnership Tcnik S.L.</li>
            <li><strong style={{ color: "var(--text)" }}>NIF:</strong> B66828757</li>
            <li><strong style={{ color: "var(--text)" }}>Domicilio:</strong> Carrer Santa Amalia, 7, 08032 Barcelona</li>
            <li>
              <strong style={{ color: "var(--text)" }}>Correo electrónico:</strong>{" "}
              <a href="mailto:hi@inwout.com" className="underline">hi@inwout.com</a>
            </li>
            <li><strong style={{ color: "var(--text)" }}>Marca:</strong> INWOUT</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Quién edita este sitio</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Este sitio lo edita INWOUT. INWOUT es uno de los programas de control horario que se comparan en este
            sitio y aparece en él como producto propio.
          </p>
        </section>
      </main>
    </div>
  );
}
