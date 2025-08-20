'use client'
import { useState, useEffect } from 'react'
import { useParams, notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

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

export default function UMKMDetailPage() {
  const [umkm, setUmkm] = useState<UMKM | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const umkmId = params.id as string

  useEffect(() => {
    loadUMKMData()
  }, [umkmId])

  const loadUMKMData = async () => {
    try {
      const response = await fetch(`/api/umkm/${umkmId}`)
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setUmkm(data.data)
        } else {
          notFound()
        }
      } else {
        notFound()
      }
    } catch (error) {
      console.error('Failed to load UMKM:', error)
      notFound()
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

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'makanan': return 'from-orange-400 to-red-500'
      case 'kerajinan': return 'from-purple-400 to-pink-500'
      case 'pertanian': return 'from-green-400 to-emerald-500'
      case 'perdagangan': return 'from-blue-400 to-cyan-500'
      case 'jasa': return 'from-indigo-400 to-purple-500'
      case 'industri rumah tangga': return 'from-yellow-400 to-orange-500'
      case 'tekstil': return 'from-pink-400 to-rose-500'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat detail UMKM...</p>
        </div>
      </div>
    )
  }

  if (!umkm) {
    return notFound()
  }

  // Generate structured data for this UMKM
  const businessStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": umkm.name,
    "description": umkm.description || `UMKM ${umkm.category} di ${umkm.dusun}, Desa Jambearum`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": umkm.address || umkm.dusun,
      "addressLocality": "Desa Jambearum",
      "addressRegion": "Kecamatan Silo, Kabupaten Jember, Jawa Timur",
      "addressCountry": "ID"
    },
    "telephone": umkm.phone,
    "url": `/umkm/${umkm.id}`,
    "image": umkm.image || undefined,
    "priceRange": "$",
    "makesOffer": umkm.products.map(product => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": product
      }
    }))
  }

  return (
    <>
      <StructuredData type="local-business" data={businessStructuredData} />
      
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex text-sm text-gray-600">
              <Link href="/" className="hover:text-green-600">Beranda</Link>
              <span className="mx-2">•</span>
              <Link href="/umkm" className="hover:text-green-600">UMKM</Link>
              <span className="mx-2">•</span>
              <span className="text-gray-900">{umkm.name}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden border">
                {umkm.image ? (
                  <Image
                    src={umkm.image}
                    alt={umkm.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('UMKM Detail - Failed to load image:', umkm.image);
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                    onLoad={() => {
                      console.log('UMKM Detail - Image loaded successfully:', umkm.image);
                    }}
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${getCategoryColor(umkm.category)} flex items-center justify-center`}>
                    <div className="text-center text-white">
                      <div className="text-8xl mb-4">{getCategoryIcon(umkm.category)}</div>
                      <div className="text-2xl font-bold">{umkm.category}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center mb-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {getCategoryIcon(umkm.category)} {umkm.category}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{umkm.name}</h1>
                {umkm.description && (
                  <p className="text-lg text-gray-600 leading-relaxed">{umkm.description}</p>
                )}
              </div>

              {/* Owner Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">👤</span>
                  Informasi Pemilik
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Nama:</span>
                    <span className="font-medium text-gray-900">{umkm.owner}</span>
                  </div>
                  {umkm.phone && (
                    <div className="flex items-center">
                      <span className="text-gray-500 w-24">Telepon:</span>
                      <a 
                        href={`tel:${umkm.phone}`}
                        className="font-medium text-blue-600 hover:text-blue-800"
                      >
                        {umkm.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Dusun:</span>
                    <span className="font-medium text-gray-900">{umkm.dusun}</span>
                  </div>
                  {umkm.address && (
                    <div className="flex items-start">
                      <span className="text-gray-500 w-24">Alamat:</span>
                      <span className="font-medium text-gray-900 flex-1">{umkm.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Products */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📦</span>
                  Produk & Layanan
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {umkm.products.map((product, index) => (
                    <div 
                      key={index} 
                      className="flex items-center p-3 bg-gray-50 rounded-lg border"
                    >
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="font-medium text-gray-900">{product}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Actions */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">Tertarik dengan UMKM ini?</h3>
                <div className="space-y-3">
                  {umkm.phone && (
                    <a
                      href={`https://wa.me/62${umkm.phone.substring(1)}?text=Halo, saya tertarik dengan produk ${umkm.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-white text-green-600 text-center py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      💬 Chat via WhatsApp
                    </a>
                  )}
                  <a
                    href={`tel:${umkm.phone}`}
                    className="block w-full bg-green-700 text-center py-3 px-6 rounded-lg font-semibold hover:bg-green-800 transition-colors"
                  >
                    📞 Telepon Langsung
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related UMKM Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              UMKM Lainnya di {umkm.dusun}
            </h2>
            <div className="text-center text-gray-600">
              <p>Jelajahi UMKM lainnya dari dusun yang sama</p>
              <Link 
                href={`/umkm?dusun=${encodeURIComponent(umkm.dusun)}`}
                className="inline-block mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Lihat UMKM di {umkm.dusun}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 