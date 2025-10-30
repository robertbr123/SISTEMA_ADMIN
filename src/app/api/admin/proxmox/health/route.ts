import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ensureProxmoxEnv, proxmoxGet } from '@/lib/proxmox/client'

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const mis = ensureProxmoxEnv()
  if (mis) return mis

  try {
    const nodes = await proxmoxGet<any>('/nodes')
    return NextResponse.json({ ok: true, nodes: nodes?.data ?? [] })
  } catch (e: any) {
    // Return error details to help diagnose TLS/URL issues
    return NextResponse.json({ ok: false, error: e?.message || String(e), base: process.env.PROXMOX_API_URL, insecure: process.env.PROXMOX_INSECURE || '0' }, { status: 502 })
  }
}
