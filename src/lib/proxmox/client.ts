import { NextResponse } from 'next/server'

const BASE = process.env.PROXMOX_API_URL // legacy single-server fallback
const USER = process.env.PROXMOX_USER
const TOKEN_ID = process.env.PROXMOX_TOKEN_ID
const TOKEN_SECRET = process.env.PROXMOX_TOKEN_SECRET
const INSECURE = (process.env.PROXMOX_INSECURE || '').toLowerCase() === '1' || (process.env.PROXMOX_INSECURE || '').toLowerCase() === 'true'

export function ensureProxmoxEnv() {
  if (!BASE || !USER || !TOKEN_ID || !TOKEN_SECRET) {
    return NextResponse.json(
      { error: 'Proxmox not configured (PROXMOX_API_URL/PROXMOX_USER/PROXMOX_TOKEN_ID/PROXMOX_TOKEN_SECRET)' },
      { status: 500 }
    )
  }
  return null
}

export type ProxmoxServerConfig = {
  baseUrl: string
  user: string
  tokenId: string
  tokenSecret: string
  insecure?: boolean
}

export function proxmoxHeaders(extra?: Record<string, string>, server?: ProxmoxServerConfig) {
  // PVE API Token auth
  // Some users paste full token id as user@realm!tokenid. Normalize to just tokenid.
  const srcTokenId = server?.tokenId ?? TOKEN_ID ?? ''
  const srcUser = server?.user ?? USER ?? ''
  const srcSecret = server?.tokenSecret ?? TOKEN_SECRET ?? ''
  let tokenId = srcTokenId
  if (tokenId.includes('!')) {
    const parts = tokenId.split('!')
    tokenId = parts[parts.length - 1]
  }
  const auth = `PVEAPIToken=${srcUser}!${tokenId}=${srcSecret}`
  return {
    Authorization: auth,
    ...(extra || {})
  } as Record<string, string>
}

export function proxmoxUrl(path: string, server?: ProxmoxServerConfig) {
  const base = (server?.baseUrl ?? BASE!)?.replace(/\/$/, '')
  const p = path.startsWith('/') ? path : '/' + path
  return base + p
}

export async function proxmoxGet<T = any>(path: string, server?: ProxmoxServerConfig) {
  // Allow self-signed certs in dev if PROXMOX_INSECURE=1
  const prev = process.env.NODE_TLS_REJECT_UNAUTHORIZED
  const insecure = server?.insecure ?? INSECURE
  if (insecure) process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  try {
    const res = await fetch(proxmoxUrl(path, server), { headers: proxmoxHeaders(undefined, server) })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`Proxmox GET ${path} failed: ${res.status} ${text}`)
    }
    const body = await res.json().catch(() => null)
    return body as { data?: T }
  } catch (e: any) {
    throw new Error(`Proxmox GET ${path} error: ${e?.message || String(e)}`)
  } finally {
    if (insecure) process.env.NODE_TLS_REJECT_UNAUTHORIZED = prev
  }
}

export async function proxmoxPost<T = any>(path: string, body?: URLSearchParams, server?: ProxmoxServerConfig) {
  const prev = process.env.NODE_TLS_REJECT_UNAUTHORIZED
  const insecure = server?.insecure ?? INSECURE
  if (insecure) process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  try {
    const res = await fetch(proxmoxUrl(path, server), {
      method: 'POST',
      headers: proxmoxHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }, server),
      body: body ? body.toString() : undefined,
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`Proxmox POST ${path} failed: ${res.status} ${text}`)
    }
    const json = await res.json().catch(() => null)
    return json as { data?: T }
  } catch (e: any) {
    throw new Error(`Proxmox POST ${path} error: ${e?.message || String(e)}`)
  } finally {
    if (insecure) process.env.NODE_TLS_REJECT_UNAUTHORIZED = prev
  }
}
