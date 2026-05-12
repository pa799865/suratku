'use client'
// ============================================================
// components/DocumentForm.tsx
// Form dinamis berdasarkan konfigurasi template.
// ============================================================

import { useEffect } from 'react'
import { DocumentTemplate } from '@/lib/templates'
import type { FormValues } from '@/types'

interface Props {
  template: DocumentTemplate
  values: FormValues
  onChange: (values: FormValues) => void
}

export function DocumentForm({ template, values, onChange }: Props) {
  // Set default values saat template berubah
  useEffect(() => {
    const defaults: FormValues = {}
    template.sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.defaultValue && !values[field.id]) {
          defaults[field.id] = field.defaultValue
        }
      })
    })
    if (Object.keys(defaults).length > 0) {
      onChange({ ...values, ...defaults })
    }
  }, [template.slug])

  const handleChange = (fieldId: string, value: string) => {
    onChange({ ...values, [fieldId]: value })
  }

  return (
    <div className="space-y-8">
      {template.sections.map((section) => (
        <div key={section.title}>
          {/* Section header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-200">
            <span className="text-base">{section.icon}</span>
            <h3 className="text-xs font-bold tracking-widest uppercase text-amber-700">
              {section.title}
            </h3>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-2 gap-4">
            {section.fields.map((field) => {
              // Tentukan apakah field ini full-width
              const isFullWidth = field.type === 'textarea' ||
                field.id.toLowerCase().includes('alamat') ||
                field.id.toLowerCase().includes('deskripsi') ||
                field.id.toLowerCase().includes('motivasi')

              return (
                <div
                  key={field.id}
                  className={isFullWidth ? 'col-span-2' : 'col-span-1'}
                >
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {field.label}
                    {field.required && <span className="text-amber-600 ml-1">*</span>}
                  </label>

                  {field.type === 'textarea' ? (
                    <textarea
                      value={values[field.id] || ''}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10 resize-none transition-colors"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={values[field.id] || field.defaultValue || ''}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2.5 text-sm text-stone-800 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10 transition-colors"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type === 'number' ? 'text' : field.type}
                      value={values[field.id] || ''}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10 transition-colors"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
