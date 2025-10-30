"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import LogoutButton from './LogoutButton'
import Image from 'next/image'

const nav = [
  { href: '/admin', label: 'Dashboard', icon: '🏠', match: /^\/admin(\/?|$)/ },
  { href: '/admin/usuarios', label: 'Usuários', icon: '🧑‍💻', match: /^\/admin\/usuarios/ },
  { href: '/admin/clientes', label: 'Clientes', icon: '👥', match: /^\/admin\/clientes/ },
  { href: '/admin/mikrotik', label: 'Mikrotik', icon: '🛠️', match: /^\/admin\/mikrotik/ },
  { href: '/admin/dominios', label: 'Domínios', icon: '🌐', match: /^\/admin\/dominios/ },
  { href: '/admin/rede', label: 'Rede', icon: '🔌', match: /^\/admin\/rede/ },
  { href: '/admin/planos', label: 'Planos', icon: '💳', match: /^\/admin\/planos/ },
  { href: '/admin/virtualizacao', label: 'Virtualização', icon: '🖥️', match: /^\/admin\/virtualizacao/ },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden sticky top-0 z-40 bg-black/80 backdrop-blur border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-gray-800 rounded text-gray-200 text-lg">☰</button>
        <Link href="/admin" className="inline-flex items-center" aria-label="Ir para o Dashboard">
          <Image src="/logo-linket.svg" alt="Linket" width={120} height={28} priority />
        </Link>
        <LogoutButton size="sm" />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-72 md:shrink-0 h-screen sticky top-0 bg-black border-r border-gray-800">
        <div className="px-5 py-5">
          <Link href="/admin" className="inline-flex items-center" aria-label="Ir para o Dashboard">
            <Image src="/logo-linket.svg" alt="Linket" width={140} height={32} priority />
          </Link>
        </div>
        <nav className="flex-1 px-3 space-y-1.5 overflow-auto">
          {nav.map((item) => {
            const active = item.match.test(pathname)
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded text-base ${active ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800/60'}`}>
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
        <div className="p-3 flex items-center justify-between">
          <div className="text-xs text-gray-600">v1.0</div>
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-black border-r border-gray-800 p-4">
            <div className="flex items-center justify-between mb-4">
              <Link href="/admin" className="inline-flex items-center" onClick={() => setOpen(false)}>
                <Image src="/logo-linket.svg" alt="Linket" width={120} height={28} />
              </Link>
              <button onClick={() => setOpen(false)} className="px-4 py-2 bg-gray-800 rounded">✕</button>
            </div>
            <nav className="space-y-1.5">
              {nav.map((item) => {
                const active = item.match.test(pathname)
                return (
                  <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded text-base ${active ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800/60'}`}>
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
            <div className="mt-4 border-t border-gray-800 pt-3">
              <LogoutButton full />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
