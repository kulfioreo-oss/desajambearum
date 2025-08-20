import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - List active homepage images (public endpoint)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')

    const images = await prisma.homepageImage.findMany({
      where: { 
        isActive: true,
        ...(section ? { section } : {})
      },
      orderBy: [
        { section: 'asc' },
        { sortOrder: 'asc' },
        { createdAt: 'desc' }
      ],
      select: {
        id: true,
        section: true,
        title: true,
        description: true,
        imageUrl: true,
        altText: true,
        sortOrder: true
      }
    })

    return NextResponse.json(images)
  } catch (error) {
    console.error('Error fetching homepage images:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 