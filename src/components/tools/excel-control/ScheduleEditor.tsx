import { Schedule, WEEKDAYS } from "./recordLogic";
import { Button } from "@/components/ui/button";

export function ScheduleEditor({ value, onChange }: { value: Schedule; onChange: (s: Schedule) => void }) {
  const change = (next: Partial<Schedule>) => onChange({ ...value, ...next });
  const time = (label: string, key: "start" | "end" | "start2" | "end2" | "pauseStart" | "pauseEnd") => <label className="ec-field">{label}<input type="time" value={value[key]} onChange={(e) => change({ [key]: e.target.value })} /></label>;
  return <div className="ec-schedule">
    <div className="ec-week" aria-label="Días laborables">{WEEKDAYS.map((d, i) => <Button key={d} variant="outline" className={value.days[i] ? "ec-day ec-selected" : "ec-day"} aria-pressed={value.days[i]} onClick={() => change({ days: value.days.map((v, j) => i === j ? !v : v) })}>{d.slice(0, 3)}</Button>)}</div>
    <div className="ec-grid">{time("Entrada prevista", "start")}{time("Salida prevista", "end")}</div>
    <label className="ec-check"><input type="checkbox" checked={value.split} onChange={(e) => change({ split: e.target.checked })} /> Jornada partida (segundo tramo)</label>
    {value.split && <div className="ec-grid">{time("Entrada prevista 2", "start2")}{time("Salida prevista 2", "end2")}</div>}
    <label className="ec-check"><input type="checkbox" checked={value.pause} onChange={(e) => change({ pause: e.target.checked })} /> Pausa prevista</label>
    {value.pause && <div className="ec-grid">{time("Pausa inicio", "pauseStart")}{time("Pausa fin", "pauseEnd")}</div>}
  </div>;
}