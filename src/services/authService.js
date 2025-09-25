import Auth from '@/services/api/auth.js'
import { useAuthStore } from '@/stores/auth.js'

class AuthService {
  constructor() {
    this.api = Auth
  }

  async login(email, password) {
    const store = useAuthStore()
    const data = await this.api.login({ email, password })

    store.setToken(data.token)
    store.setUser(data.user)
  }

  isAuthenticated() {
    const store = useAuthStore()
    return Boolean(store.getToken())
  }
}

export default AuthService
