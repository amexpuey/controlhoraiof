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
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="app-type">Tipo</Label>
        <Select 
          value={formData.type} 
          onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value as Company['type'] }))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona un tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="freemium">Freemium</SelectItem>
            <SelectItem value="gratis">Gratis</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="app-price">Precio inicial</Label>
          <Input
            id="app-price"
            name="app-price"
            type="number"
            step="0.01"
            min="0"
            value={formData.pricing_starting_price || 0}
            onChange={(e) => setFormData((prev) => ({ 
              ...prev, 
              pricing_starting_price: parseFloat(e.target.value) || 0 
            }))}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="app-billing-period">Periodo de facturación</Label>
          <Select 
            value={formData.pricing_billing_period} 
            onValueChange={(value) => setFormData((prev) => ({ ...prev, pricing_billing_period: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona un periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mensual">Mensual</SelectItem>
              <SelectItem value="anual">Anual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="app-currency">Moneda</Label>
          <Select 
            value={formData.pricing_currency} 
            onValueChange={(value) => setFormData((prev) => ({ ...prev, pricing_currency: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una moneda" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}