import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const redirectTo = requestUrl.searchParams.get('redirect_to')?.toString();
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    // Este paso es CLAVE: intercambia el código por una sesión válida
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirige a la página de actualización de contraseña
  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // Si no hay redirectTo, va a la página principal
  return NextResponse.redirect(`${origin}/`);
}