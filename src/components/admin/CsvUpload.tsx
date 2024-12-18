import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
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

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || error.error || "Error processing CSV");
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

  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
      <h2 className="text-xl font-semibold">Upload Companies CSV</h2>
      <p className="text-sm text-gray-600 text-center">
        Upload a CSV file to add or update companies. The CSV should include all required fields.
      </p>
      <Button 
        variant="outline" 
        disabled={isUploading}
        className="cursor-pointer"
        onClick={handleButtonClick}
      >
        <Upload className="w-4 h-4 mr-2" />
        {isUploading ? "Uploading..." : "Select CSV File"}
      </Button>
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