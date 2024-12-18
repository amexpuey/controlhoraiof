import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  to: string[];
  verificationLink: string;
  companySize: string;
  selectedFeatures: string[];
  userEmail: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { to, verificationLink, companySize, selectedFeatures, userEmail }: EmailRequest = await req.json()

    if (!to || !verificationLink) {
      throw new Error('Missing required fields: to or verificationLink')
    }

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set')
    }

    // Format features list for email
    const featuresList = selectedFeatures
      .map(feature => `• ${feature}`)
      .join('<br>');

    const emailHtml = `
      <h2>Nueva solicitud de Control Horario Electrónico</h2>
      
      <p>Se ha recibido una nueva solicitud con los siguientes detalles:</p>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Email del usuario:</strong> ${userEmail}</p>
        <p><strong>Tamaño de empresa:</strong> ${companySize} empleados</p>
        <p><strong>Características seleccionadas:</strong></p>
        ${featuresList}
      </div>
      
      <p>El usuario podrá acceder a su selección personalizada a través del siguiente enlace:</p>
      
      <p style="text-align: center; margin: 30px 0;">
        <a href="${verificationLink}" 
           style="background-color: #0070f3; 
                  color: white; 
                  padding: 12px 24px; 
                  text-decoration: none; 
                  border-radius: 6px;
                  font-weight: bold;
                  display: inline-block;">
          Ver aplicaciones recomendadas ➜
        </a>
      </p>
    `

    // During testing, we can only send to the verified email
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Control Horario Electrónico <onboarding@resend.dev>',
        to: ['amexpuey@gmail.com'], // Override to always send to verified email during testing
        subject: `Nueva solicitud de ${userEmail}`,
        html: emailHtml,
      }),
    });

    const responseText = await res.text()
    console.log('Resend API response:', responseText)

    if (!res.ok) {
      throw new Error(`Failed to send email: ${responseText}`)
    }

    const data = JSON.parse(responseText)
    console.log('Email sent successfully:', data)

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    console.error('Error in send-verification-email function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})