<template>
  <div
    class="grid grid-cols-2 h-[calc(100vh-var(--var-header-height))] max-h-[2160px] min-h-[600px]"
  >
    <div
      class="h-full w-full bg-cover bg-no-repeat"
      :style="{ backgroundImage: `url(${cover})`, backgroundPosition: 'top right' }"
    ></div>
    <div class="flex justify-center mt-[20%] font-poppins">
      <div class="w-full max-w-[554px]">
        <h1 class="text-heading-1 text-blue-dark">Log in</h1>
        <form class="mt-12 flex flex-col gap-4" @submit.prevent="onSubmit">
          <PrimaryInput
            v-model="email"
            id="email"
            type="email"
            placeholder="Email"
            autocomplete="email"
            required
            :error="errors.email"
          />
          <PrimaryInput
            v-model="password"
            id="password"
            type="password"
            placeholder="Password"
            required
            :error="errors.password"
          />
          <PrimaryButton class="py-[10px] text-sm" type="submit"> Log in </PrimaryButton>
        </form>
        <div class="mt-5 text-center">
          <p class="text-sm">
            Not a member?
            <RouterLink to="register" class="text-red-primary font-medium">Register</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import cover from '@/assets/images/cover.png'

import * as yup from 'yup'
import { useForm } from 'vee-validate'

import { MIN_PASSWORD_LENGTH } from '@/config/validations.js'
import { useAuth } from '@/composable/useAuth.js'
import PrimaryInput from '@/compoonents/UI/PrimaryInput.vue'
import PrimaryButton from '@/compoonents/UI/PrimaryButton.vue'

const { login } = useAuth()

const schema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`),
})

const { handleSubmit, errors, defineField } = useForm({ validationSchema: schema })

const [email] = defineField('email', {
  validateOnModelUpdate: false,
})
const [password] = defineField('password', {
  validateOnModelUpdate: false,
})

const onSubmit = handleSubmit(async (values) => {
  await login({ email: values.email, password: values.password })
})
</script>
