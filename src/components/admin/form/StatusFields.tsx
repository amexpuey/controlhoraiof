import React from 'react';
import type { Database } from '@/integrations/supabase/types';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Company = Database['public']['Tables']['companies']['Row'];

interface StatusFieldsProps {
  formData: Partial<Company>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Company>>>;
}

export default function StatusFields({ formData, setFormData }: StatusFieldsProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="app-verified"
          checked={formData.verified}
          onCheckedChange={(checked) => 
            setFormData((prev) => ({ ...prev, verified: checked as boolean }))
          }
        />
        <Label htmlFor="app-verified" className="text-sm text-gray-700">
          Verificado
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="app-top-rated"
          checked={formData.is_top_rated}
          onCheckedChange={(checked) => 
            setFormData((prev) => ({ ...prev, is_top_rated: checked as boolean }))
          }
        />
        <Label htmlFor="app-top-rated" className="text-sm text-gray-700">
          Top Rated
        </Label>
      </div>
    </div>
  );
}