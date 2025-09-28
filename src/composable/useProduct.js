import { toast } from 'vue3-toastify'
import ProductsApi from '@/services/api/products.js'

async function fetchAll(params) {
  try {
    return await ProductsApi.fetchAll(params)
  } catch (error) {
    toast(error.message, { type: 'error' })
  }
}

async function fetchOne(id) {
  try {
    return await ProductsApi.fetchOne(id)
  } catch (error) {
    toast(error.message, { type: 'error' })
  }
}

export function useProduct() {
  return {
    fetchAll,
    fetchOne,
  }
}
