import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'

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

    // Get statistics from database
    const [totalUMKM, activeUMKM, totalUsers, totalAdmins] = await Promise.all([
      prisma.uMKM.count(),
      prisma.uMKM.count({ where: { isActive: true } }),
      prisma.user.count(),
      prisma.admin.count({ where: { isActive: true } })
    ])

    return NextResponse.json({
      success: true,
      data: {
        totalUMKM,
        activeUMKM,
        totalUsers,
        totalAdmins,
        lastUpdated: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Error fetching stats:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Terjadi kesalahan server'
    }, { status: 500 })
  }
} 