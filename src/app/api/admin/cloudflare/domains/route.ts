import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const CF_API = 'https://api.cloudflare.com/client/v4'
const CF_TOKEN = process.env.CF_API_TOKEN
const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID

interface RouteParams {}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!CF_TOKEN) {
      return NextResponse.json({ error: 'Cloudflare token not configured (CF_API_TOKEN)' }, { status: 500 })
    }

    const url = new URL(request.url)
    const refresh = url.searchParams.get('refresh') === 'true'

    const domains = await prisma.domain.findMany({ orderBy: { createdAt: 'desc' } })

    if (!refresh) {
      // Normalize domain objects for frontend
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

    // Refresh from Cloudflare
    const headers: any = {
      'Authorization': `Bearer ${CF_TOKEN}`,
      'Content-Type': 'application/json'
    }

    const listRes = await fetch(`${CF_API}/zones`, { headers })
    const listText = await listRes.text().catch(() => '')
    if (!listRes.ok) {
      console.error('Cloudflare list zones failed:', listRes.status, listText)
      return NextResponse.json({ error: 'Failed to fetch zones from Cloudflare', status: listRes.status, body: listText }, { status: 502 })
    }

    const body = JSON.parse(listText || '{}')
    const zones = Array.isArray(body.result) ? body.result : []

    // Upsert zones sequentially
    for (const z of zones) {
      try {
        // Try to get DNS record count (use list dns_records with per_page=1 to read result_info)
        let dnsCount = 0
        try {
          const rr = await fetch(`${CF_API}/zones/${z.id}/dns_records?per_page=1`, { headers })
          if (rr.ok) {
            const rrBody = await rr.json()
            if (rrBody.result_info && typeof rrBody.result_info.total_count === 'number') {
              dnsCount = rrBody.result_info.total_count
            } else if (Array.isArray(rrBody.result)) {
              dnsCount = rrBody.result.length
            }
          }
        } catch (e) {
          console.warn('Failed to fetch dns records count for zone', z.id, e)
        }

        const ns = z.name_servers ? JSON.stringify(z.name_servers) : undefined
        const created = z.created_on ? new Date(z.created_on) : undefined

        await prisma.domain.upsert({
          where: { name: z.name },
          update: {
            cloudflareId: z.id,
            status: z.status || 'active',
            nameservers: ns,
            created,
            sslStatus: z['ssl'] ? (z['ssl'].status || undefined) : undefined,
            dnsRecords: dnsCount,
            raw: JSON.stringify(z)
          },
          create: {
            name: z.name,
            cloudflareId: z.id,
            status: z.status || 'active',
            nameservers: ns,
            created,
            sslStatus: z['ssl'] ? (z['ssl'].status || undefined) : undefined,
            dnsRecords: dnsCount,
            raw: JSON.stringify(z)
          }
        })
      } catch (inner) {
        console.error('Failed upserting zone', z, inner)
      }
    }

    const updated = await prisma.domain.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error in Cloudflare domains GET:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!CF_TOKEN) {
      return NextResponse.json({ error: 'Cloudflare token not configured (CF_API_TOKEN)' }, { status: 500 })
    }

    const body = await request.json()
    const { name } = body
    if (!name) {
      return NextResponse.json({ error: 'Domain name is required' }, { status: 400 })
    }

    const headers: any = {
      'Authorization': `Bearer ${CF_TOKEN}`,
      'Content-Type': 'application/json'
    }

    const payload: any = { name }
    if (CF_ACCOUNT_ID) payload.account = { id: CF_ACCOUNT_ID }

    const res = await fetch(`${CF_API}/zones`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    })

    const resBody = await res.json().catch(() => null)
    if (!res.ok) {
      console.error('Cloudflare create zone failed:', res.status, resBody)
      return NextResponse.json({ error: 'Failed to create domain in Cloudflare', details: resBody }, { status: 502 })
    }

    const z = resBody.result
    const ns = z.name_servers ? JSON.stringify(z.name_servers) : undefined
    const created = z.created_on ? new Date(z.created_on) : undefined

    const createdDb = await prisma.domain.create({
      data: {
        name: z.name,
        cloudflareId: z.id,
        status: z.status || 'active',
        nameservers: ns,
        created,
        sslStatus: z['ssl'] ? (z['ssl'].status || undefined) : undefined,
        dnsRecords: 0,
        raw: JSON.stringify(z)
      }
    })

    return NextResponse.json({ success: true, domain: createdDb })
  } catch (error) {
    console.error('Error in Cloudflare domains POST:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
