import type { AxiosError, AxiosRequestConfig, Method } from 'axios'

import axios from 'axios'
import { IS_SSR } from '~/constants'
import { getFromCache, putInCache } from '~/services/cache'
import { getCookie } from '~/services/cookie'
import { getEnv } from '~/services/env'
import { setErrorBag, setResponseError } from '~/services/error'

const BASE_URL = getEnv('VITE_API_URL')

const doRequest = async (config: AxiosRequestConfig) => {
  setErrorBag({})

  try {
    return await axios.request(config)
  }
  catch (e) {
    const error: AxiosError = e as AxiosError
    setResponseError(error)
    throw error
  }
}

const createRequestConfig = (method: Method, uri: string, body?: any): AxiosRequestConfig => {
  const url = new URL(`${BASE_URL}/${uri}`)
  const authToken = getCookie('Authorization')

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authToken}`,
  }

  let data

  if (method !== 'GET') {
    const bodyisFormData = IS_SSR || body instanceof FormData
    const bodyIsJson = body instanceof Object

    if (!IS_SSR && bodyisFormData) {
      data = body
    }
    else if (bodyIsJson) {
      data = JSON.stringify(body)
      headers['Content-Type'] = 'application/json'
    }
    else {
      data = body
    }
  }

  return {
    url: url.href,
    method,
    headers,
    data,
  }
}

const apiCall = async (method: Method, uri: string, cacheDuration: number | undefined, body?: any) => {
  const requestConfig = createRequestConfig(method, uri, body)

  if (!requestConfig.url)
    return

  const cacheKey = requestConfig.url

  if (cacheDuration) {
    const storedResult = getFromCache(cacheKey)
    if (storedResult) return storedResult
  }

  const { data } = await doRequest(requestConfig)

  if (cacheDuration) putInCache(cacheKey, data, cacheDuration)

  return data
}

export const getFromApi = (uri: string, cacheDuration?: number) => apiCall('GET', uri, cacheDuration)

export const postToApi = (uri: string, data: object) => apiCall('POST', uri, undefined, data)

export const putToApi = (uri: string, data: object) => apiCall('PUT', uri, undefined, data)

export const deleteToApi = (uri: string) => apiCall('DELETE', uri, undefined)

export const downloadFromApi = async (uri: string) => {
  const requestConfig = createRequestConfig('GET', uri)
  requestConfig.responseType = 'blob'
  const response = await doRequest(requestConfig)
  const blob = new Blob([response.data])
  const link = document.createElement('a')

  link.href = window.URL.createObjectURL(blob)
  const contentHeaders: string = response.headers['content-disposition']

  const filename = contentHeaders.split('filename="')[1].split('"')[0]
  link.download = filename

  link.click()
}
