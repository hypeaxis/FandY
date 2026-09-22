'use client';

import Link from 'next/link';

interface ComingSoonProps {
  title: string;
  icon: string;
  description: string;
}

export default function ComingSoon({ title, icon, description }: ComingSoonProps) {
  return (
    <div className="flex flex-1 items-center justify-center bg-bg-primary px-4 py-16 min-h-[calc(100vh-48px)]">
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Brand pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-default bg-bg-tertiary px-3.5 py-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/type=Logomark.png"
            alt="FandY"
            className="h-4 w-auto object-contain"
          />
          <span className="text-xs font-bold text-white">FandY</span>
        </div>

        {/* Floating icon */}
        <div className="mb-6 text-6xl animate-bounce">{icon}</div>

        {/* Title */}
        <h1
          className="mb-2 text-3xl font-extrabold tracking-tight"
          style={{
            background: 'linear-gradient(90deg, #F531AB 0%, #8F1D64 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </h1>

        <p className="mb-4 text-base font-semibold tracking-widest uppercase text-neutral-400">
          Coming Soon
        </p>

        <p className="mb-8 text-sm leading-relaxed text-neutral-400">
          {description}
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:opacity-95 hover:shadow-pink-glow"
          style={{
            background: 'linear-gradient(90deg, #F531AB 0%, #8F1D64 100%)',
          }}
        >
          ← Back to Market
        </Link>
      </div>
    </div>
  );
}
