import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const authHeader = req.headers.get('Authorization')?.split(' ')[1]
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(authHeader)
    if (authError || !user || (user.email !== 'amexpuey@gmail.com' && user.email !== 'onboarding@inwout.app')) {
      throw new Error('Unauthorized')
    }

    const { data, error } = await supabaseAdmin.auth.admin.listUsers()
    if (error) {
      console.error('Error fetching users:', error)
      throw error
    }

    const users = data.users.map(user => ({
      id: user.id,
      email: user.email,
      email_confirmed_at: user.email_confirmed_at,
      created_at: user.created_at
    }))

    console.log(`Successfully fetched ${users.length} users`)
    
    return new Response(
      JSON.stringify({ users }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  } catch (error) {
    console.error('Error in admin-list-users:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    const statusCode = errorMessage === 'Unauthorized' ? 403 : 400
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: statusCode,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  }
})