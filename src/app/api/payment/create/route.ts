// ============================================================
// app/api/payment/create/route.ts
// Membuat transaksi Midtrans
// ============================================================

import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY!
const IS_PRODUCTION = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true'

const BASE_URL = IS_PRODUCTION
  ? 'https://app.midtrans.com/snap/v1/transactions'
  : 'https://app.sandbox.midtrans.com/snap/v1/transactions'

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Cek kalau sudah premium
    const { data: profile } = await supabase
      .from('profiles').select('is_premium, full_name, email').eq('id', user.id).single()

    if (profile?.is_premium) {
      return NextResponse.json({ error: 'Already premium' }, { status: 400 })
    }

    const orderId = `SURATKU-${user.id.slice(0, 8)}-${Date.now()}`

    const payload = {
      transaction_details: {
        order_id: orderId,
        gross_amount: 29000,
      },
      customer_details: {
        first_name: profile?.full_name || 'Pengguna',
        email: profile?.email || user.email,
      },
      item_details: [
        {
          id: 'PREMIUM_LIFETIME',
          price: 29000,
          quantity: 1,
          name: 'SuratKu Premium — Lifetime Access',
        },
      ],
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
        error: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/upgrade?payment=error`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/upgrade?payment=pending`,
      },
    }

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(MIDTRANS_SERVER_KEY + ':').toString('base64')}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Midtrans error:', data)
      return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 })
    }

    // Simpan order_id ke database untuk verifikasi webhook
    await supabase.from('orders').insert({
      user_id: user.id,
      order_id: orderId,
      amount: 29000,
      status: 'pending',
    })

    return NextResponse.json({ token: data.token, redirect_url: data.redirect_url })

  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
