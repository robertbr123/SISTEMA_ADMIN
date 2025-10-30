// Custom server for cPanel/Passenger
const http = require('http')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const port = process.env.PORT || 3000

app.prepare().then(() => {
  const server = http.createServer((req, res) => handle(req, res))
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`Next.js app ready on port ${port}`)
  })
}).catch(err => {
  console.error('Server failed to start', err)
  process.exit(1)
})
