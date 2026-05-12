// ============================================================
// app/page.tsx
// Halaman utama — list semua template
// ============================================================

import Link from 'next/link'
import { templates } from '@/lib/templates'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f2eb]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 bg-[#f5f2eb] border-b border-stone-200">
        <span className="font-serif text-xl text-stone-900">
          Surat<span className="text-amber-600 italic">Ku</span>
        </span>
        <div className="flex items-center gap-8">
          <a href="#template" className="text-sm text-stone-500 hover:text-stone-800 transition-colors">Template</a>
          <a href="#" className="text-sm text-stone-500 hover:text-stone-800 transition-colors">Harga</a>
          <button className="bg-stone-900 text-white text-sm font-semibold rounded-lg px-5 py-2 hover:bg-amber-600 transition-colors">
            Masuk
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-12 pt-36 pb-16">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
          Gratis & Langsung Download
        </div>
        <h1 className="font-serif text-5xl leading-tight text-stone-900 mb-5">
          Buat Dokumen Legal<br />
          dalam <em className="text-amber-600">Hitungan Menit</em>
        </h1>
        <p className="text-stone-500 text-lg max-w-lg mb-8 leading-relaxed">
          Isi form, lihat preview langsung, download PDF profesional.
          Tanpa ribet, tanpa perlu lawyer dulu.
        </p>
        <div className="flex gap-3">
          <a
            href="#template"
            className="bg-amber-600 text-white font-semibold rounded-lg px-7 py-3.5 text-sm shadow-lg shadow-amber-600/25 hover:bg-amber-700 transition-all hover:-translate-y-0.5"
          >
            Buat Dokumen Sekarang
          </a>
          <button className="border border-stone-300 text-stone-700 font-medium rounded-lg px-6 py-3.5 text-sm hover:border-stone-500 hover:bg-stone-100 transition-colors">
            Lihat Template →
          </button>
        </div>
      </section>

      {/* Stats */}
      <div className="border-y border-stone-200 bg-[#ede9df] py-6">
        <div className="max-w-5xl mx-auto px-12 flex gap-20">
          {[
            { num: '12+', label: 'Jenis Dokumen' },
            { num: 'Gratis', label: 'Tanpa Daftar' },
            { num: 'PDF', label: 'Langsung Download' },
            { num: '100%', label: 'Bahasa Indonesia' },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-serif text-3xl text-stone-900">{s.num}</div>
              <div className="text-xs text-stone-500 mt-0.5 tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Templates */}
      <section id="template" className="max-w-5xl mx-auto px-12 py-20">
        <div className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-3">Pilih Template</div>
        <h2 className="font-serif text-4xl text-stone-900 mb-2">Semua yang Kamu Butuhkan</h2>
        <p className="text-stone-500 text-base mb-12">
          Dari kontrak kerja hingga surat perjanjian — tersedia dan langsung bisa dipakai.
        </p>

        <div className="grid grid-cols-4 gap-5">
          {templates.map((template) => (
            <Link
              key={template.slug}
              href={template.isPremium ? '#' : `/generate/${template.slug}`}
              className={`group relative bg-white border-2 rounded-xl p-6 transition-all duration-200
                ${template.isPremium
                  ? 'border-stone-200 cursor-not-allowed opacity-70'
                  : 'border-stone-200 hover:border-amber-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200'
                }`}
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-xl bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`} />

              <div className="text-3xl mb-4">{template.icon}</div>
              <h3 className="font-semibold text-stone-900 text-sm mb-2">{template.name}</h3>
              <p className="text-xs text-stone-500 leading-relaxed mb-4">{template.description}</p>

              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
                  ${template.isPremium
                    ? 'bg-stone-100 text-stone-500'
                    : 'bg-amber-100 text-amber-700'
                  }`}>
                  {template.isPremium ? 'Premium' : 'Gratis'}
                </span>
                {!template.isPremium && (
                  <span className="text-stone-300 group-hover:text-amber-500 transition-colors text-lg">→</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 text-center">
        <div className="font-serif text-2xl text-white mb-2">
          Surat<span className="text-amber-500 italic">Ku</span>
        </div>
        <p className="text-sm">Generator dokumen legal otomatis dalam Bahasa Indonesia</p>
      </footer>
    </main>
  )
}
