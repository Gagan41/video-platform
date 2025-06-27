// components/LockedContent.tsx
import Link from 'next/link';

export default function LockedContent() {
  return (
    <div className="p-6 text-center border rounded bg-yellow-50 border-yellow-300 text-yellow-800">
      <p className="mb-2">This content is for Premium users only.</p>
      <Link href="/pricing" className="text-blue-600 underline">Upgrade Now</Link>
    </div>
  );
}
