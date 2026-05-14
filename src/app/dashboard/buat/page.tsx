'use client'

export const dynamic = 'force-dynamic'
// ============================================================
// app/dashboard/buat/page.tsx
// Pilih template untuk dibuat (authenticated)
// ============================================================

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { templates } from '@/lib/templates'
import Link from 'next/link'

const styleOptions = [
  { id: 'formal', label: 'Formal', desc: 'Klasik & profesional', isPremium: false },
  { id: 'modern', label: 'Modern', desc: 'Bersih & minimalis', isPremium: true },
  { id: 'elegant', label: 'Elegant', desc: 'Berkesan & mewah', isPremium: true },
]

export default function BuatPage() {
  const supabase = createClient()
  const [isPremium, setIsPremium] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState('formal')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('profiles').select('is_premium').eq('id', user.id).single()
      setIsPremium(data?.is_premium || false)
    }
    init()
  }, [])

  const filteredTemplates = templates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '11px', color: '#a09a8e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
          Buat Dokumen
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '34px', fontWeight: '400', color: '#0f0e0c', margin: '0 0 8px' }}>
          Pilih Template
        </h1>
        <p style={{ fontSize: '14px', color: '#a09a8e', margin: 0 }}>
          Pilih jenis dokumen dan style yang ingin kamu buat.
        </p>
      </div>

      {/* Style selector */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#0f0e0c', marginBottom: '10px' }}>
          Style Dokumen
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {styleOptions.map((style) => {
            const locked = style.isPremium && !isPremium
            const isSelected = selectedStyle === style.id
            return (
              <button
                key={style.id}
                onClick={() => !locked && setSelectedStyle(style.id)}
                style={{
                  padding: '12px 18px', borderRadius: '10px', cursor: locked ? 'not-allowed' : 'pointer',
                  border: isSelected ? '2px solid #c8602a' : '1.5px solid #d4cfc4',
                  background: isSelected ? '#fdf3ee' : '#fff',
                  opacity: locked ? 0.5 : 1,
                  textAlign: 'left', position: 'relative', minWidth: '130px',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: '600', color: isSelected ? '#c8602a' : '#0f0e0c', marginBottom: '3px' }}>
                  {style.label}
                  {locked && <span style={{ marginLeft: '6px', fontSize: '10px' }}>🔒</span>}
                </div>
                <div style={{ fontSize: '11px', color: '#a09a8e' }}>{style.desc}</div>
                {style.isPremium && (
                  <span style={{
                    position: 'absolute', top: '8px', right: '8px',
                    background: '#c8602a', color: '#fff',
                    fontSize: '9px', fontWeight: '700', padding: '2px 6px', borderRadius: '100px',
                  }}>
                    PRO
                  </span>
                )}
              </button>
            )
          })}

          {!isPremium && (
            <Link href="/dashboard/upgrade" style={{
              padding: '12px 18px', borderRadius: '10px',
              border: '1.5px dashed #d4cfc4', background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none', color: '#c8602a',
              fontSize: '12px', fontWeight: '600', minWidth: '130px',
            }}>
              + Unlock semua →
            </Link>
          )}
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari template..."
          style={{
            width: '100%', maxWidth: '360px',
            background: '#fff', border: '1.5px solid #d4cfc4',
            borderRadius: '10px', padding: '10px 16px',
            fontSize: '13px', color: '#0f0e0c',
            outline: 'none', fontFamily: 'var(--font-sans, sans-serif)',
          }}
        />
      </div>

      {/* Template grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '14px',
      }}>
        {filteredTemplates.map((template) => {
          const isPremiumTemplate = template.isPremium
          const locked = isPremiumTemplate && !isPremium

          return (
            <div key={template.slug} style={{ position: 'relative' }}>
              <Link
                href={locked ? '/dashboard/upgrade' : `/dashboard/buat/${template.slug}?style=${selectedStyle}`}
                style={{
                  display: 'block', textDecoration: 'none',
                  background: '#fff', border: '1.5px solid #d4cfc4',
                  borderRadius: '14px', padding: '22px',
                  transition: 'all 0.2s', cursor: locked ? 'not-allowed' : 'pointer',
                  opacity: locked ? 0.6 : 1,
                  boxShadow: '0 2px 8px rgba(15,14,12,0.04)',
                }}
              >
                {/* Lock overlay */}
                {locked && (
                  <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    background: '#f0ddd2', borderRadius: '6px',
                    padding: '4px 8px', fontSize: '10px', fontWeight: '700', color: '#c8602a',
                  }}>
                    🔒 Premium
                  </div>
                )}

                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px',
                  background: '#fdf3ee', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', marginBottom: '14px',
                }}>
                  {template.icon}
                </div>

                <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f0e0c', marginBottom: '6px' }}>
                  {template.name}
                </div>
                <div style={{ fontSize: '12px', color: '#a09a8e', lineHeight: 1.6, marginBottom: '14px' }}>
                  {template.description}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '100px',
                    background: isPremiumTemplate ? '#f0ddd2' : '#e8f5e9',
                    color: isPremiumTemplate ? '#c8602a' : '#2e7d32',
                  }}>
                    {isPremiumTemplate ? 'Premium' : 'Gratis'}
                  </span>
                  {!locked && (
                    <span style={{ fontSize: '16px', color: '#d4cfc4' }}>→</span>
                  )}
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
