import { ofetch } from 'ofetch'

const $api = ofetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  async onRequest({ options }) {
    const accessToken = useCookie('accessToken').value
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken.message}`,
      }
    }
  },
})

const $data = ofetch.create({
  baseURL: '/api',
  async onRequest({ options }) {
    const accessToken = useCookie('accessToken').value
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken.message}`,
      }
    }
  },
})

const $fetchTable = async param => {
  try {
    const { data } = await $api('/' + String(param))
    
    return data.data
  } catch (error) {
    console.error('Terjadi kesalahan:', error)
    throw error
  }
}

export { $api, $data, $fetchTable }
