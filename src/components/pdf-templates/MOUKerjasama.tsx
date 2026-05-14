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

export function MOUKerjasamaPDF({ values, isWatermarked = true, docStyle = 'formal' }: Props) {
  const S = getStyles(docStyle)
  const v = (key: string, fallback = '___________') => values[key] || fallback
  const today = formatTanggal(new Date().toISOString().split('T')[0])

  return (
    <Document>
      <Page size="A4" style={S.page}>
        {isWatermarked && <Text style={S.watermark}>PRATINJAU</Text>}
        <View style={S.kop}>
          <Text style={S.kopTitle}>NOTA KESEPAHAMAN</Text>
          <Text style={S.kopSubtitle}>Memorandum of Understanding (MOU)</Text>
        </View>
        <Text style={S.paragraph}>
          Nota Kesepahaman ini dibuat pada tanggal <Text style={S.bold}>{today}</Text> di <Text style={S.bold}>{v('kotaTtd', 'Jakarta')}</Text>, oleh dan antara:
        </Text>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pihak Pertama</Text>
          <Text>Nama / Instansi : {v('pihak1Nama')}</Text>
          <Text>Jabatan         : {v('pihak1Jabatan', '-')}</Text>
          <Text>Alamat          : {v('pihak1Alamat', '-')}</Text>
          <Text>No. Telepon     : {v('pihak1Phone', '-')}</Text>
          <Text style={{ marginTop: 4 }}>Selanjutnya disebut <Text style={S.bold}>"PIHAK PERTAMA"</Text>.</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pihak Kedua</Text>
          <Text>Nama / Instansi : {v('pihak2Nama')}</Text>
          <Text>Jabatan         : {v('pihak2Jabatan', '-')}</Text>
          <Text>Alamat          : {v('pihak2Alamat', '-')}</Text>
          <Text>No. Telepon     : {v('pihak2Phone', '-')}</Text>
          <Text style={{ marginTop: 4 }}>Selanjutnya disebut <Text style={S.bold}>"PIHAK KEDUA"</Text>.</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 1 – Maksud & Tujuan</Text>
          <Text style={S.paragraph}>
            Para pihak sepakat untuk menjalin kerjasama di bidang <Text style={S.bold}>{v('bidangKerjasama')}</Text> dalam rangka <Text style={S.bold}>{v('judulKerjasama')}</Text>.
          </Text>
          {values['tujuanKerjasama'] && (
            <Text style={S.paragraph}>Tujuan kerjasama: {values['tujuanKerjasama']}</Text>
          )}
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 2 – Jangka Waktu</Text>
          <Text style={S.paragraph}>
            Kerjasama berlaku mulai <Text style={S.bold}>{formatTanggal(v('tanggalMulai'))}</Text> sampai dengan <Text style={S.bold}>{formatTanggal(v('tanggalBerakhir'))}</Text>, dan dapat diperpanjang atas kesepakatan kedua pihak.
          </Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 3 – Hak & Kewajiban</Text>
          <Text style={S.paragraph}>Masing-masing pihak berkewajiban melaksanakan tugas dan tanggung jawab sesuai dengan kesepakatan yang akan dituangkan dalam perjanjian teknis lebih lanjut.</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 4 – Kerahasiaan</Text>
          <Text style={S.paragraph}>Kedua pihak sepakat menjaga kerahasiaan informasi yang diperoleh selama pelaksanaan kerjasama ini.</Text>
        </View>
        <View style={S.section}>
          <Text style={S.sectionTitle}>Pasal 5 – Penyelesaian Sengketa</Text>
          <Text style={S.paragraph}>Perselisihan diselesaikan secara musyawarah mufakat. Jika tidak tercapai, melalui jalur hukum Indonesia.</Text>
        </View>
        <Text style={S.paragraph}>
          Nota Kesepahaman ini dibuat dalam 2 (dua) rangkap bermeterai cukup dan masing-masing mempunyai kekuatan hukum yang sama.
        </Text>
        <View style={S.signatureRow}>
          <View style={S.signatureBox}>
            <Text style={S.signatureLabel}>Pihak Pertama</Text>
            <Text style={S.signatureLine}>{v('pihak1Nama')}</Text>
            {values['pihak1Jabatan'] && <Text style={{ fontSize: 10, color: '#666', marginTop: 4, textAlign: 'center' }}>{values['pihak1Jabatan']}</Text>}
          </View>
          <View style={S.signatureBox}>
            <Text style={S.signatureLabel}>Pihak Kedua</Text>
            <Text style={S.signatureLine}>{v('pihak2Nama')}</Text>
            {values['pihak2Jabatan'] && <Text style={{ fontSize: 10, color: '#666', marginTop: 4, textAlign: 'center' }}>{values['pihak2Jabatan']}</Text>}
          </View>
        </View>
      </Page>
    </Document>
  )
}
