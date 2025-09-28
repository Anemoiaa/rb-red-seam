import { AxiosError } from 'axios'

export default class BaseApiClass {
  handleError(error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response.data.message)
    }

    throw error
  }
}
