import type {ComponentOptions} from '@vue/runtime-core'
import type {PageContextBuiltIn} from 'vite-plugin-ssr'

export interface PageProps {
  is404: boolean
  url: string
}

export interface PageContext<T extends PageProps> extends PageContextBuiltIn{
  documentProps: {
    title: string
    description: string
  }
  urlPathname?: string
  pageProps: T
  redirectTo: string
  cookies: string | undefined
  Page: ComponentOptions
}

export type DefaultPageContext = PageContext<PageProps>

export interface SingleResourcePageContext<T extends PageProps> extends PageContext<T> {
  routeParams: { id: number }
}
