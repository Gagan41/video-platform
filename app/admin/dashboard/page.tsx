"use client";
import { useEffect, useState } from "react";
import { createSupabaseServerClient } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const supabase = await createSupabaseServerClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      // Fetch user profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      if (profile?.role !== "admin") {
        router.push("/dashboard");
        return;
      }
      setUser(user);
    })();
  }, [router]);

  if (!user) return null;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="space-x-4">
        <Link href="/admin/upload">
          <Button>Upload Video</Button>
        </Link>
      </div>
    </div>
  );
}
