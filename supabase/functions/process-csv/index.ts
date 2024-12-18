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
    const rows = parse(csvText, {
      skipFirstRow: true,
      separator: ",",
      columns: [
        "id", "title", "url", "description", "features", "type", 
        "verified", "votes", "is_top_rated", "img_url", "logo_url",
        "pricing_starting_price", "pricing_billing_period", 
        "pricing_currency", "highlights"
      ],
      trim: true,
    });
    
    console.log("Parsed rows:", rows);

    // Filter out empty rows
    const validRows = rows.filter(row => 
      Object.values(row).some(value => value !== null && value !== undefined && value !== "")
    );

    if (validRows.length === 0) {
      throw new Error("No valid rows found in CSV");
    }

    console.log("Processing CSV rows:", validRows.length);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const processedRows = validRows.map(row => {
      // Convert string "true"/"false" to boolean
      const verified = row.verified?.toLowerCase() === "true";
      const is_top_rated = row.is_top_rated?.toLowerCase() === "true";
      
      // Convert features and highlights from string to array
      const features = row.features
        ? row.features.split(",").map(f => f.trim()).filter(Boolean)
        : [];
      
      const highlights = row.highlights
        ? row.highlights.split(",").map(h => h.trim()).filter(Boolean)
        : [];

      // Convert votes to number
      const votes = parseInt(row.votes) || 0;
      
      // Convert price to number and handle different decimal separators
      const pricing_starting_price = parseFloat(
        row.pricing_starting_price?.toString().replace(",", ".")
      ) || 0;

      return {
        id: row.id?.trim() || crypto.randomUUID(),
        title: row.title?.trim() || "Untitled",
        url: row.url?.trim() || "https://example.com",
        description: row.description?.trim() || "No description provided",
        features,
        type: row.type?.trim() || "freemium",
        verified,
        votes,
        is_top_rated,
        img_url: row.img_url?.trim() || "https://via.placeholder.com/150",
        logo_url: row.logo_url?.trim() || "https://via.placeholder.com/200",
        pricing_starting_price,
        pricing_billing_period: row.pricing_billing_period?.trim() || "mensual",
        pricing_currency: row.pricing_currency?.trim() || "EUR",
        highlights
      };
    });

    console.log("Processed rows:", processedRows);

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