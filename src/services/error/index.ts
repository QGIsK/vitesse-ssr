import { ref } from 'vue'
import type { AxiosError } from 'axios'
import type { ErrorBag } from '~/types'

export const errors = ref({})

export const setErrorBag = (errorBag: ErrorBag) => (errors.value = errorBag)

export const setResponseError = ({ response }: AxiosError) => {
  // eslint-disable-next-line no-console
  if (response?.status === 500) console.log(response?.data.message)
  if (response && response.data.errors) setErrorBag(response.data.errors)
}

// @ts-expect-error TODO :: Define
export const setError = (property: string, error: string) => (errors.value[property] = [error])

// @ts-expect-error TODO :: Define
export const deleteError = (property: string) => delete errors.value[property]
