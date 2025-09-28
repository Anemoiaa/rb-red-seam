<template>
  <div class="h-full flex flex-col font-poppins overflow-y-auto">
    <div class="flex justify-between items-center">
      <h2 class="font-medium text-xl">Shopping cart {{ cartLength ? `(${cartLength})` : null }}</h2>
      <IconXmark v-if="showXmark" @click="closeCart" class="cursor-pointer w-8 h-8" />
    </div>
    <template v-if="cartLength">
      <ul class="mt-16 mb-8 flex flex-col gap-[36px]" :class="itemsWrapperClass">
        <li v-for="item in cartItems" :key="item.id" class="flex gap-4">
          <div
            class="shrink-0 w-[100px] h-[134px] flex justify-center items-center border border-gray-primary-dark rounded-[10px]"
          >
            <img class="w-4/5 h-4/5" :src="targetImage(item)" :alt="item.name" />
          </div>
          <div class="w-full py-2">
            <div class="flex justify-between">
              <h2 class="font-medium text-sm">{{ item.name }}</h2>
              <h3 class="font-medium text-lg">$ {{ item.total_price }}</h3>
            </div>
            <h3 class="mt-2 text-xs text-blue-dark-light">{{ item.color }}</h3>
            <h3 class="mt-2 text-xs text-blue-dark-light">{{ item.size }}</h3>
            <div class="mt-4 flex justify-between">
              <div
                class="px-2 py-1 flex items-center gap-[8px] rounded-[22px] border border-gray-primary-dark text-xs text-blue-dark-light"
              >
                <button @click="decrementQuantity(item)" class="text-sm">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="incrementQuantity(item)" class="text-sm">+</button>
              </div>
              <button class="text-xs text-blue-dark-light" @click="removeItem(item.id)">
                Remove
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div class="mt-auto">
        <div class="flex flex-col gap-4">
          <div class="flex justify-between">
            <span>Items subtotal</span>
            <span>$ {{ subTotal }} </span>
          </div>
          <div class="flex justify-between">
            <span>Delivery</span>
            <span>$ {{ DELIVERY_PRICE }}</span>
          </div>
          <div class="flex justify-between font-medium text-xl">
            <span>Total</span>
            <span>$ {{ total }} </span>
          </div>
        </div>
        <PrimaryButton @click="onClick" class="mt-[100px] py-4 text-lg font-medium" type="submit">
          {{ submitButtonText }}
        </PrimaryButton>
      </div>
    </template>

    <template v-else>
      <div class="h-full flex flex-col justify-center items-center">
        <IconMarketCart />
        <div class="mt-6 font-semibold text-2xl text-blue-dark">Ooops!</div>
        <div class="mt-3 text-sm text-blue-dark-light">
          You’ve got nothing in your cart just yet...
        </div>
        <RouterLink :to="{ name: 'products' }" @click="closeCart">
          <PrimaryButton class="mt-14 px-14 py-[10px]">Start shopping</PrimaryButton>
        </RouterLink>
      </div>
    </template>
  </div>
</template>
<script setup>
import { DELIVERY_PRICE } from '@/config/app.js'
import { useCart } from '@/composable/useCart.js'
import IconMarketCart from '@/compoonents/Icons/IconMarketCart.vue'
import PrimaryButton from '@/compoonents/UI/PrimaryButton.vue'
import IconXmark from '@/compoonents/Icons/IconXmark.vue'

defineProps({
  showXmark: {
    type: Boolean,
    default: true,
  },
  itemsWrapperClass: {
    type: String,
    default: '',
  },
  submitButtonText: {
    type: String,
    default: 'Go to checkout',
  },
})

const emit = defineEmits(['clickOnCartSubmitButton'])

const { cartItems, cartLength, closeCart, subTotal, total, updateItem, removeItem } = useCart()

async function incrementQuantity(item) {
  await updateItem({
    productId: item.id,
    color: item.color,
    size: item.size,
    quantity: item.quantity + 1,
  })
}

async function decrementQuantity(item) {
  if (item.quantity > 1) {
    await updateItem({
      productId: item.id,
      color: item.color,
      size: item.size,
      quantity: item.quantity - 1,
    })
  }
}

function onClick() {
  closeCart()
  emit('clickOnCartSubmitButton')
}

function targetImage(product) {
  const targetIndex = product.available_colors.indexOf(product.color)
  return product.images[targetIndex]
}
</script>
