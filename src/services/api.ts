import { AppError } from '@utils/app.error'
import axios, { isAxiosError } from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.1.9:3333',
  headers: {
    'Accpet': 'application/json',
    'Content-Type': 'application/json'
  },
})

api.interceptors.response.use(response => response, error => {
  if (error.response && error.response.data) {
    return Promise.reject(new AppError(error.response.data.message))
  } else {
    return Promise.reject(error)
  }
})

export { api }