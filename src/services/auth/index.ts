import type { LoginForm } from '~/types/auth'
import type { BaseUser } from '~/types/models/user'

import { redirect } from '~/services/url'
import { postToApi } from '~/services/http'
import { getCookie, removeCookie, setCookie } from '~/services/cookie'

const TOKEN_COOKIE_NAME = 'Authorization'
const USER_COOKIE_NAME = 'User'

export const getJWTToken = () => getCookie(TOKEN_COOKIE_NAME)

export const getUser = (): BaseUser | undefined => {
  const user = getCookie(USER_COOKIE_NAME)
  if (!user) return
  return JSON.parse(user) as BaseUser
}

const setUserCookies = (user: BaseUser, token: string, expires: string) => {
  setCookie(TOKEN_COOKIE_NAME, token, expires)
  setCookie(USER_COOKIE_NAME, JSON.stringify(user), expires)
}

export const login = async (form: LoginForm) => {
  try {
    const { token, user } = await postToApi('auth/login', form)

    // Format into a date that cookie expires accepts
    const expiresAtFormatted = new Date(token.expires_at)

    setUserCookies(user, token.token, expiresAtFormatted.toUTCString())

    redirect('/')
  }
  catch (e) {
    console.error(e)
  }
}

export const logout = () => {
  removeCookie(TOKEN_COOKIE_NAME)
  removeCookie(USER_COOKIE_NAME)

  redirect('/')
}

export const isLoggedIn = (): boolean => {
  const authCookie = getCookie(TOKEN_COOKIE_NAME)
  return !!authCookie && authCookie.length > 0
}
