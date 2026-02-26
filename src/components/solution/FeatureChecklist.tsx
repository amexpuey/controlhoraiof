import { Check, X } from 'lucide-react';

interface Feature {
  key: string;
  label: string;
  value: boolean;
}

const featureLabels: Record<string, string> = {
  has_time_tracking: 'Control Horario',
  has_mobile_app: 'App Móvil',
  has_geolocation: 'Geolocalización',
  has_biometric: 'Biometría',
  has_absence_management: 'Gestión de Ausencias',
  has_shift_management: 'Gestión de Turnos',
  has_reports: 'Reportes',
  has_api: 'Integraciones API',
  has_remote_work: 'Teletrabajo',
  has_ai: 'Inteligencia Artificial',
  has_employee_portal: 'Portal del Empleado',
  has_payroll: 'Nóminas',
  has_geofence: 'Geofence',
  has_project_management: 'Gestión de Proyectos',
  has_document_management: 'Gestión Documental',
  has_performance_eval: 'Evaluación Desempeño',
  has_recruitment: 'Selección de Personal',
  has_training: 'Formación',
  has_whistleblower: 'Canal de Denuncias',
};

export const featureKeys = Object.keys(featureLabels);

interface FeatureChecklistProps {
  company: Record<string, unknown>;
  className?: string;
}

export function FeatureChecklist({ company, className = '' }: FeatureChecklistProps) {
  const features: Feature[] = featureKeys.map(key => ({
    key,
    label: featureLabels[key],
    value: Boolean(company[key]),
  }));

  const activeFeatures = features.filter(f => f.value);
  const inactiveFeatures = features.filter(f => !f.value);

  return (
    <div className={`space-y-1 ${className}`}>
      {activeFeatures.map(f => (
        <div key={f.key} className="flex items-center gap-2 py-1.5">
          <Check className="h-4 w-4 text-green-600 shrink-0" />
          <span className="text-sm text-foreground">{f.label}</span>
        </div>
      ))}
      {inactiveFeatures.map(f => (
        <div key={f.key} className="flex items-center gap-2 py-1.5 opacity-50">
          <X className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="text-sm text-muted-foreground">{f.label}</span>
        </div>
      ))}
    </div>
  );
}

export function getFeatureLabel(key: string): string {
  return featureLabels[key] || key;
}
