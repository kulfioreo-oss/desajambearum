import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export default function WisataPage() {
  const tourismSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": "Wisata Desa Jambearum",
    "description": "Destinasi wisata alam di kaki Gunung Raung dengan Lahar Beku Panjang, agrowisata, dan river trekking",
    "url": "/wisata",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Desa Jambearum",
      "addressRegion": "Kecamatan Sumberjambe, Kabupaten Jember, Jawa Timur",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-8.1234",
      "longitude": "113.5678"
    },
    "touristType": [
      "Nature Lovers",
      "Adventure Travelers", 
      "Family Tourists",
      "Photography Enthusiasts"
    ],
    "hasMap": "https://maps.google.com",
    "availableLanguage": ["id", "jv"],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Trekking Lahar Beku Panjang"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Product",
          "name": "Agrowisata & Wisata Panen"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product", 
          "name": "River Trekking Sungai Bire"
        }
      }
    ]
  }

  return (
    <>
      <StructuredData type="local-business" data={tourismSchema} />
      
      <div className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="relative h-screen bg-gradient-to-br from-emerald-800 via-green-700 to-teal-600 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("/wisata/bg.webp")`
            }}></div>
          </div>
          
          {/* Mountain Silhouette Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/40 to-transparent"></div>
          
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
            <div className="max-w-4xl">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-lg text-white text-sm font-medium rounded-full mb-6">
                🏔️ Kaki Gunung Raung
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Wisata Desa <span className="text-yellow-300">Jambearum</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed">
                Pesona Alam Lahar Beku, Agrowisata & River Trekking di Kaki Gunung Raung
              </p>
              
              <p className="text-lg text-green-50 mb-10 max-w-3xl">
                Jelajahi keindahan alam dengan hamparan batu lahar kuno, sungai berbatu jernih, 
                hutan pinus yang sejuk, dan kekayaan agrowisata durian, kopi & manggis.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#destinasi" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-green-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                >
                  Jelajahi Destinasi
                </a>
                <a 
                  href="#panduan" 
                  className="border-2 border-white text-white hover:bg-white hover:text-green-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 text-center"
                >
                  Panduan Wisata
                </a>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                  Lokasi & Karakter Lanskap
                </h2>
                <div className="w-24 h-1 bg-green-600 mb-6"></div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Desa Jambearum berada di <strong>kaki Gunung Raung</strong>, wilayah utara Kabupaten Jember 
                  yang berhawa sejuk dengan bentang alam hutan pinus, sungai berbatu, dan potensi agrowisata.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Posisi di lereng Raung menjadikannya punya <strong>panorama khas pegunungan</strong> dan 
                  peluang aktivitas alam terbuka yang menakjubkan.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🌲</div>
                    <div className="font-semibold text-gray-800">Hutan Pinus</div>
                    <div className="text-sm text-gray-600">Udara sejuk & segar</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🏔️</div>
                    <div className="font-semibold text-gray-800">Gunung Raung</div>
                    <div className="text-sm text-gray-600">Panorama indah</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🌊</div>
                    <div className="font-semibold text-gray-800">Sungai Berbatu</div>
                    <div className="text-sm text-gray-600">Air jernih alami</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🌿</div>
                    <div className="font-semibold text-gray-800">Agrowisata</div>
                    <div className="text-sm text-gray-600">Hasil bumi lokal</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div 
                  className="aspect-square rounded-2xl bg-cover bg-center bg-gray-300 flex items-center justify-center"
                  style={{
                    backgroundImage: "url('/wisata/landskap.webp')"
                  }}
                >
              
                </div>
                <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-green-900 p-4 rounded-xl shadow-lg">
                  <div className="font-bold">42 KM</div>
                  <div className="text-sm">dari Jember</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Attractions */}
        <section id="destinasi" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Destinasi <span className="text-green-600">Wisata Utama</span>
              </h2>
              <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Jelajahi keunikan alam dan budaya yang menawan di setiap sudut Desa Jambearum
              </p>
            </div>

            {/* Lahar Beku Panjang */}
            <div className="mb-16">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div 
                    className="aspect-video lg:aspect-square bg-cover bg-center bg-gray-300 flex items-center justify-center"
                    style={{
                      backgroundImage: "url('/wisata/lahar.webp')"
                    }}
                  >
            
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 text-sm font-medium rounded-full mb-4 w-fit">
                      ⭐ Ikon Wisata Utama
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">
                      Lahar Beku Panjang
                    </h3>
                    <p className="text-gray-600 mb-4 text-lg">
                      <strong>Hutan Lindung Petak 124</strong> - Hamparan batu alami memanjang yang menurut 
                      tradisi setempat merupakan aliran lahar lama Gunung Raung.
                    </p>
                    <p className="text-gray-600 mb-6">
                      Saat musim hujan, aliran air membentuk <strong>kolam-kolam batu</strong> yang sering 
                      dipakai mandi alami. Pengalaman unik berendam di kolam alami di tengah hutan!
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-700">
                        <span className="mr-3">🚵</span>
                        <span>Akses: Motor trail/roda dua (bukan matic)</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="mr-3">🏞️</span>
                        <span>Lokasi: Kawasan Hutan Lindung</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="mr-3">💧</span>
                        <span>Best time: Musim hujan (kolam alami terbentuk)</span>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                      <p className="text-yellow-800 text-sm">
                        <strong>Tips:</strong> Jalan akhir masih berbatu - ideal untuk motor trail. 
                        Perhatikan cuaca dan kondisi jalan sebelum berkunjung.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Attractions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sungai Bire */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div 
                  className="h-48 bg-cover bg-center bg-gray-300 flex items-center justify-center"
                  style={{
                    backgroundImage: "url('/wisata/bire.webp')"
                  }}
                >
                
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Sungai Bire</h3>
                  <p className="text-gray-600 mb-4">
                    Destinasi <strong>&ldquo;river play&rdquo;</strong> dengan tipe sungai berbatu dan arus relatif tidak deras. 
                    Lokasi di tepi jalan utama desa memudahkan akses.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="mr-2">🌊</span>
                      <span>River trekking & bermain air</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="mr-2">📸</span>
                      <span>Spot fotografi alam</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="mr-2">🎓</span>
                      <span>Program KKN UNEJ</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                    Inisiatif penataan dari program KKN untuk pembersihan sungai dan perencanaan titik wisata.
                  </div>
                </div>
              </div>

              {/* Agrowisata */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div 
                  className="h-48 bg-cover bg-center bg-gray-300 flex items-center justify-center"
                  style={{
                    backgroundImage: "url('/wisata/durian.webp')"
                  }}
                >
                  <span className="text-6xl text-white/70">🌱</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Agrowisata & Kuliner</h3>
                  <p className="text-gray-600 mb-4">
                    Wilayah kaya hasil bumi dengan paket agrowisata, demo olahan, hingga wisata panen musiman.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-yellow-100 p-2 rounded text-center">
                      <div className="text-2xl">🥭</div>
                      <div className="text-xs font-medium">Durian</div>
                    </div>
                    <div className="bg-purple-100 p-2 rounded text-center">
                      <div className="text-2xl">🍇</div>
                      <div className="text-xs font-medium">Manggis</div>
                    </div>
                    <div className="bg-green-100 p-2 rounded text-center">
                      <div className="text-2xl">🥑</div>
                      <div className="text-xs font-medium">Alpukat</div>
                    </div>
                    <div className="bg-brown-100 p-2 rounded text-center">
                      <div className="text-2xl">☕</div>
                      <div className="text-xs font-medium">Kopi</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg text-sm text-green-800">
                    Program kampus bersama desa mengembangkan produk turunan durian dan olahan lokal.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Aktivitas Wisata <span className="text-green-600">yang Disarankan</span>
              </h2>
              <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🥾</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Trekking Ringan</h3>
                <p className="text-gray-600 text-sm">Koridor pinus dan batuan lahar dengan pemandangan indah</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🌊</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">River Trekking</h3>
                <p className="text-gray-600 text-sm">Susur sungai & mandi kolam batu alami (perhatikan keselamatan)</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">📷</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Fotografi</h3>
                <p className="text-gray-600 text-sm">Piknik keluarga & fotografi lanskap (golden hour sore)</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🌾</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Tur Kebun</h3>
                <p className="text-gray-600 text-sm">Kopi–durian–alpukat saat musim panen</p>
              </div>
            </div>
          </div>
        </section>

        {/* Access & Safety Guide */}
        <section id="panduan" className="py-20 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Accessibility */}
              <div>
                <h2 className="text-3xl font-bold mb-6">🚗 Aksesibilitas</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-green-900 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Dari Kota Jember</h4>
                      <p className="text-green-100">Jalur darat menuju Kecamatan Sumberjambe (42 KM ke arah utara)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-green-900 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Menuju Lahar Beku</h4>
                      <p className="text-green-100">Ruas akhir berbatu, disarankan motor trail atau mobil tinggi</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-green-900 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Kendaraan Direkomendasikan</h4>
                      <p className="text-green-100">Motor trail/roda dua (bukan matic) untuk akses optimal</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                  <h4 className="font-bold mb-3">💡 Tips Akses</h4>
                  <ul className="space-y-2 text-sm text-green-100">
                    <li>• Cek kondisi cuaca sebelum berangkat</li>
                    <li>• Isi bensin di Jember atau Sumberjambe</li>
                    <li>• Koordinasi dengan warga setempat</li>
                    <li>• Bawa GPS atau gunakan Google Maps</li>
                  </ul>
                </div>
              </div>

              {/* Safety & Conservation */}
              <div>
                <h2 className="text-3xl font-bold mb-6">⚠️ Keselamatan & Konservasi</h2>
                
                <div className="bg-red-500/20 border border-red-400 rounded-xl p-6 mb-6">
                  <h4 className="font-bold text-red-300 mb-3">Catatan Penting:</h4>
                  <ul className="space-y-2 text-red-100">
                    <li>• Lahar beku berada di kawasan hutan lindung</li>
                    <li>• Musim hujan: perhatikan debit & keselamatan</li>
                    <li>• Kenakan alas kaki anti-selip</li>
                    <li>• Ikuti arahan warga setempat</li>
                  </ul>
                </div>
                
                <div className="bg-green-500/20 border border-green-400 rounded-xl p-6">
                  <h4 className="font-bold text-green-300 mb-3">Konservasi Alam:</h4>
                  <ul className="space-y-2 text-green-100">
                    <li>• Jaga kebersihan area wisata</li>
                    <li>• Tidak merusak formasi batuan</li>
                    <li>• Ikuti koridor jalur yang ada</li>
                    <li>• Bawa pulang sampah Anda</li>
                    <li>• Hormati aturan kawasan lindung</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Initiative */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                  Pengelolaan & Inisiatif <span className="text-green-600">Komunitas</span>
                </h2>
                <div className="w-24 h-1 bg-green-600 mb-6"></div>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg mb-6">
                  <h4 className="font-bold text-blue-800 mb-2">Program KKN UNEJ 2024</h4>
                  <p className="text-blue-700">
                    Bersama desa menggagas pembentukan <strong>Desa Wisata Jambearum</strong> melalui 
                    pemetaan potensi, pembersihan area sungai, dan perancangan awal titik atraksi.
                  </p>
                </div>
                
                <p className="text-lg text-gray-600 mb-6">
                  Inisiatif ini memperkuat <strong>model pengelolaan berbasis masyarakat</strong> yang 
                  melibatkan partisipasi aktif warga dalam pengembangan dan pemeliharaan destinasi wisata.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="font-semibold text-gray-800">Pemetaan Potensi</div>
                    <div className="text-sm text-gray-600">Identifikasi spot wisata</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🧹</div>
                    <div className="font-semibold text-gray-800">Pembersihan Area</div>
                    <div className="text-sm text-gray-600">Sungai & titik wisata</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">📋</div>
                    <div className="font-semibold text-gray-800">Perencanaan</div>
                    <div className="text-sm text-gray-600">Desain atraksi wisata</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🤝</div>
                    <div className="font-semibold text-gray-800">Berbasis Masyarakat</div>
                    <div className="text-sm text-gray-600">Partisipasi warga aktif</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Visi Desa Wisata</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm">🌱</span>
                      </div>
                      <span>Pariwisata berkelanjutan</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm">💼</span>
                      </div>
                      <span>Pemberdayaan ekonomi lokal</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm">🏞️</span>
                      </div>
                      <span>Konservasi alam & budaya</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm">👥</span>
                      </div>
                      <span>Partisipasi masyarakat</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Siap Menjelajahi Wisata Jambearum?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Rasakan pengalaman unik wisata alam, agrowisata, dan budaya lokal di kaki Gunung Raung!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/umkm" 
                className="bg-yellow-400 hover:bg-yellow-500 text-green-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Lihat UMKM Lokal
              </Link>
              <Link 
                href="/umkm" 
                className="border-2 border-white text-white hover:bg-white hover:text-green-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
              >
                Lihat Produk Lokal
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
} 