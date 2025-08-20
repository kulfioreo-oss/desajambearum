'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
  createdAt: string
  updatedAt: string
}

interface AdminUser {
  username: string
  role: string
}

export default function AdminUMKMManagement() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [umkmList, setUmkmList] = useState<UMKM[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterDusun, setFilterDusun] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const [bulkAction, setBulkAction] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadUMKMData()
  }, [])

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
      const response = await fetch('/api/admin/umkm')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setUmkmList(data.data)
        }
      }
    } catch (error) {
      console.error('Failed to load UMKM data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/umkm/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setUmkmList(prev => prev.filter(umkm => umkm.id !== id))
        setShowDeleteModal(false)
        setDeleteTarget(null)
        alert('UMKM berhasil dihapus!')
      } else {
        alert('Gagal menghapus UMKM')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Terjadi kesalahan saat menghapus')
    }
  }

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/umkm/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      })
      
      if (response.ok) {
        setUmkmList(prev => 
          prev.map(umkm => 
            umkm.id === id ? { ...umkm, isActive: !currentStatus } : umkm
          )
        )
      }
    } catch (error) {
      console.error('Toggle status error:', error)
    }
  }

  const handleBulkAction = async () => {
    if (!bulkAction || selectedItems.length === 0) return

    try {
      const response = await fetch('/api/admin/umkm/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: bulkAction,
          ids: selectedItems
        })
      })

      if (response.ok) {
        loadUMKMData()
        setSelectedItems([])
        setBulkAction('')
        alert(`Bulk action "${bulkAction}" berhasil dijalankan!`)
      }
    } catch (error) {
      console.error('Bulk action error:', error)
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredUMKM.map(umkm => umkm.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id])
    } else {
      setSelectedItems(prev => prev.filter(item => item !== id))
    }
  }

  // Filter and search logic
  const filteredUMKM = umkmList.filter(umkm => {
    const matchSearch = umkm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       umkm.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       umkm.products.some(product => product.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchCategory = filterCategory === 'all' || umkm.category === filterCategory
    const matchDusun = filterDusun === 'all' || umkm.dusun === filterDusun
    const matchStatus = filterStatus === 'all' || 
                       (filterStatus === 'active' && umkm.isActive) ||
                       (filterStatus === 'inactive' && !umkm.isActive)
    
    return matchSearch && matchCategory && matchDusun && matchStatus
  })

  const categories = [...new Set(umkmList.map(umkm => umkm.category))]
  const dusuns = [...new Set(umkmList.map(umkm => umkm.dusun))]

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'makanan': return '🍽️'
      case 'kerajinan': return '🎨'
      case 'pertanian': return '🌾'
      case 'perdagangan': return '🏪'
      case 'jasa': return '🛠️'
      default: return '📦'
    }
  }

  if (loading) {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manajemen UMKM</h1>
              <p className="text-gray-500 mt-1 text-sm">Kelola data UMKM Desa Jambearum</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/dashboard"
                className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors flex items-center"
              >
                <span className="mr-1">←</span> Kembali ke Dashboard
              </Link>
              <Link
                href="/admin/umkm/create"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition-colors text-sm shadow-sm"
              >
                + Tambah UMKM
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <span className="text-xl">📊</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total UMKM</p>
                <p className="text-2xl font-bold text-gray-900">{umkmList.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <span className="text-xl">✅</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Aktif</p>
                <p className="text-2xl font-bold text-green-600">
                  {umkmList.filter(umkm => umkm.isActive).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 mr-4">
                <span className="text-xl">❌</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tidak Aktif</p>
                <p className="text-2xl font-bold text-red-600">
                  {umkmList.filter(umkm => !umkm.isActive).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <span className="text-xl">📂</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Kategori</p>
                <p className="text-2xl font-bold text-purple-600">{categories.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Cari UMKM
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nama UMKM, pemilik, atau produk..."
                className="mt-1 block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors duration-300"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kategori
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="mt-1 block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors duration-300"
              >
                <option value="all">Semua Kategori</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Dusun Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dusun
              </label>
              <select
                value={filterDusun}
                onChange={(e) => setFilterDusun(e.target.value)}
                className="mt-1 block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors duration-300"
              >
                <option value="all">Semua Dusun</option>
                {dusuns.map(dusun => (
                  <option key={dusun} value={dusun}>{dusun}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="mt-1 block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors duration-300"
              >
                <option value="all">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info and Bulk Actions */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            Menampilkan <span className="font-semibold">{filteredUMKM.length}</span> dari <span className="font-semibold">{umkmList.length}</span> total UMKM
          </div>
          
          {selectedItems.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                {selectedItems.length} dipilih:
              </span>
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="block px-3 py-1.5 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors duration-300"
              >
                <option value="">Pilih Aksi</option>
                <option value="activate">Aktifkan</option>
                <option value="deactivate">Nonaktifkan</option>
                <option value="delete">Hapus</option>
              </select>
              <button
                onClick={handleBulkAction}
                disabled={!bulkAction}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Jalankan
              </button>
            </div>
          )}
        </div>

        {/* UMKM Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === filteredUMKM.length && filteredUMKM.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    UMKM
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pemilik
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dusun
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUMKM.map((umkm) => (
                  <tr key={umkm.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(umkm.id)}
                        onChange={(e) => handleSelectItem(umkm.id, e.target.checked)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-lg font-medium text-gray-600">
                              {getCategoryIcon(umkm.category)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{umkm.name}</div>
                          <div className="text-sm text-gray-500">
                            {umkm.products.slice(0, 2).join(', ')}
                            {umkm.products.length > 2 && ` +${umkm.products.length - 2} lainnya`}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{umkm.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{umkm.owner}</div>
                      {umkm.phone && (
                        <div className="text-sm text-gray-500">{umkm.phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {umkm.dusun}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(umkm.id, umkm.isActive)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          umkm.isActive 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        } transition-colors cursor-pointer`}
                      >
                        <span className={`mr-1.5 h-2 w-2 rounded-full ${umkm.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                        {umkm.isActive ? 'Aktif' : 'Nonaktif'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                      <Link
                        href={`/umkm/${umkm.id}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        target="_blank"
                        title="Lihat Halaman Publik"
                      >
                        Lihat
                      </Link>
                      <Link
                        href={`/admin/umkm/edit/${umkm.id}`}
                        className="text-green-600 hover:text-green-800 transition-colors"
                        title="Edit UMKM"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          setDeleteTarget(umkm.id)
                          setShowDeleteModal(true)
                        }}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Hapus UMKM"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUMKM.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada UMKM ditemukan</h3>
              <p className="text-gray-500">Coba ubah filter pencarian atau tambah UMKM baru.</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <span className="text-red-600 text-2xl">⚠️</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Konfirmasi Hapus
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Apakah Anda yakin ingin menghapus UMKM ini? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false)
                    setDeleteTarget(null)
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={() => deleteTarget && handleDelete(deleteTarget)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 