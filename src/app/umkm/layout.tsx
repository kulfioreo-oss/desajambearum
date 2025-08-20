import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Direktori UMKM - Desa Jambearum',
  description: 'Direktori lengkap UMKM Desa Jambearum. Temukan berbagai produk berkualitas dari pelaku usaha kecil menengah di 7 dusun: Karang Sampurna, Paceh, Krajan, Sumber Kokap Barat, Sumber Kokap Timur, Biarum, dan Sumber Petung.',
  keywords: [
    'direktori UMKM',
    'UMKM Desa Jambearum',
    'usaha kecil Jember',
    'produk lokal Jawa Timur',
    'ekonomi desa',
    'kerajinan tangan',
    'hasil pertanian',
    'produk olahan',
    'Silo Jember',
    'Gunung Raung'
  ],
  openGraph: {
    title: 'Direktori UMKM Desa Jambearum - Produk Lokal Berkualitas',
    description: 'Jelajahi direktori lengkap UMKM Desa Jambearum. Dukung ekonomi lokal dengan memilih produk berkualitas dari para pelaku usaha di kaki Gunung Raung.',
    type: 'website',
    url: '/umkm',
    images: [
      {
        url: '/og-image-umkm-directory.jpg',
        width: 1200,
        height: 630,
        alt: 'Direktori UMKM Desa Jambearum',
      },
    ],
    siteName: 'Desa Jambearum',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Direktori UMKM Desa Jambearum',
    description: 'Jelajahi direktori lengkap UMKM Desa Jambearum. Dukung ekonomi lokal dengan produk berkualitas dari kaki Gunung Raung.',
    images: ['/og-image-umkm-directory.jpg'],
  },
  alternates: {
    canonical: '/umkm',
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
}

interface UMKMLayoutProps {
  children: React.ReactNode
}

export default function UMKMLayout({ children }: UMKMLayoutProps) {
  return <>{children}</>
} 