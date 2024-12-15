import React from 'react';
import type { Database } from '@/integrations/supabase/types';

type Company = Database['public']['Tables']['companies']['Row'];

interface StatusFieldsProps {
  formData: Omit<Company, 'id' | 'created_at' | 'updated_at'>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Company, 'id' | 'created_at' | 'updated_at'>>>;
}

export default function StatusFields({ formData, setFormData }: StatusFieldsProps) {
  return (
    <div className="flex items-center gap-4">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          id="app-verified"
          name="app-verified"
          checked={formData.verified}
          onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">Verificado</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          id="app-top-rated"
          name="app-top-rated"
          checked={formData.is_top_rated}
          onChange={(e) => setFormData({ ...formData, is_top_rated: e.target.checked })}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">Top Rated</span>
      </label>
    </div>
  );
}