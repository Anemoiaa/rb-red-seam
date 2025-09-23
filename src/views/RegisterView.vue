<template>
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
              <svg
                v-else
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.9297 0C11.5984 1.84288e-05 12.2228 0.334243 12.5938 0.890625L13.4062 2.10938C13.7772 2.66576 14.4016 2.99998 15.0703 3H16C17.1046 3 18 3.89543 18 5V12C18 13.1046 17.1046 14 16 14H2C0.895431 14 0 13.1046 0 12V5C0 3.89543 0.895431 3 2 3H2.92969C3.59837 2.99998 4.22283 2.66576 4.59375 2.10938L5.40625 0.890625C5.77717 0.334243 6.40163 1.84288e-05 7.07031 0H10.9297ZM9 3.5C6.51472 3.5 4.5 5.51472 4.5 8C4.5 10.4853 6.51472 12.5 9 12.5C11.4853 12.5 13.5 10.4853 13.5 8C13.5 5.51472 11.4853 3.5 9 3.5ZM9 5C10.6569 5 12 6.34315 12 8C12 9.65685 10.6569 11 9 11C7.34315 11 6 9.65685 6 8C6 6.34315 7.34315 5 9 5Z"
                  fill="#3E424A"
                />
              </svg>
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
        <PrimaryButton type="submit">Register</PrimaryButton>
      </form>
      <div class="mt-5 text-center">
        <p class="text-sm">
          Already member?
          <RouterLink to="login" class="text-red-primary font-medium">Log in</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import PrimaryInput from '@/compoonents/UI/PrimaryInput.vue'
import PrimaryButton from '@/compoonents/UI/PrimaryButton.vue'
import * as validationRules from '@/config/validations.js'

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
const [avatar] = defineField('avatar')

const avatarSrc = ref(null)

function processAvatar(e) {
  avatarSrc.value = URL.createObjectURL(e.target.files[0])
}

function removeAvatar() {
  avatarSrc.value = null
}

const onSubmit = handleSubmit(async (values) => {
  console.log('Register success', values)
})
</script>
