'use client'
// ============================================================
// components/pdf-templates/PerjanjianSewa.tsx
// ============================================================

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { formatTanggal, formatRupiah } from '@/lib/templates'
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
  paragraph: {
    textAlign: 'justify',
    marginBottom: 10,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    marginBottom: 4,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
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
})

interface Props {
  values: FormValues
  isWatermarked?: boolean
}

export function PerjanjianSewaPDF({ values, isWatermarked = true }: Props) {
  const v = (key: string, fallback = '___________') => values[key] || fallback
  const today = formatTanggal(new Date().toISOString().split('T')[0])

  // Hitung tanggal berakhir sewa
  const getTanggalBerakhir = () => {
    if (!values['tanggalMulai'] || !values['periodeSewaValue']) return '___________'
    const d = new Date(values['tanggalMulai'])
    const periode = parseInt(values['periodeSewaValue'])
    const satuan = values['periodeSewaSatuan'] || 'Bulan'
    if (satuan === 'Tahun') d.setFullYear(d.getFullYear() + periode)
    else d.setMonth(d.getMonth() + periode)
    return formatTanggal(d.toISOString().split('T')[0])
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {isWatermarked && <Text style={styles.watermark}>PRATINJAU</Text>}

        {/* KOP */}
        <View style={styles.kop}>
          <Text style={styles.kopTitle}>PERJANJIAN SEWA MENYEWA</Text>
          <Text style={styles.kopSubtitle}>{v('jenisProperti', 'Properti')}</Text>
        </View>

        <Text style={styles.paragraph}>
          Perjanjian ini dibuat pada tanggal <Text style={styles.bold}>{today}</Text>, oleh dan antara:
        </Text>

        {/* Pihak Yang Menyewakan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PIHAK PERTAMA (Yang Menyewakan)</Text>
          <Text>Nama        : {v('pemilikNama')}</Text>
          <Text>No. KTP     : {v('pemilikKtp', '-')}</Text>
          <Text>Alamat      : {v('pemilikAlamat', '-')}</Text>
          <Text style={{ marginTop: 4 }}>
            Selanjutnya disebut <Text style={styles.bold}>"PIHAK YANG MENYEWAKAN"</Text>.
          </Text>
        </View>

        {/* Penyewa */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PIHAK KEDUA (Penyewa)</Text>
          <Text>Nama        : {v('penyewaNama')}</Text>
          <Text>No. KTP     : {v('penyewaKtp', '-')}</Text>
          <Text>Alamat Asal : {v('penyewaAlamat', '-')}</Text>
          <Text style={{ marginTop: 4 }}>
            Selanjutnya disebut <Text style={styles.bold}>"PENYEWA"</Text>.
          </Text>
        </View>

        <Text style={styles.paragraph}>
          Kedua pihak sepakat mengadakan perjanjian sewa menyewa dengan ketentuan:
        </Text>

        {/* Pasal 1 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasal 1 – Objek Sewa</Text>
          <Text style={styles.paragraph}>
            PIHAK YANG MENYEWAKAN menyewakan kepada PENYEWA sebuah{' '}
            <Text style={styles.bold}>{v('jenisProperti')}</Text> yang beralamat di:{'\n'}
            <Text style={styles.bold}>{v('alamatProperti')}</Text>
          </Text>
        </View>

        {/* Pasal 2 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasal 2 – Jangka Waktu Sewa</Text>
          <Text style={styles.paragraph}>
            Sewa menyewa ini berlaku selama{' '}
            <Text style={styles.bold}>{v('periodeSewaValue')} {v('periodeSewaSatuan')}</Text>,
            terhitung mulai tanggal{' '}
            <Text style={styles.bold}>{formatTanggal(v('tanggalMulai'))}</Text>
            {' '}sampai dengan tanggal{' '}
            <Text style={styles.bold}>{getTanggalBerakhir()}</Text>.
          </Text>
        </View>

        {/* Pasal 3 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasal 3 – Harga Sewa</Text>
          <Text style={styles.paragraph}>
            Harga sewa disepakati sebesar{' '}
            <Text style={styles.bold}>Rp {formatRupiah(v('hargaSewa'))}</Text>
            {' '}per {v('periodeSewaSatuan', 'Bulan').slice(0, 0) || 'Bulan'}.
            Pembayaran dilakukan di muka pada awal periode sewa.
          </Text>
        </View>

        {/* Pasal 4 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasal 4 – Kewajiban Penyewa</Text>
          <Text style={styles.paragraph}>
            PENYEWA wajib: (a) membayar sewa tepat waktu; (b) menjaga dan merawat
            properti dengan baik; (c) tidak mengalihsewakan kepada pihak lain tanpa
            persetujuan tertulis; (d) mengembalikan properti dalam kondisi baik saat
            masa sewa berakhir.
          </Text>
        </View>

        {/* Pasal 5 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasal 5 – Penyelesaian Sengketa</Text>
          <Text style={styles.paragraph}>
            Segala perselisihan diselesaikan secara musyawarah. Apabila tidak tercapai
            kesepakatan, para pihak sepakat menyelesaikan melalui jalur hukum yang
            berlaku di Indonesia.
          </Text>
        </View>

        <Text style={styles.paragraph}>
          Perjanjian ini dibuat dalam 2 (dua) rangkap bermeterai cukup dengan kekuatan hukum yang sama.
        </Text>

        {/* Tanda Tangan */}
        <View style={styles.signatureRow}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Pihak Yang Menyewakan</Text>
            <Text style={styles.signatureLine}>{v('pemilikNama')}</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Penyewa</Text>
            <Text style={styles.signatureLine}>{v('penyewaNama')}</Text>
          </View>
        </View>

      </Page>
    </Document>
  )
}
