// ============================================================
// CATATAN PENTING: PDFViewer & PDFDownloadLink perlu dynamic import
// karena @react-pdf/renderer tidak support SSR.
//
// Buat file: src/components/PDFViewerWrapper.tsx
// ============================================================

'use client'

import dynamic from 'next/dynamic'

// Dynamic import agar tidak di-render di server
export const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  { ssr: false, loading: () => <div className="flex-1 flex items-center justify-center text-stone-400 text-sm">Memuat preview...</div> }
)

export const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
)
