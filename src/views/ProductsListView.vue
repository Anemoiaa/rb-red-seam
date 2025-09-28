<template>
  <section class="container">
    <div class="mt-18 font-poppins">
      <div class="flex items-center justify-between">
        <h1 class="text-heading-1 text-blue-dark">Products</h1>
        <div class="flex items-center">
          <div class="text-xs text-blue-dark-light">{{ showingItemInfoString }}</div>
          <div class="text-gray-primary-dark mx-8">|</div>

          <!-- Filter -->
          <div class="mr-8 relative" ref="filterWrapper">
            <button
              @click="filterIsOpen = !filterIsOpen"
              class="flex items-center gap-2 text-blue-dark"
            >
              <IconFilter />
              <span>Filter</span>
            </button>
            <form
              @submit.prevent="onApplyFilters"
              v-show="filterIsOpen"
              class="mt-[10px] absolute right-0 min-w-max border border-gray-primary-dark rounded-lg p-4 bg-white"
            >
              <h2 class="font-semibold">Select price</h2>
              <div class="mt-5 flex gap-[10px]">
                <div class="w-[175px]">
                  <PrimaryInput
                    v-model="filterPriceFrom"
                    :error="errors.from"
                    type="number"
                    placeholder="From"
                    required
                  />
                </div>
                <div class="w-[175px]">
                  <PrimaryInput
                    v-model="filterPriceTo"
                    :error="errors.to"
                    type="number"
                    placeholder="To"
                    required
                  />
                </div>
              </div>
              <div class="flex justify-end">
                <PrimaryButton class="w-30" type="submit">Apply</PrimaryButton>
              </div>
            </form>
          </div>

          <!--  Sort By -->
          <div class="relative" ref="sortWrapper">
            <button
              class="flex items-center gap-2 text-blue-dark"
              @click="sortByIsOpen = !sortByIsOpen"
            >
              <span>{{
                sortOptions.find((opt) => opt.value === selectedSortBy)?.label || 'Sort By'
              }}</span>
              <IconChevronDown />
            </button>
            <div
              v-show="sortByIsOpen"
              class="mt-[10px] absolute right-0 min-w-[223px] border border-gray-primary-dark rounded-lg p-4 bg-white"
            >
              <h2 class="font-semibold">Sort by</h2>
              <ul class="mt-2">
                <li
                  v-for="option in sortOptions"
                  :key="option.value"
                  @click="applySort(option.value)"
                  class="py-2"
                >
                  <button @click="applySort(option.value)">{{ option.label }}</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Show Selected Filters -->
      <div class="mt-5 h-[38px] flex items-center gap-5">
        <div
          v-if="filterPriceFrom && filterPriceTo"
          class="rounded-[50px] border border-gray-primary-dark px-4 py-2 pr-[10px]"
        >
          <div class="flex items-center gap-[6px] text-blue-dark-light text-sm">
            <span>Price: {{ filterPriceFrom }}-{{ filterPriceTo }}</span>
            <button @click="resetPriceFilter">
              <IconXmark />
            </button>
          </div>
        </div>
      </div>

      <!--  Products -->
      <div class="mt-6 grid grid-cols-2 md:grid-cols-4 space-x-6 space-y-12">
        <RouterLink
          v-for="product in products"
          :key="product.id"
          :to="{ name: 'product', params: { id: product.id } }"
        >
          <ProductPreview :product="product" />
        </RouterLink>
      </div>
    </div>

    <!--  Pagination -->
    <div class="mt-[90px]"></div>
    <div class="mt-[215px]"></div>
  </section>
</template>

<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import ProductsService from '@/services/productsService.js'
import ProductPreview from '@/compoonents/ProductPreview.vue'
import PrimaryInput from '@/compoonents/UI/PrimaryInput.vue'
import PrimaryButton from '@/compoonents/UI/PrimaryButton.vue'
import IconChevronDown from '@/compoonents/Icons/IconChevronDown.vue'
import IconFilter from '@/compoonents/Icons/IconFilter.vue'
import IconXmark from '@/compoonents/Icons/IconXmark.vue'

const sortOptions = [
  { label: 'New products first', value: '-created_at' },
  { label: 'Price, low to high', value: 'price' },
  { label: 'Price, high to low', value: '-price' },
]

const { errors, defineField, resetForm } = useForm({
  validationSchema: yup.object({
    from: yup
      .number()
      .transform((v, o) => (o === '' ? null : v))
      .min(0, 'Must be greater than 0'),
    to: yup
      .number()
      .transform((v, o) => (o === '' ? null : v))
      .when('from', (from, schema) =>
        from ? schema.min(from, 'Must be greater than From') : schema,
      ),
  }),
  initialValues: {
    from: null,
    to: null,
  },
})

const data = ref(null)

const currentPage = ref(1)

const [filterPriceFrom] = defineField('from')
const [filterPriceTo] = defineField('to')
const filterIsOpen = ref(false)
const filterWrapper = ref(null)

const selectedSortBy = ref(null)
const sortByIsOpen = ref(false)
const sortWrapper = ref(null)

const products = computed(() => data.value?.data || null)
const showingItemInfoString = computed(() => {
  const meta = data.value?.meta
  return meta ? `Showing ${meta.from}–${meta.to} of ${meta.total} results` : null
})

async function fetchProducts() {
  data.value = await ProductsService.fetch({
    page: currentPage.value,
    priceFrom: filterPriceFrom.value,
    priceTo: filterPriceTo.value,
    sort: selectedSortBy.value,
  })
}

async function applySort(sortValue) {
  selectedSortBy.value = sortValue
  await fetchProducts()
  sortByIsOpen.value = false
}

async function onApplyFilters() {
  await fetchProducts()
  filterIsOpen.value = false
}

async function resetPriceFilter() {
  resetForm({ values: { from: null, to: null } })
  data.value = fetchProducts()
}

function handleClickOutside(e) {
  if (filterWrapper.value && !filterWrapper.value.contains(e.target)) {
    filterIsOpen.value = false
  }
  if (sortWrapper.value && !sortWrapper.value.contains(e.target)) {
    sortByIsOpen.value = false
  }
}

onMounted(async () => {
  await fetchProducts()
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
