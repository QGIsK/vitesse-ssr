import type { ComponentOptions } from '@vue/runtime-core'

export interface PageProps {
  is404: boolean
  url: string
}

export interface PageContext<T extends PageProps> {
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

export interface DefaultPageContext extends PageContext<PageProps> { }

export interface SingleResourcePageContext<T extends PageProps> extends PageContext<T> {
  routeParams: { id: number }
}
