'use client'
export const dynamic = 'force-dynamic'
// ============================================================
// app/dashboard/upgrade/page.tsx
// ============================================================

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const premiumFeatures = [
  { icon: '🎨', title: 'Semua Style Template', desc: 'Akses style Modern & Elegant selain Formal' },
  { icon: '🚫', title: 'Tanpa Watermark', desc: 'Download PDF bersih tanpa tulisan PRATINJAU' },
  { icon: '💾', title: 'Storage Unlimited', desc: 'Simpan dokumen tanpa batas, selamanya' },
  { icon: '📵', title: 'Tanpa Iklan', desc: 'Pengalaman bersih tanpa gangguan iklan' },
]

const freeList = [
  'Buat dokumen tanpa batas',
  'Download PDF (dengan watermark)',
  'Style Formal saja',
  'Simpan hingga 10 dokumen',
  'Ada iklan',
]

const premiumList = [
  'Semua fitur Free',
  'Download PDF tanpa watermark',
  'Style Formal, Modern & Elegant',
  'Storage unlimited',
  'Tanpa iklan selamanya',
]

declare global {
  interface Window {
    snap: {
      pay: (token: string, options: {
        onSuccess: (result: unknown) => void
        onPending: (result: unknown) => void
        onError: (result: unknown) => void
        onClose: () => void
      }) => void
    }
  }
}

