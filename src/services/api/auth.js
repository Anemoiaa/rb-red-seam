import client from './client.js'
import BaseApiClass from '@/services/api/baseApiClass.js'

const LOGIN_URI = '/login'
const REGISTER_URI = '/register'

class AuthApi extends BaseApiClass {
  async login(credentials) {
    try {
      const res = await client.post(LOGIN_URI, credentials)
      return res.data
    } catch (error) {
      if (error.status === 401) {
        this.handleError(new Error('Email or password is incorrect'))
      } else {
        this.handleError(error)
      }
    }
  }

  async register({ username, email, password, passwordConfirmation, avatar }) {
    try {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('password_confirmation', passwordConfirmation)

      if (avatar) {
        formData.append('avatar', avatar)
      }

      const res = await client.post(REGISTER_URI, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      return res.data
    } catch (error) {
      this.handleError(error)
    }
  }
}

export default new AuthApi()
