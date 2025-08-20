import Script from 'next/script'

interface StructuredDataProps {
  type: 'website' | 'organization' | 'local-business'
  data?: Record<string, unknown>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getSchemaData = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'
    
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Desa Jambearum",
          "description": "Portal resmi UMKM dan wisata Desa Jambearum, Kecamatan Silo, Kabupaten Jember",
          "url": baseUrl,
          "inLanguage": "id-ID",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}/umkm?search={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Pemerintah Desa Jambearum",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Jambearum",
              "addressRegion": "Jawa Timur",
              "postalCode": "68171",
              "addressCountry": "ID"
            }
          }
        }

      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "GovernmentOrganization",
          "name": "Pemerintah Desa Jambearum",
          "description": "Pemerintah Desa Jambearum, Kecamatan Silo, Kabupaten Jember",
          "url": baseUrl,
          "logo": `${baseUrl}/logo.png`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Desa Jambearum",
            "addressLocality": "Silo",
            "addressRegion": "Jawa Timur",
            "postalCode": "68171",
            "addressCountry": "ID"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-8.1234",
            "longitude": "113.5678"
          },
          "areaServed": {
            "@type": "Place",
            "name": "Desa Jambearum"
          },
          "knowsAbout": [
            "UMKM",
            "Ekonomi Desa",
            "Wisata Desa",
            "Pertanian",
            "Kerajinan Tangan"
          ]
        }

      case 'local-business':
        return data || {}

      default:
        return {}
    }
  }

  const schemaData = getSchemaData()

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData)
      }}
    />
  )
} 