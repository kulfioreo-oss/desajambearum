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
}

export default function UMKMShowcase() {
  const [umkmList, setUmkmList] = useState<UMKM[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUMKMData()
  }, [])

  const loadUMKMData = async () => {
    try {
      const response = await fetch('/api/umkm')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Show only first 6 UMKM for homepage
          setUmkmList(data.data.slice(0, 6))
        }
      }
    } catch (error) {
      console.error('Error loading UMKM data:', error)
    } finally {
      setLoading(false)
    }
  }

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

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Pertanian': 'from-green-50 to-emerald-50',
      'Kerajinan': 'from-blue-50 to-cyan-50',
      'Produk Olahan': 'from-orange-50 to-red-50',
      'Makanan': 'from-yellow-50 to-orange-50',
      'Jasa': 'from-purple-50 to-pink-50',
      'Perdagangan': 'from-indigo-50 to-blue-50'
    }
    return colors[category] || 'from-gray-50 to-slate-50'
  }

  const getCategoryGradient = (category: string) => {
    const gradients: { [key: string]: string } = {
      'Pertanian': 'from-green-400 to-emerald-500',
      'Kerajinan': 'from-blue-400 to-cyan-500',
      'Produk Olahan': 'from-orange-400 to-red-500',
      'Makanan': 'from-yellow-400 to-orange-500',
      'Jasa': 'from-purple-400 to-pink-500',
      'Perdagangan': 'from-indigo-400 to-blue-500'
    }
    return gradients[category] || 'from-gray-400 to-slate-500'
  }

  const getCategoryButtonColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Pertanian': 'bg-green-600 hover:bg-green-700',
      'Kerajinan': 'bg-blue-600 hover:bg-blue-700',
      'Produk Olahan': 'bg-orange-600 hover:bg-orange-700',
      'Makanan': 'bg-yellow-600 hover:bg-yellow-700',
      'Jasa': 'bg-purple-600 hover:bg-purple-700',
      'Perdagangan': 'bg-indigo-600 hover:bg-indigo-700'
    }
    return colors[category] || 'bg-gray-600 hover:bg-gray-700'
  }

  if (loading) {
    return (
      <section id="umkm" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              UMKM <span className="text-green-600">Desa Jambearum</span>
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-300 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="umkm" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            UMKM <span className="text-green-600">Desa Jambearum</span>
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Produk berkualitas dari tangan-tangan terampil masyarakat desa
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {umkmList.map((umkm) => (
            <div key={umkm.id} className={`bg-gradient-to-br ${getCategoryColor(umkm.category)} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
              <div className={`h-48 bg-gradient-to-br ${getCategoryGradient(umkm.category)} flex items-center justify-center`}>
                {umkm.image ? (
                  <Image
                    src={umkm.image}
                    alt={umkm.name}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-6xl text-white">
                    {getCategoryIcon(umkm.category)}
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-3 py-1 bg-white/80 text-gray-700 text-sm font-medium rounded-full mb-3">
                  {getCategoryIcon(umkm.category)} {umkm.category}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{umkm.name}</h3>
                <p className="text-gray-600 mb-2 font-medium">
                  {umkm.owner} • Dusun {umkm.dusun}
                </p>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {umkm.description || `UMKM ${umkm.category} berkualitas tinggi dengan produk unggulan.`}
                </p>
                
                {/* Products Preview */}
                {umkm.products.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {umkm.products.slice(0, 2).map((product, index) => (
                        <span key={index} className="px-2 py-1 bg-white/60 text-gray-700 text-xs rounded-full">
                          {product}
                        </span>
                      ))}
                      {umkm.products.length > 2 && (
                        <span className="px-2 py-1 bg-white/60 text-gray-700 text-xs rounded-full">
                          +{umkm.products.length - 2} lainnya
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Link
                    href={`/umkm/${umkm.id}`}
                    className={`flex-1 ${getCategoryButtonColor(umkm.category)} text-white text-center px-4 py-2 rounded-full font-medium transition-colors`}
                  >
                    Lihat Detail
                  </Link>
                  {umkm.phone && (
                    <a
                      href={`https://wa.me/62${umkm.phone.replace(/^0/, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
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

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/umkm"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Lihat Semua UMKM
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
} 