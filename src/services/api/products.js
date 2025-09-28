import client from './client.js'
import BaseApiClass from '@/services/api/baseApiClass.js'

const PRODUCTS_URI = '/products'

class ProductsApi extends BaseApiClass {
  async fetchAll({ page = 1, priceFrom = null, priceTo = null, sort = null } = {}) {
    const params = { page }

    if (priceFrom) {
      params['filter[price_from]'] = priceFrom
    }
    if (priceTo) {
      params['filter[price_to]'] = priceTo
    }
    if (sort) {
      params.sort = sort
    }

    try {
      const res = await client.get(PRODUCTS_URI, { params })

      return res.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async fetchOne(id) {
    try {
      const res = await client.get(`${PRODUCTS_URI}/${id}`)

      return res.data
    } catch (error) {
      this.handleError(error)
    }
  }
}

export default new ProductsApi()
