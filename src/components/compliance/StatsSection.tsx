const stats = [
  { value: "20,2M€", label: "Sanciones ITSS en 2024" },
  { value: "12.000€", label: "Condena judicial media por trabajador" },
  { value: "90%", label: "Casos ganados por el trabajador sin registro" },
  { value: "1.869", label: "Infracciones de control horario en 2024" },
];

export function StatsSection() {
  return (
    <div className="cc-container cc-section">
      <div className="cc-stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="cc-stat-card">
            <span className="cc-stat-value">{stat.value}</span>
            <span className="cc-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
