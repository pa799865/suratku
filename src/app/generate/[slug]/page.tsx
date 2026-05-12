'use client'

import { useState } from 'react'
import { PDFDownloadLink, PDFViewer } from '@/components/PDFViewerWrapper'
import { getTemplate } from '@/lib/templates'
import { DocumentForm } from '@/components/DocumentForm'
import { KontrakFreelancePDF } from '@/components/pdf-templates/KontrakFreelance'
import type { FormValues } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { use, useMemo } from 'react'
import { SuratResignPDF } from '@/components/pdf-templates/SuratResign'
import { PerjanjianSewaPDF } from '@/components/pdf-templates/PerjanjianSewa'
import { SuratLamaranPDF } from '@/components/pdf-templates/SuratLamaran'

interface Props {
  params: Promise<{ slug: string }>
}

export default function GeneratePage({ params }: Props) {
  const { slug } = use(params)  // unwrap dulu
  const template = getTemplate(slug)
  if (!template) notFound()

  const [values, setValues] = useState<FormValues>({})
  const [isClient, setIsClient] = useState(false)

  // react-pdf butuh environment browser
  // gunakan useEffect di komponen sesungguhnya
  // (contoh ini sudah 'use client', tapi PDF viewer perlu dynamic import)

  // Pilih PDF component berdasarkan slug
  const pdfComponent = useMemo(() => {
  switch (slug) {
    case 'kontrak-freelance':
      return <KontrakFreelancePDF values={values} isWatermarked={true} />
    case 'surat-resign':
      return <SuratResignPDF values={values} isWatermarked={true} />
    case 'perjanjian-sewa':
      return <PerjanjianSewaPDF values={values} isWatermarked={true} />
    case 'surat-lamaran':
      return <SuratLamaranPDF values={values} isWatermarked={true} />
    default:
      return <KontrakFreelancePDF values={values} isWatermarked={true} />
  }
}, [values, slug])

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#f5f2eb]">
      {/* Navbar mini */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-stone-200 bg-[#f5f2eb] z-10 shrink-0">
        <Link href="/" className="font-serif text-xl text-stone-800">
          Surat<span className="text-amber-600 italic">Ku</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-stone-500">{template.name}</span>
        </div>
      </nav>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* ---- LEFT: Form ---- */}
        <div className="w-[480px] shrink-0 overflow-y-auto border-r border-stone-200 p-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 transition-colors mb-6"
          >
            ← Kembali
          </Link>

          <h1 className="font-serif text-2xl text-stone-900 mb-1">{template.name}</h1>
          <p className="text-sm text-stone-500 mb-8">{template.description}</p>

          <DocumentForm
            template={template}
            values={values}
            onChange={setValues}
          />

          {/* Action buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-stone-200">
            {/* Download PDF (free = watermark) */}
            <PDFDownloadLink
              document={pdfComponent}
              fileName={`${template.slug}-suratku.pdf`}
              className="flex-1"
            >
              {({ loading }) => (
                <button
                  disabled={loading}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg py-3 px-4 text-sm transition-all shadow-md shadow-amber-600/25 disabled:opacity-60"
                >
                  {loading ? 'Menyiapkan...' : '⬇ Download PDF (Gratis)'}
                </button>
              )}
            </PDFDownloadLink>

            {/* Download tanpa watermark = premium */}
            <button
              onClick={() => alert('Fitur premium — upgrade untuk download tanpa watermark!')}
              className="px-4 py-3 border border-stone-300 hover:border-stone-500 text-stone-600 font-medium rounded-lg text-sm transition-colors"
            >
              ✨ Premium
            </button>
          </div>

          <p className="text-xs text-stone-400 text-center mt-3">
            Versi gratis menyertakan watermark "PRATINJAU" pada dokumen.
          </p>
        </div>

        {/* ---- RIGHT: PDF Preview ---- */}
        <div className="flex-1 flex flex-col bg-stone-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 bg-stone-100 border-b border-stone-300">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Preview Dokumen</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <PDFViewer width="100%" height="100%" showToolbar={false}>
              {pdfComponent}
            </PDFViewer>
          </div>
        </div>

      </div>
    </div>
  )
}
