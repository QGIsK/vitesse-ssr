/* eslint-disable no-magic-numbers */
/* eslint-disable no-restricted-syntax */
import type NodeCache from 'node-cache'

import {IS_SSR} from '~/constants'
import {getEnv} from '~/services/env'

export const TenSecondTTL = 10
export const OneMinuteTTL = TenSecondTTL * 6
export const FiveMinutesTTL = OneMinuteTTL * 5

let cache: NodeCache;

// Hacky way to get top level await
(async () => {
    if (!IS_SSR) return
    const nodeCache = await import('node-cache')
    // eslint-disable-next-line new-cap
    cache = new nodeCache.default({checkperiod: 60, useClones: false})
})()

const disabledCache = getEnv('VITE_DISABLED_CACHE', false)

export const putInCache = (key: string, value: unknown, ttl: number = OneMinuteTTL) => {
    if (disabledCache) return

    if (IS_SSR) {
        cache.set(key, value, ttl)
        return
    }

    // eslint-disable-next-line no-param-reassign
    if (typeof value !== 'string') value = JSON.stringify(value)
    localStorage.setItem(key, value as string)
    localStorage.setItem(`${key}-ttl`, JSON.stringify(ttl))
}

const getFromLocalStorage = (key: string) => {
    const ttl = localStorage.getItem(`${key}-ttl`)
    if (!ttl) return undefined

    const secondsSinceEpoch = Math.round(Date.now() / 1000)
    const expires = Math.round(new Date(JSON.parse(ttl)).getTime() / 1000) - secondsSinceEpoch

    if (expires <= 0) return undefined

    const value = localStorage.getItem(key)

    if (!value) return undefined

    try {
        return JSON.parse(value)
    }
    catch (_) {
        return value
    }
}

export const getFromCache = (key: string) => {
    if (IS_SSR) return cache.get(key)
    return getFromLocalStorage(key)
}
