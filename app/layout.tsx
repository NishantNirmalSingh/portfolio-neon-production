import type { Metadata } from 'next';
import './globals.css';
import { CursorProvider } from '@/components/providers/CursorProvider';
import { AudioProvider } from '@/components/providers/AudioProvider';
import InteractiveCursor from '@/components/ui/InteractiveCursor';
import AtmosphericCanvas from '@/components/ui/AtmosphericCanvas';

export const metadata: Metadata = {
  title: {
    default: 'Dev Portfolio — Full-Stack Freelance Developer',
    template: '%s | Dev Portfolio',
  },
  description:
    'Experienced full-stack developer specializing in modern web apps, APIs, and automation. Available for freelance projects.',
  keywords: ['freelance developer', 'full-stack', 'web development', 'Next.js', 'React', 'API', 'hire developer'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Dev Portfolio',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <body className="bg-transparent text-white antialiased">
        <AudioProvider>
          <CursorProvider>
            <AtmosphericCanvas />
            <InteractiveCursor />
            <div className="relative z-10 w-full min-h-screen">
              {children}
            </div>
          </CursorProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
