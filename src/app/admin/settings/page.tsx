'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminSettings() {
	const [whatsapp, setWhatsapp] = useState('')
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)

	useEffect(() => {
		loadSetting()
	}, [])

	const loadSetting = async () => {
		try {
			const res = await fetch('/api/admin/settings/whatsapp')
			if (res.ok) {
				const data = await res.json()
				setWhatsapp(data.data?.whatsapp || '')
			}
		} finally {
			setLoading(false)
		}
	}

	const save = async (e: React.FormEvent) => {
		e.preventDefault()
		setSaving(true)
		try {
			const res = await fetch('/api/admin/settings/whatsapp', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ whatsapp })
			})
			if (res.ok) {
				alert('Nomor WhatsApp berhasil disimpan')
			} else {
				const err = await res.json()
				alert(err.message || 'Gagal menyimpan')
			}
		} finally {
			setSaving(false)
		}
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-100 flex items-center justify-center">
				<div className="text-gray-600">Memuat...</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="bg-white/80 backdrop-blur-lg sticky top-0 z-10 shadow-sm border-b">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-5">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
							<p className="text-gray-500 mt-1 text-sm">Nomor WhatsApp admin untuk pendaftaran UMKM</p>
						</div>
						<Link href="/admin/dashboard" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">← Kembali</Link>
					</div>
				</div>
			</div>

			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<form onSubmit={save} className="bg-white rounded-lg shadow-md p-6 space-y-4">
					<label className="block text-sm font-medium text-gray-700">Nomor WhatsApp Admin (format 62...)</label>
					<input
						type="text"
						value={whatsapp}
						onChange={(e) => setWhatsapp(e.target.value.trim())}
						placeholder="6281234567890"
						className="mt-1 block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
					/>
					<div className="flex justify-end">
						<button
							type="submit"
							disabled={saving}
							className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
						>
							{saving ? 'Menyimpan...' : 'Simpan'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
} 