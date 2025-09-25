import client from './client.js'

const LOGIN_URI = '/login'

class Auth {
  constructor() {
    this.client = client
  }

  async login(credentials) {
    const { data } = await this.client.post(LOGIN_URI, credentials)
    return data
  }
}

export default new Auth()
