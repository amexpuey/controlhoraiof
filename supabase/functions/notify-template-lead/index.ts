import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

interface LeadPayload {
  email: string
  nombre?: string
  empresa?: string
  plantilla_slug: string
  plantilla_title: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured')
    }

    const { email, nombre, empresa, plantilla_slug, plantilla_title }: LeadPayload = await req.json()

    if (!email || !plantilla_slug || !plantilla_title) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const fecha = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })
    const supabaseUrl = `https://supabase.com/dashboard/project/pvqbknpvkohxoftoloda/editor`

    // Email 1: Internal notification
    const internalHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <div style="background:#0A1628;color:#fff;padding:20px 24px;border-radius:8px 8px 0 0;">
          <h2 style="margin:0;font-size:20px;">🎯 Nuevo lead desde fichajeempresas.es</h2>
        </div>
        <div style="background:#f8f9fa;padding:24px;border:1px solid #e9ecef;border-top:none;border-radius:0 0 8px 8px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Plantilla:</td><td style="padding:8px 0;">${plantilla_title}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Slug:</td><td style="padding:8px 0;">${plantilla_slug}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Email:</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Nombre:</td><td style="padding:8px 0;">${nombre || 'No proporcionado'}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Empresa:</td><td style="padding:8px 0;">${empresa || 'No proporcionada'}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Fecha:</td><td style="padding:8px 0;">${fecha}</td></tr>
          </table>
          <div style="margin-top:20px;text-align:center;">
            <a href="${supabaseUrl}" style="display:inline-block;background:#0fb89f;color:#fff;padding:10px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">Ver en Supabase</a>
          </div>
        </div>
      </div>
    `

    const internalRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FichajeEmpresas.es <onboarding@resend.dev>',
        to: ['albert@inwout.com'],
        subject: `🎯 Nuevo lead: ${plantilla_title}`,
        html: internalHtml,
      }),
    })

    if (!internalRes.ok) {
      const errText = await internalRes.text()
      console.error('Failed to send internal email:', errText)
    }

    // Email 2: Welcome email to lead
    const welcomeHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
        <!-- Header -->
        <div style="background:#0A1628;padding:28px 32px;text-align:center;border-radius:8px 8px 0 0;">
          <h1 style="margin:0;color:#0fb89f;font-size:22px;letter-spacing:0.5px;">fichajeempresas.es</h1>
        </div>
        <!-- Body -->
        <div style="padding:32px;border:1px solid #e9ecef;border-top:none;">
          <h2 style="color:#0A1628;font-size:20px;margin-top:0;">Hola ${nombre || 'profesional de RRHH'},</h2>
          <p style="color:#444;font-size:15px;line-height:1.6;">Gracias por descargar <strong>${plantilla_title}</strong>. Esperamos que te sea útil.</p>
          <p style="color:#444;font-size:15px;line-height:1.6;">En fichajeempresas.es creamos recursos gratuitos para ayudar a los departamentos de RRHH a ser más eficientes.</p>
          
          <div style="background:#f0fdf9;border:1px solid #d1fae5;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="color:#0A1628;margin-top:0;font-size:16px;">¿Sabías que puedes automatizar esto?</h3>
            <p style="color:#444;font-size:14px;line-height:1.5;margin-bottom:16px;">INWOUT digitaliza el control horario, las vacaciones, las ausencias y mucho más. Sin Excel, sin papel, sin complicaciones.</p>
            <a href="https://inwoutapp.com/?utm_source=fichajeempresas&utm_medium=email&utm_campaign=template_download&utm_content=${plantilla_slug}" style="display:inline-block;background:#0fb89f;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:15px;">Prueba INWOUT gratis →</a>
          </div>
          
          <p style="color:#666;font-size:14px;line-height:1.5;">Más plantillas gratuitas en <a href="https://fichajeempresas.es/plantillas?utm_source=email&utm_medium=welcome&utm_campaign=template_download" style="color:#0fb89f;text-decoration:none;font-weight:bold;">fichajeempresas.es/plantillas</a></p>
        </div>
        <!-- Footer -->
        <div style="background:#f8f9fa;padding:20px 32px;text-align:center;border:1px solid #e9ecef;border-top:none;border-radius:0 0 8px 8px;">
          <p style="color:#999;font-size:12px;margin:0 0 8px;">fichajeempresas.es | Recursos gratuitos para profesionales de RRHH</p>
          <p style="color:#bbb;font-size:11px;margin:0;">Si no quieres recibir más emails, simplemente ignora este mensaje.</p>
        </div>
      </div>
    `

    const welcomeRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FichajeEmpresas.es <onboarding@resend.dev>',
        to: [email],
        subject: `Tu plantilla: ${plantilla_title} ✅`,
        html: welcomeHtml,
      }),
    })

    if (!welcomeRes.ok) {
      const errText = await welcomeRes.text()
      console.error('Failed to send welcome email:', errText)
    }

    console.log(`Emails sent for lead: ${email}, template: ${plantilla_slug}`)

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error in notify-template-lead:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
