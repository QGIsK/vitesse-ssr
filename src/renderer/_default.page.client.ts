import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'
import { createApp } from './app'
import type { DefaultPageContext } from '~/types/pagecontext/default'

import 'virtual:windi-base.css'
import 'virtual:windi-components.css'

import '~/assets/scss/app.scss'

import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'

export { render }

async function render(pageContext: PageContextBuiltInClient & DefaultPageContext) {
  const app = createApp(pageContext)
  app.mount('#app')
}
