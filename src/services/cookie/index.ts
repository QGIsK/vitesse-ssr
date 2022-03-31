import { IS_SSR } from '~/constants'

let SSRBackendCookies = ''

export const setSSRBackendCookies = (cookies: string) => (SSRBackendCookies = cookies)

export const getCookie = (name: string) => {
  const value = IS_SSR ? `; ${SSRBackendCookies}` : `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)

  return parts.length === 2 ? parts.pop()?.split(';').shift() : false
}

export const setCookie = (name: string, value: string, expires: string) =>
  (document.cookie = `${name}=${value}; path=/; expires=${expires}; secure; samesite=strict`)

export const removeCookie = (name: string) => (document.cookie = `${name}=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/;`)
