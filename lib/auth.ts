import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabase } from "./supabaseClient";

export const createSupabaseServerClient = async () => {
  const supabase = createServerComponentClient({ cookies });
  await supabase.auth.updateUser({
    data: { role: "admin" }, // or 'free', 'premium'
  });
  return supabase;
};

export async function isAdmin() {
  const session = await supabase.auth.getSession();
  if (!session) return false;
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.data.session?.user.id)
    .single();
  return profile?.role === "admin";
}
