import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  to: string[];
  verificationLink: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { to, verificationLink }: EmailRequest = await req.json()

    if (!to || !verificationLink) {
      throw new Error('Missing required fields: to or verificationLink')
    }

    const emailHtml = `
      <h1>¡Hola!</h1>
      
      <p>Gracias por unirte a Control Horario Electrónico, la plataforma ideal para encontrar soluciones de control horario completamente adaptadas a la normativa de España. 🙌</p>
      
      <p>Para comenzar, solo necesitas verificar tu correo electrónico y acceder a la página donde podrás explorar las mejores aplicaciones para la gestión de tu tiempo, todas cumpliendo con las leyes y normativas laborales del país.</p>
      
      <p>Haz clic en el siguiente enlace para confirmar tu cuenta:</p>
      
      <p><a href="${verificationLink}" style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Verifica tu correo y accede a las aplicaciones</a></p>
      
      <p>Una vez que confirmes tu correo, serás redirigido directamente a nuestra página, donde podrás explorar las aplicaciones de control horario más recomendadas, basadas en las características que más te interesen y en el cumplimiento de la normativa compliance en España.</p>
      
      <p>Si no te registraste en Control Horario Electrónico, puedes ignorar este correo. Si tienes alguna duda, no dudes en ponerte en contacto con nosotros.</p>
      
      <p>¡Esperamos ayudarte a encontrar la solución perfecta para tu empresa!</p>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Control Horario Electrónico <onboarding@resend.dev>',
        to,
        subject: '¡Bienvenido a Control Horario Electrónico! 🎉 Verifica tu correo',
        html: emailHtml,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      console.error('Resend API error:', error)
      throw new Error('Failed to send email')
    }

    const data = await res.json()
    console.log('Email sent successfully:', data)

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error in send-verification-email function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})