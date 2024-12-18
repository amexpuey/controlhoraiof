import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function CsvUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/process-csv", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error processing CSV");
      }

      toast({
        title: "Success",
        description: "CSV file processed successfully",
      });
    } catch (error: any) {
      console.error("Error uploading CSV:", error);
      toast({
        title: "Error",
        description: error.message || "Error uploading CSV",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
      <h2 className="text-xl font-semibold">Upload Companies CSV</h2>
      <p className="text-sm text-gray-600 text-center">
        Upload a CSV file to add or update companies. The CSV should include all required fields.
      </p>
      <label htmlFor="csv-upload">
        <Button 
          variant="outline" 
          disabled={isUploading}
          className="cursor-pointer"
        >
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? "Uploading..." : "Select CSV File"}
        </Button>
      </label>
      <input
        id="csv-upload"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}