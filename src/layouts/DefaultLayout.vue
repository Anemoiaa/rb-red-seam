<template>
  <header>
    <div class="container">
      <div class="flex justify-between py-[28px] font-poppins">
        <RouterLink to="/" class="flex items-center gap-1">
          <AppLogo />
          <h1 class="font-semibold">RedSeam Clothing</h1>
        </RouterLink>
        <div class="flex items-center gap-5">
          <button @click="openCart" title="Cart">
            <IconCart />
          </button>
          <div class="flex items-center gap-1">
            <img
              v-if="user.avatar"
              :src="user.avatar"
              alt="user avatar"
              class="w-10 h-10 rounded-full"
            />
            <div
              v-else
              class="w-10 h-10 flex justify-center items-center rounded-full border border-blue-dark-light"
            >
              {{ user?.username?.charAt(0) }}
            </div>
            <button>
              <IconChevronDown />
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  <main>
    <transition name="fade">
      <div v-if="cartIsOpen" @click="closeCart" class="fixed inset-0 bg-black/50 z-40"></div>
    </transition>
    <transition name="slide">
      <div v-if="cartIsOpen" class="fixed top-0 right-0 w-full max-w-[540px] h-full bg-white z-50">
        <ShopCart />
      </div>
    </transition>
    <slot />
  </main>
</template>

<script setup>
import AppLogo from '@/compoonents/AppLogo.vue'
import IconCart from '@/compoonents/Icons/IconCart.vue'
import { ref, onBeforeMount } from 'vue'
import authService from '@/services/authService.js'
import IconChevronDown from '@/compoonents/Icons/IconChevronDown.vue'
import { useCart } from '@/composable/useCart.js'
import ShopCart from '@/compoonents/ShopCart.vue'

const user = ref(null)
const { cartIsOpen, openCart, closeCart } = useCart()

onBeforeMount(() => {
  user.value = authService.getUser()
})
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
