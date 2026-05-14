// ============================================================
// app/api/payment/webhook/route.ts
// Midtrans akan hit endpoint ini setiap ada update status pembayaran
// ============================================================

import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'
import crypto from 'crypto'


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
    const supabase = await createServerSupabaseClient()
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

   // ... kode lainnya

if (isSuccess) {
  const parts = order_id.split('-')
  const userIdPrefix = parts[1] 

  // Gunakan casting ::text agar operator ilike bekerja pada UUID
  const { data: profile, error } = await supabase
  .from('profiles')
  .select('id')
  // Menuliskan instruksi postgrest secara manual
  .filter('id::text', 'ilike', `${userIdPrefix}%`)
  .maybeSingle()

  if (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (profile) {
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ is_premium: true })
      .eq('id', profile.id)
    
    if (updateError) console.error('Update error:', updateError)
    console.log('Updated premium status for:', profile.id)
  } else {
    console.log('No profile found with prefix:', userIdPrefix)
  }
}

// ... rest of the code

    return NextResponse.json({ status: 'ok' })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
