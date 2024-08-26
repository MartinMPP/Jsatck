const http = require('http');
const { URL } = require('url')
const bodyParser = require('./helpers/bodyParser')

const routes = require('./routes')


const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`)

  console.log(`Request Method: ${request.method} | Endpoint: ${parsedUrl.pathname} `)

  console.log(Object.fromEntries(parsedUrl.searchParams))

  let { pathname } = parsedUrl
  let id = null

  const splitEndpoint = pathname.split('/').filter(Boolean);
  console.log(pathname)

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }




  const route = routes.find((routeObj) => (
    routeObj.endpoint ===/*request.url */ pathname && routeObj.method === request.method))

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams)
    request.params = { id }
    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(body))
    }
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      bodyParser(request, () => route.handler(request, response))
    } else {
      route.handler(request, response)
    }
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' })
    response.end(`Cannot ${request.method} ${parsedUrl.pathname} `)
  }

  console.log(pathname)


})

server.listen(3000, () => console.log('Server started at http://localhost:3000'))





