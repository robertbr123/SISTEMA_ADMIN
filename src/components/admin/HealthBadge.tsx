"use client"

import React from 'react'

export function HealthBadge({ label, status }: { label: string; status: 'online' | 'warning' | 'offline' | string }) {
  const map = {
    online: 'bg-green-500 text-green-200 border-green-600',
    warning: 'bg-yellow-500 text-yellow-100 border-yellow-600',
    offline: 'bg-red-500 text-red-100 border-red-600'
  } as const

  const color =
    status === 'online' ? map.online : status === 'warning' ? map.warning : status === 'offline' ? map.offline : 'bg-gray-600 text-gray-200 border-gray-700'

  return (
    <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium border ${color}`}>
      <span className="h-2 w-2 rounded-full bg-white/80" />
      {label}
    </span>
  )
}

export default HealthBadge
