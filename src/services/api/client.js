import axios from 'axios'
import { useAuthStore } from '@/stores/auth.js'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

client.interceptors.request.use(
  (config) => {
    const auth = useAuthStore()
    if (auth.getToken()) {
      config.headers.Authorization = `Bearer ${auth.getToken()}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const auth = useAuthStore()
    if (error.response?.status === 401) {
      auth.logout()
    }
    return Promise.reject(error)
  },
)

export default client
