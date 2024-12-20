import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, AlertCircle } from 'lucide-react';
import { useCompany, useUpdateCompany } from '../hooks/useCompanies';
import { toast } from 'sonner';
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
  const { data: company, isLoading, error } = useCompany(id || '');
  const updateCompany = useUpdateCompany();
  const [formData, setFormData] = useState(initialFormData);
  const [newFeature, setNewFeature] = useState('');
  const [newHighlight, setNewHighlight] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  
  const { handleImageUpload, isUploading } = useImageUpload();

  useEffect(() => {
    if (company) {
      console.log('Loading app data:', company);
      setFormData({
        title: company.title || '',
        url: company.url || '',
        description: company.description || '',
        features: company.features || [],
        type: company.type || 'premium',
        verified: Boolean(company.verified),
        votes: Number(company.votes) || 0,
        is_top_rated: Boolean(company.is_top_rated),
        img_url: company.img_url || '',
        logo_url: company.logo_url || '',
        pricing_starting_price: Number(company.pricing_starting_price) || 0,
        pricing_billing_period: company.pricing_billing_period || 'mensual',
        pricing_currency: company.pricing_currency || 'EUR',
        highlights: company.highlights || []
      });
    }
  }, [company]);

  const addTimestampToUrl = (url: string) => {
    const timestamp = new Date().getTime();
    return `${url}?t=${timestamp}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || saving || isUploading) return;

    try {
      setSaving(true);
      console.log('Starting form submission');
      let updatedData = { ...formData };

      if (logoFile) {
        console.log('Uploading logo file');
        const logoUrl = await handleImageUpload(logoFile, 'logo', id);
        updatedData.logo_url = addTimestampToUrl(logoUrl);
      }

      if (backgroundFile) {
        console.log('Uploading background file');
        const imgUrl = await handleImageUpload(backgroundFile, 'background', id);
        updatedData.img_url = addTimestampToUrl(imgUrl);
      }

      console.log('Updating company data:', updatedData);
      const result = await updateCompany.mutateAsync({ 
        id, 
        data: updatedData 
      });
      
      console.log('Update successful:', result);
      toast.success('Changes saved successfully');
      navigate('/admin/companies');
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

  if (error || !company) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate('/admin/companies')}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al panel
          </button>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col items-center justify-center text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Aplicación no encontrada</h1>
              <p className="text-gray-600 mb-6">
                La aplicación que intentas editar no existe o ha sido eliminada.
              </p>
              <button
                onClick={() => navigate('/admin/companies')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Volver al panel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/admin/companies')}
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