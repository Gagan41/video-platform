import { useEffect, useState } from "react";
import { createSupabaseServerClient } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const [videos, setVideos] = useState<any[]>([]);
  const [playlists, setPlaylists] = useState<any[]>([]);
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
      if (profile?.role === "admin") {
        router.push("/admin/dashboard");
        return;
      }
      setUser(user);
      // Fetch user's videos
      supabase
        .from("videos")
        .select("*")
        .eq("user_id", user.id)
        .then(({ data }) => setVideos(data || []));
      // Fetch user's playlists
      supabase
        .from("playlists")
        .select("*")
        .eq("user_id", user.id)
        .then(({ data }) => setPlaylists(data || []));
    })();
  }, [router]);

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>
      <h2 className="text-xl font-semibold mt-6 mb-2">Your Videos</h2>
      <ul className="mb-6">
        {videos.length === 0 && <li>No videos uploaded yet.</li>}
        {videos.map((video) => (
          <li key={video.id} className="mb-2">
            {video.title}
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Your Playlists</h2>
      <ul>
        {playlists.length === 0 && <li>No playlists created yet.</li>}
        {playlists.map((playlist) => (
          <li key={playlist.id} className="mb-2">
            {playlist.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
