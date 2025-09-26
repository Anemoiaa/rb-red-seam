import client from './client.js'

const PRODUCTS_URI = '/products'

class ProductsApi {
  async fetch({ page = 1, priceFrom = null, priceTo = null, sort = null } = {}) {
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

    const { data } = await client.get(PRODUCTS_URI, { params })
    return data
  }

  async fetchOne(id) {
    const { data } = await client.get(`${PRODUCTS_URI}/${id}`)
    return data
  }
}

export default new ProductsApi()
