import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio - Parag Jain',
  description: 'Personal portfolio website showcasing my projects and skills.',
  keywords: ['portfolio', 'web development', 'full stack', 'software engineer', 'developer'],
  authors: [{ name: 'Parag Jain' }],
  creator: 'Parag Jain',
  publisher: 'Parag Jain',
  robots: 'index, follow',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
  },
};
