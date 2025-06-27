import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, description, user_id } = body;
  const { data, error } = await supabase.from("playlists").insert({
    title,
    description,
    user_id,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ data }, { status: 201 });
}
