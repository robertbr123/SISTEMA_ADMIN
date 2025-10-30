export const runtime = 'edge'

// GET /api/admin/proxmox/console-proxy?target=BASE64_ENCODED_WSS_URL
// Proxies a WebSocket connection between the browser and the Proxmox vncwebsocket.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const targetB64 = searchParams.get('target') || ''
  if (!targetB64) return new Response('Missing target', { status: 400 })

  let target = ''
  try {
    target = atob(targetB64)
  } catch {
    return new Response('Invalid target', { status: 400 })
  }
  if (!/^wss?:\/\//i.test(target)) {
    return new Response('Invalid target scheme', { status: 400 })
  }

  const pair = new (globalThis as any).WebSocketPair()
  const client = pair[0]
  const server = pair[1]

  // Connect to upstream WebSocket
  const upstreamResp = await fetch(target, { headers: { Upgrade: 'websocket' } as any })
  const upstream = (upstreamResp as any).webSocket
  if (!upstream) return new Response('Upstream connect failed', { status: 502 })

  upstream.accept()
  server.accept()

  // Pipe messages both ways
  server.addEventListener('message', (evt: any) => {
    try { upstream.send(evt.data) } catch { /* ignore */ }
  })
  upstream.addEventListener('message', (evt: any) => {
    try { server.send(evt.data) } catch { /* ignore */ }
  })

  const closeBoth = () => {
    try { server.close() } catch {}
    try { upstream.close() } catch {}
  }
  server.addEventListener('close', closeBoth)
  upstream.addEventListener('close', closeBoth)
  server.addEventListener('error', closeBoth)
  upstream.addEventListener('error', closeBoth)

  return new Response(null as any, { status: 101, webSocket: client } as any)
}
