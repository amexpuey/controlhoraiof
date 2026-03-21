import React from 'react';
import type { Database } from '@/integrations/supabase/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from '../../ImageUpload';

type Company = Database['public']['Tables']['companies']['Row'];

interface ImageFieldsProps {
  formData: Partial<Company>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Company>>>;
  setLogoFile: (file: File | null) => void;
  setBackgroundFile: (file: File | null) => void;
}

export default function ImageFields({ formData, setFormData, setLogoFile, setBackgroundFile }: ImageFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2">Imágenes</h3>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Logo URL (manual)</Label>
          <Input value={formData.logo_url || ''} onChange={(e) => setFormData(prev => ({ ...prev, logo_url: e.target.value }))} className="mt-1" />
        </div>
        <div>
          <Label>Img URL (manual)</Label>
          <Input value={formData.img_url || ''} onChange={(e) => setFormData(prev => ({ ...prev, img_url: e.target.value }))} className="mt-1" />
        </div>
        <div>
          <Label>Screenshot URL</Label>
          <Input value={formData.screenshot_url || ''} onChange={(e) => setFormData(prev => ({ ...prev, screenshot_url: e.target.value }))} className="mt-1" />
        </div>
        <div>
          <Label>Thumbnail URL</Label>
          <Input value={formData.thumbnail_url || ''} onChange={(e) => setFormData(prev => ({ ...prev, thumbnail_url: e.target.value }))} className="mt-1" />
        </div>
      </div>
    </div>
  );
}
