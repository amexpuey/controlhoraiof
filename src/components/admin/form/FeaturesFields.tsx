import React from 'react';
import type { Database } from '@/integrations/supabase/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type Company = Database['public']['Tables']['companies']['Row'];

interface FeaturesFieldsProps {
  formData: Partial<Company>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Company>>>;
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
      <Label htmlFor="new-feature">Características</Label>
      <div className="flex gap-2">
        <Input
          id="new-feature"
          name="new-feature"
          type="text"
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          placeholder="Nueva característica"
        />
        <Button
          type="button"
          onClick={() => {
            if (newFeature.trim()) {
              setFormData((prev) => ({
                ...prev,
                features: [...(prev.features || []), newFeature.trim()]
              }));
              setNewFeature('');
            }
          }}
        >
          Añadir
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {formData.features?.map((feature, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-100"
          >
            {feature}
            <button
              type="button"
              onClick={() => setFormData((prev) => ({
                ...prev,
                features: prev.features?.filter((_, i) => i !== index) || []
              }))}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}