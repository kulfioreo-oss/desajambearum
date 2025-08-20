import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'

// GET specific UMKM by ID (Admin)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    
    const umkm = await prisma.uMKM.findUnique({
      where: { id }
    })

    if (!umkm) {
      return NextResponse.json({ success: false, message: 'UMKM not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: umkm
    })
  } catch (error) {
    console.error('Get UMKM error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 })
  }
}

// PATCH - Update UMKM
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    const {
      name,
      description,
      category,
      owner,
      phone,
      address,
      dusun,
      products,
      image,
      isActive
    } = body

    // Check if UMKM exists
    const existingUMKM = await prisma.uMKM.findUnique({
      where: { id }
    })

    if (!existingUMKM) {
      return NextResponse.json({ success: false, message: 'UMKM not found' }, { status: 404 })
    }

    // Update the UMKM
    const updatedUMKM = await prisma.uMKM.update({
      where: { id },
      data: {
        name: name || existingUMKM.name,
        description: description !== undefined ? description : existingUMKM.description,
        category: category || existingUMKM.category,
        owner: owner || existingUMKM.owner,
        phone: phone !== undefined ? phone : existingUMKM.phone,
        address: address !== undefined ? address : existingUMKM.address,
        dusun: dusun || existingUMKM.dusun,
        products: products || existingUMKM.products,
        image: image !== undefined ? image : existingUMKM.image,
        isActive: isActive !== undefined ? isActive : existingUMKM.isActive,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      message: 'UMKM updated successfully',
      data: updatedUMKM
    })
  } catch (error) {
    console.error('Update UMKM error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update UMKM' 
    }, { status: 500 })
  }
}

// DELETE - Remove UMKM
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Check if UMKM exists
    const existingUMKM = await prisma.uMKM.findUnique({
      where: { id }
    })

    if (!existingUMKM) {
      return NextResponse.json({ success: false, message: 'UMKM not found' }, { status: 404 })
    }

    // Delete the UMKM
    await prisma.uMKM.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'UMKM deleted successfully'
    })
  } catch (error) {
    console.error('Delete UMKM error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to delete UMKM' 
    }, { status: 500 })
  }
} 