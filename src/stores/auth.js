import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),
  actions: {
    setToken(token) {
      this.token = token
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
    },
    getToken() {
      return this.token || localStorage.getItem('token')
    },
    setUser(user) {
      this.user = user
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.removeItem('user')
      }
    },
    getUser() {
      return this.user || JSON.parse(localStorage.getItem('user'))
    },
    logout() {
      this.setToken(null)
      this.setUser(null)
    },
  },
})
