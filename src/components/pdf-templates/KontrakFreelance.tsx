'use client'
import { Document, Page, Text, View } from '@react-pdf/renderer'
import { formatTanggal, formatRupiah } from '@/lib/templates'
import { getStyles, type DocStyle } from './styles'
import type { FormValues } from '@/types'

interface Props {
  values: FormValues
  isWatermarked?: boolean
  docStyle?: DocStyle
}

export function KontrakFreelancePDF({ values, isWatermarked = true, docStyle = 'formal' }: Props) {
  const S = getStyles(docStyle)
  const v = (key: string, fallback = '___________') => values[key] || fallback
  const today = formatTanggal(new Date().toISOString().split('T')[0])

  return (
    <Document>
      <Page size="A4" style={S.page}>
        {isWatermarked && <Text style={S.watermark}>PRATINJAU</Text>}
        <View style={S.kop}>
          <Text style={S.kopTitle}>PERJANJIAN KERJA SAMA</Text>
          <Text style={S.kopSubtitle}>Pekerjaan Jasa Freelance</Text>
        </View>
        <Text style={S.paragraph}>Perjanjian ini dibuat pada tanggal <Text style={S.bold}>{today}</Text>, oleh dan antara:</Text>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pihak Pertama (Pemberi Kerja)</Text>
          <Text>Nama          : {v('klienNama')}</Text>
          <Text>No. KTP       : {v('klienKtp', '-')}</Text>
          <Text>Alamat        : {v('klienAlamat', '-')}</Text>
          <Text>No. Telepon   : {v('klienPhone', '-')}</Text>
          <Text style={{ marginTop: 4 }}>Selanjutnya disebut <Text style={S.bold}>"PEMBERI KERJA"</Text>.</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pihak Kedua (Freelancer)</Text>
          <Text>Nama          : {v('freelancerNama')}</Text>
          <Text>No. KTP       : {v('freelancerKtp', '-')}</Text>
          <Text>Alamat        : {v('freelancerAlamat', '-')}</Text>
          <Text>No. Telepon   : {v('freelancerPhone', '-')}</Text>
          <Text style={{ marginTop: 4 }}>Selanjutnya disebut <Text style={S.bold}>"PELAKSANA KERJA"</Text>.</Text>
        </View>
        <Text style={S.paragraph}>Kedua pihak sepakat mengadakan perjanjian dengan ketentuan:</Text>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 1 – Lingkup Pekerjaan</Text>
          <Text style={S.paragraph}>PELAKSANA KERJA setuju menyelesaikan <Text style={S.bold}>"{v('namaProyek')}"</Text> dengan rincian: {v('deskripsiPekerjaan')}</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 2 – Jangka Waktu</Text>
          <Text style={S.paragraph}>Mulai <Text style={S.bold}>{formatTanggal(v('tanggalMulai'))}</Text> s/d <Text style={S.bold}>{formatTanggal(v('tanggalSelesai'))}</Text>.</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 3 – Nilai & Pembayaran</Text>
          <Text style={S.paragraph}>Nilai pekerjaan <Text style={S.bold}>Rp {formatRupiah(v('nilaiProyek'))}</Text> dengan skema: <Text style={S.bold}>{v('skemaPembayaran')}</Text>.</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 4 – Hak Kekayaan Intelektual</Text>
          <Text style={S.paragraph}>Seluruh hasil pekerjaan menjadi hak milik PEMBERI KERJA setelah pelunasan pembayaran.</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 5 – Kerahasiaan</Text>
          <Text style={S.paragraph}>PELAKSANA KERJA menjaga kerahasiaan seluruh informasi milik PEMBERI KERJA selama dan setelah proyek.</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 6 – Penyelesaian Sengketa</Text>
          <Text style={S.paragraph}>Perselisihan diselesaikan secara musyawarah, jika tidak tercapai melalui jalur hukum Indonesia.</Text>
        </View>
        <Text style={S.paragraph}>Perjanjian ini dibuat 2 (dua) rangkap bermeterai cukup dengan kekuatan hukum yang sama.</Text>
        <View style={S.signatureRow}>
          <View style={S.signatureBox}>
            <Text style={S.signatureLabel}>Pemberi Kerja</Text>
            <Text style={S.signatureLine}>{v('klienNama')}</Text>
          </View>
          <View style={S.signatureBox}>
            <Text style={S.signatureLabel}>Pelaksana Kerja</Text>
            <Text style={S.signatureLine}>{v('freelancerNama')}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
