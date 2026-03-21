import React from 'react';
import type { Database } from '@/integrations/supabase/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Company = Database['public']['Tables']['companies']['Row'];

interface SEOFieldsProps {
  formData: Partial<Company>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Company>>>;
}

export default function SEOFields({ formData, setFormData }: SEOFieldsProps) {
  const update = (field: keyof Company, value: any) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2">SEO & Meta</h3>
      <div>
        <Label>Meta title</Label>
        <Input value={formData.meta_title || ''} onChange={(e) => update('meta_title', e.target.value)} className="mt-1" />
      </div>
      <div>
        <Label>Meta description</Label>
        <Textarea value={formData.meta_description || ''} onChange={(e) => update('meta_description', e.target.value)} rows={2} className="mt-1" />
      </div>
      <div>
        <Label>OG Image URL</Label>
        <Input value={formData.og_image || ''} onChange={(e) => update('og_image', e.target.value)} className="mt-1" />
      </div>
      <div>
        <Label>Screenshot URL</Label>
        <Input value={formData.screenshot_url || ''} onChange={(e) => update('screenshot_url', e.target.value)} className="mt-1" />
      </div>
      <div>
        <Label>Thumbnail URL</Label>
        <Input value={formData.thumbnail_url || ''} onChange={(e) => update('thumbnail_url', e.target.value)} className="mt-1" />
      </div>
    </div>
  );
}