export default function UpgradePage() {
  const supabase = createClient()
  const searchParams = useSearchParams()
  const [isPremium, setIsPremium] = useState(false)
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  const [paymentMsg, setPaymentMsg] = useState('')

  const paymentStatus = searchParams.get('payment')

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('profiles').select('is_premium').eq('id', user.id).single()
      setIsPremium(data?.is_premium || false)
      setLoading(false)
    }
    init()

    // Load Midtrans Snap script
    const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true'
    const snapUrl = isProduction
      ? 'https://app.midtrans.com/snap/snap.js'
      : 'https://app.sandbox.midtrans.com/snap/snap.js'

    const script = document.createElement('script')
    script.src = snapUrl
    script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '')
    script.async = true
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const handlePayment = async () => {
    setPaying(true)
    setPaymentMsg('')

    try {
      const response = await fetch('/api/payment/create', { method: 'POST' })
      const data = await response.json()

      if (!response.ok) {
        setPaymentMsg(data.error === 'Already premium' ? 'Kamu sudah premium!' : 'Gagal membuat transaksi. Coba lagi.')
        setPaying(false)
        return
      }

      // Buka Midtrans Snap popup
      window.snap.pay(data.token, {
        onSuccess: () => {
          setIsPremium(true)
          setPaymentMsg('Pembayaran berhasil! Akun kamu sudah Premium. 🎉')
          setPaying(false)
        },
        onPending: () => {
          setPaymentMsg('Pembayaran pending. Selesaikan pembayaran untuk mengaktifkan Premium.')
          setPaying(false)
        },
        onError: () => {
          setPaymentMsg('Pembayaran gagal. Silakan coba lagi.')
          setPaying(false)
        },
        onClose: () => {
          setPaying(false)
        },
      })
    } catch {
      setPaymentMsg('Terjadi kesalahan. Coba lagi.')
      setPaying(false)
    }
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div style={{ color: '#a09a8e', fontSize: '14px' }}>Memuat...</div>
    </div>
  )

  // Sudah premium
  if (isPremium) return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '11px', color: '#a09a8e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Paket</div>
        <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '34px', fontWeight: '400', color: '#0f0e0c', margin: 0 }}>Upgrade</h1>
      </div>
      <div style={{
        background: '#fdf3ee', border: '1.5px solid #f0ddd2',
        borderRadius: '16px', padding: '36px',
        display: 'flex', alignItems: 'center', gap: '24px', maxWidth: '560px',
      }}>
        <div style={{ fontSize: '48px' }}>✨</div>
        <div>
          <div style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '24px', color: '#c8602a', marginBottom: '6px' }}>
            Kamu sudah Premium!
          </div>
          <div style={{ fontSize: '13px', color: '#a09a8e', lineHeight: 1.6 }}>
            Nikmati semua fitur tanpa batas. Terima kasih sudah mendukung SuratKu.
          </div>
          <Link href="/dashboard/buat" style={{
            display: 'inline-block', marginTop: '16px',
            background: '#c8602a', color: '#fff', textDecoration: 'none',
            fontSize: '13px', fontWeight: '600', padding: '10px 20px', borderRadius: '8px',
          }}>
            Buat Dokumen →
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '11px', color: '#a09a8e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Paket</div>
        <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '34px', fontWeight: '400', color: '#0f0e0c', margin: '0 0 8px' }}>
          Upgrade ke Premium
        </h1>
        <p style={{ fontSize: '14px', color: '#a09a8e', margin: 0 }}>
          Bayar sekali <strong style={{ color: '#0f0e0c' }}>Rp 29.000</strong>, akses selamanya. Tidak ada biaya bulanan.
        </p>
      </div>

      {/* Payment status messages */}
      {paymentStatus === 'success' && (
        <div style={{
          background: '#e8f5e9', border: '1px solid #a5d6a7',
          borderRadius: '10px', padding: '14px 18px',
          fontSize: '13px', color: '#2e7d32', marginBottom: '24px',
        }}>
          🎉 Pembayaran berhasil! Akun kamu sudah aktif sebagai Premium.
        </div>
      )}
      {paymentStatus === 'error' && (
        <div style={{
          background: '#ffebee', border: '1px solid #ffcdd2',
          borderRadius: '10px', padding: '14px 18px',
          fontSize: '13px', color: '#c62828', marginBottom: '24px',
        }}>
          Pembayaran gagal. Silakan coba lagi.
        </div>
      )}
      {paymentMsg && (
        <div style={{
          background: paymentMsg.includes('berhasil') ? '#e8f5e9' : '#fff8e1',
          border: `1px solid ${paymentMsg.includes('berhasil') ? '#a5d6a7' : '#ffe082'}`,
          borderRadius: '10px', padding: '14px 18px',
          fontSize: '13px', color: paymentMsg.includes('berhasil') ? '#2e7d32' : '#f57f17',
          marginBottom: '24px',
        }}>
          {paymentMsg}
        </div>
      )}

      {/* Feature highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '28px' }}>
        {premiumFeatures.map((f) => (
          <div key={f.title} style={{
            background: '#fff', border: '1px solid #d4cfc4',
            borderRadius: '12px', padding: '18px',
            display: 'flex', gap: '12px', alignItems: 'flex-start',
            boxShadow: '0 2px 6px rgba(15,14,12,0.04)',
          }}>
            <div style={{ fontSize: '22px', flexShrink: 0 }}>{f.icon}</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f0e0c', marginBottom: '3px' }}>{f.title}</div>
              <div style={{ fontSize: '11px', color: '#a09a8e', lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px', maxWidth: '680px' }}>
        {/* Free */}
        <div style={{
          background: '#fff', border: '1.5px solid #d4cfc4',
          borderRadius: '16px', padding: '26px',
          boxShadow: '0 2px 8px rgba(15,14,12,0.04)',
        }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#a09a8e', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
            Saat Ini (Free)
          </div>
          <div style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '28px', color: '#0f0e0c', marginBottom: '18px' }}>
            Rp 0
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            {freeList.map((f) => (
              <div key={f} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <span style={{ color: '#a09a8e', marginTop: '1px' }}>○</span>
                <span style={{ fontSize: '12px', color: '#8a8579' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Premium */}
        <div style={{
          background: '#0f0e0c', border: '1.5px solid #0f0e0c',
          borderRadius: '16px', padding: '26px',
          boxShadow: '0 8px 32px rgba(15,14,12,0.15)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: '16px', right: '16px',
            background: '#c8602a', color: '#fff',
            fontSize: '9px', fontWeight: '700', padding: '3px 8px',
            borderRadius: '100px',
          }}>
            REKOMENDASI
          </div>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#555', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
            Premium ✨
          </div>
          <div style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '28px', color: '#f5f2eb', marginBottom: '4px' }}>
            Rp 29.000
          </div>
          <div style={{ fontSize: '11px', color: '#555', marginBottom: '18px' }}>Sekali bayar, selamanya</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            {premiumList.map((f) => (
              <div key={f} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <span style={{ color: '#c8602a', fontWeight: '700', marginTop: '1px' }}>✓</span>
                <span style={{ fontSize: '12px', color: '#e8e4dc' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: '#fdf3ee', border: '1.5px solid #f0ddd2',
        borderRadius: '16px', padding: '26px 30px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        maxWidth: '680px',
      }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f0e0c', marginBottom: '4px' }}>
            Siap upgrade?
          </div>
          <div style={{ fontSize: '12px', color: '#a09a8e' }}>
            Pembayaran aman via Midtrans — transfer bank, kartu kredit, GoPay, OVO, dll
          </div>
        </div>
        <button
          onClick={handlePayment}
          disabled={paying}
          style={{
            background: paying ? '#d4cfc4' : '#c8602a',
            color: '#fff', border: 'none',
            borderRadius: '10px', padding: '13px 28px',
            fontSize: '14px', fontWeight: '600', cursor: paying ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap', marginLeft: '24px',
            boxShadow: paying ? 'none' : '0 4px 16px rgba(200,96,42,0.3)',
            transition: 'all 0.2s',
          }}
        >
          {paying ? 'Memproses...' : 'Bayar Rp 29.000 →'}
        </button>
      </div>

      {/* FAQ */}
      <div style={{ marginTop: '36px', maxWidth: '680px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#0f0e0c', marginBottom: '12px' }}>Pertanyaan Umum</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { q: 'Apakah benar-benar bayar sekali?', a: 'Ya, tidak ada biaya berulang. Bayar Rp 29.000 sekali dan akses semua fitur premium selamanya.' },
            { q: 'Metode pembayaran apa yang tersedia?', a: 'Transfer bank, kartu kredit/debit, GoPay, OVO, DANA, ShopeePay, Indomaret, Alfamart, dan lainnya via Midtrans.' },
            { q: 'Apakah ada refund?', a: 'Karena ini produk digital, kami tidak menyediakan refund. Silakan coba versi gratis dulu sebelum upgrade.' },
            { q: 'Premium aktif setelah pembayaran?', a: 'Ya, akun otomatis upgrade ke Premium segera setelah pembayaran dikonfirmasi.' },
          ].map((faq) => (
            <div key={faq.q} style={{
              background: '#fff', border: '1px solid #d4cfc4',
              borderRadius: '10px', padding: '14px 18px',
            }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f0e0c', marginBottom: '5px' }}>{faq.q}</div>
              <div style={{ fontSize: '12px', color: '#8a8579', lineHeight: 1.6 }}>{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
