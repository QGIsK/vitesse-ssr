// Hook `usePageContext()` to make `pageContext` available from any Vue component.
// See https://vite-plugin-ssr.com/pageContext-anywhere

import type {App} from 'vue'
import type {DefaultPageContext} from '~/types/pagecontext/default'
import {inject} from 'vue'

export {usePageContext}
export {setPageContext}

// eslint-disable-next-line symbol-description
const key = Symbol()

const usePageContext = () => {
    const pageContext = inject(key)
    if (!pageContext) throw new Error('setPageContext() not called in parent')
    return pageContext
}

const setPageContext = (app: App, pageContext: DefaultPageContext) => {
    app.provide(key, pageContext)
}
