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
    const rows = parse(csvText, { skipFirstRow: true });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const processedRows = rows.map(row => ({
      id: row[0] || undefined,
      title: row[1],
      url: row[2],
      description: row[3],
      features: row[4] ? row[4].split(",").map(f => f.trim()) : [],
      type: row[5] || "freemium",
      verified: row[6] === "true",
      votes: parseInt(row[7]) || 0,
      is_top_rated: row[8] === "true",
      img_url: row[9],
      logo_url: row[10],
      pricing_starting_price: parseFloat(row[11]) || 0,
      pricing_billing_period: row[12] || "mensual",
      pricing_currency: row[13] || "EUR",
      highlights: row[14] ? row[14].split(",").map(h => h.trim()) : []
    }));

    const { error } = await supabase
      .from("companies")
      .upsert(processedRows, {
        onConflict: "id",
        ignoreDuplicates: false
      });

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: "CSV processed successfully" }),
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