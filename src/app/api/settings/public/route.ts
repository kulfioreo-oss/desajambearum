import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
	try {
		const setting = await prisma.setting.findUnique({ where: { key: 'admin_whatsapp' } })
		const whatsapp = setting?.value || '6281234567890'
		return NextResponse.json({ success: true, data: { whatsapp } })
	} catch (error) {
		return NextResponse.json({ success: false, message: 'Failed to load settings' }, { status: 500 })
	}
} 