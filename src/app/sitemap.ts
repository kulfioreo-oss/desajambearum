import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/umkm`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wisata`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Dynamic UMKM pages
  let umkmPages: MetadataRoute.Sitemap = []
  
  try {
    const umkmList = await prisma.uMKM.findMany({
      where: { isActive: true },
      select: { id: true, updatedAt: true }
    })

    umkmPages = umkmList.map((umkm) => ({
      url: `${baseUrl}/umkm/${umkm.id}`,
      lastModified: umkm.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Error generating sitemap:', error)
  }

  return [...staticPages, ...umkmPages]
} 