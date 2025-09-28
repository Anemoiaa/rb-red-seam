import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isOpen: false,
  }),
  actions: {
    add(item) {
      const existing = this.items.find((i) => i.product.id === item.product.id)

      if (existing) {
        existing.quantity += item.quantity || 1
      } else {
        this.items.push(item)
      }
    },
    removeItem(id) {
      const index = this.items.findIndex((item) => item.product.id === id)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },
    incrementQuantity(id) {
      const existing = this.items.find((i) => i.product.id === id)

      if (existing) {
        existing.quantity += 1
      }
    },
    decrementQuantity(id) {
      const existing = this.items.find((i) => i.product.id === id)

      if (existing && existing.quantity > 1) {
        existing.quantity -= 1
      }
    },
    getSubtotal() {
      return this.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
    },
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
  },
})
