import React from 'react';
import ImageUpload from '../ImageUpload';
import type { Database } from '@/integrations/supabase/types';

type Company = Database['public']['Tables']['companies']['Row'];

interface AppFormFieldsProps {
  formData: Omit<Company, 'id' | 'created_at' | 'updated_at'>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Company, 'id' | 'created_at' | 'updated_at'>>>;
  setLogoFile: (file: File | null) => void;
  setBackgroundFile: (file: File | null) => void;
  newFeature: string;
  setNewFeature: (value: string) => void;
  newHighlight: string;
  setNewHighlight: (value: string) => void;
}

export default function AppFormFields({
  formData,
  setFormData,
  setLogoFile,
  setBackgroundFile,
  newFeature,
  setNewFeature,
  newHighlight,
  setNewHighlight,
}: AppFormFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="app-title" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            id="app-title"
            name="app-title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="app-url" className="block text-sm font-medium text-gray-700">
            URL
          </label>
          <input
            id="app-url"
            name="app-url"
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="app-description" className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          id="app-description"
          name="app-description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImageUpload
          currentImage={formData.logo_url}
          onImageSelect={setLogoFile}
          label="Logo"
          inputId="logo-upload"
        />

        <ImageUpload
          currentImage={formData.img_url}
          onImageSelect={setBackgroundFile}
          label="Imagen de fondo"
          inputId="background-upload"
        />
      </div>

            <div>
              <label htmlFor="app-type" className="block text-sm font-medium text-gray-700">
                Tipo
              </label>
              <select
                id="app-type"
                name="app-type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Company['type'] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="premium">Premium</option>
                <option value="freemium">Freemium</option>
                <option value="gratis">Gratis</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="app-price" className="block text-sm font-medium text-gray-700">
                  Precio inicial
                </label>
                <input
                  id="app-price"
                  name="app-price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.pricing_starting_price}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    pricing_starting_price: parseFloat(e.target.value) || 0 
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="app-billing-period" className="block text-sm font-medium text-gray-700">
                  Periodo de facturación
                </label>
                <select
                  id="app-billing-period"
                  name="app-billing-period"
                  value={formData.pricing_billing_period}
                  onChange={(e) => setFormData({
                    ...formData,
                    pricing_billing_period: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="mensual">Mensual</option>
                  <option value="anual">Anual</option>
                </select>
              </div>

              <div>
                <label htmlFor="app-currency" className="block text-sm font-medium text-gray-700">
                  Moneda
                </label>
                <select
                  id="app-currency"
                  name="app-currency"
                  value={formData.pricing_currency}
                  onChange={(e) => setFormData({
                    ...formData,
                    pricing_currency: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>

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
    </div>
  );
}
