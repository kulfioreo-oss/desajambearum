import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const { action, ids } = await request.json()

    if (!action || !ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid request data' 
      }, { status: 400 })
    }

    let result
    let message = ''

    switch (action) {
      case 'activate':
        result = await prisma.uMKM.updateMany({
          where: { id: { in: ids } },
          data: { isActive: true, updatedAt: new Date() }
        })
        message = `${result.count} UMKM berhasil diaktifkan`
        break

      case 'deactivate':
        result = await prisma.uMKM.updateMany({
          where: { id: { in: ids } },
          data: { isActive: false, updatedAt: new Date() }
        })
        message = `${result.count} UMKM berhasil dinonaktifkan`
        break

      case 'delete':
        result = await prisma.uMKM.deleteMany({
          where: { id: { in: ids } }
        })
        message = `${result.count} UMKM berhasil dihapus`
        break

      default:
        return NextResponse.json({ 
          success: false, 
          message: 'Invalid action' 
        }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message,
      affected: result.count
    })

  } catch (error) {
    console.error('Bulk action error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to perform bulk action' 
    }, { status: 500 })
  }
} 