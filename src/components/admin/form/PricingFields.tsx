import React from 'react';
import type { Database } from '@/integrations/supabase/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Company = Database['public']['Tables']['companies']['Row'];

interface PricingFieldsProps {
  formData: Partial<Company>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Company>>>;
}

export default function PricingFields({ formData, setFormData }: PricingFieldsProps) {
  const update = (field: keyof Company, value: any) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2">Precios</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Precio inicial</Label>
          <Input type="number" step="0.01" min="0" value={formData.pricing_starting_price || 0} onChange={(e) => update('pricing_starting_price', parseFloat(e.target.value) || 0)} className="mt-1" />
        </div>
        <div>
          <Label>Min price</Label>
          <Input type="number" step="0.01" value={formData.min_price ?? ''} onChange={(e) => update('min_price', e.target.value ? parseFloat(e.target.value) : null)} className="mt-1" />
        </div>
        <div>
          <Label>Price per user/month</Label>
          <Input type="number" step="0.01" value={formData.price_per_user_month ?? ''} onChange={(e) => update('price_per_user_month', e.target.value ? parseFloat(e.target.value) : null)} className="mt-1" />
        </div>
        <div>
          <Label>Free trial days</Label>
          <Input type="number" value={formData.free_trial_days ?? ''} onChange={(e) => update('free_trial_days', e.target.value ? parseInt(e.target.value) : null)} className="mt-1" />
        </div>
        <div>
          <Label>Periodo facturación</Label>
          <Select value={formData.pricing_billing_period || 'mensual'} onValueChange={(v) => update('pricing_billing_period', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="mensual">Mensual</SelectItem>
              <SelectItem value="anual">Anual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Moneda</Label>
          <Select value={formData.pricing_currency || 'EUR'} onValueChange={(v) => update('pricing_currency', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Tipo (type)</Label>
          <Select value={formData.type || 'premium'} onValueChange={(v) => update('type', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="freemium">Freemium</SelectItem>
              <SelectItem value="gratis">Gratis</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Pricing model</Label>
          <Input value={formData.pricing_model || ''} onChange={(e) => update('pricing_model', e.target.value)} className="mt-1" placeholder="per_user, flat, tiered..." />
        </div>
        <div>
          <Label>Pricing description</Label>
          <Input value={formData.pricing_description || ''} onChange={(e) => update('pricing_description', e.target.value)} className="mt-1" />
        </div>
      </div>
    </div>
  );
}
