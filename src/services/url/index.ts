import {editRoute} from '~/routes'
import {getEnv} from '~/services//env'

export const redirect = (path: string) => (window.location.href = path)

export const buildAPI = (path: string) => `${getEnv('VITE_API_URL')}/${path}`

export const buildPath = (base: string, params?: string[] | number[], query?: string[]): string =>
    `${base}/${params ? params.join('/') : ''}${query ? `?${query.join('&')}` : ''}`

export const buildEditPath = (base: string, id: number | string, query?: string[]) =>
    buildPath(base, [id.toString(), editRoute], query)
