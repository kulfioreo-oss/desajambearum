'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface UMKM {
  id: string
  name: string
  description?: string
  category: string
  owner: string
  phone?: string
  address?: string
  dusun: string
  products: string[]
  image?: string
  isActive: boolean
  createdAt: string
}

export default function UMKMDirectory() {
  const [umkmList, setUmkmList] = useState<UMKM[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDusun, setSelectedDusun] = useState<string>('all')

  useEffect(() => {
    loadUMKMData()
  }, [])

  const loadUMKMData = async () => {
    try {
             // Use public API for UMKM data
       const response = await fetch('/api/umkm')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setUmkmList(data.data.filter((umkm: UMKM) => umkm.isActive))
        }
      }
    } catch (error) {
      console.error('Error loading UMKM data:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [...new Set(umkmList.map(umkm => umkm.category))]
  const dusuns = [...new Set(umkmList.map(umkm => umkm.dusun))]

  const filteredUMKM = umkmList.filter(umkm => {
    const categoryMatch = selectedCategory === 'all' || umkm.category === selectedCategory
    const dusunMatch = selectedDusun === 'all' || umkm.dusun === selectedDusun
    return categoryMatch && dusunMatch
  })

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Pertanian': '🌾',
      'Kerajinan': '🧺',
      'Produk Olahan': '🍯',
      'Makanan': '🍜',
      'Jasa': '🔧',
      'Perdagangan': '🏪'
    }
    return icons[category] || '🏢'
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
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            UMKM Desa Jambearum
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
            Dukung ekonomi lokal dengan produk berkualitas dari pelaku UMKM Desa Jambearum
          </p>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 inline-block">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{umkmList.length}</div>
                <div className="text-green-100">Total UMKM</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{categories.length}</div>
                <div className="text-green-100">Kategori</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">7</div>
                <div className="text-green-100">Dusun</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">Semua Kategori</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {getCategoryIcon(category)} {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dusun</label>
                <select
                  value={selectedDusun}
                  onChange={(e) => setSelectedDusun(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">Semua Dusun</option>
                  {dusuns.map(dusun => (
                    <option key={dusun} value={dusun}>{dusun}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              Menampilkan {filteredUMKM.length} dari {umkmList.length} UMKM
            </div>
          </div>
        </div>
      </section>

      {/* UMKM Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {filteredUMKM.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Tidak ada UMKM ditemukan</h3>
              <p className="text-gray-500">Coba ubah filter atau pilih kategori lain</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUMKM.map((umkm) => (
                <div key={umkm.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    {umkm.image ? (
                      <Image
                        src={umkm.image}
                        alt={umkm.name}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-6xl text-white">
                        {getCategoryIcon(umkm.category)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mb-3">
                      {getCategoryIcon(umkm.category)} {umkm.category}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{umkm.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{umkm.description}</p>

                    {/* Owner & Location */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">👤</span>
                        <span>{umkm.owner}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">📍</span>
                        <span>Dusun {umkm.dusun}</span>
                      </div>
                      {umkm.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">📞</span>
                          <a href={`tel:${umkm.phone}`} className="hover:text-green-600">
                            {umkm.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Products */}
                    {umkm.products.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">Produk:</div>
                        <div className="flex flex-wrap gap-1">
                          {umkm.products.slice(0, 3).map((product, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {product}
                            </span>
                          ))}
                          {umkm.products.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              +{umkm.products.length - 3} lainnya
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        href={`/umkm/${umkm.id}`}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors"
                      >
                        Lihat Detail
                      </Link>
                      {umkm.phone && (
                        <a
                          href={`https://wa.me/62${umkm.phone.replace(/^0/, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                          title="WhatsApp"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.109"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bergabung dengan Komunitas UMKM
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Punya usaha di Desa Jambearum? Daftarkan UMKM Anda dan bergabung dengan direktori online kami!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/daftar-umkm" 
              className="bg-yellow-400 hover:bg-yellow-500 text-green-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Daftarkan UMKM
            </Link>
            <Link 
              href="/#kontak" 
              className="border-2 border-white text-white hover:bg-white hover:text-green-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 