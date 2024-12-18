import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { parse } from "https://deno.land/std@0.190.0/csv/parse.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("No file uploaded");
    }

    const csvText = await file.text();
    console.log("CSV content:", csvText); // Debug log

    // Parse CSV with specific options
    const parsed = parse(csvText, {
      skipFirstRow: true, // Skip header row
      separator: ",",    // Explicitly set comma as separator
      trimLeadingSpace: true,
      lazyQuotes: true  // Handle quotes more flexibly
    });
    
    // Filter out empty rows and validate data
    const rows = parsed.filter(row => row.some(cell => cell !== ""));

    console.log("Processing CSV rows:", rows.length);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const processedRows = rows.map(row => {
      const id = row[0]?.trim() || crypto.randomUUID();
      console.log("Processing row with ID:", id);
      
      return {
        id,
        title: row[1]?.trim() || 'Untitled',
        url: row[2]?.trim() || 'https://example.com',
        description: row[3]?.trim() || 'No description provided',
        features: row[4] ? row[4].split(",").map(f => f.trim()).filter(Boolean) : [],
        type: row[5]?.trim() || "freemium",
        verified: row[6]?.toLowerCase() === "true",
        votes: parseInt(row[7]) || 0,
        is_top_rated: row[8]?.toLowerCase() === "true",
        img_url: row[9]?.trim() || 'https://via.placeholder.com/150',
        logo_url: row[10]?.trim() || 'https://via.placeholder.com/200',
        pricing_starting_price: parseFloat(row[11]) || 0,
        pricing_billing_period: row[12]?.trim() || "mensual",
        pricing_currency: row[13]?.trim() || "EUR",
        highlights: row[14] ? row[14].split(",").map(h => h.trim()).filter(Boolean) : []
      };
    });

    console.log("Processed rows:", processedRows.length);

    if (processedRows.length === 0) {
      throw new Error("No valid rows found in CSV");
    }

    const { error } = await supabase
      .from("companies")
      .upsert(processedRows, {
        onConflict: "id",
        ignoreDuplicates: false
      });

    if (error) {
      console.error("Database error:", error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log("Successfully processed all rows");

    return new Response(
      JSON.stringify({ 
        message: "CSV processed successfully",
        processedRows: processedRows.length 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing CSV:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});