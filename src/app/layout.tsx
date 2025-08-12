import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'
import LoadingScreen from '@/components/LoadingScreen'

export const metadata: Metadata = {
  title: 'Globiweb - Agence Web & Solutions Digitales Premium',
  description: 'Créateurs d\'expériences digitales immersives. Design, développement et innovation au service de votre marque.',
  keywords: 'agence web, solutions digitales, design, développement, Three.js, WebGL, motion design',
  authors: [{ name: 'Globiweb' }],
  openGraph: {
    title: 'Globiweb - Agence Web & Solutions Digitales Premium',
    description: 'Créateurs d\'expériences digitales immersives',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-noir-profond text-white antialiased">
        <LoadingScreen />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
