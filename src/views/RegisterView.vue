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
        <h1 class="font-semibold text-[42px]">Registration</h1>
        <form class="mt-12 flex flex-col gap-4" @submit.prevent="onSubmit">
          <div class="flex gap-[15px] items-center">
            <label for="avatar" class="w-fit flex items-center gap-[15px]" title="Upload avatar">
              <span
                class="w-[100px] h-[100px] flex justify-center items-center border border-gray-primary-dark rounded-full cursor-pointer"
              >
                <template v-if="avatarSrc">
                  <img
                    :src="avatarSrc"
                    alt="avatar"
                    class="w-[100%] h-[100%] object-cover rounded-full"
                  />
                </template>
                <IconCamera v-else />
              </span>
              <template v-if="avatarSrc">
                <span class="text-sm text-blue-dark-light cursor-pointer">Upload new</span>
              </template>
              <span v-else class="text-sm text-blue-dark-light cursor-pointer">Upload image</span>
            </label>

            <template v-if="avatarSrc">
              <span class="text-sm text-blue-dark-light cursor-pointer" @click="removeAvatar"
                >Remove</span
              >
            </template>

            <input type="file" name="avatar" id="avatar" hidden @change="processAvatar" />
          </div>
          <PrimaryInput
            v-model="username"
            id="username"
            type="text"
            placeholder="Username"
            autocomplete="username"
            required
            :error="errors.username"
          />
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
          <PrimaryInput
            v-model="passwordConfirmation"
            id="passwordConfirmation"
            type="password"
            placeholder="Confirm password"
            :error="errors.passwordConfirmation"
          />
          <PrimaryButton class="py-2" type="submit">Register</PrimaryButton>
        </form>
        <div class="mt-5 text-center">
          <p class="text-sm">
            Already member?
            <RouterLink to="login" class="text-red-primary font-medium">Log in</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

import * as validationRules from '@/config/validations.js'
import AuthService from '@/services/authService.js'
import PrimaryInput from '@/compoonents/UI/PrimaryInput.vue'
import PrimaryButton from '@/compoonents/UI/PrimaryButton.vue'
import IconCamera from '@/compoonents/Icons/IconCamera.vue'

const router = useRouter()

const schema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(
      validationRules.MIN_USERNAME_LENGTH,
      `Username must be at least ${validationRules.MIN_USERNAME_LENGTH} characters`,
    ),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(
      validationRules.MIN_PASSWORD_LENGTH,
      `Password must be at least ${validationRules.MIN_PASSWORD_LENGTH} characters`,
    ),
  passwordConfirmation: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const { handleSubmit, errors, defineField } = useForm({ validationSchema: schema })

const [username] = defineField('username', {
  validateOnModelUpdate: false,
})
const [email] = defineField('email', {
  validateOnModelUpdate: false,
})
const [password] = defineField('password', {
  validateOnModelUpdate: false,
})
const [passwordConfirmation] = defineField('passwordConfirmation')

// TODO validate file size and type
const avatarFile = ref(null)

const avatarSrc = computed(() => {
  if (avatarFile.value) {
    return URL.createObjectURL(avatarFile.value)
  }

  return null
})

function processAvatar(e) {
  avatarFile.value = e.target.files[0]
}

function removeAvatar() {
  avatarFile.value = null
}

const onSubmit = handleSubmit(async (values) => {
  await AuthService.register({
    username: values.username,
    email: values.email,
    password: values.password,
    passwordConfirmation: values.passwordConfirmation,
    avatar: avatarFile.value,
  })

  await router.push({ name: 'products' })
})
</script>
