import React from 'react';
import type { Database } from '@/integrations/supabase/types';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Company = Database['public']['Tables']['companies']['Row'];

interface StatusFieldsProps {
  formData: Partial<Company>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Company>>>;
}

const booleanFlags: { key: keyof Company; label: string }[] = [
  { key: 'verified', label: 'Verificado' },
  { key: 'is_top_rated', label: 'Top Rated' },
  { key: 'is_promoted', label: 'Promoted' },
  { key: 'is_premium', label: 'Premium' },
  { key: 'is_free', label: 'Gratis' },
  { key: 'has_time_tracking', label: 'Control horario' },
  { key: 'has_geolocation', label: 'Geolocalización' },
  { key: 'has_geofence', label: 'Geovallado' },
  { key: 'has_biometric', label: 'Biométrico' },
  { key: 'has_mobile_app', label: 'App móvil' },
  { key: 'has_api', label: 'API' },
  { key: 'has_ai', label: 'IA' },
  { key: 'has_reports', label: 'Informes' },
  { key: 'has_shift_management', label: 'Gestión turnos' },
  { key: 'has_absence_management', label: 'Gestión ausencias' },
  { key: 'has_payroll', label: 'Nóminas' },
  { key: 'has_recruitment', label: 'Selección' },
  { key: 'has_training', label: 'Formación' },
  { key: 'has_performance_eval', label: 'Evaluación desempeño' },
  { key: 'has_document_management', label: 'Gestión documental' },
  { key: 'has_employee_portal', label: 'Portal empleado' },
  { key: 'has_project_management', label: 'Gestión proyectos' },
  { key: 'has_remote_work', label: 'Teletrabajo' },
  { key: 'has_whistleblower', label: 'Canal denuncias' },
  { key: 'has_free_trial_bool', label: 'Prueba gratuita (bool)' },
  { key: 'pricing_billed_annually', label: 'Facturado anualmente' },
  { key: 'pricing_per_user', label: 'Precio por usuario' },
];

export default function StatusFields({ formData, setFormData }: StatusFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2">Estado y funcionalidades</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Free trial</Label>
          <Select
            value={formData.free_trial || 'no'}
            onValueChange={(v) => setFormData(prev => ({ ...prev, free_trial: v }))}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Sí</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Free plan</Label>
          <Select
            value={formData.free_plan || 'no'}
            onValueChange={(v) => setFormData(prev => ({ ...prev, free_plan: v }))}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Sí</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
        {booleanFlags.map(({ key, label }) => (
          <div key={key} className="flex items-center space-x-2">
            <Checkbox
              id={`flag-${key}`}
              checked={Boolean(formData[key])}
              onCheckedChange={(checked) =>
                setFormData(prev => ({ ...prev, [key]: checked as boolean }))
              }
            />
            <Label htmlFor={`flag-${key}`} className="text-sm cursor-pointer">{label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}
