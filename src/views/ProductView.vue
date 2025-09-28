<template>
  <section class="container">
    <div v-if="product">
      <div class="flex gap-10 font-poppins">
        <div class="flex-1 flex gap-6">
          <ul class="w-full max-w-[120px] flex flex-col gap-2">
            <li
              v-for="(image, index) in product.images"
              :key="image"
              @click="selectedItemIndex = index"
              class="cursor-pointer"
            >
              <img :src="image" :alt="product.name" />
            </li>
          </ul>
          <div class="w-full max-w-[700px] h-[930px] flex justify-center items-center">
            <img :src="product.images[selectedItemIndex]" :alt="product.name" />
          </div>
        </div>
        <div class="flex-1 max-w-[700px]">
          <h1 class="text-4xl font-semibold">
            {{ product.name.charAt(0).toUpperCase() + product.name.slice(1) }}
          </h1>
          <h2 class="mt-5 text-4xl font-semibold">${{ product.price }}</h2>
          <div class="mt-12">
            <h3 class="text-blue-dark">Color: {{ product.available_colors[selectedItemIndex] }}</h3>
            <div class="mt-5 flex items-center gap-3">
              <div
                v-for="(colorName, index) in product.available_colors"
                :key="colorName"
                class="h-10 w-10 rounded-full border border-gray-primary-dark cursor-pointer"
                :class="{ 'w-12 h-12 border-4': index === selectedItemIndex }"
                :style="{ backgroundColor: colorMap[colorName] }"
                @click="selectedItemIndex = index"
              ></div>
            </div>
          </div>
          <div class="mt-12">
            <h3 class="text-blue-dark">Size: {{ selectedSize }}</h3>
            <ul class="mt-4 flex gap-2">
              <li
                v-for="size in product.available_sizes"
                :key="size"
                @click="selectedSize = size"
                class="w-[72px] h-[42px] flex justify-center items-center border border-gray-primary-dark rounded-[10px] cursor-pointer"
                :class="{ '!bg-gray-primary !border-blue-dark': size === selectedSize }"
              >
                {{ size }}
              </li>
            </ul>
          </div>
          <div class="mt-12">
            <h3 class="text-blue-dark">Quantity</h3>
            <div class="relative mt-4 inline-block">
              <select
                v-model="selectedQuantity"
                id="quantity"
                class="appearance-none pl-[15px] pr-[45px] py-[9px] border border-gray-primary-dark rounded-[10px] text-blue-dark"
              >
                <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
              </select>
              <svg
                class="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-blue-dark pointer-events-none"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <PrimaryButton
            @click="addToCart"
            class="mt-14 flex items-center justify-center gap-[10px] py-4 font-medium text-lg"
          >
            <IconCart class="text-white" />
            Add to cart
          </PrimaryButton>
          <div class="my-14 w-full border-t border-gray-primary-dark"></div>
          <div class="text-blue-dark-light">
            <h2 class="font-medium text-xl text-blue-dark">Details</h2>
            <h3>Release year: {{ product.release_year }}</h3>
            <p class="mt-5">
              {{ product.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { colorMap } from '@/config/colors.js'
import { useCart } from '@/composable/useCart.js'
import PrimaryButton from '@/compoonents/UI/PrimaryButton.vue'
import IconCart from '@/compoonents/Icons/IconCart.vue'
import { useProduct } from '@/composable/useProduct.js'

const route = useRoute()
const { fetchOne } = useProduct()

const product = ref(null)
const selectedItemIndex = ref(0)
const selectedSize = ref(null)
const selectedQuantity = ref(1)

const { addItem, cartIsOpen } = useCart()

async function addToCart() {
  const item = {
    productId: product.value.id,
    color: product.value.available_colors[selectedItemIndex.value],
    size: product.value.available_sizes[selectedItemIndex.value],
    quantity: selectedQuantity.value,
  }

  await addItem(item)
  cartIsOpen.value = true
}

onMounted(async () => {
  product.value = await fetchOne(route.params.id)
  selectedSize.value = product.value.available_sizes[0]
})
</script>
