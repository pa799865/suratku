'use client'
// ============================================================
// components/pdf-templates/KontrakFreelance.tsx
// Template PDF untuk kontrak freelance.
// Render via @react-pdf/renderer.
// ============================================================

import {
  Document, Page, Text, View, StyleSheet, Font,
} from '@react-pdf/renderer'
import { formatTanggal, formatRupiah } from '@/lib/templates'
import type { FormValues } from '@/types'

// Gunakan font bawaan agar tidak perlu host file font
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
  // Header / KOP
  kop: {
    textAlign: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#1a1a1a',
    borderBottomStyle: 'solid',
  },
  kopTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  kopSubtitle: {
    fontSize: 10,
    color: '#555',
    marginTop: 4,
  },
  // Body paragraphs
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    marginBottom: 4,
  },
  paragraph: {
    textAlign: 'justify',
    marginBottom: 10,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  // Signature block
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 48,
  },
  signatureBox: {
    width: '45%',
    alignItems: 'center',
  },
  signatureLabel: {
    fontSize: 10,
    color: '#555',
    marginBottom: 60,
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
    borderTopStyle: 'solid',
    width: '100%',
    paddingTop: 6,
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
  },
  // Watermark
  watermark: {
    position: 'absolute',
    top: '35%',
    left: '10%',
    fontSize: 72,
    color: '#f0ddd2',
    transform: 'rotate(-35deg)',
    opacity: 0.4,
  },
})

interface Props {
  values: FormValues
  isWatermarked?: boolean
}

export function KontrakFreelancePDF({ values, isWatermarked = true }: Props) {
  const today = formatTanggal(new Date().toISOString().split('T')[0])

  const v = (key: string, fallback = '___________') => values[key] || fallback

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Watermark untuk free user */}
        {isWatermarked && (
          <Text style={styles.watermark}>PRATINJAU</Text>
        )}

        {/* KOP */}
        <View style={styles.kop}>
          <Text style={styles.kopTitle}>PERJANJIAN KERJA SAMA</Text>
          <Text style={styles.kopSubtitle}>Pekerjaan Jasa Freelance</Text>
        </View>

        {/* Pembuka */}
        <Text style={styles.paragraph}>
          Perjanjian ini dibuat dan ditandatangani pada hari ini, tanggal{' '}
          <Text style={styles.bold}>{today}</Text>, oleh dan antara:
        </Text>

        {/* Pihak Pertama */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PIHAK PERTAMA (Pemberi Kerja)</Text>
          <Text>Nama          : {v('klienNama')}</Text>
          <Text>No. KTP       : {v('klienKtp', '-')}</Text>
          <Text>Alamat        : {v('klienAlamat', '-')}</Text>
          <Text>No. Telepon   : {v('klienPhone', '-')}</Text>
          <Text style={{ marginTop: 4 }}>
            Selanjutnya disebut sebagai{' '}
            <Text style={styles.bold}>"PEMBERI KERJA"</Text>.
          </Text>
        </View>

        {/* Pihak Kedua */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PIHAK KEDUA (Pelaksana Kerja / Freelancer)</Text>
          <Text>Nama          : {v('freelancerNama')}</Text>
          <Text>No. KTP       : {v('freelancerKtp', '-')}</Text>
          <Text>Alamat        : {v('freelancerAlamat', '-')}</Text>
          <Text>No. Telepon   : {v('freelancerPhone', '-')}</Text>
          <Text style={{ marginTop: 4 }}>
            Selanjutnya disebut sebagai{' '}
            <Text style={styles.bold}>"PELAKSANA KERJA"</Text>.
          </Text>
        </View>

        <Text style={styles.paragraph}>
          Kedua belah pihak sepakat untuk mengadakan perjanjian kerja sama dengan ketentuan sebagai berikut:
        </Text>

        {/* Pasal 1 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasal 1 – Lingkup Pekerjaan</Text>
          <Text style={styles.paragraph}>
            PELAKSANA KERJA setuju untuk menyelesaikan pekerjaan berupa{' '}
            <Text style={styles.bold}>"{v('namaProyek')}"</Text>{' '}
            dengan rincian sebagai berikut:{'\n'}
            {v('deskripsiPekerjaan')}
          </Text>
        </View>

        {/* Pasal 2 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasal 2 – Jangka Waktu</Text>
          <Text style={styles.paragraph}>
            Pekerjaan dilaksanakan mulai tanggal{' '}
            <Text style={styles.bold}>{formatTanggal(v('tanggalMulai'))}</Text>
            {' '}dan wajib diselesaikan paling lambat pada tanggal{' '}
            <Text style={styles.bold}>{formatTanggal(v('tanggalSelesai'))}</Text>.
            Keterlambatan yang disebabkan oleh PELAKSANA KERJA tanpa alasan yang dapat diterima
            akan dikenakan denda yang disepakati oleh kedua pihak.
          </Text>
        </View>

        {/* Pasal 3 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasal 3 – Nilai dan Pembayaran</Text>
          <Text style={styles.paragraph}>
            Atas pekerjaan tersebut, PEMBERI KERJA setuju membayar kepada PELAKSANA KERJA
            sebesar{' '}
            <Text style={styles.bold}>Rp {formatRupiah(v('nilaiProyek'))}</Text>
            {' '}dengan skema pembayaran:{' '}
            <Text style={styles.bold}>{v('skemaPembayaran')}</Text>.
            Pembayaran dilakukan melalui transfer ke rekening yang disepakati.
          </Text>
        </View>

        {/* Pasal 4 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasal 4 – Hak Kekayaan Intelektual</Text>
          <Text style={styles.paragraph}>
            Seluruh hasil pekerjaan, kode, desain, dan aset yang dihasilkan dalam proyek ini
            sepenuhnya menjadi hak milik PEMBERI KERJA setelah pelunasan pembayaran dilakukan.
          </Text>
        </View>

        {/* Pasal 5 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasal 5 – Kerahasiaan</Text>
          <Text style={styles.paragraph}>
            PELAKSANA KERJA setuju untuk menjaga kerahasiaan semua informasi bisnis, teknis,
            dan data milik PEMBERI KERJA yang diperoleh selama pelaksanaan proyek ini.
          </Text>
        </View>

        {/* Pasal 6 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasal 6 – Penyelesaian Sengketa</Text>
          <Text style={styles.paragraph}>
            Segala perselisihan yang timbul dari perjanjian ini akan diselesaikan terlebih dahulu
            secara musyawarah mufakat. Apabila tidak tercapai kesepakatan, para pihak sepakat
            untuk menyelesaikan melalui jalur hukum yang berlaku di Indonesia.
          </Text>
        </View>

        {/* Penutup */}
        <Text style={styles.paragraph}>
          Perjanjian ini dibuat dalam rangkap 2 (dua) eksemplar, masing-masing bermeterai cukup
          dan mempunyai kekuatan hukum yang sama.
        </Text>

        {/* Tanda Tangan */}
        <View style={styles.signatureRow}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Pemberi Kerja</Text>
            <Text style={styles.signatureLine}>{v('klienNama')}</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Pelaksana Kerja</Text>
            <Text style={styles.signatureLine}>{v('freelancerNama')}</Text>
          </View>
        </View>

      </Page>
    </Document>
  )
}
