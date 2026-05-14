// ============================================================
// app/template/page.tsx
// Halaman gallery template publik (belum login)
// ============================================================

import Link from 'next/link'
import { templates } from '@/lib/templates'

const styles = [
  { id: 'formal', label: 'Formal', desc: 'Klasik & profesional', preview: '📄', isPremium: false },
  { id: 'modern', label: 'Modern', desc: 'Bersih & minimalis', preview: '🗒️', isPremium: true },
  { id: 'elegant', label: 'Elegant', desc: 'Berkesan & mewah', preview: '📜', isPremium: true },
]

const freeTemplates = templates.filter((t) => !t.isPremium)

export default function TemplatePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f5f2eb', fontFamily: 'var(--font-sans, sans-serif)' }}>

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px', background: '#f5f2eb',
        borderBottom: '1px solid #d4cfc4',
      }}>
        <Link href="/" style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '22px', color: '#0f0e0c', textDecoration: 'none' }}>
          Surat<span style={{ color: '#c8602a', fontStyle: 'italic' }}>Ku</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/template" style={{ fontSize: '14px', color: '#0f0e0c', fontWeight: '600', textDecoration: 'none' }}>Template</Link>
          <Link href="/harga" style={{ fontSize: '14px', color: '#8a8579', textDecoration: 'none' }}>Harga</Link>
          <Link href="/login" style={{
            background: '#0f0e0c', color: '#f5f2eb',
            fontSize: '13px', fontWeight: '600', padding: '9px 20px',
            borderRadius: '8px', textDecoration: 'none',
          }}>
            Masuk
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '120px 48px 80px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#f0ddd2', color: '#c8602a',
            fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em',
            textTransform: 'uppercase', padding: '6px 14px', borderRadius: '100px',
            marginBottom: '20px',
          }}>
            <span style={{ width: '6px', height: '6px', background: '#c8602a', borderRadius: '50%', display: 'inline-block' }} />
            Gallery Template
          </div>
          <h1 style={{
            fontFamily: 'var(--font-serif, serif)',
            fontSize: '48px', lineHeight: 1.1, color: '#0f0e0c',
            margin: '0 0 16px',
          }}>
            Pilih Style,<br />Buat Dokumen
          </h1>
          <p style={{ fontSize: '16px', color: '#8a8579', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Setiap jenis dokumen tersedia dalam beberapa style. User premium mendapat akses ke semua pilihan.
          </p>
        </div>

        {/* Style showcase */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '28px', color: '#0f0e0c', marginBottom: '6px' }}>
            Style Tersedia
          </h2>
          <p style={{ fontSize: '14px', color: '#8a8579', marginBottom: '24px' }}>
            Sama jenis dokumen, tampilan berbeda sesuai kebutuhan kamu.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {styles.map((style) => (
              <div key={style.id} style={{
                background: '#fff', border: '1.5px solid #d4cfc4',
                borderRadius: '16px', padding: '28px',
                boxShadow: '0 4px 16px rgba(15,14,12,0.06)',
                position: 'relative', overflow: 'hidden',
              }}>
                {style.isPremium && (
                  <div style={{
                    position: 'absolute', top: '16px', right: '16px',
                    background: '#c8602a', color: '#fff',
                    fontSize: '10px', fontWeight: '700', padding: '3px 8px',
                    borderRadius: '100px',
                  }}>
                    PRO
                  </div>
                )}
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{style.preview}</div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f0e0c', marginBottom: '6px' }}>
                  {style.label}
                </div>
                <div style={{ fontSize: '13px', color: '#8a8579', marginBottom: '20px' }}>{style.desc}</div>
                {style.isPremium ? (
                  <Link href="/harga" style={{
                    display: 'inline-block', fontSize: '12px', fontWeight: '600',
                    color: '#c8602a', textDecoration: 'none',
                    padding: '7px 14px', border: '1px solid #f0ddd2',
                    borderRadius: '7px', background: '#fdf3ee',
                  }}>
                    Unlock dengan Premium →
                  </Link>
                ) : (
                  <span style={{
                    display: 'inline-block', fontSize: '12px', fontWeight: '600',
                    color: '#2e7d32', padding: '7px 14px',
                    background: '#e8f5e9', borderRadius: '7px',
                  }}>
                    ✓ Tersedia Gratis
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Template list */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '28px', color: '#0f0e0c', marginBottom: '6px' }}>
            Semua Template
          </h2>
          <p style={{ fontSize: '14px', color: '#8a8579', marginBottom: '28px' }}>
            Klik template untuk mulai membuat dokumen.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            {templates.map((template) => (
              <Link
                key={template.slug}
                href={template.isPremium ? '/harga' : `/generate/${template.slug}`}
                style={{
                  display: 'block', textDecoration: 'none',
                  background: '#fff', border: '1.5px solid #d4cfc4',
                  borderRadius: '14px', padding: '22px',
                  boxShadow: '0 2px 8px rgba(15,14,12,0.04)',
                  position: 'relative', transition: 'all 0.2s',
                  opacity: template.isPremium ? 0.7 : 1,
                }}
              >
                {template.isPremium && (
                  <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    background: '#f0ddd2', color: '#c8602a',
                    fontSize: '9px', fontWeight: '700', padding: '2px 7px',
                    borderRadius: '100px',
                  }}>
                    🔒 PRO
                  </div>
                )}
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{template.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f0e0c', marginBottom: '6px' }}>
                  {template.name}
                </div>
                <div style={{ fontSize: '11px', color: '#8a8579', lineHeight: 1.6 }}>
                  {template.description}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div style={{
          marginTop: '64px',
          background: '#0f0e0c', borderRadius: '20px',
          padding: '48px', textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif, serif)',
            fontSize: '32px', color: '#f5f2eb',
            margin: '0 0 12px',
          }}>
            Akses Semua Style & Template
          </h2>
          <p style={{ fontSize: '15px', color: '#8a8579', marginBottom: '28px' }}>
            Upgrade ke Premium dan buat dokumen tanpa batas, tanpa watermark.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link href="/harga" style={{
              background: '#c8602a', color: '#fff', textDecoration: 'none',
              fontSize: '14px', fontWeight: '600', padding: '14px 28px',
              borderRadius: '10px', boxShadow: '0 4px 16px rgba(200,96,42,0.35)',
            }}>
              Lihat Paket Premium →
            </Link>
            <Link href="/login" style={{
              background: 'transparent', color: '#f5f2eb', textDecoration: 'none',
              fontSize: '14px', fontWeight: '500', padding: '14px 24px',
              borderRadius: '10px', border: '1px solid #333',
            }}>
              Daftar Gratis
            </Link>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer style={{ background: '#0f0e0c', color: '#8a8579', padding: '32px 48px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '20px', color: '#f5f2eb', marginBottom: '6px' }}>
          Surat<span style={{ color: '#c8602a', fontStyle: 'italic' }}>Ku</span>
        </div>
        <p style={{ fontSize: '13px', margin: 0 }}>Generator dokumen legal otomatis dalam Bahasa Indonesia</p>
      </footer>
    </main>
  )
}
