<template>
  <component :is="layoutComponent">
    <slot />
  </component>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import { useAuth } from '@/composable/useAuth.js'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'

const route = useRoute()
const { isAuthenticated } = useAuth()

const layoutComponent = computed(() => {
  if (route.meta.layout) {
    return route.meta.layout
  }

  return isAuthenticated() ? DefaultLayout : GuestLayout
})
</script>
