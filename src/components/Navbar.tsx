'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg shadow-lg z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-green-700">
              Desa Jambearum
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Beranda
            </Link>
            <Link href="#sejarah" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Sejarah
            </Link>
            <Link href="/umkm" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              UMKM
            </Link>
            <Link href="/wisata" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Wisata
            </Link>
            <Link href="/kontak" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Kontak
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">
                Beranda
              </Link>
              <Link href="#sejarah" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">
                Sejarah
              </Link>
              <Link href="/umkm" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">
                UMKM
              </Link>
              <Link href="/wisata" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">
                Wisata
              </Link>
              <Link href="/kontak" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">
                Kontak
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 