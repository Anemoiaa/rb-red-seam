<template>
  <div class="flex justify-center mt-[20%] font-poppins">
    <div class="w-full max-w-[554px]">
      <h1 class="font-semibold text-[42px]">Log in</h1>
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
        <PrimaryButton type="submit"> Log in </PrimaryButton>
      </form>
      <div class="mt-5 text-center">
        <p class="text-sm">
          Not a member?
          <RouterLink to="register" class="text-red-primary font-medium">Register</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import PrimaryInput from '@/compoonents/UI/PrimaryInput.vue'
import PrimaryButton from '@/compoonents/UI/PrimaryButton.vue'
import { MIN_PASSWORD_LENGTH } from '@/config/validations.js'

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
  console.log('Login success', values)
})
</script>
