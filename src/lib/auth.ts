import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'jambearum-secret-key-2024')
const JWT_ALGORITHM = 'HS256'

export interface AdminUser {
  id: string
  username: string
  role: string
  loginTime: number
}

// Create JWT token
export async function createToken(user: AdminUser): Promise<string> {
  return await new SignJWT({ ...user })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET)
}

// Verify JWT token
export async function verifyToken(token: string): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as AdminUser
  } catch {
    return null
  }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

// Validate admin credentials against database
export async function validateCredentials(username: string, password: string): Promise<AdminUser | null> {
  try {
    const admin = await prisma.admin.findUnique({
      where: { 
        username,
        isActive: true
      }
    })

    if (!admin) {
      return null
    }

    const isValidPassword = await bcrypt.compare(password, admin.password)
    
    if (!isValidPassword) {
      return null
    }

    // Update last login
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() }
    })

    return {
      id: admin.id,
      username: admin.username,
      role: admin.role,
      loginTime: Date.now()
    }
  } catch (error) {
    console.error('Error validating credentials:', error)
    return null
  }
}

// Get current admin user from cookies
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin-token')?.value
  
  if (!token) {
    return null
  }

  return await verifyToken(token)
}

// Set admin authentication cookie
export function setAdminCookie(response: NextResponse, token: string): NextResponse {
  response.cookies.set({
    name: 'admin-token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  })
  return response
}

// Clear admin authentication cookie
export function clearAdminCookie(response: NextResponse): NextResponse {
  response.cookies.set({
    name: 'admin-token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
  return response
}

// Check if user is authenticated admin
export async function isAdminAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('admin-token')?.value
  
  if (!token) {
    return false
  }

  const user = await verifyToken(token)
  return user !== null && user.role === 'admin'
} 