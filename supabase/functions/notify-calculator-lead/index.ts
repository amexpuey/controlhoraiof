import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

interface SanctionPayload {
  email: string
  itss_min: number
  itss_max: number
  judicial_min: number
  judicial_max: number
  total_min: number
  total_max: number
  work_centers: number
  employees: number
  months: number
  infractions: string[]
  itss_sanctions: Array<{ label: string; level: string; min: number; max: number }>
}

function formatCurrency(n: number): string {
  return n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured')
    }

    const data: SanctionPayload = await req.json()

    if (!data.email) {
      return new Response(JSON.stringify({ error: 'Email required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const fecha = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })

    // Build infractions rows
    const infractionsHtml = (data.itss_sanctions || []).map(s => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e9ecef;font-size:14px;color:#333;">${s.label}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e9ecef;font-size:13px;color:#666;text-transform:capitalize;">${s.level}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e9ecef;font-size:14px;color:#333;text-align:right;">${formatCurrency(s.min)} – ${formatCurrency(s.max)}</td>
      </tr>
    `).join('')

    // Email to lead: Sanction report
    const reportHtml = `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;">
        <!-- Header -->
        <div style="background:#0A1628;padding:28px 32px;border-radius:8px 8px 0 0;">
          <h1 style="margin:0;color:#0fb89f;font-size:20px;letter-spacing:0.5px;">fichajeempresas.es</h1>
          <p style="margin:6px 0 0;color:#8899aa;font-size:13px;">Informe de estimación de sanciones laborales</p>
        </div>

        <!-- Body -->
        <div style="padding:32px;border:1px solid #e9ecef;border-top:none;">
          <p style="color:#444;font-size:15px;line-height:1.6;margin-top:0;">
            A continuación encontrarás la estimación de sanciones basada en los datos que has introducido. 
            Este informe es <strong>orientativo</strong> y no constituye asesoramiento legal.
          </p>

          <!-- Summary boxes -->
          <div style="display:flex;gap:12px;margin:24px 0;">
            <div style="flex:1;background:#FFF7ED;border:1px solid #FED7AA;border-radius:8px;padding:16px;text-align:center;">
              <p style="margin:0 0 4px;color:#92400E;font-size:11px;text-transform:uppercase;font-weight:bold;letter-spacing:0.5px;">Sanción ITSS</p>
              <p style="margin:0;color:#0A1628;font-size:18px;font-weight:bold;">${formatCurrency(data.itss_min)} – ${formatCurrency(data.itss_max)}</p>
              <p style="margin:4px 0 0;color:#92400E;font-size:11px;">${data.work_centers} centro(s) de trabajo</p>
            </div>
            <div style="flex:1;background:#EFF6FF;border:1px solid #BFDBFE;border-radius:8px;padding:16px;text-align:center;">
              <p style="margin:0 0 4px;color:#1E40AF;font-size:11px;text-transform:uppercase;font-weight:bold;letter-spacing:0.5px;">Riesgo Judicial</p>
              <p style="margin:0;color:#0A1628;font-size:18px;font-weight:bold;">${formatCurrency(data.judicial_min)} – ${formatCurrency(data.judicial_max)}</p>
              <p style="margin:4px 0 0;color:#1E40AF;font-size:11px;">${data.employees} trabajador(es) · ${data.months} mes(es)</p>
            </div>
          </div>

          <!-- Total -->
          <div style="background:#0A1628;border-radius:8px;padding:18px 20px;text-align:center;margin-bottom:24px;">
            <p style="margin:0 0 4px;color:#8899aa;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Riesgo total estimado</p>
            <p style="margin:0;color:#0fb89f;font-size:22px;font-weight:bold;">${formatCurrency(data.total_min)} – ${formatCurrency(data.total_max)}</p>
          </div>

          <!-- Infractions table -->
          ${infractionsHtml ? `
          <h3 style="color:#0A1628;font-size:15px;margin-bottom:12px;">Infracciones seleccionadas</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <thead>
              <tr style="background:#f8f9fa;">
                <th style="padding:10px 12px;text-align:left;font-size:12px;color:#666;border-bottom:2px solid #e9ecef;">Infracción</th>
                <th style="padding:10px 12px;text-align:left;font-size:12px;color:#666;border-bottom:2px solid #e9ecef;">Nivel</th>
                <th style="padding:10px 12px;text-align:right;font-size:12px;color:#666;border-bottom:2px solid #e9ecef;">Rango</th>
              </tr>
            </thead>
            <tbody>${infractionsHtml}</tbody>
          </table>
          ` : ''}

          <!-- Legal notes -->
          <div style="background:#f8f9fa;border-radius:8px;padding:16px;margin-bottom:24px;">
            <p style="color:#666;font-size:12px;line-height:1.6;margin:0;">
              <strong>Base legal:</strong> LISOS art. 40 (RD Legislativo 5/2000) · RD 8/2019<br/>
              <strong>Riesgo judicial:</strong> basado en análisis de 127 sentencias. Media: 12.000€/trabajador.<br/>
              <strong>Nota:</strong> La sanción real depende del criterio del inspector y las circunstancias. Este cálculo no constituye asesoramiento legal.
            </p>
          </div>

          <!-- CTA -->
          <div style="background:#f0fdf9;border:1px solid #d1fae5;border-radius:8px;padding:20px;text-align:center;">
            <h3 style="color:#0A1628;margin-top:0;font-size:16px;">¿Quieres evitar estas sanciones?</h3>
            <p style="color:#444;font-size:14px;line-height:1.5;margin-bottom:16px;">INWOUT es el sistema de registro horario digital que cumple con el RD 8/2019 y la STS 41/2023.</p>
            <a href="https://inwoutapp.com/?utm_source=fichajeempresas&utm_medium=email&utm_campaign=calculadora_sanciones" style="display:inline-block;background:#0fb89f;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:15px;">Prueba INWOUT gratis →</a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background:#f8f9fa;padding:20px 32px;text-align:center;border:1px solid #e9ecef;border-top:none;border-radius:0 0 8px 8px;">
          <p style="color:#999;font-size:12px;margin:0 0 8px;">fichajeempresas.es · Herramientas gratuitas para profesionales de RRHH</p>
          <p style="color:#bbb;font-size:11px;margin:0;">Generado el ${fecha}</p>
        </div>
      </div>
    `

    // 1. Send report to lead
    const reportRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FichajeEmpresas.es <noreply@inwout.app>',
        to: [data.email],
        subject: '📊 Tu informe de sanciones laborales — FichajeEmpresas.es',
        html: reportHtml,
      }),
    })

    if (!reportRes.ok) {
      const errText = await reportRes.text()
      console.error('Failed to send report email:', errText)
    }

    // 2. Internal notification
    const internalHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <div style="background:#0A1628;color:#fff;padding:20px 24px;border-radius:8px 8px 0 0;">
          <h2 style="margin:0;font-size:20px;">📊 Nuevo lead — Calculadora de Sanciones</h2>
        </div>
        <div style="background:#f8f9fa;padding:24px;border:1px solid #e9ecef;border-top:none;border-radius:0 0 8px 8px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Email:</td><td style="padding:8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#555;">ITSS:</td><td style="padding:8px 0;">${formatCurrency(data.itss_min)} – ${formatCurrency(data.itss_max)}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Judicial:</td><td style="padding:8px 0;">${formatCurrency(data.judicial_min)} – ${formatCurrency(data.judicial_max)}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Total:</td><td style="padding:8px 0;">${formatCurrency(data.total_min)} – ${formatCurrency(data.total_max)}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Centros:</td><td style="padding:8px 0;">${data.work_centers}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Empleados:</td><td style="padding:8px 0;">${data.employees}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Infracciones:</td><td style="padding:8px 0;">${data.infractions?.join(', ') || '-'}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Fecha:</td><td style="padding:8px 0;">${fecha}</td></tr>
          </table>
        </div>
      </div>
    `

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FichajeEmpresas.es <noreply@inwout.app>',
        to: ['hi@inwout.com'],
        subject: `📊 Lead calculadora: ${data.email}`,
        html: internalHtml,
      }),
    })

    console.log(`Calculator report sent to: ${data.email}`)

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error in notify-calculator-lead:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
