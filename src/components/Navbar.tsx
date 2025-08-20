'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation items with icons
  const navItems = [
    { href: '/', label: 'Beranda', icon: '🏠' },
    { href: '#sejarah', label: 'Sejarah', icon: '📖' },
    { href: '/umkm', label: 'UMKM', icon: '🏪' },
    { href: '/wisata', label: 'Wisata', icon: '🏔️' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('#')) return false // For anchor links
    return pathname.startsWith(href)
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-green-100' 
        : 'bg-white/90 backdrop-blur-lg shadow-md'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="group flex items-center space-x-3 py-2"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-white text-xl font-bold">🌾</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                  Desa Jambearum
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Kecamatan Sumberjambe, Jember
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-white bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
                {!isActive(item.href) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                )}
              </Link>
            ))}
          </div>



          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative p-2 rounded-lg transition-all duration-300 ${
                isOpen 
                  ? 'text-white bg-green-600 shadow-lg' 
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-4 space-y-2 bg-white/95 backdrop-blur-xl border-t border-gray-100">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform ${
                  isActive(item.href)
                    ? 'text-white bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg scale-105'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50 hover:scale-102'
                }`}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: isOpen ? 'slideInUp 0.3s ease-out forwards' : 'none'
                }}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
            

          </div>
        </div>
      </div>

      {/* Add custom keyframes */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </nav>
  )
} 