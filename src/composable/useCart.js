import { ref, computed, onMounted } from 'vue'
import CartApi from '@/services/api/cart.js'
import { DELIVERY_PRICE } from '@/config/app.js'

const isOpen = ref(false)
const cartItems = ref([])

const cartLength = computed(() => cartItems.value.length)
const subTotal = computed(() => cartItems.value.reduce((acc, item) => acc + item.total_price, 0))
const total = computed(() => subTotal.value + DELIVERY_PRICE)

function findCartItem(productId, color, size) {
  return cartItems.value.find(
    (item) => item.id === productId && item.color === color && item.size === size,
  )
}

async function openCart() {
  isOpen.value = true
}

function closeCart() {
  isOpen.value = false
}

async function fetchCart() {
  cartItems.value = await CartApi.getCart()
}

async function addItem({ productId, color = null, size = null, quantity = 1 }) {
  const existing = findCartItem(productId, color, size)

  if (existing) {
    await updateItem({ productId, color, size, quantity: existing.quantity + quantity })
  } else {
    cartItems.value.push(await CartApi.addItem({ productId, color, size, quantity }))
  }
}

async function updateItem({ productId, color, size, quantity = 1 }) {
  const existing = findCartItem(productId, color, size)

  await CartApi.updateItem({ productId, quantity })

  existing.quantity = quantity
  existing.total_price = existing.price * existing.quantity
  existing.color = color
  existing.size = size
}

async function removeItem(id) {
  await CartApi.removeItem(id)
  await fetchCart()
}

async function checkout(name, surname, email, address, zipCode) {
  return await CartApi.checkout(name, surname, email, address, zipCode)
}

export function useCart() {
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
