'use client'
export const dynamic = 'force-dynamic'
// ============================================================
// app/dashboard/pengaturan/page.tsx
// ============================================================

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface Profile {
  full_name: string
  email: string
  is_premium: boolean
}

export default function PengaturanPage() {
  const supabase = createClient()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [fullName, setFullName] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [profileMsg, setProfileMsg] = useState('')
  const [passwordMsg, setPasswordMsg] = useState('')
  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
      setFullName(data?.full_name || '')
    }
    init()
  }, [])

  const handleSaveProfile = async () => {
    setSavingProfile(true)
    setProfileMsg('')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('profiles').update({ full_name: fullName }).eq('id', user.id)

    setProfileMsg(error ? 'Gagal menyimpan.' : 'Profil berhasil diperbarui!')
    setSavingProfile(false)
    setTimeout(() => setProfileMsg(''), 3000)
  }

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      setPasswordMsg('Password minimal 6 karakter.')
      return
    }
    setSavingPassword(true)
    setPasswordMsg('')

    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setPasswordMsg(error ? 'Gagal mengubah password.' : 'Password berhasil diubah!')
    setSavingPassword(false)
    setNewPassword('')
    setCurrentPassword('')
    setTimeout(() => setPasswordMsg(''), 3000)
  }

  const S = {
    card: {
      background: '#fff', border: '1px solid #d4cfc4',
      borderRadius: '14px', padding: '28px 32px',
      boxShadow: '0 2px 8px rgba(15,14,12,0.04)',
      marginBottom: '20px',
    } as React.CSSProperties,
    label: {
      display: 'block', fontSize: '12px', fontWeight: '600',
      color: '#0f0e0c', marginBottom: '7px',
    } as React.CSSProperties,
    input: {
      width: '100%', background: '#fafaf9',
      border: '1.5px solid #d4cfc4', borderRadius: '8px',
      padding: '10px 14px', fontSize: '13px', color: '#0f0e0c',
      outline: 'none', fontFamily: 'var(--font-sans, sans-serif)',
      marginBottom: '16px', boxSizing: 'border-box',
    } as React.CSSProperties,
    btn: {
      background: '#c8602a', color: '#fff', border: 'none',
      borderRadius: '8px', padding: '10px 22px',
      fontSize: '13px', fontWeight: '600', cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(200,96,42,0.2)',
    } as React.CSSProperties,
    sectionTitle: {
      fontFamily: 'var(--font-serif, serif)',
      fontSize: '18px', color: '#0f0e0c',
      margin: '0 0 6px',
    } as React.CSSProperties,
    sectionDesc: {
      fontSize: '12px', color: '#a09a8e',
      margin: '0 0 22px',
    } as React.CSSProperties,
    msg: (isError: boolean) => ({
      fontSize: '12px', marginTop: '10px',
      color: isError ? '#c0392b' : '#2e7d32',
    }) as React.CSSProperties,
  }

  const handleDeleteAccount = async () => {
  const konfirmasi = window.confirm(
    'Apakah kamu yakin ingin menghapus akun? Semua data akan hilang permanen dan tidak bisa dikembalikan.'
  )
  if (!konfirmasi) return

  const response = await fetch('/api/account/delete', { method: 'DELETE' })
  const data = await response.json()

  if (data.success) {
    await supabase.auth.signOut()
    router.push('/')
  } else {
    alert('Gagal menghapus akun: ' + data.error)
  }
}

  return (
    <div style={{ maxWidth: '560px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '11px', color: '#a09a8e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
          Pengaturan
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '34px', fontWeight: '400', color: '#0f0e0c', margin: 0 }}>
          Akun Saya
        </h1>
      </div>

      {/* Status akun */}
      <div style={{
        ...S.card,
        background: profile?.is_premium ? '#fdf3ee' : '#fff',
        border: `1px solid ${profile?.is_premium ? '#f0ddd2' : '#d4cfc4'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f0e0c', marginBottom: '3px' }}>
            {profile?.is_premium ? 'Akun Premium ✨' : 'Akun Free'}
          </div>
          <div style={{ fontSize: '12px', color: '#a09a8e' }}>
            {profile?.email}
          </div>
        </div>
        {!profile?.is_premium && (
          <a href="/dashboard/upgrade" style={{
            background: '#c8602a', color: '#fff', textDecoration: 'none',
            fontSize: '12px', fontWeight: '600', padding: '8px 16px',
            borderRadius: '8px', whiteSpace: 'nowrap',
          }}>
            Upgrade →
          </a>
        )}
      </div>

      {/* Edit Profil */}
      <div style={S.card}>
        <h2 style={S.sectionTitle}>Edit Profil</h2>
        <p style={S.sectionDesc}>Perbarui nama tampilan kamu.</p>

        <label style={S.label}>Nama Lengkap</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Nama lengkap"
          style={S.input}
        />

        <label style={S.label}>Email</label>
        <input
          type="email"
          value={profile?.email || ''}
          disabled
          style={{ ...S.input, opacity: 0.5, cursor: 'not-allowed' }}
        />

        <button onClick={handleSaveProfile} disabled={savingProfile} style={S.btn}>
          {savingProfile ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
        {profileMsg && (
          <div style={S.msg(profileMsg.includes('Gagal'))}>{profileMsg}</div>
        )}
      </div>

      {/* Ganti Password */}
      <div style={S.card}>
        <h2 style={S.sectionTitle}>Ganti Password</h2>
        <p style={S.sectionDesc}>Pastikan password baru minimal 6 karakter.</p>

        <label style={S.label}>Password Baru</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Password baru"
          style={S.input}
        />

        <button onClick={handleChangePassword} disabled={savingPassword} style={S.btn}>
          {savingPassword ? 'Menyimpan...' : 'Ubah Password'}
        </button>
        {passwordMsg && (
          <div style={S.msg(passwordMsg.includes('Gagal'))}>{passwordMsg}</div>
        )}
      </div>

      {/* Danger zone */}
      <div style={{ ...S.card, border: '1px solid #fecaca' }}>
        <h2 style={{ ...S.sectionTitle, color: '#c0392b' }}>Danger Zone</h2>
        <p style={S.sectionDesc}>Tindakan ini tidak dapat dibatalkan.</p>
       <button
  onClick={handleDeleteAccount}
  style={{
    background: 'none', border: '1.5px solid #fecaca',
    color: '#c0392b', borderRadius: '8px',
    padding: '9px 20px', fontSize: '13px', fontWeight: '600',
    cursor: 'pointer',
  }}
>
  Hapus Akun Permanen
</button>
      </div>
    </div>
  )
}
