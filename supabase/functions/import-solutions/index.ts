import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const featureMap: Record<string, string> = {
  "Control Horario": "has_time_tracking",
  "Apps": "has_mobile_app",
  "Geolocalización": "has_geolocation",
  "Sistemas Biométricos": "has_biometric",
  "Gestión de Ausencias": "has_absence_management",
  "Gestión de Turnos": "has_shift_management",
  "Reportes": "has_reports",
  "Integraciones API": "has_api",
  "Teletrabajo": "has_remote_work",
  "AI": "has_ai",
  "Portal del Empleado": "has_employee_portal",
  "Nóminas": "has_payroll",
  "Geofence": "has_geofence",
  "Gestión de proyectos": "has_project_management",
  "Gestión Documental": "has_document_management",
  "Evaluación Desempeño": "has_performance_eval",
  "Selección de Personal": "has_recruitment",
  "Formación": "has_training",
  "Canal de Denuncias": "has_whistleblower",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    
    let companies: any[];
    if (body.fetch_from_storage) {
      // Fetch from Supabase Storage
      const { data, error: storageError } = await supabase.storage
        .from(body.bucket || 'app_assets')
        .download(body.path || 'fichajeempresas/companies.json');
      if (storageError) throw new Error(`Storage: ${storageError.message}`);
      const text = await data.text();
      companies = JSON.parse(text);
    } else if (body.fetch_url) {
      const resp = await fetch(body.fetch_url);
      companies = await resp.json();
    } else if (Array.isArray(body)) {
      companies = body;
    } else {
      throw new Error("Expected an array, {fetch_url}, or {fetch_from_storage}");
    }

    let updated = 0;
    let errors: string[] = [];

    for (const c of companies) {
      try {
        // Build feature booleans from all_features
        const featureBooleans: Record<string, boolean> = {};
        for (const [featureName, columnName] of Object.entries(featureMap)) {
          featureBooleans[columnName] = (c.all_features || []).includes(featureName);
        }

        // Extract pricing
        const startingPrice = c.pricing?.tiers?.[0]?.price || 0;
        const hasFree = c.pricing?.has_free_plan;

        const row: Record<string, any> = {
          slug: c.slug,
          title: c.title,
          url: c.url,
          redirect_url: c.url,
          description: c.description,
          logo_url: c.logo_url || '',
          img_url: c.screenshot_url || null,
          screenshot_url: c.screenshot_url || null,
          thumbnail_url: c.thumbnail_url || null,
          og_image: c.og_image || null,
          meta_title: c.meta_title || null,
          social: c.social || {},
          rank: c.rank,
          is_free: c.is_free || false,
          is_top_rated: c.is_top_rated || false,
          verified: c.verified || false,
          is_promoted: c.premium === true && c.slug === 'inwout',
          features: c.all_features || [],
          free_plan: hasFree ? 'yes' : 'no',
          pricing_starting_price: startingPrice,
          min_price: startingPrice,
          scrape_status: c.scrape_status || null,
          scrape_date: c.scrape_date || null,
          ...featureBooleans,
        };

        const { error } = await supabase
          .from("companies")
          .upsert(row, { onConflict: "slug" });

        if (error) {
          errors.push(`${c.slug}: ${error.message}`);
        } else {
          updated++;
        }
      } catch (e) {
        errors.push(`${c.slug}: ${e.message}`);
      }
    }

    return new Response(
      JSON.stringify({ updated, errors, total: companies.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
