import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const umkmData = await prisma.uMKM.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        isActive: true
      }
    })

    return NextResponse.json({
      success: true,
      data: umkmData,
      total: umkmData.length,
      withImages: umkmData.filter(u => u.image).length,
      imageUrls: umkmData.filter(u => u.image).map(u => ({ name: u.name, image: u.image }))
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
} 