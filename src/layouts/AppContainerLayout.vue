<template>
  <component :is="layoutComponent">
    <slot />
  </component>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import AuthService from '@/services/authService.js'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'

const route = useRoute()
const authService = new AuthService()

const layoutComponent = computed(() => {
  if (route.meta.layout) {
    return route.meta.layout
  }

  return authService.isAuthenticated() ? DefaultLayout : GuestLayout
})
</script>
