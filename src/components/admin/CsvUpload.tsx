import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function CsvUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch("https://pvqbknpvkohxoftoloda.functions.supabase.co/process-csv", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session?.access_token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cWJrbnB2a29oeG9mdG9sb2RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzOTEzNDksImV4cCI6MjA0Nzk2NzM0OX0.3e-3DW4m5KqXmeozYCbRma5eefX4Ou4QGrIk-djVQKA'}`,
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cWJrbnB2a29oeG9mdG9sb2RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzOTEzNDksImV4cCI6MjA0Nzk2NzM0OX0.3e-3DW4m5KqXmeozYCbRma5eefX4Ou4QGrIk-djVQKA'
        },
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Error processing CSV");
      }

      toast.success("CSV file processed successfully");
    } catch (error: any) {
      console.error("Error uploading CSV:", error);
      toast.error(error.message || "Error uploading CSV");
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const downloadSampleCsv = () => {
    const sampleData = `id,title,url,description,features,type,verified,votes,is_top_rated,img_url,logo_url,pricing_starting_price,pricing_billing_period,pricing_currency,highlights
059d01d1-b477-465b-842d-f52ccda4a766,Bixpe,https://www.bixpe.com/,"Control horario y geolocalización de empleados con plan gratuito disponible","Control Horario, Reportes, Gestión de Ausencias, Apps Móviles, Geolocalización",freemium,true,245,false,https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80,https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=200&h=200,0.00,mensual,EUR,"Plan gratuito disponible, Fácil de implementar, Cumplimiento normativo, Soporte técnico incluido"`;

    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_companies.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success("Sample CSV downloaded successfully");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
      <h2 className="text-xl font-semibold">Upload Companies CSV</h2>
      <p className="text-sm text-gray-600 text-center">
        Upload a CSV file to add or update companies. The CSV should include all required fields.
      </p>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          disabled={isUploading}
          className="cursor-pointer"
          onClick={handleButtonClick}
        >
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? "Uploading..." : "Select CSV File"}
        </Button>
        <Button
          variant="secondary"
          onClick={downloadSampleCsv}
        >
          <Download className="w-4 h-4 mr-2" />
          Download Sample CSV
        </Button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}