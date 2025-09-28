import { toast } from 'vue3-toastify'
import AuthApi from '@/services/api/auth.js'
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

export function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()

  async function login({ email, password }) {
    try {
      const data = await AuthApi.login({ email, password })
      authStore.setToken(data.token)
      authStore.setUser(data.user)

      await router.push({ name: 'products' })
    } catch (error) {
      toast(error.message, { type: 'error' })
    }
  }

  async function register(user) {
    try {
      const data = await AuthApi.register(user)
      authStore.setToken(data.token)
      authStore.setUser(data.user)

      await router.push({ name: 'products' })
    } catch (error) {
      toast(error.message, { type: 'error' })
    }
  }

  async function logout() {
    try {
      authStore.logout()
      await router.push({ name: 'login' })
    } catch (error) {
      toast(error.message, { type: 'error' })
    }
  }

  function getUser() {
    return authStore.getUser()
  }

  function isAuthenticated() {
    const authStore = useAuthStore()

    return Boolean(authStore.getToken())
  }

  return {
    login,
    register,
    logout,
    getUser,
    isAuthenticated,
  }
}
