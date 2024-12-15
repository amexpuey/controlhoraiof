import React from 'react';
import type { Database } from '@/integrations/supabase/types';

type Company = Database['public']['Tables']['companies']['Row'];

interface FeaturesFieldsProps {
  formData: Omit<Company, 'id' | 'created_at' | 'updated_at'>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Company, 'id' | 'created_at' | 'updated_at'>>>;
  newFeature: string;
  setNewFeature: (value: string) => void;
}

export default function FeaturesFields({ 
  formData, 
  setFormData, 
  newFeature, 
  setNewFeature 
}: FeaturesFieldsProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="new-feature" className="block text-sm font-medium text-gray-700">
        Características
      </label>
      <div className="flex gap-2">
        <input
          id="new-feature"
          name="new-feature"
          type="text"
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Nueva característica"
        />
        <button
          type="button"
          onClick={() => {
            if (newFeature.trim()) {
              setFormData({
                ...formData,
                features: [...formData.features, newFeature.trim()]
              });
              setNewFeature('');
            }
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Añadir
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {formData.features.map((feature, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-100"
          >
            {feature}
            <button
              type="button"
              onClick={() => setFormData({
                ...formData,
                features: formData.features.filter((_, i) => i !== index)
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