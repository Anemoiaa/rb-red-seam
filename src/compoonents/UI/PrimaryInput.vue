<template>
  <div class="w-full">
    <div class="w-full relative">
      <input
        :id="id"
        v-model="model"
        :type="showPassword ? 'text' : type"
        :placeholder="required ? `${placeholder} *` : placeholder"
        :autocomplete="autocomplete"
        :class="[
          'w-full rounded-lg border px-3 py-[11px] text-[14px] text-blue-dark-light outline-none transition',
          'placeholder:text-blue-dark-light',
          'focus:border-blue-dark',
          error
            ? 'border-red-primary focus:border-red-primary'
            : 'border-gray-300 focus:border-blue-500',
        ]"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        @click="togglePassword"
      >
        <svg
          v-if="!showPassword"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#0F172A"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#0F172A"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.973 9.973 0 012.07-3.338m2.658-2.658A9.973 9.973 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.969 9.969 0 01-4.507 5.223M15 12a3 3 0 01-3 3m0-6a3 3 0 013 3m-3-3l-9 9"
          />
        </svg>
      </button>
    </div>

    <p class="mt-1 text-[10px] h-4 text-red-primary">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: String,
  modelValue: {
    required: true,
  },
  label: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  required: {
    type: Boolean,
    default: false,
  },
  error: String,
  autocomplete: {
    type: String,
    default: 'off',
  },
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>
