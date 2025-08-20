import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/auth'

export async function GET() {
  try {
    const user = await getCurrentAdmin()

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Tidak terautentikasi'
      }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      user: {
        username: user.username,
        role: user.role,
        loginTime: user.loginTime
      }
    })

  } catch (error) {
    console.error('Get current admin error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Terjadi kesalahan server'
    }, { status: 500 })
  }
} 