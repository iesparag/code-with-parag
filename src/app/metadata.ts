import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Parag Jain — GenAI Engineer & Full-Stack Developer',
  description:
    'GenAI engineer & full-stack developer building production LLM apps — AI agents, RAG, and MCP tooling on scalable Node.js microservices (MERN/MEAN).',
  keywords: [
    'GenAI engineer',
    'AI developer',
    'LLM apps',
    'RAG',
    'AI agents',
    'LangChain',
    'LangGraph',
    'MCP',
    'full stack developer',
    'Node.js',
    'MERN',
    'Parag Jain',
  ],
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
    icon: '/logo.svg',
  },
};
