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
123e4567-e89b-12d3-a456-426614174000,Mi App,https://miapp.com,Una aplicación increíble,"Feature 1, Feature 2, Feature 3",premium,true,42,true,https://example.com/img.jpg,https://example.com/logo.jpg,29.99,mensual,EUR,"Highlight 1, Highlight 2, Highlight 3"
,Otra App,https://otraapp.com,Una app genial,"Chat en vivo, Soporte 24/7",freemium,false,10,false,https://example.com/img2.jpg,https://example.com/logo2.jpg,0,mensual,EUR,"Gratis para siempre, Fácil de usar"`;

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