// ============================================================
// app/layout.tsx
// ============================================================

import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
})

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'SuratKu — Generator Dokumen Legal Otomatis',
  description: 'Buat kontrak freelance, surat resign, perjanjian sewa, dan dokumen legal lainnya dalam hitungan menit. Gratis, langsung download PDF.',
  keywords: 'generator surat, kontrak freelance, surat resign, perjanjian sewa, dokumen legal indonesia',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${dmSans.variable} ${dmSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
