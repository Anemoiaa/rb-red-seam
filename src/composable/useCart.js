import { toast } from 'vue3-toastify'
import { ref, computed, onMounted } from 'vue'
import CartApi from '@/services/api/cart.js'

import { DELIVERY_PRICE } from '@/config/app.js'
import { useAuth } from '@/composable/useAuth.js'

const isOpen = ref(false)
const cartItems = ref([])

const cartLength = computed(() => cartItems.value.length)
const subTotal = computed(() => cartItems.value.reduce((acc, item) => acc + item.total_price, 0))
const total = computed(() => subTotal.value + DELIVERY_PRICE)

export function useCart() {
  function findCartItem(productId, color, size) {
    return cartItems.value.find(
      (item) => item.id === productId && item.color === color && item.size === size,
    )
  }

  function openCart() {
    isOpen.value = true
  }

  function closeCart() {
    isOpen.value = false
  }

  async function fetchCart() {
    if (!useAuth().isAuthenticated()) {
      return
    }

    try {
      cartItems.value = await CartApi.getCart()
    } catch (error) {
      toast(error.message, { type: 'error' })
    }
  }

  async function addItem({ productId, color = null, size = null, quantity = 1 }) {
    const existing = findCartItem(productId, color, size)

    try {
      if (existing) {
        await updateItem({ productId, color, size, quantity: existing.quantity + quantity })
      } else {
        cartItems.value.push(await CartApi.addItem({ productId, color, size, quantity }))
      }
    } catch (error) {
      toast(error.message, { type: 'error' })
    }
  }

  async function updateItem({ productId, color, size, quantity = 1 }) {
    const existing = findCartItem(productId, color, size)

    try {
      await CartApi.updateItem({ productId, quantity })

      existing.quantity = quantity
      existing.total_price = existing.price * existing.quantity
      existing.color = color
      existing.size = size
    } catch (error) {
      toast(error.message, { type: 'error' })
    }
  }

  async function removeItem(id) {
    try {
      await CartApi.removeItem(id)
    } catch (error) {
      toast(error.message, { type: 'error' })
    }

    await fetchCart()
  }

  async function checkout(name, surname, email, address, zipCode) {
    try {
      await CartApi.checkout(name, surname, email, address, zipCode)

      return true
    } catch (error) {
      toast(error.message, { type: 'error' })

      return false
    }
  }

  onMounted(async () => {
    if (!cartItems.value.length) {
      await fetchCart()
    }
  })

  return {
    cartItems,
    cartLength,
    openCart,
    closeCart,
    cartIsOpen: isOpen,
    subTotal,
    total,
    addItem,
    updateItem,
    removeItem,
    checkout,
  }
}
