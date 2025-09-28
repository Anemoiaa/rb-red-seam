<template>
  <section class="container">
    <template v-if="showSuccessMessage">
      <div
        class="w-full h-[calc(100vh-var(--var-header-auth-height))] flex flex-col justify-center items-center font-poppins"
      >
        <div
          class="w-[76px] h-[76px] flex justify-center items-center bg-gray-primary rounded-full"
        >
          <svg
            width="37"
            height="29"
            viewBox="0 0 37 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3129 29C12.7414 29 12.2413 28.7775 11.8841 28.3641L0.876101 18.6813C0.268885 17.9819 0.411757 16.9963 1.19757 16.4558C1.98338 15.9154 3.09065 16.0426 3.69787 16.742L13.2414 24.7398L33.2796 0.640987C33.8511 -0.0584507 34.994 -0.217414 35.7799 0.323061C36.5657 0.831743 36.7443 1.84911 36.137 2.54854L14.7059 28.3324C14.4201 28.7457 13.8844 29 13.3129 29Z"
              fill="#318A1D"
            />
          </svg>
        </div>
        <div class="mt-10 text-heading-1 text-blue-dark">Congrats!</div>
        <div class="mt-4 text-sm text-blue-dark-light">Your order is placed successfully!</div>
        <RouterLink :to="{ name: 'products' }">
          <PrimaryButton class="mt-20 px-10 py-[10px]"> Continue shopping </PrimaryButton>
        </RouterLink>
      </div>
    </template>

    <div v-else class="mt-18 mb-40 font-poppins">
      <h1 class="text-heading-1 text-blue-dark">Checkout</h1>
      <form class="mt-[42px] grid grid-cols-9 gap-30" @submit.prevent>
        <div class="col-span-6 px-12 bg-gray-primary rounded-2xl">
          <div class="mt-18 font-medium text-blue-dark-light text-[22px]">Order details</div>
          <div class="mb-18 w-full max-w-[578px] flex flex-col gap-[33px]">
            <div class="mt-12 flex gap-6">
              <PrimaryInput
                v-model="name"
                :error="errors.name"
                id="name"
                type="text"
                placeholder="Name"
              />
              <PrimaryInput
                v-model="surname"
                :error="errors.surname"
                id="surname"
                type="text"
                placeholder="Surname"
              />
            </div>
            <div>
              <PrimaryInput
                v-model="email"
                :error="errors.email"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div class="flex gap-6">
              <PrimaryInput
                v-model="address"
                :error="errors.address"
                id="address"
                type="text"
                placeholder="address"
              />
              <PrimaryInput
                v-model="zipCode"
                :error="errors.zipCode"
                id="zipCode"
                type="text"
                placeholder="Zip code"
              />
            </div>
          </div>
        </div>
        <ShopCart
          :showXmark="false"
          @clickOnCartSubmitButton="onSubmit"
          itemsWrapperClass="max-h-[300px] overflow-y-auto"
          submitButtonText="Pay"
          class="col-span-3"
        />
      </form>
    </div>
  </section>
</template>
<script setup>
import * as yup from 'yup'
import { useForm } from 'vee-validate'

import { MAX_NAME_LENGTH, MIN_ZIP_LENGTH, MAX_ZIP_LENGTH } from '@/config/validations.js'
import { useCart } from '@/composable/useCart.js'
import ShopCart from '@/compoonents/ShopCart.vue'
import PrimaryInput from '@/compoonents/UI/PrimaryInput.vue'
import { ref } from 'vue'
import PrimaryButton from '@/compoonents/UI/PrimaryButton.vue'

const { checkout } = useCart()

const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .max(MAX_NAME_LENGTH, `Name cannot exceed ${MAX_NAME_LENGTH} characters`),

  surname: yup
    .string()
    .required('Surname is required')
    .max(MAX_NAME_LENGTH, `Surname cannot exceed ${MAX_NAME_LENGTH} characters`),

  email: yup.string().required('Email is required').email('Invalid email'),

  address: yup
    .string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address cannot exceed 100 characters'),

  zipCode: yup
    .string()
    .required('Zip code is required')
    .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Zip code format is invalid')
    .min(MIN_ZIP_LENGTH, `Zip code must be at least ${MIN_ZIP_LENGTH} digits`)
    .max(MAX_ZIP_LENGTH, `Zip code cannot exceed ${MAX_ZIP_LENGTH} digits`),
})

const { handleSubmit, errors, defineField } = useForm({ validationSchema: schema })

const [name] = defineField('name', { validateOnModelUpdate: false })
const [surname] = defineField('surname', { validateOnModelUpdate: false })
const [email] = defineField('email', { validateOnModelUpdate: false })
const [address] = defineField('address', { validateOnModelUpdate: false })
const [zipCode] = defineField('zipCode', { validateOnModelUpdate: false })

const showSuccessMessage = ref(false)

const onSubmit = handleSubmit(async (values) => {
  await checkout(values.name, values.surname, values.email, values.address, values.zipCode)
  showSuccessMessage.value = true
})
</script>
