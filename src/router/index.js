import { createRouter, createWebHistory } from 'vue-router'
import AuthService from '@/services/authService.js'
import LoginView from '@/views/LoginView.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProductsListView from '@/views/ProductsListView.vue'
import ProductView from '@/views/ProductView.vue'
import CheckoutView from '@/views/CheckoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { layout: GuestLayout, guestOnly: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { layout: GuestLayout, guestOnly: true },
    },
    {
      path: '/',
      name: 'products',
      component: ProductsListView,
    },
    {
      path: '/products/:id',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to) => {
  const auth = AuthService.isAuthenticated()

  if (to.meta.guestOnly && auth) {
    return { name: 'products' }
  }

  if (to.meta.requiresAuth && !auth) {
    return { name: 'login' }
  }
})

export default router
