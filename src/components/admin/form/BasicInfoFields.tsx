import React from 'react';
import type { Database } from '@/integrations/supabase/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Company = Database['public']['Tables']['companies']['Row'];

interface BasicInfoFieldsProps {
  formData: Omit<Company, 'id' | 'created_at' | 'updated_at'>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Company, 'id' | 'created_at' | 'updated_at'>>>;
}

export default function BasicInfoFields({ formData, setFormData }: BasicInfoFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="app-title">Nombre</Label>
          <Input
            id="app-title"
            name="app-title"
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="app-url">URL</Label>
          <Input
            id="app-url"
            name="app-url"
            type="url"
            value={formData.url || ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
            className="mt-1"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="app-description">Descripción</Label>
        <Textarea
          id="app-description"
          name="app-description"
          value={formData.description || ''}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="mt-1"
          required
        />
      </div>
    </div>
  );
}