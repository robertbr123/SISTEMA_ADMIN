'use client'

import Link from 'next/link'

export default function ConsoleDisabledPage({ params, searchParams }: { params: { vmid: string }, searchParams: Record<string,string> }) {
  const vmid = params.vmid
  const node = searchParams.node || ''
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <h1 className="text-xl font-semibold">Console desativado — VM {vmid} {node && `(${node})`}</h1>
        <div className="flex items-center gap-3">
          <Link href="/admin/virtualizacao" className="text-gray-300 hover:text-white">Voltar</Link>
        </div>
      </header>
      <div className="p-6 text-gray-300">
        O acesso ao console (noVNC/SSH) foi desativado nesta instalação para simplificar o ambiente.
      </div>
    </div>
  )
}
