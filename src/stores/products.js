import { defineStore } from 'pinia'

const CACHE_MAX_SIZE = 10

export const useProductsStore = defineStore('products', {
  state: () => ({
    productsCache: new Map(),
  }),
  actions: {
    addToCache(key, value) {
      const cache = this.productsCache ?? new Map()

      if (cache.has(key)) {
        cache.delete(key)
      }

      cache.set(key, value)

      if (cache.size > CACHE_MAX_SIZE) {
        const firstKey = cache.keys().next().value
        cache.delete(firstKey)
      }
      this.productsCache.set(key, value)
    },
    removeFromCache(key) {
      this.productsCache.delete(key)
    },
  },
})
