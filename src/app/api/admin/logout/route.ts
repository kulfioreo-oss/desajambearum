import { NextResponse } from 'next/server'
import { clearAdminCookie } from '@/lib/auth'

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logout berhasil'
    })

    // Clear authentication cookie
    return clearAdminCookie(response)

  } catch (error) {
    console.error('Logout error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Terjadi kesalahan server'
    }, { status: 500 })
  }
} 