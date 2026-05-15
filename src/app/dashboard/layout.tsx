'use client'
export const dynamic = 'force-dynamic'
// ============================================================
// app/dashboard/layout.tsx
// Shared layout untuk semua halaman authenticated
// ============================================================

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

interface Profile {
  full_name: string
  email: string
  is_premium: boolean
}

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '▦' },
  { label: 'Buat Dokumen', href: '/dashboard/buat', icon: '✦' },
  { label: 'Upgrade ✨', href: '/dashboard/upgrade', icon: '⭐' },
  { label: 'Pengaturan', href: '/dashboard/pengaturan', icon: '⚙' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data } = await supabase
        .from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
      setLoading(false)
    }
    init()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const firstName = profile?.full_name?.split(' ')[0] || 'Pengguna'

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: '#f5f2eb',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ color: '#a09a8e', fontSize: '14px' }}>Memuat...</div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f2eb',
      color: '#0f0e0c',
      fontFamily: 'var(--font-sans, sans-serif)',
      display: 'flex',
    }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: '230px',
        background: '#edeae0',
        borderRight: '1px solid #d4cfc4',
        display: 'flex', flexDirection: 'column',
        padding: '32px 20px',
        zIndex: 50,
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: 'var(--font-serif, serif)',
          fontSize: '22px', color: '#0f0e0c',
          textDecoration: 'none', marginBottom: '48px', display: 'block',
        }}>
          Surat<span style={{ color: '#c8602a', fontStyle: 'italic' }}>Ku</span>
        </Link>

        {/* Nav items */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 14px', borderRadius: '8px',
                fontSize: '13px', fontWeight: isActive ? '600' : '400',
                color: isActive ? '#0f0e0c' : '#8a8579',
                background: isActive ? '#f5f2eb' : 'transparent',
                border: isActive ? '1px solid #d4cfc4' : '1px solid transparent',
                textDecoration: 'none', transition: 'all 0.15s',
              }}>
                <span style={{ fontSize: '11px', opacity: 0.6 }}>{item.icon}</span>
                {item.label}
                {item.label === 'Buat Dokumen' && (
                  <span style={{
                    marginLeft: 'auto', background: '#c8602a', color: '#fff',
                    fontSize: '10px', fontWeight: '700',
                    padding: '2px 7px', borderRadius: '100px',
                  }}>Baru</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Premium badge */}
        {!profile?.is_premium && (
          <div style={{
            background: '#fdf3ee', border: '1px solid #f0ddd2',
            borderRadius: '10px', padding: '14px',
            marginBottom: '16px',
          }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#0f0e0c', marginBottom: '4px' }}>
              Upgrade ke Premium
            </div>
            <div style={{ fontSize: '11px', color: '#a09a8e', marginBottom: '10px', lineHeight: 1.5 }}>
              Akses semua style & download tanpa watermark
            </div>
            <Link href="/dashboard/upgrade" style={{
              display: 'block', textAlign: 'center',
              background: '#c8602a', color: '#fff',
              textDecoration: 'none', fontSize: '12px', fontWeight: '600',
              padding: '8px', borderRadius: '7px',
            }}>
              Lihat Paket →
            </Link>
          </div>
        )}

        {/* User block */}
        <div style={{ borderTop: '1px solid #d4cfc4', paddingTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '50%',
              background: '#c8602a', color: '#fff', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: '700',
            }}>
              {firstName[0].toUpperCase()}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#0f0e0c' }}>
                {firstName}
                {profile?.is_premium && (
                  <span style={{ color: '#c8602a', marginLeft: '4px' }}>✨</span>
                )}
              </div>
              <div style={{ fontSize: '11px', color: '#a09a8e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {profile?.email}
              </div>
            </div>
          </div>
          <button onClick={handleLogout} style={{
            width: '100%', background: 'transparent',
            border: '1px solid #d4cfc4', borderRadius: '7px',
            color: '#8a8579', fontSize: '12px', fontWeight: '500',
            padding: '7px', cursor: 'pointer',
          }}>
            Keluar
          </button>
        </div>
      </aside>

      {/* ── PAGE CONTENT ── */}
      <main style={{ marginLeft: '230px', padding: '52px', flex: 1, minHeight: '100vh' }}>
        {children}
      </main>

    </div>
  )
}
