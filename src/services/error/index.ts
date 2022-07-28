import type {AxiosError} from 'axios'
import type {ErrorBag} from '~/types'
import {ref} from 'vue'

export const errors = ref({})

export const setErrorBag = (errorBag: ErrorBag) => (errors.value = errorBag)

const SERVER_ERROR_CODE = 500

export const setResponseError = ({response}: AxiosError) => {
    // eslint-disable-next-line no-console
    if (response?.status === SERVER_ERROR_CODE) console.log(response?.data.message)
    if (response && response.data.errors) setErrorBag(response.data.errors)
}

// @ts-expect-error TODO :: Define
export const setError = (property: string, error: string) => (errors.value[property] = [error])

// @ts-expect-error TODO :: Define
export const deleteError = (property: string) => delete errors.value[property]
