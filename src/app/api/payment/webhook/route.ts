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

    if (isSuccess) {
  // Extract user_id dari order_id format: SURATKU-{userId8char}-{timestamp}
  const parts = order_id.split('-')
  // order_id: SURATKU-46904aa2-1778765515489
  // parts:    [SURATKU, 46904aa2, 1778765515489]
  const userIdPrefix = parts[1] // 46904aa2

  // Cari user yang id-nya starts with prefix ini
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id')

  const matchedProfile = profiles?.find(p => p.id.replace(/-/g, '').startsWith(userIdPrefix))
  
  console.log('matched profile:', matchedProfile)

  if (matchedProfile) {
    await supabase
      .from('profiles')
      .update({ is_premium: true })
      .eq('id', matchedProfile.id)

    console.log('Updated premium for:', matchedProfile.id)
  }
}

    return NextResponse.json({ status: 'ok' })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
