"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import Logo from '@/components/Logo'

const nav = [
  { href: '/admin', label: 'Dashboard', match: /^\/admin(\/?|$)/ },
  { href: '/admin/clientes', label: 'Clientes', match: /^\/admin\/clientes/ },
  { href: '/admin/mikrotik', label: 'Mikrotik', match: /^\/admin\/mikrotik/ },
  { href: '/admin/dominios', label: 'Domínios', match: /^\/admin\/dominios/ },
  { href: '/admin/planos', label: 'Planos', match: /^\/admin\/planos/ },
  { href: '/admin/virtualizacao', label: 'Virtualização', match: /^\/admin\/virtualizacao/ },
]

function Breadcrumbs() {
  const pathname = usePathname()
  const parts = pathname.split('/').filter(Boolean)
  const trail: { href: string; label: string }[] = []
  let acc = ''
  for (const p of parts) {
    acc += '/' + p
    // humanize labels
    const label = p
      .replace(/\[|\]/g, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (m) => m.toUpperCase())
    trail.push({ href: acc, label })
  }
  return (
    <nav className="text-xs text-gray-400">
      <ol className="flex items-center gap-2">
        {trail.map((t, i) => (
          <li key={t.href} className="flex items-center gap-2">
            {i > 0 && <span className="text-gray-600">/</span>}
            <Link href={t.href} className="hover:text-gray-200">
              {t.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default function AdminHeader() {
  const pathname = usePathname()
  return (
    <header className="border-b border-gray-800 bg-black/70 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" aria-label="Admin Home" className="shrink-0">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            {nav.map((item) => {
              const active = item.match.test(pathname)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded text-sm ${active ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800/60'}`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="px-3 py-2 rounded text-sm text-gray-300 hover:text-white">Site</Link>
          <button onClick={() => signOut()} className="px-3 py-2 rounded text-sm bg-red-600 hover:bg-red-700 text-white">Sair</button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-3">
        <Breadcrumbs />
      </div>
    </header>
  )
}
