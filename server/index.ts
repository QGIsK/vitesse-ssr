import express from 'express'
import compression from 'compression'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'
import { createPageRenderer } from 'vite-plugin-ssr'
import type { DefaultPageContext } from '~/types/pagecontext/default'

const isProduction = process.env.NODE_ENV === 'production'
// eslint-disable-next-line n/no-path-concat
const root = `${__dirname}/..`

startServer()

async function startServer() {
  const app = express()

  app.use(compression())

  let viteDevServer
  if (isProduction) {
    app.use(express.static(`${root}/dist/client`))
  }
  else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const vite = require('vite')
    viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: 'ssr' },
    })
    app.use(viteDevServer.middlewares)
  }

  const renderPage = createPageRenderer({ viteDevServer, isProduction, root })
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl
    const pageContextInit = {
      url,
      cookies: req.headers.cookie,
    }
    const pageContext = await renderPage(pageContextInit as PageContextBuiltIn & DefaultPageContext)
    if (pageContext.redirectTo)
      return res.redirect(307, pageContext.redirectTo)

    const { httpResponse } = pageContext

    if (!httpResponse) return next()
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
  })

  const port = process.env.PORT || 3000
  app.listen(port)
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${port}`)
}
