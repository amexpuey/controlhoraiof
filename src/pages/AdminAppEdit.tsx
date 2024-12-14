import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { useCompanies, useUpdateCompany } from '../hooks/useCompanies';
import ImageUpload from './ImageUpload';
import { toast } from 'react-hot-toast';
import { uploadImage } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Company = Database['public']['Tables']['companies']['Row'];

const initialFormData: Omit<Company, 'id' | 'created_at' | 'updated_at'> = {
  title: '',
  url: '',
  description: '',
  features: [],
  type: 'premium',
  verified: false,
  votes: 0,
  is_top_rated: false,
  img_url: '',
  logo_url: '',
  pricing_starting_price: 0,
  pricing_billing_period: 'mensual',
  pricing_currency: 'EUR',
  highlights: []
};

export default function AdminAppEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: apps, isLoading } = useCompanies();
  const updateCompany = useUpdateCompany();
  const [formData, setFormData] = useState(initialFormData);
  const [newFeature, setNewFeature] = useState('');
  const [newHighlight, setNewHighlight] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (apps && id) {
      const app = apps.find(a => a.id === id);
      if (app) {
        setFormData({
          title: app.title || '',
          url: app.url || '',
          description: app.description || '',
          features: app.features || [],
          type: app.type || 'premium',
          verified: Boolean(app.verified),
          votes: Number(app.votes) || 0,
          is_top_rated: Boolean(app.is_top_rated),
          img_url: app.img_url || '',
          logo_url: app.logo_url || '',
          pricing_starting_price: Number(app.pricing_starting_price) || 0,
          pricing_billing_period: app.pricing_billing_period || 'mensual',
          pricing_currency: app.pricing_currency || 'EUR',
          highlights: app.highlights || []
        });
      }
    }
  }, [id, apps]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || saving) return;

    try {
      setSaving(true);
      let updatedData = { ...formData };

      if (logoFile) {
        const logoUrl = await uploadImage(logoFile, 'controlhorarioelectronico', `logos/${id}`);
        updatedData.logo_url = logoUrl;
      }

      if (backgroundFile) {
        const imgUrl = await uploadImage(backgroundFile, 'controlhorarioelectronico', `backgrounds/${id}`);
        updatedData.img_url = imgUrl;
      }

      await updateCompany.mutateAsync({ 
        id, 
        data: updatedData 
      });
      
      toast.success('Cambios guardados correctamente');
      navigate('/admin');
    } catch (error: any) {
      console.error('Error updating app:', error);
      toast.error('Error al guardar los cambios: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/admin')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al panel
        </button>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Editar Aplicación</h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
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

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Guardar cambios
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
