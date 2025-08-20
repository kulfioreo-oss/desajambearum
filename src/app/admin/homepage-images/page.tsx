'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface HomepageImage {
  id: string
  section: string
  title?: string
  description?: string
  imageUrl: string
  altText: string
  isActive: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export default function HomepageImagesAdmin() {
  const [images, setImages] = useState<HomepageImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSection, setSelectedSection] = useState<string>('all')
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  const sections = [
    { value: 'all', label: 'Semua Section' },
    { value: 'hero', label: 'Hero Section' },
    { value: 'stats', label: 'Statistik' },
    { value: 'gallery', label: 'Galeri' },
    { value: 'features', label: 'Fitur' },
    { value: 'testimonials', label: 'Testimoni' },
  ]

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/admin/homepage-images')
      if (response.ok) {
        const data = await response.json()
        setImages(data)
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteImage = async (id: string) => {
    if (!confirm('Yakin ingin menghapus gambar ini?')) return

    try {
      const response = await fetch(`/api/admin/homepage-images/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchImages()
      } else {
        alert('Gagal menghapus gambar')
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Terjadi kesalahan')
    }
  }

  const toggleImageStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/homepage-images/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      })

      if (response.ok) {
        await fetchImages()
      }
    } catch (error) {
      console.error('Error toggling image status:', error)
    }
  }

  const filteredImages = selectedSection === 'all' 
    ? images 
    : images.filter(img => img.section === selectedSection)

  const getSectionLabel = (section: string) => {
    const found = sections.find(s => s.value === section)
    return found ? found.label : section
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat gambar...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manajemen Gambar Beranda</h1>
            <p className="text-gray-600 mt-2">Kelola gambar yang ditampilkan di halaman utama website</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin"
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ← Kembali
            </Link>
            <Link
              href="/admin/homepage-images/create"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              + Tambah Gambar
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <label className="text-sm font-medium text-gray-700">Filter Section:</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {sections.map(section => (
                <option key={section.value} value={section.value}>
                  {section.label}
                </option>
              ))}
            </select>
            
            <div className="ml-auto text-sm text-gray-500">
              Total: {filteredImages.length} gambar
            </div>
          </div>
        </div>

        {/* Images Grid */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">🖼️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada gambar</h3>
            <p className="text-gray-500 mb-6">Mulai tambahkan gambar untuk mempercantik halaman beranda</p>
            <Link
              href="/admin/homepage-images/create"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Tambah Gambar Pertama
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div key={image.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="h-48 relative">
                  <Image
                    src={image.imageUrl}
                    alt={image.altText}
                    fill
                    className="object-cover"
                  />
                  {!image.isActive && (
                    <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
                        Tidak Aktif
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {getSectionLabel(image.section)}
                    </span>
                    <span className="text-xs text-gray-500">
                      Order: {image.sortOrder}
                    </span>
                  </div>
                  
                  {image.title && (
                    <h3 className="font-semibold text-gray-800 mb-1 truncate">
                      {image.title}
                    </h3>
                  )}
                  
                  {image.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {image.description}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/homepage-images/edit/${image.id}`}
                      className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded text-sm text-center hover:bg-blue-100 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => toggleImageStatus(image.id, image.isActive)}
                      className={`flex-1 px-3 py-2 rounded text-sm transition-colors ${
                        image.isActive
                          ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                          : 'bg-green-50 text-green-600 hover:bg-green-100'
                      }`}
                    >
                      {image.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                    </button>
                    <button
                      onClick={() => deleteImage(image.id)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100 transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 