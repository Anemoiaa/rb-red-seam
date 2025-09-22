<template>
  <header>
    <div class="container">
      <div class="flex justify-between py-[28px] font-poppins">
        <div class="flex items-center gap-1">
          <AppLogo />
          <h1 class="font-semibold">RedSeam Clothing</h1>
        </div>
        <RouterLink class="flex items-center gap-2" to="login">
          <IconUser />
          <span class="font-medium text-xs">Log in</span>
        </RouterLink>
      </div>
    </div>
  </header>
  <main>
    <div
      class="grid grid-cols-2 h-[calc(100vh-var(--var-header-height))] max-h-[2160px] min-h-[600px]"
    >
      <div
        class="h-full w-full bg-cover bg-no-repeat"
        :style="{ backgroundImage: `url(${cover})`, backgroundPosition: 'top right' }"
      ></div>
      <slot />
    </div>
  </main>
</template>

<script setup>
import cover from '@/assets/images/cover.png'
import AppLogo from '@/compoonents/AppLogo.vue'
import IconUser from '@/icons/IconUser.vue'
</script>
