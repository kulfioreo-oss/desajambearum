import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const umkm = await prisma.uMKM.findUnique({
      where: {
        id,
        isActive: true
      }
    })

    if (!umkm) {
      return NextResponse.json({
        success: false,
        message: 'UMKM tidak ditemukan'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: umkm
    })

  } catch (error) {
    console.error('Error fetching UMKM detail:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Terjadi kesalahan server'
    }, { status: 500 })
  }
} 