import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Download, Upload, Plus, Trash2, ShieldCheck, AlertTriangle, FileSpreadsheet, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIframeHeight } from "@/hooks/useIframeHeight";
import { HOLIDAYS, YEARS, CURRENT_YEAR, ISLANDS, buildHolidays } from "@/components/tools/hours-calculator/yearLogic";
import { initialSchedule, MONTHS, Person, Schedule, peopleError, scheduleError, validateRecords } from "@/components/tools/excel-control/recordLogic";
import { createRegister, readRegister, createImport, downloadWorkbook, CONSERVATION } from "@/components/tools/excel-control/workbooks";
import { ScheduleEditor } from "@/components/tools/excel-control/ScheduleEditor";
import "@/components/tools/excel-control/excel-control.css";

const STEPS = ["Mes", "Personas", "Referencia", "Hoja de registro", "Convertir"];
const newPerson = (): Person => ({ id: crypto.randomUUID(), name: "", email: "" });
type Result = ReturnType<typeof validateRecords>;
export default function ExcelControlHorarioPage() {
  useIframeHeight();
  const [step, setStep] = useState(0), [year, setYear] = useState(CURRENT_YEAR), [month, setMonth] = useState(new Date().getMonth());
  const [region, setRegion] = useState(""), [island, setIsland] = useState(""), [aran, setAran] = useState(false), [company, setCompany] = useState("");
  const [people, setPeople] = useState<Person[]>([newPerson()]), [schedule, setSchedule] = useState<Schedule>(initialSchedule());
  const [result, setResult] = useState<Result | null>(null), [error, setError] = useState(""), [busy, setBusy] = useState(false), [filename, setFilename] = useState("");
  const [downloaded, setDownloaded] = useState(false), [sheetDownloaded, setSheetDownloaded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null), headingRef = useRef<HTMLHeadingElement>(null);
  useLayoutEffect(() => {
    const elements = ["footer", "header", "nav"].map((s) => document.querySelector(s) as HTMLElement | null);
    const displays = elements.map((e) => e?.style.display || "");
    const title = document.title; document.title = "Excel de control horario | INWOUT";
    elements.forEach((e) => { if (e) e.style.display = "none"; });
    return () => { elements.forEach((e, i) => { if (e) e.style.display = displays[i]; }); document.title = title; };
  }, []);
  const holidays = useMemo(() => new Set(buildHolidays(year, region, island, aran, []).map((h) => h.date)), [year, region, island, aran]);
  const changeStep = (next: number) => { setError(""); setStep(next); requestAnimationFrame(() => { headingRef.current?.focus(); headingRef.current?.scrollIntoView({ block: "start" }); }); };
  const next = () => {
    const issue = step === 0 ? (region === "canarias" && !island ? "Selecciona la isla para marcar sus festivos." : "") : step === 1 ? peopleError(people) : step === 2 ? scheduleError(schedule) || people.map((p) => p.schedule ? `${p.name}: ${scheduleError(p.schedule)}` : "").find((v) => v && !v.endsWith(": ")) || "" : "";
    if (issue) { setError(issue); return; } changeStep(Math.min(4, step + 1));
  };
  const updatePerson = (id: string, value: Partial<Person>) => setPeople((prev) => prev.map((p) => p.id === id ? { ...p, ...value } : p));
  const downloadSheet = async () => {
    setBusy(true); setError("");
    try { await downloadWorkbook(createRegister({ people, schedule, year, month, company, holidays }), `registro-horario-${year}-${String(month + 1).padStart(2, "0")}.xlsx`); setSheetDownloaded(true); }
    catch { setError("No se ha podido crear la hoja. Vuelve a intentarlo."); } finally { setBusy(false); }
  };
  const upload = async (file?: File) => {
    if (!file) return;
    setResult(null); setDownloaded(false); setError(""); setFilename(file.name);
    if (!file.name.toLowerCase().endsWith(".xlsx")) { setError("Selecciona un archivo .xlsx."); return; }
    if (file.size > 10 * 1024 * 1024) { setError("El archivo es demasiado grande. Usa una hoja de hasta 10 MB."); return; }
    setBusy(true);
    try { setResult(await readRegister(await file.arrayBuffer())); }
    catch (e) { setError(e instanceof Error ? e.message : "No se puede leer el archivo."); } finally { setBusy(false); }
  };
  const downloadImport = async () => {
    if (!result || result.errors.length || !result.rows.length) return;
    setBusy(true); setError("");
    try { await downloadWorkbook(createImport(result), `fichajes-inwout-${year}-${String(month + 1).padStart(2, "0")}.xlsx`); setDownloaded(true); }
    catch { setError("No se ha podido descargar el Excel. Vuelve a intentarlo."); } finally { setBusy(false); }
  };
  const registered = result?.summaries.reduce((sum, p) => sum + p.registered, 0) || 0, missing = result?.summaries.reduce((sum, p) => sum + p.missing.length, 0) || 0;
  const preview = people[0]?.schedule || schedule;
  return <main className="ec-root">
    <h1>Excel de control horario</h1>
    <div className="ec-private"><ShieldCheck size={16} /><span>Todo se procesa en tu navegador. No se envía ni se guarda ningún dato, ni se usa analítica sobre los datos introducidos.</span></div>
    <div className="ec-progress" role="progressbar" aria-label="Progreso del asistente" aria-valuemin={1} aria-valuemax={5} aria-valuenow={step + 1}>
      <div className="ec-track">{STEPS.map((s, i) => <span key={s} className={i <= step ? "ec-filled" : ""} />)}</div>
      <div className="ec-steps">{STEPS.map((s, i) => <span key={s} className={i === step ? "ec-current" : ""}>{i + 1} · {s}</span>)}</div>
    </div>
    <section aria-labelledby="ec-heading">
      <h2 id="ec-heading" ref={headingRef} tabIndex={-1}><span>{step + 1}</span>{["Mes del registro", "Personas", "Horario previsto (referencia)", "Descargar la hoja de registro", "Convertir al formato de INWOUT"][step]}</h2>
      {step === 0 && <>
        <div className="ec-grid"><label className="ec-field">Mes<select value={month} onChange={(e) => setMonth(Number(e.target.value))}>{MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}</select></label><label className="ec-field">Año<select value={year} onChange={(e) => { setYear(Number(e.target.value)); setIsland(""); }}>{YEARS.map((y) => <option key={y}>{y}</option>)}</select></label></div>
        <div className="ec-grid"><label className="ec-field">Comunidad autónoma (opcional)<select value={region} onChange={(e) => { setRegion(e.target.value); setIsland(""); setAran(false); }}><option value="">Sin marcar festivos</option>{Object.entries(HOLIDAYS[year]?.regions || {}).map(([key, r]) => <option key={key} value={key}>{r.name}</option>)}</select></label><label className="ec-field">Empresa (opcional)<input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Nombre de la empresa" /></label></div>
        {region === "canarias" && <label className="ec-field">Isla<select value={island} onChange={(e) => setIsland(e.target.value)}><option value="">Selecciona la isla</option>{ISLANDS[year]?.map((i) => <option key={i.name}>{i.name}</option>)}</select></label>}
        {region === "cataluna" && <label className="ec-check"><input type="checkbox" checked={aran} onChange={(e) => setAran(e.target.checked)} /> Centro de trabajo en la Val d'Aran</label>}
        <p className="ec-muted">Los festivos autonómicos y nacionales se marcan como referencia. Revisa también los dos festivos locales de tu municipio.</p>
      </>}
      {step === 1 && <>
        <div className="ec-notice ec-neutral"><ShieldCheck size={17} /><span>Usa el mismo email con el que la persona estará dada de alta en INWOUT: es como se identifica al importar.</span></div>
        {people.map((p, i) => <div key={p.id}><p className="ec-person-number">Persona {i + 1}</p><div className="ec-person"><label className="ec-field">Nombre<input value={p.name} onChange={(e) => updatePerson(p.id, { name: e.target.value })} autoComplete="off" /></label><label className="ec-field">Email<input type="email" value={p.email} onChange={(e) => updatePerson(p.id, { email: e.target.value })} autoComplete="off" /></label><Button variant="outline" size="icon" disabled={people.length === 1} aria-label={`Eliminar persona ${i + 1}`} title="Eliminar persona" onClick={() => setPeople((prev) => prev.filter((x) => x.id !== p.id))}><Trash2 size={16} /></Button></div></div>)}
        <div className="flex flex-wrap items-center gap-3 mt-4"><Button variant="outline" disabled={people.length >= 50} onClick={() => setPeople((p) => [...p, newPerson()])}><Plus size={16} />Añadir persona</Button><span className="ec-muted">{people.length} / 50 personas</span></div>
      </>}
      {step === 2 && <>
        <div className="ec-notice"><AlertTriangle size={17} /><span>El horario previsto no es un registro de jornada. Las entradas y salidas reales quedarán vacías: debes anotarlas cada día (Criterio Técnico 101/2019).</span></div>
        <h3>Referencia común para todas las personas</h3><ScheduleEditor value={schedule} onChange={setSchedule} />
        <Button variant="outline" onClick={() => setPeople((p) => p.map((x) => ({ ...x, schedule: undefined })))}><Check size={16} />Aplicar a todas las personas</Button>
        {people.map((p) => <details key={p.id} className="ec-person-schedule"><summary>{p.name} · {p.schedule ? "Horario propio" : "Horario común"}</summary><label className="ec-check"><input type="checkbox" checked={Boolean(p.schedule)} onChange={(e) => updatePerson(p.id, { schedule: e.target.checked ? structuredClone(schedule) : undefined })} /> Ajustar el horario de esta persona</label>{p.schedule && <ScheduleEditor value={p.schedule} onChange={(s) => updatePerson(p.id, { schedule: s })} />}</details>)}
      </>}
      {step === 3 && <>
        <p><strong>{MONTHS[month]} {year}</strong> · {people.length} {people.length === 1 ? "persona" : "personas"}{company && ` · ${company}`}</p>
        <div className="ec-scroll"><table className="ec-table"><caption className="sr-only">Vista previa de la hoja de registro</caption><thead><tr><th>Fecha</th><th>Previsto (referencia)</th><th>Entrada real</th><th>Salida real</th><th>Observaciones</th></tr></thead><tbody>{Array.from({ length: 5 }, (_, i) => { const d = i + 1, date = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`, wd = (new Date(`${date}T12:00:00`).getDay() + 6) % 7, working = preview.days[wd] && !holidays.has(date); return <tr key={d}><td>{String(d).padStart(2, "0")}/{String(month + 1).padStart(2, "0")}/{year}</td><td>{working ? `${preview.start}–${preview.end}${preview.split ? ` / ${preview.start2}–${preview.end2}` : ""}` : "—"}</td><td className="ec-real">Vacía</td><td className="ec-real">Vacía</td><td>{holidays.has(date) ? "Festivo" : !working ? "No laborable" : ""}</td></tr>; })}</tbody></table></div>
        <Button className="ec-primary" disabled={busy} onClick={downloadSheet}><Download size={16} />{busy ? "Preparando…" : "Descargar hoja de registro (.xlsx)"}</Button>{sheetDownloaded && <p className="ec-muted">Hoja descargada. Cuando esté rellenada, continúa al paso 5.</p>}
        <ul className="ec-list">{CONSERVATION.map((text) => <li key={text}>{text}</li>)}</ul>
      </>}
      {step === 4 && <>
        <div className="ec-upload"><FileSpreadsheet size={28} className="text-primary" /><strong>Hoja de registro rellenada (.xlsx)</strong><input ref={fileRef} type="file" accept=".xlsx" className="sr-only" aria-label="Subir hoja de registro" onChange={(e) => { void upload(e.target.files?.[0]); e.target.value = ""; }} /><Button variant="outline" disabled={busy} onClick={() => fileRef.current?.click()}><Upload size={16} />{busy ? "Leyendo…" : "Seleccionar archivo"}</Button>{filename && <span className="ec-muted break-all">{filename}</span>}</div>
        {result && <>
          {result.errors.length > 0 ? <><p className="ec-error" role="alert">Corrige los errores en tu hoja y vuelve a subirla. No se puede descargar mientras haya errores bloqueantes.</p><div className="ec-scroll"><table className="ec-table"><thead><tr><th>Persona</th><th>Día</th><th>Error</th></tr></thead><tbody>{result.errors.map((e, i) => <tr key={i}><td>{e.person}</td><td>{e.date}</td><td>{e.message}</td></tr>)}</tbody></table></div></> : <>
            <div className="ec-stats"><div className="ec-stat"><strong>{result.summaries.length}</strong><span>Personas</span></div><div className="ec-stat"><strong>{registered}</strong><span>Días con registro</span></div><div className="ec-stat"><strong>{missing}</strong><span>Días sin registrar</span></div></div>
            <div className="ec-scroll"><table className="ec-table"><thead><tr><th>Persona</th><th>Email</th><th>Días con registro</th><th>Sin registrar</th><th>Horas</th></tr></thead><tbody>{result.summaries.map((s) => <tr key={s.email}><td>{s.name}</td><td>{s.email}</td><td>{s.registered}</td><td>{s.missing.length}</td><td>{(s.minutes / 60).toLocaleString("es-ES", { maximumFractionDigits: 2 })}</td></tr>)}</tbody></table></div>
            {missing > 0 && <div className="ec-notice"><AlertTriangle size={17} /><span>Hay {missing} días laborables sin registrar. No se generarán fichajes para esos días.</span></div>}
            {missing > 0 && <details><summary>Días laborables sin registrar</summary><div className="ec-scroll"><table className="ec-table"><thead><tr><th>Persona</th><th>Día</th><th>Estado</th></tr></thead><tbody>{result.summaries.flatMap((s) => s.missing.map((date) => <tr key={`${s.email}-${date}`}><td>{s.name}</td><td>{date}</td><td>Sin registrar</td></tr>))}</tbody></table></div></details>}
          </>}
          <ul className="ec-list"><li>La persona tiene que existir en INWOUT antes de importar.</li><li>No importes dos veces el mismo mes: el importador no detecta duplicados.</li><li>Revisa el resumen: solo se han convertido los días con horas reales.</li><li>Al importar, borra la fila de cabecera con la ×.</li></ul>
          <Button className="ec-primary" disabled={busy || Boolean(result.errors.length) || !result.rows.length} onClick={downloadImport}><Download size={16} />Descargar Excel para INWOUT</Button>
          {!result.errors.length && !result.rows.length && <p className="ec-muted">No hay horas reales para convertir.</p>}
        </>}
        {downloaded && <div className="ec-cta"><p>Este Excel ya se puede importar en INWOUT. Gratis hasta 5 personas: fichaje desde el móvil o la web, informes mensuales y la bolsa de horas, sin volver a rellenar hojas.</p><Button asChild className="ec-primary"><a href="https://www.inwout.com/empezar-gratis" target="_top">Empezar gratis<ArrowRight size={16} /></a></Button><div className="ec-cta-links"><a href="https://www.inwout.com/importacion-masiva-de-fichajes-en-inwout" target="_top">Cómo importar el Excel</a><a href="https://www.inwout.com/comunicado-legal-control-horario" target="_top">Informa a tu equipo con el comunicado legal</a></div></div>}
      </>}
      {error && <p className="ec-error" role="alert">{error}</p>}
    </section>
    <div className="ec-nav"><Button variant="outline" disabled={step === 0 || busy} onClick={() => changeStep(step - 1)}><ArrowLeft size={16} />Atrás</Button>{step < 4 && <Button className="ec-primary" disabled={busy} onClick={next}>Siguiente<ArrowRight size={16} /></Button>}</div>
  </main>;
}