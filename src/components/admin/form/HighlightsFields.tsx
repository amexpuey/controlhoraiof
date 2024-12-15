import React from 'react';
import type { Database } from '@/integrations/supabase/types';

type Company = Database['public']['Tables']['companies']['Row'];

interface HighlightsFieldsProps {
  formData: Omit<Company, 'id' | 'created_at' | 'updated_at'>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Company, 'id' | 'created_at' | 'updated_at'>>>;
  newHighlight: string;
  setNewHighlight: (value: string) => void;
}

export default function HighlightsFields({ 
  formData, 
  setFormData, 
  newHighlight, 
  setNewHighlight 
}: HighlightsFieldsProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="new-highlight" className="block text-sm font-medium text-gray-700">
        Destacados
      </label>
      <div className="flex gap-2">
        <input
          id="new-highlight"
          name="new-highlight"
          type="text"
          value={newHighlight}
          onChange={(e) => setNewHighlight(e.target.value)}
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Nuevo destacado"
        />
        <button
          type="button"
          onClick={() => {
            if (newHighlight.trim()) {
              setFormData({
                ...formData,
                highlights: [...formData.highlights, newHighlight.trim()]
              });
              setNewHighlight('');
            }
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Añadir
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {formData.highlights.map((highlight, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-100"
          >
            {highlight}
            <button
              type="button"
              onClick={() => setFormData({
                ...formData,
                highlights: formData.highlights.filter((_, i) => i !== index)
              })}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}