'use client'
export const dynamic = 'force-dynamic'
// ============================================================
// app/dashboard/buat/[slug]/page.tsx
// ============================================================

import { useState, useMemo, use, useEffect } from 'react'
import { getTemplate } from '@/lib/templates'
import { DocumentForm } from '@/components/DocumentForm'
import { KontrakFreelancePDF } from '@/components/pdf-templates/KontrakFreelance'
import { SuratResignPDF } from '@/components/pdf-templates/SuratResign'
import { PerjanjianSewaPDF } from '@/components/pdf-templates/PerjanjianSewa'
import { SuratLamaranPDF } from '@/components/pdf-templates/SuratLamaran'
import { PerjanjianHutangPDF } from '@/components/pdf-templates/PerjanjianHutang'
import { MOUKerjasamaPDF } from '@/components/pdf-templates/MOUKerjasama'
import { PDFDownloadLink, PDFViewer } from '@/components/PDFViewerWrapper'
import { createClient } from '@/lib/supabase'
import { notFound, useRouter } from 'next/navigation'
import type { FormValues } from '@/types'
import type { DocStyle } from '@/components/pdf-templates/styles'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ style?: string }>
}

export default function BuatSlugPage({ params, searchParams }: Props) {
  const { slug } = use(params)
  const { style = 'formal' } = use(searchParams)
  const docStyle = style as DocStyle

  const template = getTemplate(slug)
  if (!template) notFound()

  const router = useRouter()
  const supabase = createClient()
  const [values, setValues] = useState<FormValues>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      supabase.from('profiles').select('is_premium').eq('id', user.id).single()
        .then(({ data }) => setIsPremium(data?.is_premium || false))
    })
  }, [])

  const watermarked = !isPremium

  const pdfComponent = useMemo(() => {
    switch (slug) {
      case 'kontrak-freelance':
        return <KontrakFreelancePDF values={values} isWatermarked={watermarked} docStyle={docStyle} />
      case 'surat-resign':
        return <SuratResignPDF values={values} isWatermarked={watermarked} docStyle={docStyle} />
      case 'perjanjian-sewa':
        return <PerjanjianSewaPDF values={values} isWatermarked={watermarked} docStyle={docStyle} />
      case 'surat-lamaran':
        return <SuratLamaranPDF values={values} isWatermarked={watermarked} docStyle={docStyle} />
      case 'perjanjian-hutang':
        return <PerjanjianHutangPDF values={values} isWatermarked={watermarked} docStyle={docStyle} />
      case 'mou-kerjasama':
        return <MOUKerjasamaPDF values={values} isWatermarked={watermarked} docStyle={docStyle} />
      default:
        return <KontrakFreelancePDF values={values} isWatermarked={watermarked} docStyle={docStyle} />
    }
  }, [values, slug, watermarked, docStyle])

  const handleSave = async () => {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }
    await supabase.from('documents').insert({
      user_id: user.id,
      template_slug: slug,
      template_name: template.name,
      form_values: values,
    })
    setSaved(true)
    setSaving(false)
    setTimeout(() => setSaved(false), 3000)
  }

  const styleLabels: Record<DocStyle, string> = {
    formal: 'Formal',
    modern: 'Modern',
    elegant: 'Elegant',
  }

  return (
    <div style={{ display: 'flex', gap: '0', margin: '-52px', height: '100vh', overflow: 'hidden' }}>

      {/* ── LEFT: Form ── */}
      <div style={{
        width: '420px', flexShrink: 0,
        overflowY: 'auto', padding: '40px 32px',
        borderRight: '1px solid #d4cfc4',
        background: '#f5f2eb',
      }}>
        <button
          onClick={() => router.back()}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '13px', color: '#a09a8e', marginBottom: '20px',
            padding: 0, display: 'flex', alignItems: 'center', gap: '6px',
          }}
        >
          ← Kembali
        </button>

        {/* Style badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span style={{
            background: '#fdf3ee', color: '#c8602a',
            fontSize: '10px', fontWeight: '700', letterSpacing: '0.08em',
            padding: '3px 10px', borderRadius: '100px', textTransform: 'uppercase',
          }}>
            Style: {styleLabels[docStyle]}
          </span>
          {!isPremium && docStyle !== 'formal' && (
            <span style={{ fontSize: '11px', color: '#a09a8e' }}>
              (upgrade untuk style ini)
            </span>
          )}
        </div>

        <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '22px', color: '#0f0e0c', margin: '0 0 4px' }}>
          {template.name}
        </h2>
        <p style={{ fontSize: '12px', color: '#a09a8e', marginBottom: '24px' }}>
          {template.description}
        </p>

        <DocumentForm template={template} values={values} onChange={setValues} />

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '24px', paddingTop: '18px', borderTop: '1px solid #d4cfc4' }}>
          <PDFDownloadLink document={pdfComponent} fileName={`${slug}-${docStyle}-suratku.pdf`} style={{ flex: 1 }}>
            {({ loading }: { loading: boolean }) => (
              <button disabled={loading} style={{
                width: '100%', background: '#c8602a', color: '#fff',
                border: 'none', borderRadius: '10px', padding: '12px',
                fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(200,96,42,0.25)',
                opacity: loading ? 0.6 : 1,
              }}>
                {loading ? 'Menyiapkan...' : '⬇ Download PDF'}
              </button>
            )}
          </PDFDownloadLink>

          <button onClick={handleSave} disabled={saving} style={{
            padding: '12px 16px', borderRadius: '10px', cursor: 'pointer',
            border: '1.5px solid #d4cfc4',
            background: saved ? '#e8f5e9' : '#fff',
            color: saved ? '#2e7d32' : '#0f0e0c',
            fontSize: '13px', fontWeight: '500', transition: 'all 0.2s',
          }}>
            {saving ? '...' : saved ? '✓ Tersimpan' : 'Simpan'}
          </button>
        </div>

        {!isPremium && (
          <p style={{ fontSize: '11px', color: '#a09a8e', textAlign: 'center', marginTop: '10px' }}>
            PDF gratis menyertakan watermark.{' '}
            <a href="/dashboard/upgrade" style={{ color: '#c8602a', textDecoration: 'none', fontWeight: '600' }}>
              Upgrade →
            </a>
          </p>
        )}
      </div>

      {/* ── RIGHT: Preview ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#e8e4da', overflow: 'hidden' }}>
        <div style={{
          padding: '12px 20px', background: '#ede9df',
          borderBottom: '1px solid #d4cfc4',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: '11px', fontWeight: '600', color: '#a09a8e', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Preview — {styleLabels[docStyle]}
          </span>
          {!isPremium && (
            <span style={{ fontSize: '11px', color: '#c8602a', fontWeight: '500' }}>
              🔒 Watermark aktif · <a href="/dashboard/upgrade" style={{ color: '#c8602a' }}>Upgrade</a>
            </span>
          )}
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <PDFViewer width="100%" height="100%" showToolbar={false}>
            {pdfComponent}
          </PDFViewer>
        </div>
      </div>

    </div>
  )
}
