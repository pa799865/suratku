// ============================================================
// components/pdf-templates/styles.ts
// Konfigurasi visual untuk setiap style PDF
// ============================================================

import { StyleSheet } from '@react-pdf/renderer'

export type DocStyle = 'formal' | 'modern' | 'elegant'

// ── Warna per style ──────────────────────────────────────────
export const palette = {
  formal: {
    bg: '#ffffff',
    text: '#1a1a1a',
    muted: '#555555',
    accent: '#1a1a1a',
    accentLight: '#f0f0f0',
    headerBg: '#ffffff',
    headerText: '#1a1a1a',
    borderColor: '#1a1a1a',
    sectionColor: '#1a1a1a',
  },
  modern: {
    bg: '#ffffff',
    text: '#1a1a1a',
    muted: '#666666',
    accent: '#c8602a',
    accentLight: '#fdf3ee',
    headerBg: '#ffffff',
    headerText: '#c8602a',
    borderColor: '#e0e0e0',
    sectionColor: '#c8602a',
  },
  elegant: {
    bg: '#ffffff',
    text: '#1a1a1a',
    muted: '#666666',
    accent: '#1a1a1a',
    accentLight: '#f5f5f0',
    headerBg: '#0f0e0c',
    headerText: '#f5f2eb',
    borderColor: '#c8a882',
    sectionColor: '#8a6a3a',
  },
}

// ── StyleSheet per style ─────────────────────────────────────
export function getStyles(docStyle: DocStyle) {
  const p = palette[docStyle]

  if (docStyle === 'formal') {
    return StyleSheet.create({
      page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 60, paddingBottom: 60, paddingHorizontal: 60,
        color: p.text, lineHeight: 1.6, backgroundColor: p.bg,
      },
      watermark: {
        position: 'absolute', top: '35%', left: '10%',
        fontSize: 72, color: '#f0ddd2',
        transform: 'rotate(-35deg)', opacity: 0.4,
      },
      kop: {
        textAlign: 'center', marginBottom: 24,
        paddingBottom: 16,
        borderBottomWidth: 2, borderBottomColor: p.borderColor, borderBottomStyle: 'solid',
      },
      kopTitle: { fontFamily: 'Helvetica-Bold', fontSize: 16, letterSpacing: 1, color: p.headerText },
      kopSubtitle: { fontSize: 10, color: p.muted, marginTop: 4 },
      section: { marginBottom: 14 },
      sectionTitle: { fontFamily: 'Helvetica-Bold', fontSize: 11, marginBottom: 4, color: p.sectionColor },
      paragraph: { textAlign: 'justify', marginBottom: 10, color: p.text },
      bold: { fontFamily: 'Helvetica-Bold' },
      signatureRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 48 },
      signatureBox: { width: '45%', alignItems: 'center' },
      signatureLabel: { fontSize: 10, color: p.muted, marginBottom: 60 },
      signatureLine: {
        borderTopWidth: 1, borderTopColor: p.borderColor, borderTopStyle: 'solid',
        width: '100%', paddingTop: 6, textAlign: 'center',
        fontFamily: 'Helvetica-Bold', fontSize: 11,
      },
    })
  }

  if (docStyle === 'modern') {
    return StyleSheet.create({
      page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 0, paddingBottom: 60, paddingHorizontal: 0,
        color: p.text, lineHeight: 1.7, backgroundColor: p.bg,
      },
      watermark: {
        position: 'absolute', top: '35%', left: '10%',
        fontSize: 72, color: '#f0ddd2',
        transform: 'rotate(-35deg)', opacity: 0.3,
      },
      kop: {
        backgroundColor: p.accent,
        paddingVertical: 32, paddingHorizontal: 60,
        marginBottom: 32,
      },
      kopTitle: { fontFamily: 'Helvetica-Bold', fontSize: 20, color: '#ffffff', letterSpacing: 0.5 },
      kopSubtitle: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
      section: { marginBottom: 16, paddingHorizontal: 60 },
      sectionTitle: {
        fontFamily: 'Helvetica-Bold', fontSize: 10, marginBottom: 6,
        color: p.sectionColor, letterSpacing: 1, textTransform: 'uppercase',
      },
      paragraph: { textAlign: 'justify', marginBottom: 10, color: p.text, paddingHorizontal: 60 },
      bold: { fontFamily: 'Helvetica-Bold' },
      signatureRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 48, paddingHorizontal: 60 },
      signatureBox: { width: '45%', alignItems: 'center' },
      signatureLabel: { fontSize: 10, color: p.muted, marginBottom: 60 },
      signatureLine: {
        borderTopWidth: 2, borderTopColor: p.accent, borderTopStyle: 'solid',
        width: '100%', paddingTop: 6, textAlign: 'center',
        fontFamily: 'Helvetica-Bold', fontSize: 11, color: p.accent,
      },
    })
  }

  // elegant
  return StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: 11,
      paddingTop: 0, paddingBottom: 70, paddingHorizontal: 0,
      color: p.text, lineHeight: 1.8, backgroundColor: p.bg,
    },
    watermark: {
      position: 'absolute', top: '35%', left: '10%',
      fontSize: 72, color: '#f0ddd2',
      transform: 'rotate(-35deg)', opacity: 0.3,
    },
    kop: {
      backgroundColor: p.headerBg,
      paddingVertical: 40, paddingHorizontal: 70,
      marginBottom: 36,
      borderBottomWidth: 3, borderBottomColor: p.borderColor, borderBottomStyle: 'solid',
    },
    kopTitle: {
      fontFamily: 'Helvetica-Bold', fontSize: 18,
      color: p.headerText, letterSpacing: 3, textTransform: 'uppercase',
    },
    kopSubtitle: { fontSize: 10, color: 'rgba(245,242,235,0.6)', marginTop: 6, letterSpacing: 1 },
    section: { marginBottom: 16, paddingHorizontal: 70 },
    sectionTitle: {
      fontFamily: 'Helvetica-Bold', fontSize: 9, marginBottom: 8,
      color: p.sectionColor, letterSpacing: 2, textTransform: 'uppercase',
      borderBottomWidth: 0.5, borderBottomColor: p.borderColor,
      borderBottomStyle: 'solid', paddingBottom: 4,
    },
    paragraph: { textAlign: 'justify', marginBottom: 12, color: p.text, paddingHorizontal: 70 },
    bold: { fontFamily: 'Helvetica-Bold' },
    signatureRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 56, paddingHorizontal: 70 },
    signatureBox: { width: '45%', alignItems: 'center' },
    signatureLabel: { fontSize: 10, color: p.muted, marginBottom: 60 },
    signatureLine: {
      borderTopWidth: 1, borderTopColor: p.borderColor, borderTopStyle: 'solid',
      width: '100%', paddingTop: 8, textAlign: 'center',
      fontFamily: 'Helvetica-Bold', fontSize: 11, color: p.sectionColor,
      letterSpacing: 0.5,
    },
  })
}
