import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";

export default function UploadShortsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [playlistId, setPlaylistId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const supabase = await createSupabaseServerClient();
      // Fetch playlists for selection
      supabase
        .from("playlists")
        .select("*")
        .then(({ data }) => setPlaylists(data || []));
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!file) {
      setError("Please select a video file.");
      return;
    }
    // Upload file to Supabase Storage (or your storage solution)
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("shorts")
      .upload(`shorts/${file.name}`, file);
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    // Insert short metadata into DB
    const { error: dbError } = await supabase.from("shorts").insert({
      title,
      description,
      video_url: uploadData?.path,
      playlist_id: playlistId || null,
    });
    if (dbError) {
      setError(dbError.message);
      return;
    }
    setSuccess("Short uploaded successfully!");
    setTitle("");
    setDescription("");
    setFile(null);
    setPlaylistId("");
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Upload Short</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full"
          required
        />
        <select
          value={playlistId}
          onChange={(e) => setPlaylistId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">No Playlist</option>
          {playlists.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
