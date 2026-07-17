import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Virtual Studio para Lojistas | Ensaios Fotográficos de Elite com IA',
  description: 'Revolucione suas vendas com ensaios fotográficos Dark Premium para lojistas. Escolha modelos virtuais de elite e transforme seus produtos em obras de arte com o Virtual Studio.',
  keywords: [
    'Virtual Studio',
    'lojistas',
    'e-commerce',
    'fotografia de produtos',
    'modelos virtuais',
    'Dark Premium',
    'ensaio fotográfico',
    'IA',
    'marketing digital',
    'catálogo de produtos'
  ],
  openGraph: {
    title: 'Virtual Studio para Lojistas | Ensaios Fotográficos de Elite com IA',
    description: 'Revolucione suas vendas com ensaios fotográficos Dark Premium para lojistas. Escolha modelos virtuais de elite e transforme seus produtos em obras de arte com o Virtual Studio.',
    url: 'https://virtualstudio.click/lojistas',
    siteName: 'Virtual Studio',
    images: [
      {
        url: '/logo_transparente_.png',
        width: 1200,
        height: 630,
        alt: 'Virtual Studio para Lojistas - Ensaios de Elite com IA',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Studio para Lojistas | Ensaios Fotográficos de Elite com IA',
    description: 'Revolucione suas vendas com ensaios fotográficos Dark Premium para lojistas. Escolha modelos virtuais de elite e transforme seus produtos em obras de arte com o Virtual Studio.',
    images: ['/logo_transparente_.png'],
  },
};

export default function LojistasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
