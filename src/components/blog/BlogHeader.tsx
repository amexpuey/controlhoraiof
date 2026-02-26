
export default function BlogHeader() {
  return (
    <div
      className="py-16 md:py-20 relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 120%, rgba(15,184,159,.12) 0%, transparent 60%), var(--dark)",
      }}
    >
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <p
          className="text-xs font-semibold tracking-[.2em] uppercase mb-4"
          style={{ color: "var(--green)" }}
        >
          ── RECURSOS
        </p>
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          style={{ color: "var(--dark-text)" }}
        >
          Recursos sobre{" "}
          <span style={{ color: "var(--green)" }}>registro de jornada</span>
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--dark-muted)" }}
        >
          Guías, normativa y consejos para gestionar el control horario de tu empresa
        </p>
      </div>
    </div>
  );
}
