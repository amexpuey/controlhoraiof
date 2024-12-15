import React from 'react';
import type { Database } from '@/integrations/supabase/types';

type Company = Database['public']['Tables']['companies']['Row'];

interface PricingFieldsProps {
  formData: Omit<Company, 'id' | 'created_at' | 'updated_at'>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Company, 'id' | 'created_at' | 'updated_at'>>>;
}

export default function PricingFields({ formData, setFormData }: PricingFieldsProps) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="app-type" className="block text-sm font-medium text-gray-700">
          Tipo
        </label>
        <select
          id="app-type"
          name="app-type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as Company['type'] })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="premium">Premium</option>
          <option value="freemium">Freemium</option>
          <option value="gratis">Gratis</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="app-price" className="block text-sm font-medium text-gray-700">
            Precio inicial
          </label>
          <input
            id="app-price"
            name="app-price"
            type="number"
            step="0.01"
            min="0"
            value={formData.pricing_starting_price}
            onChange={(e) => setFormData({ 
              ...formData, 
              pricing_starting_price: parseFloat(e.target.value) || 0 
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="app-billing-period" className="block text-sm font-medium text-gray-700">
            Periodo de facturación
          </label>
          <select
            id="app-billing-period"
            name="app-billing-period"
            value={formData.pricing_billing_period}
            onChange={(e) => setFormData({
              ...formData,
              pricing_billing_period: e.target.value
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="mensual">Mensual</option>
            <option value="anual">Anual</option>
          </select>
        </div>

        <div>
          <label htmlFor="app-currency" className="block text-sm font-medium text-gray-700">
            Moneda
          </label>
          <select
            id="app-currency"
            name="app-currency"
            value={formData.pricing_currency}
            onChange={(e) => setFormData({
              ...formData,
              pricing_currency: e.target.value
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>
    </div>
  );
}