import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'
import { getPage } from 'vite-plugin-ssr/client'
import { createApp } from './app'
import type { DefaultPageContext } from '~/types/pagecontext/default'

import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// your custom styles here
import '~/assets/scss/app.scss'
// windicss utilities should be the last style import
import 'virtual:windi-utilities.css'
// windicss devtools support (dev only)
import 'virtual:windi-devtools'

hydrate()

async function hydrate() {
  // We do Server Routing, but we can also do Client Routing by using `useClientRouter()`
  // instead of `getPage()`, see https://vite-plugin-ssr.com/useClientRouter
  const pageContext = await getPage<PageContextBuiltInClient & DefaultPageContext>()
  const app = createApp(pageContext)
  app.mount('#app')
}
