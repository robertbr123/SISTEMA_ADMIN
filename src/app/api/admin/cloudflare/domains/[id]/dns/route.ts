import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const CF_API = 'https://api.cloudflare.com/client/v4'
const CF_TOKEN = process.env.CF_API_TOKEN

async function getZoneId(domainId: string) {
  const d = await prisma.domain.findUnique({ where: { id: domainId } })
  if (!d) throw new Error('Domain not found')
  if (!d.cloudflareId) throw new Error('Domain has no Cloudflare zone id')
  return d.cloudflareId
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (!CF_TOKEN) return NextResponse.json({ error: 'Cloudflare token not configured' }, { status: 500 })

    const zoneId = await getZoneId(params.id)
    const res = await fetch(`${CF_API}/zones/${zoneId}/dns_records`, { headers: { Authorization: `Bearer ${CF_TOKEN}` } })
    const text = await res.text().catch(() => '')
    if (!res.ok) return NextResponse.json({ error: 'Failed to fetch DNS records', status: res.status, body: text }, { status: 502 })
    const body = JSON.parse(text || '{}')
    return NextResponse.json(body.result || [])
  } catch (error) {
    console.error('Cloudflare DNS GET error:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown' }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (!CF_TOKEN) return NextResponse.json({ error: 'Cloudflare token not configured' }, { status: 500 })

    const zoneId = await getZoneId(params.id)
    const body = await request.json()
    const res = await fetch(`${CF_API}/zones/${zoneId}/dns_records`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${CF_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const text = await res.text().catch(() => '')
    if (!res.ok) return NextResponse.json({ error: 'Failed to create DNS record', status: res.status, body: text }, { status: 502 })
    const parsed = JSON.parse(text || '{}')
    return NextResponse.json(parsed.result)
  } catch (error) {
    console.error('Cloudflare DNS POST error:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (!CF_TOKEN) return NextResponse.json({ error: 'Cloudflare token not configured' }, { status: 500 })

    const zoneId = await getZoneId(params.id)
    const body = await request.json()
    const recordId = body.id
    if (!recordId) return NextResponse.json({ error: 'Record id is required' }, { status: 400 })

    // Remove id from payload
    const payload = { ...body }
    delete payload.id

    const res = await fetch(`${CF_API}/zones/${zoneId}/dns_records/${recordId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${CF_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const text = await res.text().catch(() => '')
    if (!res.ok) return NextResponse.json({ error: 'Failed to update DNS record', status: res.status, body: text }, { status: 502 })
    const parsed = JSON.parse(text || '{}')
    return NextResponse.json(parsed.result)
  } catch (error) {
    console.error('Cloudflare DNS PUT error:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (!CF_TOKEN) return NextResponse.json({ error: 'Cloudflare token not configured' }, { status: 500 })

    const zoneId = await getZoneId(params.id)
    const url = new URL(request.url)
    const recordId = url.searchParams.get('recordId')
    if (!recordId) return NextResponse.json({ error: 'recordId required' }, { status: 400 })

    const res = await fetch(`${CF_API}/zones/${zoneId}/dns_records/${recordId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${CF_TOKEN}` } })
    const text = await res.text().catch(() => '')
    if (!res.ok) return NextResponse.json({ error: 'Failed to delete DNS record', status: res.status, body: text }, { status: 502 })
    const parsed = JSON.parse(text || '{}')
    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Cloudflare DNS DELETE error:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown' }, { status: 500 })
  }
}
