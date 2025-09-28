import client from './client.js'

const CART_URI = '/cart'
const CART_PRODUCT_URI = '/cart/products'
const CART_CHECKOUT_URI = '/cart/checkout'

class CartApi {
  async getCart() {
    const { data } = await client.get(CART_URI)

    return data
  }

  async addItem({ productId, color = null, size = null, quantity = 1 }) {
    const { data } = await client.post(`${CART_PRODUCT_URI}/${productId}`, {
      color,
      size,
      quantity,
    })

    return data
  }

  async updateItem({ productId, quantity = 1 }) {
    const { data } = await client.patch(`${CART_PRODUCT_URI}/${productId}`, { quantity })

    return data
  }

  async removeItem(productId) {
    const { data } = await client.delete(`${CART_PRODUCT_URI}/${productId}`)
    return data
  }

  async checkout(name, surname, email, address, zipCode) {
    return await client.post(CART_CHECKOUT_URI, {
      name,
      surname,
      email,
      address,
      zip_code: zipCode,
    })
  }
}

export default new CartApi()
