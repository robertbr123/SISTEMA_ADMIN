"use client"

import { signOut } from 'next-auth/react'

type Props = {
  size?: 'sm' | 'md'
  full?: boolean
}

export default function LogoutButton({ size = 'md', full = false }: Props) {
  const base = 'inline-flex items-center justify-center rounded border border-gray-800 bg-black text-gray-200 hover:bg-gray-800 hover:text-white transition'
  const sz = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-2 text-sm'
  const w = full ? 'w-full' : ''

  return (
    <button
      className={`${base} ${sz} ${w}`}
      onClick={() => signOut({ callbackUrl: '/' })}
      title="Sair"
    >
      Sair
    </button>
  )
}
