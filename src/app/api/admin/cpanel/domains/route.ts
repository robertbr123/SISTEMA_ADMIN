import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const CPANEL_URL = process.env.CPANEL_API_URL
const CPANEL_USER = process.env.CPANEL_API_USER
const CPANEL_TOKEN = process.env.CPANEL_API_TOKEN

function cpanelAuthHeader() {
  // cPanel expects header: Authorization: cpanel user:token
  if (!CPANEL_USER || !CPANEL_TOKEN) return null
  return { Authorization: `cpanel ${CPANEL_USER}:${CPANEL_TOKEN}` }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!CPANEL_URL || !CPANEL_USER || !CPANEL_TOKEN) {
      return NextResponse.json({ error: 'cPanel not configured (CPANEL_API_URL/CPANEL_API_USER/CPANEL_API_TOKEN)' }, { status: 500 })
    }

    const url = new URL(request.url)
    const refresh = url.searchParams.get('refresh') === 'true'

    const domains = await prisma.domain.findMany({ orderBy: { createdAt: 'desc' } })

    if (!refresh) {
      const normalized = domains.map((d: any) => ({
        id: d.id,
        name: d.name,
        status: d.status,
        nameservers: d.nameservers ? JSON.parse(d.nameservers) : [],
        created: d.created ? d.created.toISOString() : null,
        expires: d.expires ? d.expires.toISOString() : null,
        sslStatus: d.sslStatus || 'unknown',
        dnsRecords: d.dnsRecords ?? 0
      }))
      return NextResponse.json(normalized)
    }

    const headers: any = {
      ...cpanelAuthHeader(),
      'Content-Type': 'application/json'
    }

    // UAPI endpoint to list domains for the account
    const listUrl = `${CPANEL_URL.replace(/\/$/, '')}/execute/DomainsInfo/list_domains`
    const res = await fetch(listUrl, { headers })
    if (!res.ok) {
      const t = await res.text().catch(() => '')
      console.error('cPanel list domains failed', res.status, t)
      return NextResponse.json({ error: 'Failed to fetch domains from cPanel' }, { status: 502 })
    }

  const body = await res.json().catch(() => null)
  const list = (body && body.data) || []

    for (const d of list) {
      try {
        const name = d.domain || d
        await prisma.domain.upsert({
          where: { name },
          update: {
            status: 'active',
            raw: JSON.stringify(d)
          },
          create: {
            name,
            status: 'active',
            raw: JSON.stringify(d)
          }
        })
      } catch (e) {
        console.error('Failed upsert cpanel domain', d, e)
      }
    }

    const updated = await prisma.domain.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error in cPanel domains GET:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!CPANEL_URL || !CPANEL_USER || !CPANEL_TOKEN) {
      return NextResponse.json({ error: 'cPanel not configured (CPANEL_API_URL/CPANEL_API_USER/CPANEL_API_TOKEN)' }, { status: 500 })
    }

    const body = await request.json()
    const { name, dir } = body
    if (!name) return NextResponse.json({ error: 'Domain name required' }, { status: 400 })

    const headers: any = {
      ...cpanelAuthHeader(),
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const params = new URLSearchParams()
    params.set('domain', name)
    params.set('dir', dir || `public_html/${name}`)

    const addUrl = `${CPANEL_URL.replace(/\/$/, '')}/execute/Addondomain/addaddondomain`
    const res = await fetch(addUrl, { method: 'POST', headers, body: params.toString() })

    const resBody = await res.json().catch(() => null)
    if (!res.ok || (resBody && resBody.status === 0)) {
      console.error('cPanel add domain failed', res.status, resBody)
      return NextResponse.json({ error: 'Failed to create domain in cPanel', details: resBody }, { status: 502 })
    }

    // Upsert into DB
    await prisma.domain.upsert({
      where: { name },
      update: { status: 'active', raw: JSON.stringify(resBody) },
      create: { name, status: 'active', raw: JSON.stringify(resBody) }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in cPanel domains POST:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
