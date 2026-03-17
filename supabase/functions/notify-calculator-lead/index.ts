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

function fmt(n: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured')

    const data: SanctionPayload = await req.json()
    if (!data.email) {
      return new Response(JSON.stringify({ error: 'Email required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const fecha = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid', day: '2-digit', month: 'long', year: 'numeric' })

    const infractionsRows = (data.itss_sanctions || []).map(s => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;font-size:13px;color:#333;">${s.label}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;font-size:13px;color:#666;text-transform:capitalize;">${s.level}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;font-size:13px;color:#333;text-align:right;white-space:nowrap;">${fmt(s.min)} – ${fmt(s.max)}</td>
      </tr>
    `).join('')

    const reportHtml = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f6f6f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f6f6;">
    <tr><td align="center" style="padding:40px 16px;">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:8px;border:1px solid #e8e8e8;max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="padding:28px 32px 20px;border-bottom:1px solid #f0f0f0;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td>
                <span style="font-size:18px;font-weight:700;color:#111;">INWOUT</span>
                <span style="font-size:13px;color:#999;margin-left:8px;">· Control Horario</span>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:28px 32px;">
          <p style="margin:0 0 24px;font-size:15px;color:#333;line-height:1.6;">
            Aquí tienes tu estimación de riesgo basada en los datos introducidos.
          </p>

          <!-- Two cards -->
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:16px;">
            <tr>
              <td width="48%" valign="top" style="padding-right:8px;">
                <div style="border:1px solid #e8e8e8;border-radius:8px;padding:20px;text-align:center;">
                  <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#888;font-weight:600;">Sanción ITSS estimada</p>
                  <p style="margin:0 0 6px;font-size:22px;font-weight:700;color:#111;">${fmt(data.itss_min)} – ${fmt(data.itss_max)}</p>
                  <p style="margin:0;font-size:12px;color:#999;">Por centro de trabajo (${data.work_centers})</p>
                </div>
              </td>
              <td width="4%"></td>
              <td width="48%" valign="top" style="padding-left:8px;">
                <div style="border:1px solid #e8e8e8;border-radius:8px;padding:20px;text-align:center;">
                  <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#888;font-weight:600;">Riesgo judicial estimado</p>
                  <p style="margin:0 0 6px;font-size:22px;font-weight:700;color:#111;">${fmt(data.judicial_min)} – ${fmt(data.judicial_max)}</p>
                  <p style="margin:0;font-size:12px;color:#999;">Por trabajadores afectados (${data.employees})</p>
                </div>
              </td>
            </tr>
          </table>

          <!-- Total -->
          <div style="background:#fafafa;border:1px solid #e8e8e8;border-radius:8px;padding:16px 20px;text-align:center;margin-bottom:28px;">
            <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.5px;color:#888;font-weight:600;">Riesgo total estimado</span>
            <p style="margin:6px 0 0;font-size:24px;font-weight:700;color:#111;">${fmt(data.total_min)} – ${fmt(data.total_max)}</p>
          </div>

          ${infractionsRows ? `
          <!-- Infractions table -->
          <p style="font-size:14px;font-weight:600;color:#111;margin:0 0 12px;">Infracciones seleccionadas</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:28px;border:1px solid #e8e8e8;border-radius:8px;overflow:hidden;">
            <thead>
              <tr style="background:#fafafa;">
                <th style="padding:10px 14px;text-align:left;font-size:11px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:0.3px;border-bottom:1px solid #e8e8e8;">Infracción</th>
                <th style="padding:10px 14px;text-align:left;font-size:11px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:0.3px;border-bottom:1px solid #e8e8e8;">Nivel</th>
                <th style="padding:10px 14px;text-align:right;font-size:11px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:0.3px;border-bottom:1px solid #e8e8e8;">Rango</th>
              </tr>
            </thead>
            <tbody>${infractionsRows}</tbody>
          </table>
          ` : ''}

          <!-- Disclaimer -->
          <p style="font-size:12px;color:#999;line-height:1.5;margin:0 0 28px;padding-top:8px;border-top:1px solid #f0f0f0;">
            Estimación orientativa basada en LISOS art. 40 (RD Legislativo 5/2000) y RD 8/2019. La sanción real depende del criterio del inspector. No constituye asesoramiento legal.
          </p>

          <!-- CTA -->
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr><td align="center">
              <a href="https://inwoutapp.com/demo-online?utm_source=calculadora&utm_medium=email&utm_campaign=sanction_report" style="display:inline-block;background:#0fb89f;color:#ffffff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">Evitar estas sanciones →</a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 32px;border-top:1px solid #f0f0f0;text-align:center;">
          <p style="margin:0;font-size:12px;color:#bbb;">INWOUT · <a href="https://inwoutapp.com" style="color:#999;text-decoration:none;">inwout.com</a></p>
          <p style="margin:6px 0 0;font-size:11px;color:#ccc;">Generado el ${fecha}</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    // 1. Send report to lead
    const reportRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'INWOUT <noreply@inwout.com>',
        reply_to: 'hi@inwout.com',
        to: [data.email],
        subject: 'Tu estimación de sanciones laborales — INWOUT',
        html: reportHtml,
      }),
    })

    if (!reportRes.ok) {
      const errText = await reportRes.text()
      console.error('Failed to send report email:', errText)
    }

    // 2. Internal notification
    const internalHtml = `
      <div style="font-family:-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
        <h2 style="margin:0 0 16px;font-size:16px;color:#111;">📊 Nuevo lead — Calculadora de Sanciones</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;font-weight:600;color:#666;width:120px;">Email</td><td style="padding:6px 0;"><a href="mailto:${data.email}" style="color:#0fb89f;">${data.email}</a></td></tr>
          <tr><td style="padding:6px 0;font-weight:600;color:#666;">ITSS</td><td style="padding:6px 0;">${fmt(data.itss_min)} – ${fmt(data.itss_max)}</td></tr>
          <tr><td style="padding:6px 0;font-weight:600;color:#666;">Judicial</td><td style="padding:6px 0;">${fmt(data.judicial_min)} – ${fmt(data.judicial_max)}</td></tr>
          <tr><td style="padding:6px 0;font-weight:600;color:#666;">Total</td><td style="padding:6px 0;font-weight:700;">${fmt(data.total_min)} – ${fmt(data.total_max)}</td></tr>
          <tr><td style="padding:6px 0;font-weight:600;color:#666;">Centros</td><td style="padding:6px 0;">${data.work_centers}</td></tr>
          <tr><td style="padding:6px 0;font-weight:600;color:#666;">Empleados</td><td style="padding:6px 0;">${data.employees}</td></tr>
          <tr><td style="padding:6px 0;font-weight:600;color:#666;">Infracciones</td><td style="padding:6px 0;">${data.infractions?.join(', ') || '—'}</td></tr>
        </table>
      </div>`

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'INWOUT <noreply@inwout.com>',
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
