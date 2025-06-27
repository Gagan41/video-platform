'use client';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createSupabaseServerClient } from '@/lib/auth';

type Playlist = {
  id: string;
  title: string;
  description?: string;
};

export default function UploadVideoPage() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [trailer, setTrailer] = useState('');
  const [playlistId, setPlaylistId] = useState('');
  const [playlists, setPlaylists] = useState<Playlist[]>([]); // ✅ Typed here

  useEffect(() => {
    (async () => {
      const supabase = await createSupabaseServerClient();
    supabase
      .from('playlists')
      .select('*')
      .then(({ data }) => setPlaylists(data || []));
    })();
  }, []);

  const handleUpload = async () => {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from('videos').insert({
      title,
      full_url: url,
      trailer_url: trailer,
      is_premium: true,
      playlist_id: playlistId || null,
    });

    if (error) alert(error.message);
    else alert('Video uploaded!');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <Input placeholder="Video URL" value={url} onChange={e => setUrl(e.target.value)} />
      <Input placeholder="Trailer URL" value={trailer} onChange={e => setTrailer(e.target.value)} />

      <select
        className="w-full p-2 border border-gray-300 rounded"
        value={playlistId}
        onChange={e => setPlaylistId(e.target.value)}
      >
        <option value="">No Playlist</option>
          {playlists.map(p => (
          <option key={p.id} value={p.id}>
            {p.title}
          </option>
        ))}
      </select>

      <Button onClick={handleUpload}>Upload Video</Button>
    </div>
  );
}
