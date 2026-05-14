// ============================================================
// app/harga/page.tsx
// Halaman pricing publik
// ============================================================

import Link from 'next/link'

const freeFeatures = [
  'Buat dokumen tanpa batas',
  'Download PDF (dengan watermark)',
  'Style Formal',
  'Simpan hingga 10 dokumen',
]

const premiumFeatures = [
  'Semua fitur Free',
  'Download PDF tanpa watermark',
  'Semua style (Formal, Modern, Elegant)',
  'Simpan dokumen unlimited',
  'Prioritas support',
]

export default function HargaPage() {
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
          <Link href="/template" style={{ fontSize: '14px', color: '#8a8579', textDecoration: 'none' }}>Template</Link>
          <Link href="/harga" style={{ fontSize: '14px', color: '#0f0e0c', fontWeight: '600', textDecoration: 'none' }}>Harga</Link>
          <Link href="/login" style={{
            background: '#0f0e0c', color: '#f5f2eb',
            fontSize: '13px', fontWeight: '600', padding: '9px 20px',
            borderRadius: '8px', textDecoration: 'none',
          }}>
            Masuk
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '120px 48px 80px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#f0ddd2', color: '#c8602a',
            fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em',
            textTransform: 'uppercase', padding: '6px 14px', borderRadius: '100px',
            marginBottom: '20px',
          }}>
            Harga Transparan
          </div>
          <h1 style={{
            fontFamily: 'var(--font-serif, serif)',
            fontSize: '48px', lineHeight: 1.1, color: '#0f0e0c',
            margin: '0 0 16px',
          }}>
            Bayar Sekali,<br />Pakai Selamanya
          </h1>
          <p style={{ fontSize: '16px', color: '#8a8579', maxWidth: '420px', margin: '0 auto', lineHeight: 1.7 }}>
            Tidak ada biaya bulanan. Upgrade sekali dan nikmati semua fitur premium untuk selamanya.
          </p>
        </div>

        {/* Pricing cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '64px' }}>

          {/* Free */}
          <div style={{
            background: '#fff', border: '1.5px solid #d4cfc4',
            borderRadius: '20px', padding: '36px',
            boxShadow: '0 4px 16px rgba(15,14,12,0.06)',
          }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#8a8579', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Free
            </div>
            <div style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '40px', color: '#0f0e0c', marginBottom: '6px' }}>
              Rp 0
            </div>
            <div style={{ fontSize: '13px', color: '#8a8579', marginBottom: '28px' }}>Selamanya gratis</div>

            <div style={{ borderTop: '1px solid #e8e4da', paddingTop: '24px', marginBottom: '28px' }}>
              {freeFeatures.map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ color: '#2e7d32', fontWeight: '700', marginTop: '1px' }}>✓</span>
                  <span style={{ fontSize: '13px', color: '#0f0e0c' }}>{f}</span>
                </div>
              ))}
            </div>

            <Link href="/login" style={{
              display: 'block', textAlign: 'center',
              background: '#f5f2eb', color: '#0f0e0c',
              border: '1.5px solid #d4cfc4', textDecoration: 'none',
              fontSize: '13px', fontWeight: '600', padding: '13px',
              borderRadius: '10px',
            }}>
              Mulai Gratis
            </Link>
          </div>

          {/* Premium */}
          <div style={{
            background: '#0f0e0c', border: '1.5px solid #0f0e0c',
            borderRadius: '20px', padding: '36px',
            boxShadow: '0 8px 32px rgba(15,14,12,0.2)',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Popular badge */}
            <div style={{
              position: 'absolute', top: '20px', right: '20px',
              background: '#c8602a', color: '#fff',
              fontSize: '10px', fontWeight: '700', padding: '4px 10px',
              borderRadius: '100px', letterSpacing: '0.04em',
            }}>
              POPULER
            </div>

            <div style={{ fontSize: '13px', fontWeight: '600', color: '#8a8579', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Premium ✨
            </div>
            <div style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '40px', color: '#f5f2eb', marginBottom: '4px' }}>
              Rp 99.000
            </div>
            <div style={{ fontSize: '13px', color: '#555', marginBottom: '28px' }}>Bayar sekali, akses selamanya</div>

            <div style={{ borderTop: '1px solid #222', paddingTop: '24px', marginBottom: '28px' }}>
              {premiumFeatures.map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ color: '#c8602a', fontWeight: '700', marginTop: '1px' }}>✓</span>
                  <span style={{ fontSize: '13px', color: '#e8e4dc' }}>{f}</span>
                </div>
              ))}
            </div>

            <button style={{
              width: '100%', background: '#c8602a', color: '#fff',
              border: 'none', borderRadius: '10px', padding: '14px',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(200,96,42,0.4)',
            }}>
              Upgrade ke Premium →
            </button>
            <p style={{ fontSize: '11px', color: '#555', textAlign: 'center', marginTop: '10px' }}>
              Pembayaran via Midtrans — aman & terenkripsi
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '28px', color: '#0f0e0c', textAlign: 'center', marginBottom: '32px' }}>
            Pertanyaan Umum
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { q: 'Apakah benar-benar bayar sekali?', a: 'Ya, tidak ada biaya berulang. Bayar sekali dan akses semua fitur premium selamanya.' },
              { q: 'Apa bedanya watermark dengan tidak?', a: 'PDF gratis memiliki tulisan "PRATINJAU" semi-transparan di background. PDF premium bersih tanpa watermark.' },
              { q: 'Apakah dokumen yang dibuat legal?', a: 'Template kami mengikuti format umum dokumen Indonesia. Namun untuk keperluan hukum penting, disarankan konsultasi dengan ahli hukum.' },
              { q: 'Metode pembayaran apa yang tersedia?', a: 'Kami mendukung transfer bank, kartu kredit, dan berbagai dompet digital melalui Midtrans.' },
            ].map((faq) => (
              <div key={faq.q} style={{
                background: '#fff', border: '1px solid #d4cfc4',
                borderRadius: '12px', padding: '20px 24px',
                boxShadow: '0 2px 6px rgba(15,14,12,0.04)',
              }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f0e0c', marginBottom: '8px' }}>{faq.q}</div>
                <div style={{ fontSize: '13px', color: '#8a8579', lineHeight: 1.6 }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer style={{ background: '#0f0e0c', color: '#8a8579', padding: '32px 48px', textAlign: 'center', marginTop: '80px' }}>
        <div style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '20px', color: '#f5f2eb', marginBottom: '6px' }}>
          Surat<span style={{ color: '#c8602a', fontStyle: 'italic' }}>Ku</span>
        </div>
        <p style={{ fontSize: '13px', margin: 0 }}>Generator dokumen legal otomatis dalam Bahasa Indonesia</p>
      </footer>
    </main>
  )
}
