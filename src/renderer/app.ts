import { createSSRApp, defineComponent, h } from 'vue'
import { setPageContext } from './usePageContext'
import type { DefaultPageContext } from '~/types/pagecontext/default'
import DefaultLayout from '~/layouts/default.vue'

export { createApp }

function createApp(pageContext: DefaultPageContext) {
  const { Page, pageProps } = pageContext
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
