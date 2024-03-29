import type {DefaultPageContext} from '~/types/pagecontext/default'
import type {PageContextBuiltInClient} from 'vite-plugin-ssr/client'
import {createApp} from './app'

import 'virtual:windi-base.css'
import 'virtual:windi-components.css'

import '~/assets/scss/app.scss'

import 'virtual:windi-devtools'
import 'virtual:windi-utilities.css'

export {render}

const render = (pageContext: PageContextBuiltInClient & DefaultPageContext) => {
    const app = createApp(pageContext)
    app.mount('#app')
}
