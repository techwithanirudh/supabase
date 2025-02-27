// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.140.0/http/server.ts'

import { handler } from './handler.tsx'

// @ts-ignore
serve(handler)

// To deploy: supabase functions deploy opengraph --no-verify-jwt
