import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "Desa Jambearum - Portal UMKM & Wisata Desa",
    template: "%s | Desa Jambearum"
  },
  description: "Portal resmi UMKM dan wisata Desa Jambearum, Kecamatan Sumberjambe, Kabupaten Jember. Temukan produk lokal berkualitas dan keindahan alam di kaki Gunung Raung dari para pelaku UMKM desa.",
  keywords: [
    "Desa Jambearum",
    "UMKM",
    "wisata desa", 
    "Jember",
    "Bondowoso",
    "Gunung Raung",
    "produk lokal",
    "ekonomi desa",
    "usaha kecil",
    "kerajinan tangan",
    "pertanian",
    "produk olahan",
    "Sumberjambe",
    "Jawa Timur"
  ],
  authors: [{ name: "Pemerintah Desa Jambearum" }],
  creator: "Desa Jambearum",
  publisher: "Desa Jambearum",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    title: 'Desa Jambearum - Portal UMKM & Wisata Desa',
    description: 'Portal resmi UMKM dan wisata Desa Jambearum. Temukan produk lokal berkualitas dari para pelaku UMKM di kaki Gunung Raung.',
    siteName: 'Desa Jambearum',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Desa Jambearum - Portal UMKM & Wisata',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Desa Jambearum - Portal UMKM & Wisata Desa',
    description: 'Portal resmi UMKM dan wisata Desa Jambearum. Temukan produk lokal berkualitas dari para pelaku UMKM di kaki Gunung Raung.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
