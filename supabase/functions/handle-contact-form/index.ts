import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ContactFormData {
  email: string;
  phone?: string;
  observations?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!)
    const formData: ContactFormData = await req.json()
    
    console.log('Received form data:', formData);
    
    // Store submission in database
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert([formData])

    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

    // Send email notification
    const emailHtml = `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Teléfono:</strong> ${formData.phone || 'No proporcionado'}</p>
      <p><strong>Observaciones:</strong> ${formData.observations || 'No proporcionadas'}</p>
    `

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Control Horario Electrónico <onboarding@controlhorarioelectronico.com>',
        to: ['amexpuey@gmail.com'],
        subject: `Nuevo mensaje de contacto de ${formData.email}`,
        html: emailHtml,
      }),
    })

    if (!emailRes.ok) {
      const errorText = await emailRes.text();
      console.error('Error sending email:', errorText);
      throw new Error(`Error sending email: ${errorText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})