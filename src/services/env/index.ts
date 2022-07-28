import {config} from 'dotenv'
import {IS_SSR} from '~/constants'

if (IS_SSR)
    config()

// eslint-disable-next-line complexity
export const getEnv = (key: string, fallback?: unknown) => {
    const metaEnv = import.meta.env ? import.meta.env[key] : undefined
    if (metaEnv) return metaEnv.toString()

    if (typeof process !== 'undefined') {
        const processEnv = process.env[key]
        if (processEnv) return processEnv
    }

    if (typeof fallback !== 'undefined') return fallback

    throw new Error(`Unkown env key ${key}`)
}
