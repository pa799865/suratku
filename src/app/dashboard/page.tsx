'use client'

export const dynamic = 'force-dynamic'
// ============================================================
// app/dashboard/page.tsx
// ============================================================

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { templates } from '@/lib/templates'

interface Document {
  id: string
  template_slug: string
  template_name: string
  created_at: string
}

interface Profile {
  full_name: string
  email: string
  is_premium: boolean
}

export default function DashboardPage() {
  const supabase = createClient()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profileData } = await supabase
        .from('profiles').select('*').eq('id', user.id).single()
      setProfile(profileData)

      const { data: docsData } = await supabase
        .from('documents').select('*').order('created_at', { ascending: false })
      setDocuments(docsData || [])
      setLoading(false)
    }
    init()
  }, [])

  const handleDelete = async (id: string) => {
    await supabase.from('documents').delete().eq('id', id)
    setDocuments((prev) => prev.filter((d) => d.id !== id))
  }

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric',
  })

  const getTemplateIcon = (slug: string) =>
    templates.find((t) => t.slug === slug)?.icon || '📄'

  const firstName = profile?.full_name?.split(' ')[0] || 'Pengguna'
  const kuotaSisa = Math.max(0, 10 - documents.length)

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div style={{ color: '#a09a8e', fontSize: '14px' }}>Memuat...</div>
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ fontSize: '11px', color: '#a09a8e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
          Overview
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '34px', fontWeight: '400', color: '#0f0e0c', margin: 0 }}>
          Halo, {firstName} 👋
        </h1>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: '#fff', border: '1px solid #d4cfc4', borderRadius: '14px', padding: '22px 24px', boxShadow: '0 2px 8px rgba(15,14,12,0.04)' }}>
          <div style={{ fontSize: '11px', color: '#a09a8e', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Total Dokumen</div>
          <div style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '40px', color: '#0f0e0c', lineHeight: 1 }}>{documents.length}</div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #d4cfc4', borderRadius: '14px', padding: '22px 24px', boxShadow: '0 2px 8px rgba(15,14,12,0.04)' }}>
          <div style={{ fontSize: '11px', color: '#a09a8e', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>
            {profile?.is_premium ? 'Kapasitas' : 'Storage Tersisa'}
          </div>
          <div style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '40px', color: '#0f0e0c', lineHeight: 1 }}>
            {profile?.is_premium ? '∞' : kuotaSisa}
          </div>
          {!profile?.is_premium && (
            <div style={{ fontSize: '11px', color: '#a09a8e', marginTop: '6px' }}>dari 10 slot gratis</div>
          )}
        </div>

        <div style={{
          background: profile?.is_premium ? '#fdf3ee' : '#fff',
          border: `1px solid ${profile?.is_premium ? '#f0ddd2' : '#d4cfc4'}`,
          borderRadius: '14px', padding: '22px 24px',
          boxShadow: '0 2px 8px rgba(15,14,12,0.04)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div style={{ fontSize: '11px', color: '#a09a8e', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Plan</div>
          <div style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '24px', color: profile?.is_premium ? '#c8602a' : '#0f0e0c', marginBottom: '14px' }}>
            {profile?.is_premium ? 'Premium ✨' : 'Free'}
          </div>
          {!profile?.is_premium && (
            <Link href="/dashboard/upgrade" style={{
              display: 'block', textAlign: 'center',
              background: '#c8602a', color: '#fff', textDecoration: 'none',
              borderRadius: '8px', padding: '9px', fontSize: '12px', fontWeight: '600',
              boxShadow: '0 4px 12px rgba(200,96,42,0.25)',
            }}>
              Upgrade ke Premium
            </Link>
          )}
        </div>
      </div>

      {/* Upgrade banner */}
      {!profile?.is_premium && (
        <div style={{
          background: '#fdf3ee', border: '1px solid #f0ddd2',
          borderRadius: '14px', padding: '18px 22px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '32px',
        }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f0e0c', marginBottom: '4px' }}>
              Akses semua style template & download tanpa watermark
            </div>
            <div style={{ fontSize: '12px', color: '#a09a8e' }}>Upgrade ke Premium — sekali bayar, selamanya</div>
          </div>
          <Link href="/dashboard/upgrade" style={{
            background: '#c8602a', color: '#fff', textDecoration: 'none',
            border: 'none', borderRadius: '10px', padding: '10px 22px',
            fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap', marginLeft: '24px',
            boxShadow: '0 4px 14px rgba(200,96,42,0.25)',
          }}>
            Upgrade →
          </Link>
        </div>
      )}

      {/* Documents */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#0f0e0c', margin: 0 }}>Riwayat Dokumen</h2>
        <Link href="/dashboard/buat" style={{
          fontSize: '12px', fontWeight: '600', color: '#c8602a',
          textDecoration: 'none', padding: '8px 16px',
          border: '1px solid #f0ddd2', borderRadius: '8px', background: '#fdf3ee',
        }}>
          + Buat Baru
        </Link>
      </div>

      {documents.length === 0 ? (
        <div style={{
          background: '#fff', border: '1.5px dashed #d4cfc4',
          borderRadius: '14px', padding: '60px 24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '36px', marginBottom: '12px', opacity: 0.3 }}>📄</div>
          <div style={{ fontSize: '13px', color: '#a09a8e', marginBottom: '20px' }}>Belum ada dokumen tersimpan</div>
          <Link href="/dashboard/buat" style={{
            display: 'inline-block', background: '#c8602a', color: '#fff',
            textDecoration: 'none', fontWeight: '600', fontSize: '13px',
            padding: '10px 24px', borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(200,96,42,0.25)',
          }}>
            Buat Dokumen Pertama
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {documents.map((doc) => (
            <div key={doc.id} style={{
              background: '#fff', border: '1px solid #d4cfc4',
              borderRadius: '12px', padding: '14px 18px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              boxShadow: '0 2px 6px rgba(15,14,12,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: '#fdf3ee', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', flexShrink: 0,
                }}>
                  {getTemplateIcon(doc.template_slug)}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f0e0c', marginBottom: '3px' }}>{doc.template_name}</div>
                  <div style={{ fontSize: '11px', color: '#a09a8e' }}>{formatDate(doc.created_at)}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link href={`/dashboard/buat/${doc.template_slug}`} style={{
                  fontSize: '12px', fontWeight: '600', color: '#c8602a',
                  textDecoration: 'none', padding: '7px 14px',
                  border: '1px solid #f0ddd2', borderRadius: '7px', background: '#fdf3ee',
                }}>
                  Buka
                </Link>
                <button onClick={() => handleDelete(doc.id)} style={{
                  fontSize: '12px', color: '#a09a8e', background: 'none',
                  border: '1px solid #d4cfc4', borderRadius: '7px',
                  padding: '7px 14px', cursor: 'pointer',
                }}>
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}