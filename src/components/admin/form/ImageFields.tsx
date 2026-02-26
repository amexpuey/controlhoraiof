import React from 'react';
import ImageUpload from '../../ImageUpload';
import type { Database } from '@/integrations/supabase/types';

type Company = Database['public']['Tables']['companies']['Row'];

interface ImageFieldsProps {
  formData: Partial<Company>;
  setLogoFile: (file: File | null) => void;
  setBackgroundFile: (file: File | null) => void;
}

export default function ImageFields({ formData, setLogoFile, setBackgroundFile }: ImageFieldsProps) {
  return (
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
  );
}