import ProductsApi from '@/services/api/products.js'

class ProductsService {
  constructor() {
    this.api = ProductsApi
  }

  async fetch(params) {
    return await this.api.fetch(params)
  }

  async fetchOne(id) {
    return await this.api.fetchOne(id)
  }
}

export default new ProductsService()
