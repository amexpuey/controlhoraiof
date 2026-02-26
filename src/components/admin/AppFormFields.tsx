import React from 'react';
import type { Database } from '@/integrations/supabase/types';
import BasicInfoFields from './form/BasicInfoFields';
import ImageFields from './form/ImageFields';
import PricingFields from './form/PricingFields';
import FeaturesFields from './form/FeaturesFields';
import HighlightsFields from './form/HighlightsFields';
import StatusFields from './form/StatusFields';

type Company = Database['public']['Tables']['companies']['Row'];

interface AppFormFieldsProps {
  formData: Partial<Company>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Company>>>;
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
      <BasicInfoFields formData={formData} setFormData={setFormData} />
      
      <ImageFields 
        formData={formData}
        setLogoFile={setLogoFile}
        setBackgroundFile={setBackgroundFile}
      />
      
      <PricingFields formData={formData} setFormData={setFormData} />
      
      <FeaturesFields
        formData={formData}
        setFormData={setFormData}
        newFeature={newFeature}
        setNewFeature={setNewFeature}
      />
      
      <HighlightsFields
        formData={formData}
        setFormData={setFormData}
        newHighlight={newHighlight}
        setNewHighlight={setNewHighlight}
      />
      
      <StatusFields formData={formData} setFormData={setFormData} />
    </div>
  );
}