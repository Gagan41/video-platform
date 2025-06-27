import { NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch user role from metadata
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden: Admins only' }, { status: 403 });
  }

  const body = await req.json();
  const { title, full_url, trailer_url, is_premium, playlist_id, thumbnail_url } = body;

  const { error: insertError } = await supabase.from('videos').insert({
    title,
    full_url,
    trailer_url,
    is_premium,
    playlist_id,
    thumbnail_url,
  });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
