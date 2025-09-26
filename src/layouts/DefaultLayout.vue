<template>
  <header>
    <div class="container">
      <div class="flex justify-between py-[28px] font-poppins">
        <div class="flex items-center gap-1">
          <AppLogo />
          <h1 class="font-semibold">RedSeam Clothing</h1>
        </div>
        <div class="flex items-center gap-5">
          <button>
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
    <slot />
  </main>
</template>

<script setup>
import AppLogo from '@/compoonents/AppLogo.vue'
import IconCart from '@/compoonents/Icons/IconCart.vue'
import { ref, onBeforeMount } from 'vue'
import authService from '@/services/authService.js'
import IconChevronDown from '@/compoonents/Icons/IconChevronDown.vue'

const user = ref(null)

onBeforeMount(() => {
  user.value = authService.getUser()
})
</script>
