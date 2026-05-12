'use client'
// ============================================================
// components/pdf-templates/SuratLamaran.tsx
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
    marginBottom: 28,
  },
  contactInfo: {
    fontSize: 10,
    color: '#444',
    marginBottom: 2,
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
  paragraph: {
    textAlign: 'justify',
    marginBottom: 12,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  listItem: {
    marginBottom: 4,
    paddingLeft: 12,
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

export function SuratLamaranPDF({ values, isWatermarked = true }: Props) {
  const v = (key: string, fallback = '___________') => values[key] || fallback

  const kotaTanggal = `${v('kotaSurat', 'Jakarta')}, ${formatTanggal(v('tanggalSurat'))}`

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {isWatermarked && <Text style={styles.watermark}>PRATINJAU</Text>}

        {/* Header kanan — info pelamar */}
        <View style={styles.headerRight}>
          <Text style={styles.contactInfo}>{v('namaPelamar')}</Text>
          <Text style={styles.contactInfo}>{v('alamatPelamar', '-')}</Text>
          <Text style={styles.contactInfo}>{v('emailPelamar', '-')}</Text>
          <Text style={styles.contactInfo}>{v('phonePelamar', '-')}</Text>
        </View>

        {/* Tanggal */}
        <Text style={{ marginBottom: 20 }}>{kotaTanggal}</Text>

        {/* Kepada */}
        <View style={styles.recipientBlock}>
          <Text>Kepada Yth.</Text>
          <Text>HRD / Manajer Rekrutmen</Text>
          <Text style={styles.bold}>{v('namaPerusahaan')}</Text>
          <Text>di Tempat</Text>
        </View>

        {/* Perihal */}
        <Text style={styles.subject}>
          Perihal: Lamaran Pekerjaan sebagai {v('posisiDilamar')}
        </Text>

        {/* Salam */}
        <Text style={{ marginBottom: 12 }}>Dengan hormat,</Text>

        {/* Paragraf 1 — Perkenalan */}
        <Text style={styles.paragraph}>
          Saya yang bertanda tangan di bawah ini:
        </Text>

        <View style={{ marginBottom: 14 }}>
          <Text style={styles.listItem}>Nama               : {v('namaPelamar')}</Text>
          {values['tanggalLahir'] && (
            <Text style={styles.listItem}>Tanggal Lahir      : {formatTanggal(values['tanggalLahir'])}</Text>
          )}
          {values['pendidikanTerakhir'] && (
            <Text style={styles.listItem}>Pendidikan         : {values['pendidikanTerakhir']}</Text>
          )}
          <Text style={styles.listItem}>Email              : {v('emailPelamar', '-')}</Text>
          <Text style={styles.listItem}>No. Telepon        : {v('phonePelamar', '-')}</Text>
          <Text style={styles.listItem}>Alamat             : {v('alamatPelamar', '-')}</Text>
        </View>

        {/* Paragraf 2 — Tujuan melamar */}
        <Text style={styles.paragraph}>
          Dengan ini saya bermaksud mengajukan lamaran pekerjaan untuk posisi{' '}
          <Text style={styles.bold}>{v('posisiDilamar')}</Text> di{' '}
          <Text style={styles.bold}>{v('namaPerusahaan')}</Text>
          {values['sumberInfoLowongan']
            ? ` yang saya ketahui melalui ${values['sumberInfoLowongan']}.`
            : '.'}
        </Text>

        {/* Paragraf 3 — Motivasi (jika ada) */}
        {values['motivasi'] ? (
          <Text style={styles.paragraph}>{values['motivasi']}</Text>
        ) : (
          <Text style={styles.paragraph}>
            Saya memiliki minat yang besar terhadap bidang ini dan yakin dapat
            memberikan kontribusi yang berarti bagi kemajuan{' '}
            {v('namaPerusahaan')}. Saya adalah pribadi yang pekerja keras,
            cepat belajar, dan mampu bekerja baik secara mandiri maupun dalam tim.
          </Text>
        )}

        {/* Paragraf 4 — Penutup */}
        <Text style={styles.paragraph}>
          Besar harapan saya untuk dapat diberikan kesempatan wawancara guna
          menjelaskan lebih lanjut mengenai kualifikasi dan motivasi saya.
          Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih.
        </Text>

        {/* Tanda Tangan */}
        <View style={styles.closing}>
          <Text>Hormat saya,</Text>
        </View>
        <Text style={styles.signatureName}>{v('namaPelamar')}</Text>

      </Page>
    </Document>
  )
}
