import { toast } from 'vue3-toastify'
import AuthApi from '@/services/api/auth.js'
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

async function login({ email, password }) {
  const router = useRouter()
  const authStore = useAuthStore()

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
  const router = useRouter()
  const authStore = useAuthStore()

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
  const router = useRouter()
  const authStore = useAuthStore()

  try {
    authStore.logout()
  } catch (error) {
    toast(error.message, { type: 'error' })

    return
  }

  await router.push({ name: 'login' })
}

function getUser() {
  const authStore = useAuthStore()

  return authStore.getUser()
}

function isAuthenticated() {
  const authStore = useAuthStore()

  return Boolean(authStore.getToken())
}

export function useAuth() {
  return {
    login,
    register,
    logout,
    getUser,
    isAuthenticated,
  }
}
