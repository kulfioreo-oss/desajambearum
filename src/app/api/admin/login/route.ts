import { NextRequest, NextResponse } from 'next/server'
import { validateCredentials, createToken, setAdminCookie, type AdminUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validate input
    if (!username || !password) {
      return NextResponse.json({
        success: false,
        message: 'Username dan password harus diisi'
      }, { status: 400 })
    }

    // Validate credentials against database
    const adminUser = await validateCredentials(username, password)
    
    if (!adminUser) {
      return NextResponse.json({
        success: false,
        message: 'Username atau password salah'
      }, { status: 401 })
    }

    // Create JWT token
    const token = await createToken(adminUser)

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login berhasil',
      user: {
        username: adminUser.username,
        role: adminUser.role
      }
    })

    // Set authentication cookie
    return setAdminCookie(response, token)

  } catch (error) {
    console.error('Login error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Terjadi kesalahan server'
    }, { status: 500 })
  }
} 