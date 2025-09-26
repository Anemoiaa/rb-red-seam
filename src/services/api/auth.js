import client from './client.js'

const LOGIN_URI = '/login'
const REGISTER_URI = '/register'

class Auth {
  async login(credentials) {
    const { data } = await client.post(LOGIN_URI, credentials)
    return data
  }

  async register({ username, email, password, passwordConfirmation, avatar }) {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('password_confirmation', passwordConfirmation)
    if (avatar) {
      formData.append('avatar', avatar)
    }

    const { data } = await client.post(REGISTER_URI, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return data
  }
}

export default new Auth()
