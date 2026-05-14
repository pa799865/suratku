'use client'
import { Document, Page, Text, View } from '@react-pdf/renderer'
import { formatTanggal } from '@/lib/templates'
import { getStyles, type DocStyle } from './styles'
import type { FormValues } from '@/types'

interface Props {
  values: FormValues
  isWatermarked?: boolean
  docStyle?: DocStyle
}

export function SuratResignPDF({ values, isWatermarked = true, docStyle = 'formal' }: Props) {
  const S = getStyles(docStyle)
  const v = (key: string, fallback = '___________') => values[key] || fallback
  const kotaTanggal = `${v('kotaSurat', 'Jakarta')}, ${formatTanggal(v('tanggalSurat'))}`

  return (
    <Document>
      <Page size="A4" style={S.page}>
        {isWatermarked && <Text style={S.watermark}>PRATINJAU</Text>}
        <View style={S.kop}>
          <Text style={S.kopTitle}>SURAT PENGUNDURAN DIRI</Text>
          <Text style={S.kopSubtitle}>Resignation Letter</Text>
        </View>
        <Text style={S.paragraph}>{kotaTanggal}</Text>
        <View style={S.section}>
          <Text style={S.paragraph}>Kepada Yth.</Text>
          <Text style={S.paragraph}><Text style={S.bold}>{v('namaAtasan')}</Text></Text>
          <Text style={S.paragraph}>{v('namaPerusahaan')}</Text>
          <Text style={S.paragraph}>di Tempat</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Perihal: Pengunduran Diri</Text>
        </View>
        <Text style={S.paragraph}>Dengan hormat,</Text>
        <Text style={S.paragraph}>
          Saya yang bertanda tangan di bawah ini, <Text style={S.bold}>{v('namaPengirim')}</Text>, dengan jabatan <Text style={S.bold}>{v('jabatan')}</Text>{v('departemen') !== '___________' ? ` di Departemen ${v('departemen')}` : ''}, dengan ini menyampaikan pengunduran diri dari <Text style={S.bold}>{v('namaPerusahaan')}</Text>.
        </Text>
        <Text style={S.paragraph}>
          Saya bermaksud menjadikan tanggal <Text style={S.bold}>{formatTanggal(v('tanggalTerakhir'))}</Text> sebagai hari terakhir bekerja di perusahaan ini.
        </Text>
        {values['alasanResign'] && (
          <Text style={S.paragraph}>Adapun alasan pengunduran diri saya adalah: {values['alasanResign']}</Text>
        )}
        <Text style={S.paragraph}>
          Selama bekerja di {v('namaPerusahaan')}, saya telah banyak mendapat pengalaman berharga. Saya mengucapkan terima kasih atas kesempatan dan bimbingan yang telah diberikan.
        </Text>
        <Text style={S.paragraph}>
          Saya berkomitmen menyelesaikan seluruh tanggung jawab dan melakukan serah terima pekerjaan agar transisi berjalan lancar.
        </Text>
        <Text style={S.paragraph}>Hormat saya,</Text>
        <View style={{ marginTop: 48 }}>
          <Text style={S.signatureLine}>{v('namaPengirim')}</Text>
          <Text style={{ fontSize: 10, color: '#666', marginTop: 4 }}>{v('jabatan')}</Text>
          {values['departemen'] && <Text style={{ fontSize: 10, color: '#666' }}>{values['departemen']}</Text>}
        </View>
      </Page>
    </Document>
  )
}
