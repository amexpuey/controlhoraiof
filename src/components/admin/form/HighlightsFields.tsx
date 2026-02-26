import React from 'react';
import type { Database } from '@/integrations/supabase/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type Company = Database['public']['Tables']['companies']['Row'];

interface HighlightsFieldsProps {
  formData: Partial<Company>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Company>>>;
  newHighlight: string;
  setNewHighlight: (value: string) => void;
}

export default function HighlightsFields({ 
  formData, 
  setFormData, 
  newHighlight, 
  setNewHighlight 
}: HighlightsFieldsProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="new-highlight">Destacados</Label>
      <div className="flex gap-2">
        <Input
          id="new-highlight"
          name="new-highlight"
          type="text"
          value={newHighlight}
          onChange={(e) => setNewHighlight(e.target.value)}
          placeholder="Nuevo destacado"
        />
        <Button
          type="button"
          onClick={() => {
            if (newHighlight.trim()) {
              setFormData((prev) => ({
                ...prev,
                highlights: [...(prev.highlights || []), newHighlight.trim()]
              }));
              setNewHighlight('');
            }
          }}
        >
          Añadir
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {formData.highlights?.map((highlight, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-100"
          >
            {highlight}
            <button
              type="button"
              onClick={() => setFormData((prev) => ({
                ...prev,
                highlights: prev.highlights?.filter((_, i) => i !== index) || []
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