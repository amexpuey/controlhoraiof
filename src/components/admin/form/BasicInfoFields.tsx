import React from 'react';
import type { Database } from '@/integrations/supabase/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Company = Database['public']['Tables']['companies']['Row'];

interface BasicInfoFieldsProps {
  formData: Partial<Company>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Company>>>;
}

export default function BasicInfoFields({ formData, setFormData }: BasicInfoFieldsProps) {
  const update = (field: keyof Company, value: any) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold border-b pb-2">Información básica</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Nombre (title)</Label>
          <Input value={formData.title || ''} onChange={(e) => update('title', e.target.value)} className="mt-1" required />
        </div>
        <div>
          <Label>Slug</Label>
          <Input value={formData.slug || ''} onChange={(e) => update('slug', e.target.value)} className="mt-1" required />
        </div>
        <div>
          <Label>URL</Label>
          <Input type="url" value={formData.url || ''} onChange={(e) => update('url', e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Redirect URL</Label>
          <Input type="url" value={formData.redirect_url || ''} onChange={(e) => update('redirect_url', e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Rank</Label>
          <Input type="number" value={formData.rank ?? ''} onChange={(e) => update('rank', e.target.value ? parseInt(e.target.value) : null)} className="mt-1" />
        </div>
        <div>
          <Label>Rating</Label>
          <Input type="number" step="0.1" min="0" max="5" value={formData.rating ?? ''} onChange={(e) => update('rating', e.target.value ? parseFloat(e.target.value) : null)} className="mt-1" />
        </div>
        <div>
          <Label>Votes</Label>
          <Input type="number" value={formData.votes ?? 0} onChange={(e) => update('votes', parseInt(e.target.value) || 0)} className="mt-1" />
        </div>
        <div>
          <Label>País sede (hq_country)</Label>
          <Input value={formData.hq_country || ''} onChange={(e) => update('hq_country', e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Año de fundación</Label>
          <Input type="number" value={formData.founded_year ?? ''} onChange={(e) => update('founded_year', e.target.value ? parseInt(e.target.value) : null)} className="mt-1" />
        </div>
        <div>
          <Label>Target audience</Label>
          <Input value={formData.target_audience || ''} onChange={(e) => update('target_audience', e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Company size target</Label>
          <Input value={formData.company_size_target || ''} onChange={(e) => update('company_size_target', e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Use case</Label>
          <Input value={formData.use_case || ''} onChange={(e) => update('use_case', e.target.value)} className="mt-1" />
        </div>
      </div>

      <div>
        <Label>Descripción corta</Label>
        <Textarea value={formData.description || ''} onChange={(e) => update('description', e.target.value)} rows={3} className="mt-1" />
      </div>

      <div>
        <Label>Descripción larga (long_description)</Label>
        <Textarea value={formData.long_description || ''} onChange={(e) => update('long_description', e.target.value)} rows={6} className="mt-1" />
      </div>

      <div>
        <Label>Key differentiator</Label>
        <Input value={formData.key_differentiator || ''} onChange={(e) => update('key_differentiator', e.target.value)} className="mt-1" />
      </div>

      <div>
        <Label>Positioning message</Label>
        <Input value={formData.positioning_message || ''} onChange={(e) => update('positioning_message', e.target.value)} className="mt-1" />
      </div>

      <div>
        <Label>Plataformas (separadas por coma)</Label>
        <Input
          value={(formData.platforms || []).join(', ')}
          onChange={(e) => update('platforms', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
          className="mt-1"
          placeholder="Web, iOS, Android"
        />
      </div>
    </div>
  );
}
