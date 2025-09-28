<template>
  <header>
    <div class="container">
      <div class="flex justify-between py-[28px] font-poppins">
        <RouterLink to="/" class="flex items-center gap-1">
          <AppLogo />
          <h1 class="font-semibold">RedSeam Clothing</h1>
        </RouterLink>
        <RouterLink class="flex items-center gap-2" :to="{ name: 'login' }">
          <IconUser />
          <span class="font-medium text-xs">Log in</span>
        </RouterLink>
      </div>
    </div>
  </header>
  <main>
    <slot />
  </main>
</template>

<script setup>
import AppLogo from '@/compoonents/AppLogo.vue'
import IconUser from '@/icons/IconUser.vue'
</script>
