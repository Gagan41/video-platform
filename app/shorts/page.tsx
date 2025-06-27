'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createSupabaseServerClient } from '@/lib/auth';

type Short = {
  id: string;
  title: string;
  video_url: string;
  is_premium: boolean;
};

export default function ShortsPage() {
  const [shorts, setShorts] = useState<Short[]>([]);
  const [index, setIndex] = useState(0);
  const [role, setRole] = useState<'free' | 'premium' | 'admin'>('free');

  useEffect(() => {
    (async () => {
      const supabase = await createSupabaseServerClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();
        setRole(data?.role || 'free');
      }

      const { data: shortsData } = await supabase
        .from('shorts')
        .select('*')
        .order('created_at', { ascending: false });

      const filtered = shortsData?.filter(short => short.is_premium === false || role !== 'free') || [];
      setShorts(filtered);
    })();
  }, [role]);

  const handleSwipe = (dir: 'up' | 'down') => {
    if (dir === 'up' && index < shorts.length - 1) setIndex(index + 1);
    if (dir === 'down' && index > 0) setIndex(index - 1);
  };

  if (!shorts.length) return <p className="text-center mt-10">No shorts available</p>;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={shorts[index].id}
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          exit={{ y: -300 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
          onClick={() => handleSwipe('up')}
        >
          <video
            src={shorts[index].video_url}
            className="h-full w-full object-cover"
            autoPlay
            loop
            controls={false}
            muted
          />
          <div className="absolute bottom-10 left-4 text-white bg-black/60 p-3 rounded">
            <h3 className="text-xl font-bold">{shorts[index].title}</h3>
            {shorts[index].is_premium && role === 'free' && (
              <p className="text-sm text-red-400 mt-1">Upgrade to watch premium shorts</p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
