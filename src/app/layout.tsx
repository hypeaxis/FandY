import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FandY — Hedging and Earning from Funding Rates',
  description:
    'Hedging and Earning from The Funding Rates on Solana. Trade Interest Rate Swaps with up to 1000x leverage.',
  icons: {
    icon: '/logo/type=Logomark.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-bg-primary text-white antialiased font-sans flex flex-col">
        {children}
      </body>
    </html>
  );
}
