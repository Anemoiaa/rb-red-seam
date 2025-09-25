<template>
  <header>
    <div class="container">
      <div class="flex justify-between py-[28px] font-poppins">
        <div class="flex items-center gap-1">
          <AppLogo />
          <h1 class="font-semibold">RedSeam Clothing</h1>
        </div>
        <div class="flex gap-[10px]"></div>
      </div>
    </div>
  </header>
  <main>
    <slot />
  </main>
</template>

<script setup>
import AppLogo from '@/compoonents/AppLogo.vue'
</script>
