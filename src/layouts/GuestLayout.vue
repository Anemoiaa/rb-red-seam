<template>
  <header>
    <div class="container">
      <div class="flex justify-between py-[28px] font-poppins">
        <div class="flex items-center gap-1">
          <AppLogo />
          <h1 class="font-semibold">
            RedSeam Clothing
          </h1>
        </div>
        <RouterLink class="flex items-center gap-2" to="login">
          <IconUser />
          <span class="font-medium text-xs">Log in</span>
        </RouterLink>
      </div>
    </div>
  </header>
  <slot />
</template>

<script setup>
import AppLogo from '@/compoonents/AppLogo.vue'
import IconUser from '@/icons/IconUser.vue'
</script>
