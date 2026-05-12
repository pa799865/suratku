// ============================================================
// templates.ts
// Konfigurasi semua jenis dokumen.
// Tambah dokumen baru cukup dengan menambah entry di sini.
// ============================================================

export type FieldType = 'text' | 'textarea' | 'date' | 'number' | 'select'

export interface TemplateField {
  id: string
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
  options?: string[] // untuk type 'select'
  defaultValue?: string
}

export interface TemplateSection {
  title: string
  icon: string
  fields: TemplateField[]
}

export interface DocumentTemplate {
  slug: string
  name: string
  description: string
  icon: string
  isPremium: boolean
  sections: TemplateSection[]
}

// ============================================================
// DEFINISI TEMPLATE
// ============================================================

export const templates: DocumentTemplate[] = [
  {
    slug: 'kontrak-freelance',
    name: 'Kontrak Freelance',
    description: 'Lindungi pekerjaanmu dengan kontrak yang jelas antara klien dan freelancer.',
    icon: '💼',
    isPremium: false,
    sections: [
      {
        title: 'Pihak Pertama (Pemberi Kerja)',
        icon: '👤',
        fields: [
          { id: 'klienNama', label: 'Nama Lengkap', type: 'text', placeholder: 'Budi Santoso', required: true },
          { id: 'klienKtp', label: 'No. KTP', type: 'text', placeholder: '3201xxxxxxxxxxxxxxx' },
          { id: 'klienAlamat', label: 'Alamat', type: 'text', placeholder: 'Jl. Sudirman No. 45, Jakarta Pusat' },
          { id: 'klienPhone', label: 'No. Telepon', type: 'text', placeholder: '08xxxxxxxxxx' },
        ],
      },
      {
        title: 'Pihak Kedua (Freelancer)',
        icon: '💻',
        fields: [
          { id: 'freelancerNama', label: 'Nama Lengkap', type: 'text', placeholder: 'Andi Wijaya', required: true },
          { id: 'freelancerKtp', label: 'No. KTP', type: 'text', placeholder: '3578xxxxxxxxxxxxxxx' },
          { id: 'freelancerAlamat', label: 'Alamat', type: 'text', placeholder: 'Jl. Gatot Subroto No. 12, Bandung' },
          { id: 'freelancerPhone', label: 'No. Telepon', type: 'text', placeholder: '08xxxxxxxxxx' },
        ],
      },
      {
        title: 'Data Pekerjaan',
        icon: '📋',
        fields: [
          { id: 'namaProyek', label: 'Nama / Judul Proyek', type: 'text', placeholder: 'Pembuatan Website E-Commerce', required: true },
          { id: 'deskripsiPekerjaan', label: 'Deskripsi Pekerjaan', type: 'textarea', placeholder: 'Jelaskan ruang lingkup pekerjaan secara singkat...', required: true },
          { id: 'tanggalMulai', label: 'Tanggal Mulai', type: 'date', required: true },
          { id: 'tanggalSelesai', label: 'Tanggal Selesai', type: 'date', required: true },
          { id: 'nilaiProyek', label: 'Nilai Proyek (Rp)', type: 'number', placeholder: '5000000', required: true },
          { id: 'skemaPembayaran', label: 'Skema Pembayaran', type: 'select', options: ['50% di muka, 50% selesai', '100% di muka', '100% setelah selesai', 'Termin per milestone'], defaultValue: '50% di muka, 50% selesai' },
        ],
      },
    ],
  },
  {
    slug: 'surat-resign',
    name: 'Surat Resign',
    description: 'Akhiri hubungan kerja secara profesional.',
    icon: '📝',
    isPremium: false,
    sections: [
      {
        title: 'Data Pengirim',
        icon: '👤',
        fields: [
          { id: 'namaPengirim', label: 'Nama Lengkap', type: 'text', placeholder: 'Andi Wijaya', required: true },
          { id: 'jabatan', label: 'Jabatan', type: 'text', placeholder: 'Software Engineer', required: true },
          { id: 'departemen', label: 'Departemen', type: 'text', placeholder: 'Engineering' },
          { id: 'kotaSurat', label: 'Kota', type: 'text', placeholder: 'Jakarta', defaultValue: 'Jakarta' },
          { id: 'tanggalSurat', label: 'Tanggal Surat', type: 'date', required: true },
          { id: 'tanggalTerakhir', label: 'Tanggal Terakhir Bekerja', type: 'date', required: true },
        ],
      },
      {
        title: 'Data Perusahaan',
        icon: '🏢',
        fields: [
          { id: 'namaPerusahaan', label: 'Nama Perusahaan', type: 'text', placeholder: 'PT. Maju Bersama', required: true },
          { id: 'namaAtasan', label: 'Nama Atasan / HRD', type: 'text', placeholder: 'Bapak/Ibu Budi Santoso', required: true },
        ],
      },
      {
        title: 'Isi Surat',
        icon: '✍️',
        fields: [
          { id: 'alasanResign', label: 'Alasan Resign (singkat)', type: 'textarea', placeholder: 'Saya ingin mengembangkan karir di bidang yang lebih sesuai...' },
        ],
      },
    ],
  },
  {
    slug: 'perjanjian-sewa',
    name: 'Perjanjian Sewa',
    description: 'Surat perjanjian sewa rumah, kos, atau properti komersial.',
    icon: '🏠',
    isPremium: false,
    sections: [
      {
        title: 'Pihak Yang Menyewakan',
        icon: '🔑',
        fields: [
          { id: 'pemilikNama', label: 'Nama Lengkap', type: 'text', placeholder: 'Budi Santoso', required: true },
          { id: 'pemilikKtp', label: 'No. KTP', type: 'text', placeholder: '3201xxxxxxxxxxxxxxx' },
          { id: 'pemilikAlamat', label: 'Alamat', type: 'text', placeholder: 'Jl. Sudirman No. 45, Jakarta' },
        ],
      },
      {
        title: 'Pihak Penyewa',
        icon: '🧍',
        fields: [
          { id: 'penyewaNama', label: 'Nama Lengkap', type: 'text', placeholder: 'Andi Wijaya', required: true },
          { id: 'penyewaKtp', label: 'No. KTP', type: 'text', placeholder: '3578xxxxxxxxxxxxxxx' },
          { id: 'penyewaAlamat', label: 'Alamat Asal', type: 'text', placeholder: 'Jl. Gatot Subroto No. 12, Bandung' },
        ],
      },
      {
        title: 'Data Properti',
        icon: '🏠',
        fields: [
          { id: 'jenisProperti', label: 'Jenis Properti', type: 'select', options: ['Rumah', 'Kos / Kontrakan', 'Ruko', 'Kantor', 'Gudang'], defaultValue: 'Rumah' },
          { id: 'alamatProperti', label: 'Alamat Properti', type: 'text', placeholder: 'Jl. Mawar No. 12, Jakarta Selatan', required: true },
          { id: 'hargaSewa', label: 'Harga Sewa (Rp)', type: 'number', placeholder: '5000000', required: true },
          { id: 'periodeSewaValue', label: 'Periode Sewa', type: 'number', placeholder: '12', required: true },
          { id: 'periodeSewaSatuan', label: 'Satuan', type: 'select', options: ['Bulan', 'Tahun'], defaultValue: 'Bulan' },
          { id: 'tanggalMulai', label: 'Tanggal Mulai Sewa', type: 'date', required: true },
        ],
      },
    ],
  },
  {
    slug: 'surat-lamaran',
    name: 'Surat Lamaran Kerja',
    description: 'Template surat lamaran profesional untuk berbagai posisi.',
    icon: '📨',
    isPremium: false,
    sections: [
      {
        title: 'Data Pelamar',
        icon: '👤',
        fields: [
          { id: 'namaPelamar', label: 'Nama Lengkap', type: 'text', placeholder: 'Andi Wijaya', required: true },
          { id: 'tanggalLahir', label: 'Tanggal Lahir', type: 'date' },
          { id: 'alamatPelamar', label: 'Alamat', type: 'text', placeholder: 'Jl. Gatot Subroto No. 12, Bandung' },
          { id: 'emailPelamar', label: 'Email', type: 'text', placeholder: 'andi@email.com', required: true },
          { id: 'phonePelamar', label: 'No. Telepon', type: 'text', placeholder: '08xxxxxxxxxx', required: true },
          { id: 'pendidikanTerakhir', label: 'Pendidikan Terakhir', type: 'text', placeholder: 'S1 Teknik Informatika, Universitas ...' },
        ],
      },
      {
        title: 'Data Lamaran',
        icon: '🏢',
        fields: [
          { id: 'namaPerusahaan', label: 'Nama Perusahaan', type: 'text', placeholder: 'PT. Maju Bersama', required: true },
          { id: 'posisiDilamar', label: 'Posisi yang Dilamar', type: 'text', placeholder: 'Software Engineer', required: true },
          { id: 'tanggalSurat', label: 'Tanggal Surat', type: 'date', required: true },
          { id: 'kotaSurat', label: 'Kota', type: 'text', placeholder: 'Jakarta', defaultValue: 'Jakarta' },
          { id: 'sumberInfoLowongan', label: 'Sumber Info Lowongan', type: 'text', placeholder: 'LinkedIn / Website perusahaan / dll' },
          { id: 'motivasi', label: 'Motivasi Singkat', type: 'textarea', placeholder: 'Tuliskan alasan kamu tertarik bergabung...' },
        ],
      },
    ],
  },
  {
    slug: 'perjanjian-hutang',
    name: 'Perjanjian Hutang Piutang',
    description: 'Catat pinjaman dengan cicilan, bunga, dan jatuh tempo.',
    icon: '💰',
    isPremium: true,
    sections: [],
  },
  {
    slug: 'mou-kerjasama',
    name: 'MOU / Kerjasama',
    description: 'Memorandum of Understanding untuk kerjasama bisnis.',
    icon: '🤝',
    isPremium: true,
    sections: [],
  },
]

// Helper: ambil template by slug
export function getTemplate(slug: string): DocumentTemplate | undefined {
  return templates.find((t) => t.slug === slug)
}

// Helper: format tanggal ke format Indonesia
export function formatTanggal(dateStr: string): string {
  if (!dateStr) return '___________'
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
  const d = new Date(dateStr)
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

// Helper: format angka ke Rupiah
export function formatRupiah(value: string | number): string {
  const num = typeof value === 'string' ? parseInt(value.replace(/\D/g, '')) : value
  if (isNaN(num)) return '___________'
  return new Intl.NumberFormat('id-ID').format(num)
}
