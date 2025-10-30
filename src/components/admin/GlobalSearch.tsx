"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type SearchItem = {
  type: string
  id: string | number
  title: string
  subtitle?: string
  url: string
}

export default function GlobalSearch() {
  const [q, setQ] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    if (!q || q.trim().length < 2) {
      setResults([])
      return
    }
    timer.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/admin/search?q=${encodeURIComponent(q)}`)
        const data = await res.json()
        setResults(data.results || [])
        setOpen(true)
      } catch (e) {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)
  }, [q])

  return (
    <div className="relative w-full max-w-xl" ref={containerRef}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        placeholder="Buscar clientes, domínios e VMs..."
        className="w-full rounded border border-gray-800 bg-black px-3 py-2 text-sm text-gray-200 outline-none focus:ring-1 focus:ring-gray-600"
      />
      {open && (
        <div className="absolute mt-1 w-full rounded border border-gray-800 bg-black shadow-lg max-h-96 overflow-auto z-50">
          {loading && (
            <div className="px-3 py-2 text-sm text-gray-400">Buscando…</div>
          )}
          {!loading && results.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-500">Sem resultados</div>
          )}
          {!loading && results.map((item) => (
            <Link
              key={`${item.type}-${item.id}`}
              href={item.url}
              className="block px-3 py-2 text-sm hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              <div className="flex items-center justify-between">
                <div className="text-gray-200">{item.title}</div>
                <div className="text-xs text-gray-500 uppercase">{item.type}</div>
              </div>
              {item.subtitle && (
                <div className="text-xs text-gray-500">{item.subtitle}</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
