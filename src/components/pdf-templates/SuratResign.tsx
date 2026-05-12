'use client'
// ============================================================
// components/pdf-templates/SuratResign.tsx
// ============================================================

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { formatTanggal } from '@/lib/templates'
import type { FormValues } from '@/types'

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 60,
    color: '#1a1a1a',
    lineHeight: 1.6,
  },
  watermark: {
    position: 'absolute',
    top: '35%',
    left: '10%',
    fontSize: 72,
    color: '#f0ddd2',
    transform: 'rotate(-35deg)',
    opacity: 0.4,
  },
  headerRight: {
    textAlign: 'right',
    marginBottom: 32,
  },
  headerText: {
    fontSize: 11,
  },
  recipientBlock: {
    marginBottom: 24,
  },
  subject: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    marginBottom: 24,
    textDecoration: 'underline',
  },
  greeting: {
    marginBottom: 14,
  },
  paragraph: {
    textAlign: 'justify',
    marginBottom: 12,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  closing: {
    marginTop: 24,
    marginBottom: 60,
  },
  signatureName: {
    fontFamily: 'Helvetica-Bold',
  },
  signatureDetail: {
    color: '#555',
    fontSize: 10,
  },
})

interface Props {
  values: FormValues
  isWatermarked?: boolean
}

export function SuratResignPDF({ values, isWatermarked = true }: Props) {
  const v = (key: string, fallback = '___________') => values[key] || fallback

  const kotaTanggal = `${v('kotaSurat', 'Jakarta')}, ${formatTanggal(v('tanggalSurat'))}`

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {isWatermarked && <Text style={styles.watermark}>PRATINJAU</Text>}

        {/* Tanggal & Kota */}
        <View style={styles.headerRight}>
          <Text style={styles.headerText}>{kotaTanggal}</Text>
        </View>

        {/* Kepada */}
        <View style={styles.recipientBlock}>
          <Text>Kepada Yth.</Text>
          <Text><Text style={styles.bold}>{v('namaAtasan')}</Text></Text>
          <Text>{v('namaPerusahaan')}</Text>
          <Text>di Tempat</Text>
        </View>

        {/* Perihal */}
        <Text style={styles.subject}>
          Perihal: Surat Pengunduran Diri
        </Text>

        {/* Salam */}
        <Text style={styles.greeting}>Dengan hormat,</Text>

        {/* Paragraf 1 — Perkenalan & niat resign */}
        <Text style={styles.paragraph}>
          Saya yang bertanda tangan di bawah ini,{' '}
          <Text style={styles.bold}>{v('namaPengirim')}</Text>,
          dengan jabatan <Text style={styles.bold}>{v('jabatan')}</Text>
          {v('departemen') !== '___________' ? ` di Departemen ${v('departemen')}` : ''},
          dengan ini menyampaikan pengunduran diri saya dari{' '}
          <Text style={styles.bold}>{v('namaPerusahaan')}</Text>.
        </Text>

        {/* Paragraf 2 — Tanggal terakhir */}
        <Text style={styles.paragraph}>
          Sesuai ketentuan yang berlaku, saya bermaksud menjadikan tanggal{' '}
          <Text style={styles.bold}>{formatTanggal(v('tanggalTerakhir'))}</Text>{' '}
          sebagai hari terakhir saya bekerja di perusahaan ini.
        </Text>

        {/* Paragraf 3 — Alasan (opsional) */}
        {values['alasanResign'] && (
          <Text style={styles.paragraph}>
            Adapun alasan pengunduran diri saya adalah: {values['alasanResign']}
          </Text>
        )}

        {/* Paragraf 4 — Terima kasih */}
        <Text style={styles.paragraph}>
          Selama bekerja di {v('namaPerusahaan')}, saya telah banyak mendapatkan
          pengalaman dan ilmu yang sangat berharga. Saya mengucapkan terima kasih
          atas kesempatan, kepercayaan, dan bimbingan yang telah diberikan selama ini.
        </Text>

        {/* Paragraf 5 — Komitmen transisi */}
        <Text style={styles.paragraph}>
          Saya berkomitmen untuk menyelesaikan seluruh tanggung jawab dan melakukan
          serah terima pekerjaan dengan baik agar transisi dapat berjalan lancar.
        </Text>

        {/* Penutup */}
        <Text style={styles.paragraph}>
          Demikian surat pengunduran diri ini saya sampaikan dengan penuh hormat.
          Atas perhatian dan pengertian Bapak/Ibu, saya ucapkan terima kasih.
        </Text>

        {/* Tanda tangan */}
        <View style={styles.closing}>
          <Text>Hormat saya,</Text>
        </View>
        <Text style={styles.signatureName}>{v('namaPengirim')}</Text>
        <Text style={styles.signatureDetail}>{v('jabatan')}</Text>
        {values['departemen'] && (
          <Text style={styles.signatureDetail}>{values['departemen']}</Text>
        )}

      </Page>
    </Document>
  )
}
