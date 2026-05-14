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

export function SuratLamaranPDF({ values, isWatermarked = true, docStyle = 'formal' }: Props) {
  const S = getStyles(docStyle)
  const v = (key: string, fallback = '___________') => values[key] || fallback
  const kotaTanggal = `${v('kotaSurat', 'Jakarta')}, ${formatTanggal(v('tanggalSurat'))}`

  return (
    <Document>
      <Page size="A4" style={S.page}>
        {isWatermarked && <Text style={S.watermark}>PRATINJAU</Text>}
        <View style={S.kop}>
          <Text style={S.kopTitle}>SURAT LAMARAN KERJA</Text>
          <Text style={S.kopSubtitle}>Job Application Letter</Text>
        </View>
        <Text style={S.paragraph}>{kotaTanggal}</Text>
        <View style={S.section}>
          <Text style={S.paragraph}>Kepada Yth.</Text>
          <Text style={S.paragraph}>HRD / Manajer Rekrutmen</Text>
          <Text style={S.paragraph}><Text style={S.bold}>{v('namaPerusahaan')}</Text></Text>
          <Text style={S.paragraph}>di Tempat</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Perihal: Lamaran sebagai {v('posisiDilamar')}</Text>
        </View>
        <Text style={S.paragraph}>Dengan hormat,</Text>
        <Text style={S.paragraph}>Saya yang bertanda tangan di bawah ini:</Text>
        <View style={S.section}>
          <Text>Nama               : {v('namaPelamar')}</Text>
          {values['tanggalLahir'] && <Text>Tanggal Lahir      : {formatTanggal(values['tanggalLahir'])}</Text>}
          {values['pendidikanTerakhir'] && <Text>Pendidikan         : {values['pendidikanTerakhir']}</Text>}
          <Text>Email              : {v('emailPelamar', '-')}</Text>
          <Text>No. Telepon        : {v('phonePelamar', '-')}</Text>
          <Text>Alamat             : {v('alamatPelamar', '-')}</Text>
        </View>
        <Text style={S.paragraph}>
          Dengan ini bermaksud mengajukan lamaran untuk posisi <Text style={S.bold}>{v('posisiDilamar')}</Text> di <Text style={S.bold}>{v('namaPerusahaan')}</Text>{values['sumberInfoLowongan'] ? ` yang saya ketahui melalui ${values['sumberInfoLowongan']}.` : '.'}
        </Text>
        {values['motivasi'] ? (
          <Text style={S.paragraph}>{values['motivasi']}</Text>
        ) : (
          <Text style={S.paragraph}>Saya memiliki minat besar dan yakin dapat memberikan kontribusi berarti bagi {v('namaPerusahaan')}. Saya adalah pribadi yang pekerja keras, cepat belajar, dan mampu bekerja mandiri maupun dalam tim.</Text>
        )}
        <Text style={S.paragraph}>Besar harapan saya untuk diberikan kesempatan wawancara. Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih.</Text>
        <Text style={S.paragraph}>Hormat saya,</Text>
        <View style={{ marginTop: 48 }}>
          <Text style={S.signatureLine}>{v('namaPelamar')}</Text>
        </View>
      </Page>
    </Document>
  )
}
