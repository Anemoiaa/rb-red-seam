import client from './client.js'
import BaseApiClass from '@/services/api/baseApiClass.js'

const CART_URI = '/cart'
const CART_PRODUCT_URI = '/cart/products'
const CART_CHECKOUT_URI = '/cart/checkout'

class CartApi extends BaseApiClass {
  async getCart() {
    try {
      const res = await client.get(CART_URI)

      return res.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async addItem({ productId, color = null, size = null, quantity = 1 }) {
    try {
      const res = await client.post(`${CART_PRODUCT_URI}/${productId}`, {
        color,
        size,
        quantity,
      })

      return res.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async updateItem({ productId, quantity = 1 }) {
    try {
      const res = await client.patch(`${CART_PRODUCT_URI}/${productId}`, { quantity })

      return res.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async removeItem(productId) {
    try {
      const res = await client.delete(`${CART_PRODUCT_URI}/${productId}`)

      return res.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async checkout(name, surname, email, address, zipCode) {
    try {
      const res = await client.post(CART_CHECKOUT_URI, {
        name,
        surname,
        email,
        address,
        zip_code: zipCode,
      })

      return res.data
    } catch (error) {
      this.handleError(error)
    }
  }
}

export default new CartApi()
