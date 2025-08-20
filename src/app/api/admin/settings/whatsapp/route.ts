import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET(request: NextRequest) {
	const authorized = await isAdminAuthenticated(request)
	if (!authorized) {
		return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
	}

	try {
		const setting = await prisma.setting.findUnique({ where: { key: 'admin_whatsapp' } })
		return NextResponse.json({ success: true, data: { whatsapp: setting?.value || '' } })
	} catch (error) {
		return NextResponse.json({ success: false, message: 'Failed to load setting' }, { status: 500 })
	}
}

export async function POST(request: NextRequest) {
	const authorized = await isAdminAuthenticated(request)
	if (!authorized) {
		return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
	}

	try {
		const body = await request.json()
		const whatsapp: string = (body?.whatsapp || '').toString().trim()
		if (!/^\d{8,15}$/.test(whatsapp)) {
			return NextResponse.json({ success: false, message: 'Nomor WhatsApp tidak valid. Gunakan format 62...' }, { status: 400 })
		}

		await prisma.setting.upsert({
			where: { key: 'admin_whatsapp' },
			update: { value: whatsapp },
			create: { key: 'admin_whatsapp', value: whatsapp }
		})

		return NextResponse.json({ success: true })
	} catch (error) {
		return NextResponse.json({ success: false, message: 'Failed to save setting' }, { status: 500 })
	}
} 