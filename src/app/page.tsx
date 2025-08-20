import Link from "next/link";
import UMKMShowcase from "@/components/UMKMShowcase";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData type="website" />
      <StructuredData type="organization" />
      
      <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-green-800 via-green-600 to-emerald-500 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Desa <span className="text-yellow-300">Jambearum</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed">
              Portal UMKM & Wisata Desa di Kaki Gunung Raung
            </p>
            <p className="text-lg text-green-50 mb-10 max-w-2xl">
              Temukan produk lokal berkualitas dan keindahan alam dari desa yang kaya akan sejarah, 
              terletak di perbatasan Jember-Bondowoso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#umkm" className="bg-yellow-400 hover:bg-yellow-500 text-green-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Jelajahi UMKM
              </Link>
              <Link href="#sejarah" className="border-2 border-white text-white hover:bg-white hover:text-green-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                Pelajari Sejarah
              </Link>
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

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-green-600 mb-2">7</div>
              <div className="text-gray-600 font-medium">Dusun</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-blue-600 mb-2">42</div>
              <div className="text-gray-600 font-medium">KM dari Jember</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Tahun Sejarah</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Produk Lokal</div>
            </div>
          </div>
        </div>
      </section>

      {/* Village History Section */}
      <section id="sejarah" className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Sejarah <span className="text-orange-600">Desa Jambearum</span>
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dari Kerajaan Biarum hingga menjadi desa yang berkembang di kaki Gunung Raung
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
                  Kerajaan Biarum Kuno
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Pada masa lampau, Desa Jambearum bukanlah desa melainkan dusun yang berada di bawah 
                  naungan Kerajaan Biarum yang berdiri megah di daerah kaki Gunung Raung dengan akses 
                  jalan menuju Putih Banyuangi.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                  Letusan Gunung Raung
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Sekitar 500 tahun yang silam, keganasan Gunung Raung yang meletus pada waktu itu 
                  sehingga merendam kerajaan tersebut. Lelehan batu yang mengalir di sepanjang sungai 
                  tetap utuh sampai sekarang sebagai saksi bisu sejarah.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                  Asal Nama Jambearum
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nama &ldquo;Jambearum&rdquo; berasal dari kata &ldquo;jambi&rdquo; (Jawa), dinamakan demikian karena di sungai 
                  ada pohon pinang yang berdiri tinggi yang memisahkan antara Pringgondani dengan Desa Jambearum.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 p-8 rounded-2xl text-white">
                <h3 className="text-3xl font-bold mb-6">Warisan Sejarah</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🏛️</span>
                    </div>
                    <div>
                      <div className="font-semibold">Reruntuhan Kerajaan</div>
                      <div className="text-orange-100">Sisa-sisa peradaban kuno</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🌋</span>
                    </div>
                    <div>
                      <div className="font-semibold">Lelehan Batu</div>
                      <div className="text-orange-100">Sepanjang Sungai Paceh</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🌴</span>
                    </div>
                    <div>
                      <div className="font-semibold">Pohon Pinang</div>
                      <div className="text-orange-100">Asal nama desa</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UMKM Showcase Section */}
      <UMKMShowcase />

      {/* Village Information */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Wilayah <span className="text-blue-600">Desa Jambearum</span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Terbagi dalam 7 dusun yang masing-masing memiliki keunikan tersendiri
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              "Karang Sampurna",
              "Paceh", 
              "Krajan",
              "Sumber Kokap Barat",
              "Sumber Kokap Timur",
              "Biarum",
              "Sumber Petung"
            ].map((dusun, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Dusun {dusun}</h3>
                  <p className="text-gray-600 text-sm">Bagian dari wilayah administratif Desa Jambearum</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-green-800 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Hubungi Kami</h2>
              <p className="text-green-100 mb-8 text-lg">
                Tertarik dengan produk UMKM kami atau ingin berkunjung ke Desa Jambearum? 
                Jangan ragu untuk menghubungi kami!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <div className="font-semibold">Alamat</div>
                    <div className="text-green-100">Desa Jambearum, Kec. Silo, Kab. Jember, Jawa Timur</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">🚗</span>
                  </div>
                  <div>
                    <div className="font-semibold">Akses</div>
                    <div className="text-green-100">42 KM dari Kota Jember ke arah utara</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">👥</span>
                  </div>
                  <div>
                    <div className="font-semibold">Mata Pencaharian</div>
                    <div className="text-green-100">Mayoritas petani dan buruh tani</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Kirim Pesan</h3>
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Nama Lengkap" 
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-green-100 focus:outline-none focus:border-white"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-green-100 focus:outline-none focus:border-white"
                />
                <textarea 
                  placeholder="Pesan Anda" 
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-green-100 focus:outline-none focus:border-white resize-none"
                ></textarea>
                <button 
                  type="submit" 
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-green-900 py-3 rounded-lg font-semibold transition-colors"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Desa Jambearum</h3>
              <p className="text-gray-400 leading-relaxed">
                Portal resmi UMKM dan informasi Desa Jambearum, Kecamatan Silo, 
                Kabupaten Jember, Jawa Timur.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Menu</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#sejarah" className="hover:text-white transition-colors">Sejarah Desa</Link></li>
                <li><Link href="#umkm" className="hover:text-white transition-colors">UMKM</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Wisata</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Dusun</h4>
              <ul className="space-y-1 text-gray-400 text-sm">
                <li>Karang Sampurna</li>
                <li>Paceh</li>
                <li>Krajan</li>
                <li>Sumber Kokap Barat & Timur</li>
                <li>Biarum</li>
                <li>Sumber Petung</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Desa Jambearum. Semua hak dilindungi undang-undang.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
