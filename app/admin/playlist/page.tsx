'use client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { requireAuth } from '@/lib/auth';

export const getServerSideProps = requireAuth(async (ctx: any) => {
  return { props: {} };
}, ['admin']);

export default function PlaylistPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [playlists, setPlaylists] = useState<any[]>([]);

  const fetchPlaylists = async () => {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('playlists').select('*');
    setPlaylists(data || []);
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleCreate = async () => {
    const supabase = await createSupabaseServerClient();
    await supabase.from('playlists').insert({ title, description });
    setTitle('');
    setDescription('');
    fetchPlaylists();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold">Create Playlist</h1>
      <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <Button onClick={handleCreate}>Create</Button>

      <div className="mt-8 space-y-2">
        {playlists.map(p => (
          <div key={p.id} className="border p-4 rounded bg-white shadow">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-500">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
