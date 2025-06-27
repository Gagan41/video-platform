import { createSupabaseServerClient } from '@/lib/auth';
import { notFound } from 'next/navigation';

export default async function VideoPage({ params }: { params: { id: string } }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: video } = await supabase
    .from('videos')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!video) notFound();

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user?.id || '')
    .single();

  const isPremiumUser = profile?.role === 'premium' || profile?.role === 'admin';

  const showFull = isPremiumUser;

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-4">
      <h1 className="text-2xl font-bold">{video.title}</h1>
      <p>{video.description}</p>

      <div className="aspect-video w-full bg-black">
        {showFull ? (
          <iframe
            className="w-full h-full"
            src={video.full_url}
            allowFullScreen
          />
        ) : (
          <>
            <iframe
              className="w-full h-full"
              src={video.trailer_url}
              allowFullScreen
            />
            <div className="mt-4 p-4 bg-yellow-100 rounded">
              <p className="text-center text-sm font-medium text-yellow-700">
                This is a preview. <a href="/pricing" className="underline">Upgrade to premium</a> to watch the full video.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
