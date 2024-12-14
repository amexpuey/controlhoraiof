import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { useCompanies, useUpdateCompany } from '../hooks/useCompanies';
import { toast } from 'react-hot-toast';
import { useImageUpload } from '../hooks/useImageUpload';
import AppFormFields from '../components/admin/AppFormFields';
import type { Database } from '../integrations/supabase/types';

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
  
  const { handleImageUpload, isUploading } = useImageUpload('controlhorarioelectronico');

  useEffect(() => {
    if (apps && id) {
      const app = apps.find(a => a.id === id);
      if (app) {
        console.log('Loading app data:', app);
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
    if (!id || saving || isUploading) return;

    try {
      setSaving(true);
      console.log('Starting form submission');
      let updatedData = { ...formData };

      if (logoFile) {
        console.log('Uploading logo file');
        const logoUrl = await handleImageUpload(logoFile, `logos/${id}`);
        updatedData.logo_url = logoUrl;
      }

      if (backgroundFile) {
        console.log('Uploading background file');
        const imgUrl = await handleImageUpload(backgroundFile, `backgrounds/${id}`);
        updatedData.img_url = imgUrl;
      }

      console.log('Updating company data:', updatedData);
      await updateCompany.mutateAsync({ 
        id, 
        data: updatedData 
      });
      
      toast.success('Changes saved successfully');
      navigate('/admin');
    } catch (error: any) {
      console.error('Error updating app:', error);
      toast.error(`Error saving changes: ${error.message}`);
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

          <form onSubmit={handleSubmit} className="p-6">
            <AppFormFields
              formData={formData}
              setFormData={setFormData}
              setLogoFile={setLogoFile}
              setBackgroundFile={setBackgroundFile}
              newFeature={newFeature}
              setNewFeature={setNewFeature}
              newHighlight={newHighlight}
              setNewHighlight={setNewHighlight}
            />

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={saving || isUploading}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {saving || isUploading ? (
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