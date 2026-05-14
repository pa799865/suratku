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

export function PerjanjianHutangPDF({ values, isWatermarked = true, docStyle = 'formal' }: Props) {
  const S = getStyles(docStyle)
  const v = (key: string, fallback = '___________') => values[key] || fallback
  const today = formatTanggal(new Date().toISOString().split('T')[0])

  const totalBunga = () => {
    const pokok = parseFloat(values['jumlahHutang']?.replace(/\D/g, '') || '0')
    const bunga = parseFloat(values['bungaPerBulan'] || '0')
    const cicilan = parseInt(values['jumlahCicilan'] || '0')
    if (!pokok || !cicilan) return '___________'
    const totalBungaNominal = (pokok * bunga / 100) * cicilan
    return formatRupiah(totalBungaNominal)
  }

  const cicilanPerBulan = () => {
    const pokok = parseFloat(values['jumlahHutang']?.replace(/\D/g, '') || '0')
    const bunga = parseFloat(values['bungaPerBulan'] || '0')
    const cicilan = parseInt(values['jumlahCicilan'] || '0')
    if (!pokok || !cicilan) return '___________'
    const totalPerBulan = (pokok / cicilan) + (pokok * bunga / 100)
    return formatRupiah(totalPerBulan)
  }

  return (
    <Document>
      <Page size="A4" style={S.page}>
        {isWatermarked && <Text style={S.watermark}>PRATINJAU</Text>}
        <View style={S.kop}>
          <Text style={S.kopTitle}>PERJANJIAN HUTANG PIUTANG</Text>
          <Text style={S.kopSubtitle}>Loan Agreement</Text>
        </View>
        <Text style={S.paragraph}>Perjanjian ini dibuat pada tanggal <Text style={S.bold}>{today}</Text>, oleh dan antara:</Text>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pihak Pertama (Pemberi Pinjaman / Kreditur)</Text>
          <Text>Nama        : {v('krediturNama')}</Text>
          <Text>No. KTP     : {v('krediturKtp', '-')}</Text>
          <Text>Alamat      : {v('krediturAlamat', '-')}</Text>
          <Text>No. Telepon : {v('krediturPhone', '-')}</Text>
          <Text style={{ marginTop: 4 }}>Selanjutnya disebut <Text style={S.bold}>"KREDITUR"</Text>.</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pihak Kedua (Peminjam / Debitur)</Text>
          <Text>Nama        : {v('debiturNama')}</Text>
          <Text>No. KTP     : {v('debiturKtp', '-')}</Text>
          <Text>Alamat      : {v('debiturAlamat', '-')}</Text>
          <Text>No. Telepon : {v('debiturPhone', '-')}</Text>
          <Text style={{ marginTop: 4 }}>Selanjutnya disebut <Text style={S.bold}>"DEBITUR"</Text>.</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 1 – Jumlah Pinjaman</Text>
          <Text style={S.paragraph}>
            KREDITUR setuju meminjamkan kepada DEBITUR sejumlah <Text style={S.bold}>Rp {formatRupiah(v('jumlahHutang'))}</Text>{values['tujuanPinjaman'] ? ` untuk keperluan: ${values['tujuanPinjaman']}` : ''}.
          </Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 2 – Jangka Waktu & Cicilan</Text>
          <Text style={S.paragraph}>
            Pinjaman wajib dilunasi paling lambat tanggal <Text style={S.bold}>{formatTanggal(v('tanggalJatuhTempo'))}</Text>, dengan cicilan <Text style={S.bold}>{v('jumlahCicilan')} kali</Text> sebesar <Text style={S.bold}>Rp {cicilanPerBulan()}</Text> per bulan.
          </Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 3 – Bunga</Text>
          <Text style={S.paragraph}>
            Bunga disepakati sebesar <Text style={S.bold}>{v('bungaPerBulan', '0')}%</Text> per bulan dari pokok pinjaman. Total bunga selama {v('jumlahCicilan')} bulan adalah <Text style={S.bold}>Rp {totalBunga()}</Text>.
          </Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 4 – Keterlambatan</Text>
          <Text style={S.paragraph}>Keterlambatan pembayaran cicilan akan dikenakan denda yang disepakati kedua pihak secara terpisah.</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 5 – Penyelesaian Sengketa</Text>
          <Text style={S.paragraph}>Perselisihan diselesaikan secara musyawarah, jika tidak tercapai melalui jalur hukum Indonesia.</Text>
        </View>
        <Text style={S.paragraph}>Perjanjian ini dibuat 2 (dua) rangkap bermeterai cukup dengan kekuatan hukum yang sama.</Text>
        <View style={S.signatureRow}>
          <View style={S.signatureBox}>
            <Text style={S.signatureLabel}>Kreditur (Pemberi Pinjaman)</Text>
            <Text style={S.signatureLine}>{v('krediturNama')}</Text>
          </View>
          <View style={S.signatureBox}>
            <Text style={S.signatureLabel}>Debitur (Peminjam)</Text>
            <Text style={S.signatureLine}>{v('debiturNama')}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
