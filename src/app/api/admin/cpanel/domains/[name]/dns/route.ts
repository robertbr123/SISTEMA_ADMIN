import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const CPANEL_URL = process.env.CPANEL_API_URL
const CPANEL_USER = process.env.CPANEL_API_USER
const CPANEL_TOKEN = process.env.CPANEL_API_TOKEN

function cpanelAuthHeader() {
  if (!CPANEL_USER || !CPANEL_TOKEN) return null
  return { Authorization: `cpanel ${CPANEL_USER}:${CPANEL_TOKEN}` }
}

export async function GET(request: NextRequest, { params }: { params: { name: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (!CPANEL_URL) return NextResponse.json({ error: 'cPanel not configured' }, { status: 500 })

    const headers: any = { ...cpanelAuthHeader(), 'Content-Type': 'application/json' }
    const url = `${CPANEL_URL.replace(/\/$/, '')}/execute/ZoneEdit/fetch_zone_records?domain=${encodeURIComponent(params.name)}`
    const res = await fetch(url, { headers })
    const text = await res.text().catch(() => '')
    if (!res.ok) return NextResponse.json({ error: 'Failed to fetch DNS records from cPanel', status: res.status, body: text }, { status: 502 })
    const body = JSON.parse(text || '{}')
    return NextResponse.json(body.data || [])
  } catch (error) {
    console.error('cPanel DNS GET error:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown' }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { name: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (!CPANEL_URL) return NextResponse.json({ error: 'cPanel not configured' }, { status: 500 })

    const body = await request.json()
    const { type, name: recordName, address, ttl = 3600 } = body
    if (!type || !recordName || !address) return NextResponse.json({ error: 'type, name and address required' }, { status: 400 })

    const headers: any = { ...cpanelAuthHeader(), 'Content-Type': 'application/x-www-form-urlencoded' }
    const paramsBody = new URLSearchParams()
    paramsBody.set('domain', params.name)
    paramsBody.set('name', recordName)
    paramsBody.set('type', type)
    paramsBody.set('address', address)
    paramsBody.set('ttl', String(ttl))

    const url = `${CPANEL_URL.replace(/\/$/, '')}/execute/ZoneEdit/add_zone_record`
    const res = await fetch(url, { method: 'POST', headers, body: paramsBody.toString() })
    const text = await res.text().catch(() => '')
    if (!res.ok) return NextResponse.json({ error: 'Failed to create DNS record in cPanel', status: res.status, body: text }, { status: 502 })
    const parsed = JSON.parse(text || '{}')
    return NextResponse.json(parsed)
  } catch (error) {
    console.error('cPanel DNS POST error:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { name: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (!CPANEL_URL) return NextResponse.json({ error: 'cPanel not configured' }, { status: 500 })

    const urlObj = new URL(request.url)
    const line = urlObj.searchParams.get('line')
    if (!line) return NextResponse.json({ error: 'line query parameter required (record line id)' }, { status: 400 })

    const headers: any = { ...cpanelAuthHeader(), 'Content-Type': 'application/x-www-form-urlencoded' }
    const paramsBody = new URLSearchParams()
    paramsBody.set('domain', params.name)
    paramsBody.set('line', line)

    const url = `${CPANEL_URL.replace(/\/$/, '')}/execute/ZoneEdit/remove_zone_record`
    const res = await fetch(url, { method: 'POST', headers, body: paramsBody.toString() })
    const text = await res.text().catch(() => '')
    if (!res.ok) return NextResponse.json({ error: 'Failed to remove DNS record in cPanel', status: res.status, body: text }, { status: 502 })
    const parsed = JSON.parse(text || '{}')
    return NextResponse.json(parsed)
  } catch (error) {
    console.error('cPanel DNS DELETE error:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown' }, { status: 500 })
  }
}
