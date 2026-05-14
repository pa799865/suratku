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
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
    } = body

    // Verifikasi signature dari Midtrans
    const isValid = verifySignature(order_id, status_code, gross_amount, signature_key)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const supabase = await createServerSupabaseClient()

    // Cek apakah pembayaran sukses
    const isSuccess =
      (transaction_status === 'capture' && fraud_status === 'accept') ||
      transaction_status === 'settlement'

    const isFailed =
      transaction_status === 'cancel' ||
      transaction_status === 'deny' ||
      transaction_status === 'expire'

    if (isSuccess) {
      // Ambil user dari order
      const { data: order } = await supabase
        .from('orders')
        .select('user_id')
        .eq('order_id', order_id)
        .single()

      if (order) {
        // Update status premium user
        await supabase
          .from('profiles')
          .update({ is_premium: true })
          .eq('id', order.user_id)

        // Update status order
        await supabase
          .from('orders')
          .update({ status: 'success' })
          .eq('order_id', order_id)
      }
    }

    if (isFailed) {
      await supabase
        .from('orders')
        .update({ status: transaction_status })
        .eq('order_id', order_id)
    }

    return NextResponse.json({ status: 'ok' })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
