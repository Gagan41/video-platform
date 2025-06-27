import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, description, video_url, playlist_id } = body;
  const { data, error } = await supabase.from("shorts").insert({
    title,
    description,
    video_url,
    playlist_id: playlist_id || null,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ data }, { status: 201 });
}
