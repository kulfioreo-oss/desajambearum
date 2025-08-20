import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'

// GET - List all homepage images
export async function GET(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin(request)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')

    const images = await prisma.homepageImage.findMany({
      where: section ? { section } : {},
      orderBy: [
        { section: 'asc' },
        { sortOrder: 'asc' },
        { createdAt: 'desc' }
      ]
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

// POST - Create new homepage image
export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin(request)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { section, title, description, imageUrl, altText, isActive = true, sortOrder = 0 } = body

    if (!section || !imageUrl || !altText) {
      return NextResponse.json(
        { error: 'Section, imageUrl, and altText are required' },
        { status: 400 }
      )
    }

    const newImage = await prisma.homepageImage.create({
      data: {
        section,
        title,
        description,
        imageUrl,
        altText,
        isActive,
        sortOrder
      }
    })

    return NextResponse.json(newImage, { status: 201 })
  } catch (error) {
    console.error('Error creating homepage image:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 