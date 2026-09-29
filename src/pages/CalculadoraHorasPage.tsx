import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Copy, FileDown, FileSpreadsheet, AlertTriangle, X } from "lucide-react";
import { useIframeHeight } from "@/hooks/useIframeHeight";
import { DAYS, DayInput, computeWeek, fmtDec, fmtEur, fmtHM, segRange } from "@/components/tools/hours-calculator/hoursLogic";
import { AnnualTab } from "@/components/tools/hours-calculator/AnnualTab";

const empty = (): DayInput[] => DAYS.map(() => ({ segments: [{ start: "", end: "" }], pause: 0 }));

const TEMPLATES: { label: string; segs: { start: string; end: string }[] }[] = [
  { label: "Jornada continua 9:00–17:00", segs: [{ start: "09:00", end: "17:00" }] },
  { label: "Jornada partida 9:00–14:00 y 15:00–18:00", segs: [{ start: "09:00", end: "14:00" }, { start: "15:00", end: "18:00" }] },
  { label: "Turno de noche 22:00–06:00", segs: [{ start: "22:00", end: "06:00" }] },
];

export default function CalculadoraHorasPage() {
  useIframeHeight();
  const [days, setDays] = useState<DayInput[]>(empty);
  const [agreed, setAgreed] = useState(40);
  const [price, setPrice] = useState("");

  useEffect(() => {
    const els = ["footer", "header", "nav"].map((s) => document.querySelector(s) as HTMLElement | null);
    els.forEach((e) => e && (e.style.display = "none"));
    document.title = "Calculadora de horas trabajadas | Límites del Estatuto de los Trabajadores";
    return () => els.forEach((e) => e && (e.style.display = ""));
  }, []);

  const r = useMemo(() => computeWeek(days, agreed), [days, agreed]);
  const priceNum = parseFloat(price.replace(",", "."));

  const update = (i: number, fn: (d: DayInput) => DayInput) =>
    setDays((p) => p.map((d, j) => (j === i ? fn(structuredClone(d)) : d)));

  const applyTemplate = (segs: { start: string; end: string }[]) =>
    setDays((p) => p.map((d, i) => (i < 5 ? { segments: segs.map((s) => ({ ...s })), pause: 0 } : d)));

  const copyMonday = () => setDays((p) => p.map((d, i) => (i > 0 && i < 5 ? structuredClone(p[0]) : d)));

  const downloadCsv = () => {
    const rows = [["Día", "Entrada 1", "Salida 1", "Entrada 2", "Salida 2", "Pausa (min)", "Total (h min)", "Total (h)"]];
    days.forEach((d, i) => {
      const s = d.segments;
      rows.push([DAYS[i], s[0]?.start || "", s[0]?.end || "", s[1]?.start || "", s[1]?.end || "", String(d.pause || 0), fmtHM(r.days[i].worked), fmtDec(r.days[i].worked)]);
    });
    rows.push(["Total semana", "", "", "", "", "", fmtHM(r.total), fmtDec(r.total)]);
    const csv = "\uFEFF" + rows.map((row) => row.map((c) => `"${c}"`).join(";")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    a.download = "horas-trabajadas.csv";
    a.click();
  };

  const printSection = (section: "week" | "year") => {
    document.body.dataset.hcPrint = section;
    const clearPrintTarget = () => {
      delete document.body.dataset.hcPrint;
      window.removeEventListener("afterprint", clearPrintTarget);
    };
    window.addEventListener("afterprint", clearPrintTarget);
    window.print();
    window.setTimeout(clearPrintTarget, 1000);
  };

  return (
    <div className="hc-root">
      <style>{CSS}</style>
      <section className="hc-screen hc-tool-section" aria-labelledby="week-heading">
        <h2 id="week-heading" className="hc-section-title"><span>1</span> Tu semana</h2>
        <div className="hc-bar">
          {TEMPLATES.map((t) => (
            <button key={t.label} type="button" className="hc-chip" onClick={() => applyTemplate(t.segs)}>{t.label}</button>
          ))}
        </div>

        <div className="hc-days" role="table" aria-label="Horario semanal">
          {days.map((d, i) => (
            <div className="hc-day" role="row" key={DAYS[i]}>
              <div className="hc-dname">{DAYS[i]}</div>
              <div className="hc-segs">
                {d.segments.map((s, k) => (
                  <div className="hc-seg" key={k}>
                    <label className="sr-only" htmlFor={`in-${i}-${k}`}>{DAYS[i]} tramo {k + 1} entrada</label>
                    <input id={`in-${i}-${k}`} type="time" className="hc-in" value={s.start}
                      onChange={(e) => update(i, (x) => { x.segments[k].start = e.target.value; return x; })} />
                    <span aria-hidden>–</span>
                    <label className="sr-only" htmlFor={`out-${i}-${k}`}>{DAYS[i]} tramo {k + 1} salida</label>
                    <input id={`out-${i}-${k}`} type="time" className="hc-in" value={s.end}
                      onChange={(e) => update(i, (x) => { x.segments[k].end = e.target.value; return x; })} />
                    {k === 1 && (
                      <button type="button" className="hc-icon" aria-label={`Quitar segundo tramo del ${DAYS[i]}`}
                        onClick={() => update(i, (x) => { x.segments.pop(); return x; })}><X size={14} /></button>
                    )}
                  </div>
                ))}
                {d.segments.length < 2 && (
                  <button type="button" className="hc-link" onClick={() => update(i, (x) => { x.segments.push({ start: "", end: "" }); return x; })}>
                    <Plus size={12} /> Añadir tramo
                  </button>
                )}
              </div>
              <div className="hc-pause">
                <label htmlFor={`p-${i}`}>Pausa (min)</label>
                <input id={`p-${i}`} type="number" min={0} className="hc-in hc-num" value={d.pause || ""} placeholder="0"
                  onChange={(e) => update(i, (x) => { x.pause = Math.max(0, Number(e.target.value) || 0); return x; })} />
              </div>
              <div className="hc-dtotal" aria-label={`Total ${DAYS[i]}`}>
                {r.days[i].worked > 0 ? (<><strong>{fmtHM(r.days[i].worked)}</strong><span>{fmtDec(r.days[i].worked)}</span></>) : <span className="hc-muted">—</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="hc-bar hc-between">
          <div className="hc-bar">
            <button type="button" className="hc-btn-o" onClick={copyMonday}><Copy size={14} /> Copiar lunes a todos los días laborables</button>
            <button type="button" className="hc-btn-o" onClick={() => setDays(empty())}><Trash2 size={14} /> Borrar</button>
          </div>
          <div className="hc-bar">
            <label className="hc-param">Jornada semanal pactada (horas)
              <input type="number" min={0} step={0.5} className="hc-in hc-num" value={agreed} onChange={(e) => setAgreed(Number(e.target.value) || 0)} />
            </label>
            <label className="hc-param">Precio de la hora extra (€)
              <input type="text" inputMode="decimal" className="hc-in hc-num" value={price} placeholder="—" onChange={(e) => setPrice(e.target.value)} />
            </label>
          </div>
        </div>

        <section className="hc-result" aria-live="polite">
          <div className="hc-stats">
            <div className="hc-stat hc-main"><span>Total semana</span><strong>{fmtHM(r.total)}</strong><em>{fmtDec(r.total)}</em></div>
            <div className="hc-stat"><span>Horas extra</span><strong>{fmtHM(r.extra)}</strong><em>{fmtDec(r.extra)}{!isNaN(priceNum) && priceNum > 0 ? ` · ${fmtEur((r.extra / 60) * priceNum)}` : ""}</em></div>
            <div className="hc-stat"><span>Horas nocturnas (22–06)</span><strong>{fmtHM(r.night)}</strong><em>El plus de nocturnidad lo fija el convenio</em></div>
          </div>
          <p className="hc-note">Ojo: 7,30 h no son 7 h 30 min.</p>
          <p className="hc-small">Si todas las semanas fueran como esta, harías <strong>{fmtDec(r.annualExtra).replace(" h", "")} horas extra</strong> al año. El límite legal es de 80 horas extra al año (art. 35.2 ET); no cuentan las compensadas con descanso en los 4 meses siguientes.</p>

          {r.warnings.length > 0 && (
            <ul className="hc-warns">
              {r.warnings.map((w) => <li key={w}><AlertTriangle size={15} aria-hidden /> {w}</li>)}
            </ul>
          )}
          <p className="hc-small hc-muted">Orientativo. Tu convenio colectivo puede fijar otros límites.</p>

          <div className="hc-bar hc-between">
            <div className="hc-bar">
              <button type="button" className="hc-btn" onClick={() => printSection("week")}><FileDown size={14} /> Descargar PDF</button>
              <button type="button" className="hc-btn-o" onClick={downloadCsv}><FileSpreadsheet size={14} /> Descargar CSV</button>
            </div>
            <span className="hc-small hc-muted">Los datos no salen de tu navegador.</span>
          </div>
        </section>

      </section>

      <div className="hc-print hc-print-week">
        <h1>Resumen de horas trabajadas</h1>
        <table>
          <thead><tr><th>Día</th><th>Entrada</th><th>Salida</th><th>Pausa</th><th>Total</th></tr></thead>
          <tbody>
            {days.map((d, i) => (
              <tr key={i}>
                <td>{DAYS[i]}</td>
                <td>{d.segments.filter((s) => segRange(s)).map((s) => s.start).join(" / ") || "—"}</td>
                <td>{d.segments.filter((s) => segRange(s)).map((s) => s.end).join(" / ") || "—"}</td>
                <td>{d.pause ? `${d.pause} min` : "—"}</td>
                <td>{fmtHM(r.days[i].worked)} ({fmtDec(r.days[i].worked)})</td>
              </tr>
            ))}
          </tbody>
          <tfoot><tr><td colSpan={4}>Total semanal</td><td>{fmtHM(r.total)} ({fmtDec(r.total)})</td></tr></tfoot>
        </table>
        <p>Este cálculo no sustituye el registro de jornada: la ley exige un registro diario, fiable y conservado durante 4 años (art. 34.9 ET).</p>
      </div>
      <AnnualTab dayMinutes={r.days.map((d) => d.worked)} onPrint={() => printSection("year")} />
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&display=swap');
.hc-root{--g:#0fb89f;--gd:#0b8f7c;--t:#0a1628;--b:#e2e8f0;--a:#92400e;--ab:#fffbeb;--abd:#fcd34d;background:#fff;color:var(--t);font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;max-width:900px;margin:0 auto;padding:16px;font-size:14px}
.hc-tool-section{display:block}
.hc-section-title{display:flex;align-items:center;gap:9px;font-family:Montserrat,sans-serif;font-size:20px;margin:0 0 12px}
.hc-section-title span{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--gd);color:#fff;font-size:14px}
.hc-h1{font-family:Montserrat,sans-serif;font-weight:700;font-size:22px;margin:0}
.hc-sub{color:#475569;margin:2px 0 12px}
.hc-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.hc-between{justify-content:space-between;margin:10px 0}
.hc-chip{border:1px solid var(--b);border-radius:999px;padding:5px 12px;background:#fff;font-size:13px;cursor:pointer}
.hc-chip:hover,.hc-chip:focus-visible{border-color:var(--g);color:var(--gd)}
.hc-days{border:1px solid var(--b);border-radius:12px;margin-top:10px;overflow:hidden}
.hc-day{display:grid;grid-template-columns:90px 1fr 110px 110px;gap:10px;align-items:center;padding:6px 12px;border-top:1px solid var(--b)}
.hc-day:first-child{border-top:0}
.hc-dname{font-weight:600}
.hc-segs{display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center}
.hc-seg{display:flex;gap:4px;align-items:center}
.hc-in{border:1px solid var(--b);border-radius:8px;padding:4px 6px;font:inherit;color:var(--t);background:#fff}
.hc-in:focus{outline:2px solid var(--g);outline-offset:1px}
.hc-num{width:70px}
.hc-pause{display:flex;flex-direction:column;font-size:11px;color:#475569}
.hc-dtotal{display:flex;flex-direction:column;text-align:right;line-height:1.2}
.hc-dtotal span{font-size:12px;color:#475569}
.hc-link{display:inline-flex;gap:3px;align-items:center;color:var(--gd);background:none;border:0;font-size:12px;cursor:pointer;padding:2px}
.hc-icon{background:none;border:0;cursor:pointer;color:#64748b;padding:2px}
.hc-btn,.hc-btn-o{display:inline-flex;gap:6px;align-items:center;border-radius:12px;padding:7px 14px;font:inherit;font-weight:600;cursor:pointer;text-decoration:none}
.hc-btn{background:var(--gd);color:#fff;border:1px solid var(--gd)}
.hc-btn:hover{background:#097565}
.hc-btn-o{background:#fff;color:var(--t);border:1px solid var(--b)}
.hc-btn-o:hover{border-color:var(--g)}
.hc-param{display:flex;flex-direction:column;font-size:12px;color:#475569;gap:2px}
.hc-result{border:1px solid var(--b);border-radius:12px;padding:14px}
.hc-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.hc-stat{border:1px solid var(--b);border-radius:12px;padding:10px;display:flex;flex-direction:column}
.hc-stat span{font-size:12px;color:#475569}
.hc-stat strong{font-family:Montserrat,sans-serif;font-size:20px}
.hc-stat em{font-style:normal;font-size:12px;color:#475569}
.hc-main{border-color:var(--g);background:#f0fdfa}
.hc-main strong{color:var(--gd)}
.hc-note{font-size:12px;color:#64748b;margin:6px 0 0}
.hc-small{font-size:12px;margin:6px 0}
.hc-muted{color:#64748b}
.hc-warns{list-style:none;padding:0;margin:10px 0 0;display:flex;flex-direction:column;gap:6px}
.hc-warns li{display:flex;gap:8px;align-items:flex-start;background:var(--ab);border:1px solid var(--abd);color:var(--a);border-radius:12px;padding:8px 10px;font-size:13px}
.hc-warns svg{flex-shrink:0;margin-top:1px}
.hc-cta{margin-top:12px;border:1px solid var(--b);border-radius:12px;padding:12px 14px;display:flex;gap:12px;align-items:center;justify-content:space-between;background:#f8fafc}
.hc-cta p{margin:0;font-size:13px}
.hc-print{display:none}
@media (max-width:640px){
 .hc-days{border:0;display:flex;flex-direction:column;gap:8px}
 .hc-day{grid-template-columns:1fr 1fr;border:1px solid var(--b)!important;border-radius:12px}
 .hc-segs{grid-column:1/-1;order:3}
 .hc-dtotal{grid-row:1;grid-column:2}
 .hc-pause{order:4}
 .hc-stats{grid-template-columns:1fr}
 .hc-cta{flex-direction:column;align-items:flex-start}
}
@media print{
 body *{visibility:hidden}
 .hc-print,.hc-print *{visibility:visible}
 .hc-print{display:block;position:absolute;inset:0 auto auto 0;width:100%;color:#000;font-family:system-ui,sans-serif}
 .hc-screen{display:none}
 .hc-print h1{font-family:Montserrat,sans-serif;font-size:20px}
 .hc-print table{width:100%;border-collapse:collapse;font-size:12px}
 .hc-print th,.hc-print td{border:1px solid #ccc;padding:6px;text-align:left}
 .hc-print tfoot td{font-weight:700}
 .hc-print p{font-size:11px;margin-top:16px}
  body[data-hc-print="week"] .hc-print-year{display:none!important}
  body[data-hc-print="year"] .hc-print-week{display:none!important}
}
`;
