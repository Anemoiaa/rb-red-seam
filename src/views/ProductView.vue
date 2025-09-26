<template>
  <section class="container py-10">
    <div v-if="product">
      <h1 class="text-3xl font-bold">{{ product.name }}</h1>
      <img :src="product.cover_image" alt="" class="w-64 h-64 object-cover mt-4" />
      <p class="mt-2 text-lg">$ {{ product.price }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductsService from '@/services/productsService.js'
import { useRoute } from 'vue-router'

const route = useRoute()
const product = ref(history.state?.product || null)

onMounted(async () => {
  product.value = await ProductsService.fetchOne(route.params.id)
})
</script>
