import Auth from '@/services/api/auth.js'
import { useAuthStore } from '@/stores/auth.js'

class AuthService {
  constructor() {
    this.api = Auth
  }

  async login(email, password) {
    const data = await this.api.login({ email, password })

    const store = useAuthStore()
    store.setToken(data.token)
    store.setUser(data.user)
  }

  async register(user) {
    const data = await this.api.register(user)

    const store = useAuthStore()
    store.setToken(data.token)
    store.setUser(data.user)
  }

  getUser() {
    const store = useAuthStore()
    return store.getUser()
  }

  isAuthenticated() {
    const store = useAuthStore()
    return Boolean(store.getToken())
  }
}

export default new AuthService()
