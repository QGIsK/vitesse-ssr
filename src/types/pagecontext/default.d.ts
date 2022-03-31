import type { ComponentOptions } from '@vue/runtime-core'

export interface PageProps {
  is404: boolean
  url: string
}

export interface PageContext<T extends PageProps> {
  theme: string
  documentProps: {
    title: string
    description: string
  }
  url: string
  pageProps: T
  urlNormalized: string
  urlParsed: {
    pathName: string
    search: Record<string, string> | null
    hash: string | null
  }
  redirectTo: string
  cookies: string
  Page: ComponentOptions
}

export interface DefaultPageContext extends PageContext<PageProps> { }

export interface SingleResourcePageContext<T extends PageProps> extends PageContext<T> {
  routeParams: { id: number }
}
