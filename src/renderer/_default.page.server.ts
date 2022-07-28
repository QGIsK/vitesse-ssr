import type {PageContextBuiltIn} from 'vite-plugin-ssr'

import type {DefaultPageContext} from '~/types/pagecontext/default'
import {dangerouslySkipEscape, escapeInject} from 'vite-plugin-ssr'
import {renderToString} from '@vue/server-renderer'
import {createApp} from './app'
import {setSSRBackendCookies} from '~/services/cookie'

export {render}
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname']

// eslint-disable-next-line max-lines-per-function, complexity
const render = async(pageContext: PageContextBuiltIn & DefaultPageContext) => {
    const {redirectTo, cookies, documentProps} = pageContext
    if (redirectTo) return {redirectTo}

    if (cookies)
        setSSRBackendCookies(cookies)

    const app = createApp(pageContext)
    const appHtml = await renderToString(app)

    const title = (documentProps && documentProps.title) || 'Vite SSR app'
    const desc = (documentProps && documentProps.description) || 'App using Vite + vite-plugin-ssr'

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>

        <link
          rel="stylesheet"
          href="https://fonts.demiann.dev/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap">
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`

    return {
        documentHtml,
        pageContext: {
            // We can add some `pageContext` here, which is useful if we want to do page redirection
            // https://vite-plugin-ssr.com/page-redirection
        },
    }
}
