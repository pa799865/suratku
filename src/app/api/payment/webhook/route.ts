// ============================================================
// app/api/payment/webhook/route.ts
// Midtrans akan hit endpoint ini setiap ada update status pembayaran
// ============================================================

import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createAdminClient } from '@/lib/supabase-admin'


const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY!

function verifySignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKey: string
): boolean {
  const hash = crypto
    .createHash('sha512')
    .update(`${orderId}${statusCode}${grossAmount}${MIDTRANS_SERVER_KEY}`)
    .digest('hex')
  return hash === signatureKey
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = createAdminClient() // bukan createServerSupabaseClient
    console.log('Webhook body:', JSON.stringify(body)) // tambah ini

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
    } = body

    console.log('transaction_status:', transaction_status) // tambah ini
    console.log('fraud_status:', fraud_status) // tambah ini

    // ... lanjut kode
    
    const isSuccess =
      (transaction_status === 'capture' && fraud_status === 'accept') ||
      transaction_status === 'settlement'

    console.log('isSuccess:', isSuccess) // tambah ini


if (isSuccess) {
  const parts = order_id.split('-')
  const userIdPrefix = parts[1] // Hasilnya: 46904aa2
  
  console.log('Mencari user dengan prefix:', userIdPrefix)

  // GANTI BAGIAN INI: Gunakan .rpc untuk memanggil fungsi SQL tadi
  const { data: profiles, error: rpcError } = await supabase
    .rpc('get_profile_by_id_prefix', { prefix_text: userIdPrefix })

  if (rpcError) {
    console.error('Database error (RPC):', rpcError)
    return NextResponse.json({ error: rpcError.message }, { status: 500 })
  }

  // RPC mengembalikan array, ambil data pertama jika ada
  const profile = profiles && profiles.length > 0 ? profiles[0] : null

  if (profile) {
  // 1. Update status Premium
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ is_premium: true })
    .eq('id', profile.id)

  if (updateError) {
    console.error('Update Profile Error:', updateError)
  }

  // 2. Simpan detail transaksi ke tabel orders/transactions (Opsional)
  // Pastikan nama tabel kamu benar (misal: 'transactions' atau 'orders')
  const { error: insertError } = await supabase
    .from('orders') // Sesuaikan dengan nama tabel kamu
    .insert({
      user_id: profile.id,
      order_id: order_id, // Dari Midtrans
      amount: gross_amount,
      status: transaction_status,
    })

  if (insertError) {
    console.error('Insert Order Error:', insertError)
  } else {
    console.log('Data Order Berhasil Disimpan!')
  }

  console.log('BERHASIL! Proses selesai untuk ID:', profile.id)
}
}

    return NextResponse.json({ status: 'ok' })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
