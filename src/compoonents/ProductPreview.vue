<template>
  <div class="font-medium font-poppins cursor-pointer">
    <div class="h-[275px] md:h-[550px] flex justify-center items-center">
      <img class="h-full w-full" :src="product.cover_image" :alt="product.name" />
    </div>
    <div class="mt-1"></div>
    <h2 class="text-lg">{{ product.name }}</h2>
    <h3 class="text-base">$ {{ product.price }}</h3>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>
