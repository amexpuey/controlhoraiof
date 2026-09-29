import { useMemo, useState, useEffect } from "react";
import { AlertTriangle, FileDown, FileSpreadsheet } from "lucide-react";
import { DAYS } from "./hoursLogic";
import { ARAN, HOLIDAYS, ISLANDS, YEARS, buildHolidays, computeYear, fmtDecBig, fmtHMBig, naturalToLab } from "./yearLogic";
import { YearPdf, downloadCsv, num } from "./pdfExport";

const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const CTA = "https://app.inwout.com/register/?utm_source=calculadora-horas&utm_medium=web&utm_campaign=proyeccion-anual";
const BOE = "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-21667";
const fmtDate = (d: string) => `${d.slice(8, 10)}/${d.slice(5, 7)}`;

export function AnnualTab({ dayMinutes, onPdf, onChange }: { dayMinutes: number[]; onPdf: () => void; onChange: (s: YearPdf | null) => void }) {
  const [year, setYear] = useState(YEARS[0]);
  const [region, setRegion] = useState("madrid");
  const [island, setIsland] = useState("");
  const [aran, setAran] = useState(false);
  const [locals, setLocals] = useState(["", ""]);
  const [off, setOff] = useState<Set<string>>(new Set());
  const [vac, setVac] = useState(22);
  const [vacType, setVacType] = useState<"lab" | "nat">("lab");
  const [perm, setPerm] = useState(0);
  const [convenio, setConvenio] = useState("");

  useEffect(() => setOff(new Set()), [region, year]);

  const hols = useMemo(() => buildHolidays(year, region, island, aran, locals), [year, region, island, aran, locals]);
  const baseDates = useMemo(() => new Set(buildHolidays(year, region, island, aran, []).filter((h) => !off.has(h.date)).map((h) => h.date)), [year, region, island, aran, off]);
  const dup = locals.map((d) => !!d && baseDates.has(d));
  const active = useMemo(() => new Set(hols.filter((h) => !off.has(h.date)).map((h) => h.date)), [hols, off]);
  const wdpw = dayMinutes.filter((m) => m > 0).length;
  const vacLab = vacType === "nat" ? naturalToLab(vac, wdpw) : vac;
  const r = useMemo(() => computeYear(year, dayMinutes, active, vacLab, perm), [year, dayMinutes, active, vacLab, perm]);
  const conv = parseFloat(convenio.replace(/\./g, "").replace(",", "."));
  const hasConv = !isNaN(conv) && conv > 0;
  const diff = hasConv ? r.total / 60 - conv : 0;
  const empty = wdpw === 0;
  const over80 = hasConv && diff > 80;
  const needIsland = region === "canarias" && !island;
  const nf = (n: number) => n.toLocaleString("es-ES", { maximumFractionDigits: 2, useGrouping: "always" as any });

  const toggle = (d: string) => setOff((p) => { const n = new Set(p); n.has(d) ? n.delete(d) : n.add(d); return n; });

  const snap: YearPdf | null = empty || needIsland ? null : {
    year, regionName: HOLIDAYS[year].regions[region]?.name || region, island, aran, locals, vac, vacType, vacLab, perm,
    conv: hasConv ? conv : null, r, hols: hols.filter((h) => active.has(h.date)),
  };
  useEffect(() => { onChange(snap); }, [snap?.r, snap?.hols.length, island, aran, vac, vacType, perm, convenio, locals, empty, needIsland]); // eslint-disable-line

  const downloadYearCsv = () => {
    const names = new Map(hols.filter((h) => active.has(h.date)).map((h) => [h.date, h.name]));
    const rows: (string | number)[][] = [["Fecha (AAAA-MM-DD)", "Día de la semana", "Tipo", "Festivo", "Horas"]];
    r.rows.forEach((x) => rows.push([x.date, DAYS[x.weekday], x.type, names.get(x.date) || "", num(x.minutes)]));
    const gross = r.rows.reduce((a, x) => a + x.minutes, 0);
    rows.push([], ["Total bruto", "", "", "", num(gross)]);
    rows.push([`Vacaciones (${String(vacLab).replace(".", ",")} días)`, "", "", "", num(vacLab * r.avgDay)]);
    rows.push([`Permisos (${perm} días)`, "", "", "", num(perm * r.avgDay)]);
    rows.push(["Horas anuales previstas", "", "", "", num(r.total)]);
    rows.push(["Jornada del convenio", "", "", "", hasConv ? String(conv.toFixed(2)).replace(".", ",") : ""]);
    rows.push(["Diferencia", "", "", "", hasConv ? diff.toFixed(2).replace(".", ",") : ""]);
    downloadCsv(`horas-ano-${year}.csv`, rows);
  };

  const Calendar = ({ print }: { print?: boolean }) => (
    <div className={print ? "ya-cal ya-cal-p" : "ya-cal"}>
      {MONTHS.map((mn, mi) => {
        const first = new Date(year, mi, 1), lead = (first.getDay() + 6) % 7, n = new Date(year, mi + 1, 0).getDate();
        return (
          <div key={mn} className="ya-month">
            <strong>{mn}</strong>
            <div className="ya-grid">
              {["L", "M", "X", "J", "V", "S", "D"].map((d) => <span key={d} className="ya-hd">{d}</span>)}
              {Array.from({ length: lead }).map((_, i) => <span key={"e" + i} />)}
              {Array.from({ length: n }).map((_, i) => {
                const key = `${year}-${String(mi + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
                const row = r.rows.find((x) => x.date === key);
                const cls = row?.type === "festivo" ? (hols.find((h) => h.date === key)?.kind === "local" ? "ya-fest ya-loc" : "ya-fest") : row?.type === "laborable" ? "ya-lab" : "ya-we";
                return <span key={key} className={cls}>{i + 1}</span>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <style>{CSS}</style>
      <section className="hc-screen hc-tool-section ya-section" aria-labelledby="year-heading">
        <h2 id="year-heading" className="hc-section-title"><span>2</span> Tu año</h2>
        <div className="ya-form">
          <label className="hc-param">Año
            <select className="hc-in" value={year} onChange={(e) => setYear(Number(e.target.value))}>{YEARS.map((y) => <option key={y}>{y}</option>)}</select>
          </label>
          <label className="hc-param">Comunidad autónoma
            <select className="hc-in" value={region} onChange={(e) => { setRegion(e.target.value); setIsland(""); setAran(false); }}>
              {Object.entries(HOLIDAYS[year].regions).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
            </select>
          </label>
          {region === "canarias" && (
            <label className="hc-param">Isla
              <select className="hc-in" value={island} onChange={(e) => setIsland(e.target.value)}>
                <option value="">Elige tu isla</option>
                {ISLANDS[year]?.map((i) => <option key={i.name}>{i.name}</option>)}
              </select>
            </label>
          )}
          {region === "cataluna" && ARAN[year] && (
            <label className="ya-check"><input type="checkbox" checked={aran} onChange={(e) => setAran(e.target.checked)} /> Val d'Aran</label>
          )}
          <label className="hc-param">Festivo local 1
            <input type="date" className="hc-in" min={`${year}-01-01`} max={`${year}-12-31`} value={locals[0]} onChange={(e) => setLocals([e.target.value, locals[1]])} />
            {dup[0] && <span className="ya-dup">Este día ya es festivo en tu comunidad. Elige el otro festivo local de tu municipio.</span>}
          </label>
          <label className="hc-param">Festivo local 2
            <input type="date" className="hc-in" min={`${year}-01-01`} max={`${year}-12-31`} value={locals[1]} onChange={(e) => setLocals([locals[0], e.target.value])} />
            {dup[1] && <span className="ya-dup">Este día ya es festivo en tu comunidad. Elige el otro festivo local de tu municipio.</span>}
          </label>
          <p className="ya-help ya-full">Los fija cada ayuntamiento y se publican en el boletín oficial de tu provincia o comunidad.</p>

          <label className="hc-param">Vacaciones (días)
            <span className="ya-row">
              <input type="number" min={0} className="hc-in hc-num" value={vac} onChange={(e) => setVac(Math.max(0, Number(e.target.value) || 0))} />
              <select className="hc-in" value={vacType} onChange={(e) => setVacType(e.target.value as any)} aria-label="Tipo de días de vacaciones">
                <option value="lab">días laborables</option><option value="nat">días naturales</option>
              </select>
            </span>
          </label>
          <label className="hc-param">Permisos retribuidos previstos (días laborables)
            <input type="number" min={0} className="hc-in hc-num" value={perm || ""} placeholder="0" onChange={(e) => setPerm(Math.max(0, Number(e.target.value) || 0))} />
          </label>
          <label className="hc-param">Jornada anual del convenio (horas)
            <input type="text" inputMode="decimal" className="hc-in hc-num" value={convenio} placeholder="—" onChange={(e) => setConvenio(e.target.value)} />
          </label>
          <p className="ya-help ya-full">
            El mínimo legal son 30 días naturales al año (art. 38 ET); tu convenio puede mejorarlo.
            {vacType === "nat" && wdpw > 0 && <> <strong>{vac} días naturales ≈ {vacLab} días laborables</strong> (trabajando {wdpw} días por semana).</>}
            {" "}Permisos: matrimonio, nacimiento, fallecimiento de un familiar, mudanza… Estima los que prevés. Muchos convenios fijan un máximo anual, por ejemplo 1.780 h. Búscalo en tu convenio colectivo.
          </p>
          <p className="ya-help ya-full hc-muted">Sin convenio ni acuerdo, la empresa puede distribuir de forma irregular hasta el 10 % de la jornada anual, avisando con 5 días de antelación (art. 34.2 ET).{hasConv && <> En tu caso, {nf(Math.round(conv * 0.1))} h.</>}</p>
        </div>

        <details className="ya-hols">
          <summary>Festivos de {year} ({active.size} activos) — desmarca los que no apliquen</summary>
          <div className="ya-hlist">
            {hols.map((h) => (
              <label key={h.date} className="ya-check">
                <input type="checkbox" checked={!off.has(h.date)} onChange={() => toggle(h.date)} /> {fmtDate(h.date)} · {h.name}
              </label>
            ))}
          </div>
        </details>

        <section className="hc-result" aria-live="polite">
          {empty ? (
            <p className="ya-empty">Rellena primero tu semana.</p>
          ) : needIsland ? (
            <p className="ya-empty">Elige tu isla para añadir el festivo insular y calcular la proyección.</p>
          ) : (
            <>
              <div className="hc-stats">
                <div className="hc-stat hc-main"><span>Horas anuales previstas</span><strong>{fmtHMBig(r.total)}</strong><em>{fmtDecBig(r.total)}</em></div>
                <div className="hc-stat"><span>Promedio semanal (cómputo anual)</span><strong>{fmtHMBig(r.weeklyAvg)}</strong><em>Límite: 40 h (art. 34.1 ET) · Sin contar vacaciones, permisos ni festivos</em></div>
                <div className="hc-stat"><span>Convenio</span>
                  {hasConv ? (<><strong>{diff > 0 ? "Te sobran" : "Te faltan"} {nf(Math.abs(diff))} h</strong><em>{diff > 0 ? "sobre la jornada del convenio" : "para llegar a la jornada del convenio"}</em></>) : <em>Indica la jornada anual del convenio para comparar</em>}
                </div>
              </div>
              <p className="hc-small">
                {r.workdays} días con horario · {r.holidaysOnWork} festivos · {nf(r.vacDays)} días de vacaciones · {nf(r.permDays)} de permisos = <strong>{nf(r.workedDays)} días de trabajo</strong>
              </p>
              {(diff > 0 || r.weeklyAvg > 2400) && (
                <ul className="hc-warns">
                  {hasConv && diff > 0 && <li><AlertTriangle size={15} aria-hidden /> La previsión supera en {nf(diff)} h la jornada anual del convenio ({nf(conv)} h).</li>}
                  {over80 && <li><AlertTriangle size={15} aria-hidden /> Más de 80 horas extraordinarias al año (art. 35.2 ET). No cuentan las compensadas con descanso en los 4 meses siguientes.</li>}
                  {r.weeklyAvg > 2400 && <li><AlertTriangle size={15} aria-hidden /> El promedio semanal supera las 40 horas de trabajo efectivo en cómputo anual (art. 34.1 ET).</li>}
                </ul>
              )}
              <details className="ya-hols">
                <summary>Desglose por meses · Antes de descontar vacaciones y permisos</summary>
                <table className="ya-tbl">
                  <thead><tr><th>Mes</th><th>Horas</th><th>Festivos</th></tr></thead>
                  <tbody>{r.months.map((m, i) => <tr key={i}><td>{MONTHS[i]}</td><td>{fmtDecBig(m.minutes)}</td><td>{m.holidays}</td></tr>)}</tbody>
                </table>
              </details>
              <details className="ya-hols">
                <summary>Ver calendario</summary>
                <Calendar />
                <p className="ya-legend"><span className="ya-lab">1</span> Día con horario <span className="ya-fest">1</span> Festivo <span className="ya-fest ya-loc">1</span> Festivo local <span className="ya-we">1</span> Sin horario</p>
              </details>
            </>
          )}
          <p className="hc-small hc-muted">Orientativo. El calendario laboral de tu empresa y tu convenio pueden fijar otros festivos, vacaciones o jornada.</p>
          <p className="hc-small hc-muted">Festivos {year}: <a href={BOE} target="_top" rel="noopener">Resolución de la Dirección General de Trabajo de 17 de octubre de 2025 (BOE de 28/10/2025)</a></p>
          <div className="hc-bar hc-between">
            <div className="hc-bar">
              <button type="button" className="hc-btn" disabled={empty || needIsland} onClick={onPdf}><FileDown size={14} /> Descargar PDF</button>
              <button type="button" className="hc-btn-o" disabled={empty || needIsland} onClick={downloadYearCsv}><FileSpreadsheet size={14} /> Descargar CSV</button>
            </div>
            <span className="hc-small hc-muted">Los datos no salen de tu navegador.</span>
          </div>
        </section>

        <aside className="hc-cta">
          <p><strong>Esto, pero con el calendario real de tu equipo:</strong> INWOUT gestiona festivos por centro de trabajo, vacaciones y permisos, y calcula las horas cada día. Gratis hasta 5 empleados.</p>
          <a className="hc-btn" href={CTA} target="_top" rel="noopener">Empezar gratis</a>
        </aside>
      </section>
    </>
  );
}

const CSS = `
.ya-section{border-top:1px solid var(--b);margin-top:24px;padding-top:20px}
.ya-form{display:grid;grid-template-columns:repeat(4,1fr);gap:8px 12px;align-items:end;margin-top:10px}
.ya-form select.hc-in,.ya-form input[type=date]{width:100%}
.ya-full{grid-column:1/-1}
.ya-help{font-size:12px;color:#475569;margin:0}
.ya-row{display:flex;gap:4px}
.ya-check{display:flex;gap:6px;align-items:center;font-size:13px}
.ya-hols{border:1px solid var(--b);border-radius:12px;padding:8px 12px;margin:10px 0}
.ya-hols summary{cursor:pointer;font-weight:600;font-size:13px}
.ya-hlist{display:grid;grid-template-columns:repeat(2,1fr);gap:4px 12px;margin-top:8px}
.ya-empty{font-weight:600;color:var(--gd);margin:6px 0}
.ya-tbl{width:100%;border-collapse:collapse;font-size:12px;margin-top:8px}
.ya-tbl th,.ya-tbl td{border-bottom:1px solid var(--b);padding:3px 6px;text-align:left}
.ya-cal{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:8px}
.ya-month strong{font-size:12px}
.ya-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:1px;font-size:10px;text-align:center}
.ya-grid span{padding:1px 0;border-radius:3px}
.ya-hd{color:#64748b;font-weight:600}
.ya-lab{background:#f0fdfa}
.ya-we{color:#94a3b8}
.ya-fest{background:#fcd34d;color:#78350f;font-weight:700}
.ya-loc{box-shadow:inset 0 0 0 1.5px #b45309}
.ya-dup{font-size:11px;color:var(--a);margin-top:2px}
.ya-legend{display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:11px;margin:8px 0 0}.ya-legend span{display:inline-block;width:16px;text-align:center;border-radius:3px;font-size:10px}
.hc-btn:disabled,.hc-btn-o:disabled{opacity:.5;cursor:not-allowed}
@media (max-width:640px){.ya-form{grid-template-columns:1fr 1fr}.ya-hlist{grid-template-columns:1fr}.ya-cal{grid-template-columns:repeat(2,1fr)}}
`;
