import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface UMKMLayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

async function getUMKMData(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'
    const response = await fetch(`${baseUrl}/api/umkm/${id}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
    return data.success ? data.data : null
  } catch (error) {
    console.error('Error fetching UMKM data:', error)
    return null
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params
  const umkm = await getUMKMData(id)
  
  if (!umkm) {
    return {
      title: 'UMKM Tidak Ditemukan',
      description: 'UMKM yang Anda cari tidak ditemukan di Desa Jambearum'
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'
  const title = `${umkm.name} - UMKM ${umkm.category} Desa Jambearum`
  const description = umkm.description || 
    `${umkm.name} adalah UMKM ${umkm.category} yang dikelola oleh ${umkm.owner} di Dusun ${umkm.dusun}, Desa Jambearum. Menyediakan ${umkm.products.slice(0, 3).join(', ')} berkualitas tinggi.`

  return {
    title,
    description,
    keywords: [
      umkm.name,
      umkm.category,
      umkm.dusun,
      'UMKM',
      'Desa Jambearum',
      'Jember',
      'Jawa Timur',
      ...umkm.products
    ],
    authors: [{ name: umkm.owner }],
    creator: umkm.owner,
    alternates: {
      canonical: `/umkm/${umkm.id}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/umkm/${umkm.id}`,
      images: umkm.image ? [
        {
          url: umkm.image,
          width: 1200,
          height: 630,
          alt: umkm.name,
        }
      ] : [
        {
          url: '/og-image-umkm.jpg',
          width: 1200,
          height: 630,
          alt: `${umkm.name} - UMKM Desa Jambearum`,
        }
      ],
      siteName: 'Desa Jambearum',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: umkm.image ? [umkm.image] : ['/og-image-umkm.jpg'],
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
}

export default function UMKMLayout({ children }: UMKMLayoutProps) {
  return <>{children}</>
} 