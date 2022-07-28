import type {DefaultPageContext} from '~/types/pagecontext/default'
import {createSSRApp, defineComponent, h} from 'vue'
import {setPageContext} from './usePageContext'
import DefaultLayout from '~/layouts/default.vue'

export {createApp}

const createApp = (pageContext: DefaultPageContext) => {
    const {Page, pageProps} = pageContext
    const PageWithLayout = defineComponent({
        render() {
            return h(
                DefaultLayout,
                {},
                {
                    default() {
                        return h(Page, pageProps || {})
                    },
                },
            )
        },
    })

    const app = createSSRApp(PageWithLayout)

    // Make `pageContext` available from any Vue component
    setPageContext(app, pageContext)

    return app
}
