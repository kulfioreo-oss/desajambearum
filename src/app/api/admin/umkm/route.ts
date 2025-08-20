import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'

// GET /api/admin/umkm - Get all UMKM data
export async function GET() {
  try {
    // Check admin authentication
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({
        success: false,
        message: 'Akses ditolak'
      }, { status: 401 })
    }

    const umkmList = await prisma.uMKM.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: umkmList
    })

  } catch (error) {
    console.error('Error fetching UMKM:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Terjadi kesalahan server'
    }, { status: 500 })
  }
}

// POST /api/admin/umkm - Create new UMKM
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({
        success: false,
        message: 'Akses ditolak'
      }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, category, owner, phone, address, dusun, products, image } = body

    // Validate required fields
    if (!name || !category || !owner || !dusun) {
      return NextResponse.json({
        success: false,
        message: 'Field yang wajib diisi: name, category, owner, dusun'
      }, { status: 400 })
    }

    const newUMKM = await prisma.uMKM.create({
      data: {
        name,
        description,
        category,
        owner,
        phone,
        address,
        dusun,
        products: products || [],
        image,
        isActive: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'UMKM berhasil ditambahkan',
      data: newUMKM
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating UMKM:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Terjadi kesalahan server'
    }, { status: 500 })
  }
} 