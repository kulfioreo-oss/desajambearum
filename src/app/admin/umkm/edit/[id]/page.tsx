'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '@/components/ImageUpload'

interface UMKM {
  id: string
  name: string
  description: string | null
  category: string
  owner: string
  phone: string | null
  address: string | null
  dusun: string
  products: string[]
  image: string | null
  isActive: boolean
}

interface AdminUser {
  username: string
  role: string
}

export default function EditUMKM() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    owner: '',
    phone: '',
    address: '',
    dusun: '',
    products: [''],
    image: '',
    isActive: true
  })
  
  const router = useRouter()
  const params = useParams()
  const umkmId = params.id as string

  const categories = [
    'Makanan',
    'Kerajinan',
    'Pertanian',
    'Perdagangan',
    'Jasa',
    'Industri Rumah Tangga',
    'Tekstil'
  ]

  const dusuns = [
    'Karang Sampurna',
    'Paceh',
    'Krajan',
    'Sumber Kokap Barat',
    'Sumber Kokap Timur',
    'Biarum',
    'Sumber Petung'
  ]

  useEffect(() => {
    checkAuth()
    if (umkmId) {
      loadUMKMData()
    }
  }, [umkmId])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      router.push('/admin/login')
    }
  }

  const loadUMKMData = async () => {
    try {
      const response = await fetch(`/api/admin/umkm/${umkmId}`)
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          const umkm = data.data
          setFormData({
            name: umkm.name,
            description: umkm.description || '',
            category: umkm.category,
            owner: umkm.owner,
            phone: umkm.phone || '',
            address: umkm.address || '',
            dusun: umkm.dusun,
            products: umkm.products.length > 0 ? umkm.products : [''],
            image: umkm.image || '',
            isActive: umkm.isActive
          })
        }
      } else {
        alert('UMKM tidak ditemukan')
        router.push('/admin/umkm')
      }
    } catch (error) {
      console.error('Load UMKM error:', error)
      alert('Gagal memuat data UMKM')
      router.push('/admin/umkm')
    } finally {
      setInitialLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleProductChange = (index: number, value: string) => {
    const newProducts = [...formData.products]
    newProducts[index] = value
    setFormData(prev => ({ ...prev, products: newProducts }))
  }

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, '']
    }))
  }

  const removeProduct = (index: number) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Filter empty products
      const cleanProducts = formData.products.filter(product => product.trim() !== '')
      
      const dataToSubmit = {
        ...formData,
        products: cleanProducts
      }

      const response = await fetch(`/api/admin/umkm/${umkmId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      })

      if (response.ok) {
        alert('UMKM berhasil diperbarui!')
        router.push('/admin/umkm')
      } else {
        const errorData = await response.json()
        alert(`Gagal memperbarui UMKM: ${errorData.message || 'Terjadi kesalahan'}`)
      }
    } catch (error) {
      console.error('Update error:', error)
      alert('Terjadi kesalahan saat menyimpan data')
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'makanan': return '🍽️'
      case 'kerajinan': return '🎨'
      case 'pertanian': return '🌾'
      case 'perdagangan': return '🏪'
      case 'jasa': return '🛠️'
      case 'industri rumah tangga': return '🏠'
      case 'tekstil': return '🧵'
      default: return '📦'
    }
  }

  if (initialLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data UMKM...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg sticky top-0 z-10 shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit UMKM</h1>
              <p className="text-gray-500 mt-1 text-sm">Perbarui informasi UMKM</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/umkm"
                className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors flex items-center"
              >
                <span className="mr-1">←</span> Kembali ke Daftar
              </Link>
              <Link
                href={`/umkm/${umkmId}`}
                target="_blank"
                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center"
              >
                Lihat Publik <span className="ml-1">👁️</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="mr-3 text-xl">ℹ️</span>
              Informasi Dasar
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Nama UMKM <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors duration-300 placeholder-gray-400"
                  placeholder="Contoh: Keripik Singkong Barokah"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Deskripsi UMKM
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors duration-300 placeholder-gray-400"
                  placeholder="Jelaskan tentang keunikan produk, sejarah singkat, dll."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Kategori UMKM <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors duration-300"
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {getCategoryIcon(category)} {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dusun <span className="text-red-500">*</span>
                </label>
                <select
                  name="dusun"
                  value={formData.dusun}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors duration-300"
                >
                  <option value="">Pilih Dusun</option>
                  {dusuns.map(dusun => (
                    <option key={dusun} value={dusun}>{dusun}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nama Pemilik <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="owner"
                  value={formData.owner}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors duration-300 placeholder-gray-400"
                  placeholder="Nama lengkap pemilik..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nomor Telepon / WhatsApp
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors duration-300 placeholder-gray-400"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Alamat Lengkap
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors duration-300 placeholder-gray-400"
                  placeholder="Alamat lengkap UMKM..."
                />
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="mr-3 text-xl">📦</span>
              Produk/Layanan
            </h2>
            
            <div className="space-y-4">
              {formData.products.map((product, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={product}
                      onChange={(e) => handleProductChange(index, e.target.value)}
                      className="w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors duration-300 placeholder-gray-400"
                      placeholder={`Produk/layanan ${index + 1}...`}
                    />
                  </div>
                  {formData.products.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={addProduct}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors"
              >
                + Tambah Produk/Layanan
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="mr-3 text-xl">⚙️</span>
              Pengaturan Tambahan
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gambar UMKM
                </label>
                <ImageUpload
                  currentImage={formData.image || undefined}
                  onImageChange={(imageUrl) => {
                    setFormData(prev => ({ ...prev, image: imageUrl || '' }))
                  }}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500 mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Aktifkan UMKM ini (akan ditampilkan di website)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <Link
              href="/admin/umkm"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={loading || !formData.name || !formData.category || !formData.owner || !formData.dusun}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              )}
              {loading ? 'Menyimpan...' : 'Perbarui UMKM'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 