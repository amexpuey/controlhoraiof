
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
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
  highlights: [],
  pricing_description: null,
  slug: '',
  rating: 4.5,
  free_trial: 'yes',
  free_plan: 'yes',
  use_case: 'Good for basic time tracking',
  platforms: ['Web', 'iOS', 'Android'],
  pricing_billed_annually: false,
  pricing_per_user: false
};

export default function AdminAppCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [newFeature, setNewFeature] = useState('');
  const [newHighlight, setNewHighlight] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  
  const { handleImageUpload, isUploading } = useImageUpload();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving || isUploading) return;

    try {
      setSaving(true);
      console.log('Starting form submission');
      let newAppData = { ...formData };
      
      // Create the app record first to get an ID
      const { data: newApp, error: createError } = await supabase
        .from('companies')
        .insert([newAppData])
        .select()
        .single();
      
      if (createError) throw createError;
      
      if (!newApp || !newApp.id) {
        throw new Error('Failed to create app record');
      }
      
      // Handle image uploads if files were selected
      let updates = {};
      
      if (logoFile) {
        console.log('Uploading logo file');
        const logoUrl = await handleImageUpload(logoFile, 'logo', newApp.id);
        updates = { ...updates, logo_url: logoUrl };
      }

      if (backgroundFile) {
        console.log('Uploading background file');
        const imgUrl = await handleImageUpload(backgroundFile, 'background', newApp.id);
        updates = { ...updates, img_url: imgUrl };
      }
      
      // If we uploaded images, update the record
      if (Object.keys(updates).length > 0) {
        const { error: updateError } = await supabase
          .from('companies')
          .update(updates)
          .eq('id', newApp.id);
          
        if (updateError) {
          console.error('Error updating with image URLs:', updateError);
          // Continue since the app was created, just log the error
        }
      }
      
      toast.success('Aplicación creada exitosamente');
      navigate(`/admin/apps/${newApp.id}`);
    } catch (error: any) {
      console.error('Error creating app:', error);
      toast.error(`Error al crear la aplicación: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

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
            <h1 className="text-2xl font-bold text-gray-900">Crear Nueva Aplicación</h1>
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
                    Crear aplicación
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
