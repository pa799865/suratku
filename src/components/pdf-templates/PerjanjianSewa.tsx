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

export function PerjanjianSewaPDF({ values, isWatermarked = true, docStyle = 'formal' }: Props) {
  const S = getStyles(docStyle)
  const v = (key: string, fallback = '___________') => values[key] || fallback
  const today = formatTanggal(new Date().toISOString().split('T')[0])

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
      <Page size="A4" style={S.page}>
        {isWatermarked && <Text style={S.watermark}>PRATINJAU</Text>}
        <View style={S.kop}>
          <Text style={S.kopTitle}>PERJANJIAN SEWA MENYEWA</Text>
          <Text style={S.kopSubtitle}>{v('jenisProperti', 'Properti')}</Text>
        </View>
        <Text style={S.paragraph}>Perjanjian ini dibuat pada tanggal <Text style={S.bold}>{today}</Text>, oleh dan antara:</Text>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pihak Yang Menyewakan</Text>
          <Text>Nama        : {v('pemilikNama')}</Text>
          <Text>No. KTP     : {v('pemilikKtp', '-')}</Text>
          <Text>Alamat      : {v('pemilikAlamat', '-')}</Text>
          <Text style={{ marginTop: 4 }}>Selanjutnya disebut <Text style={S.bold}>"PIHAK YANG MENYEWAKAN"</Text>.</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pihak Penyewa</Text>
          <Text>Nama        : {v('penyewaNama')}</Text>
          <Text>No. KTP     : {v('penyewaKtp', '-')}</Text>
          <Text>Alamat Asal : {v('penyewaAlamat', '-')}</Text>
          <Text style={{ marginTop: 4 }}>Selanjutnya disebut <Text style={S.bold}>"PENYEWA"</Text>.</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 1 – Objek Sewa</Text>
          <Text style={S.paragraph}>PIHAK YANG MENYEWAKAN menyewakan <Text style={S.bold}>{v('jenisProperti')}</Text> yang beralamat di: <Text style={S.bold}>{v('alamatProperti')}</Text></Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 2 – Jangka Waktu</Text>
          <Text style={S.paragraph}>Sewa berlaku selama <Text style={S.bold}>{v('periodeSewaValue')} {v('periodeSewaSatuan')}</Text>, mulai <Text style={S.bold}>{formatTanggal(v('tanggalMulai'))}</Text> s/d <Text style={S.bold}>{getTanggalBerakhir()}</Text>.</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 3 – Harga Sewa</Text>
          <Text style={S.paragraph}>Harga sewa <Text style={S.bold}>Rp {formatRupiah(v('hargaSewa'))}</Text> per {v('periodeSewaSatuan', 'Bulan')}, dibayar di muka.</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 4 – Kewajiban Penyewa</Text>
          <Text style={S.paragraph}>PENYEWA wajib: membayar sewa tepat waktu, menjaga properti, tidak mengalihsewakan tanpa persetujuan, dan mengembalikan dalam kondisi baik.</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 5 – Penyelesaian Sengketa</Text>
          <Text style={S.paragraph}>Perselisihan diselesaikan secara musyawarah, jika tidak tercapai melalui jalur hukum Indonesia.</Text>
        </View>
        <Text style={S.paragraph}>Perjanjian ini dibuat 2 (dua) rangkap bermeterai cukup dengan kekuatan hukum yang sama.</Text>
        <View style={S.signatureRow}>
          <View style={S.signatureBox}>
            <Text style={S.signatureLabel}>Pihak Yang Menyewakan</Text>
            <Text style={S.signatureLine}>{v('pemilikNama')}</Text>
          </View>
          <View style={S.signatureBox}>
            <Text style={S.signatureLabel}>Penyewa</Text>
            <Text style={S.signatureLine}>{v('penyewaNama')}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
