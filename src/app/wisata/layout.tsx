import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wisata Desa Jambearum - Lahar Beku Panjang & Agrowisata Kaki Gunung Raung',
  description: 'Jelajahi keindahan wisata alam Desa Jambearum di kaki Gunung Raung. Nikmati Lahar Beku Panjang di Hutan Lindung Petak 124, river trekking Sungai Bire, agrowisata durian-kopi-manggis, dan trekking hutan pinus yang sejuk.',
  keywords: [
    'wisata Desa Jambearum',
    'Lahar Beku Panjang',
    'wisata Gunung Raung',
    'Hutan Lindung Petak 124',
    'river trekking Jember',
    'agrowisata Jawa Timur',
    'wisata alam Silo',
    'trekking hutan pinus',
    'Sungai Bire',
    'wisata durian Jember',
    'desa wisata Bondowoso',
    'kolam batu alami',
    'KKN UNEJ',
    'wisata konservasi'
  ],
  authors: [{ name: 'Desa Jambearum' }],
  creator: 'Desa Jambearum',
  openGraph: {
    title: 'Wisata Desa Jambearum - Lahar Beku Panjang & Agrowisata Kaki Gunung Raung',
    description: 'Jelajahi keindahan Lahar Beku Panjang, river trekking Sungai Bire, agrowisata durian-kopi-manggis, dan trekking hutan pinus di kaki Gunung Raung.',
    type: 'website',
    url: '/wisata',
    images: [
      {
        url: '/og-image-wisata.jpg',
        width: 1200,
        height: 630,
        alt: 'Wisata Desa Jambearum - Lahar Beku Panjang di Kaki Gunung Raung',
      },
    ],
    siteName: 'Desa Jambearum',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wisata Desa Jambearum - Lahar Beku Panjang & Agrowisata',
    description: 'Nikmati keindahan alam Lahar Beku Panjang, river trekking, dan agrowisata di kaki Gunung Raung, Jember.',
    images: ['/og-image-wisata.jpg'],
  },
  alternates: {
    canonical: '/wisata',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Tourism',
  classification: 'Tourism & Travel',
  other: {
    'geo.region': 'ID-JI',
    'geo.placename': 'Jember',
    'geo.position': '-8.1234;113.5678',
    'ICBM': '-8.1234, 113.5678'
  }
}

interface WisataLayoutProps {
  children: React.ReactNode
}

export default function WisataLayout({ children }: WisataLayoutProps) {
  return <>{children}</>
} 