import { getToken, saveToken } from '@storage/auth.storage'
import { AppError } from '@utils/app.error'
import axios, { AxiosError, AxiosInstance, isAxiosError } from 'axios'

type SignOut = () => void

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
} 

const api = axios.create({
  baseURL: 'http://192.168.1.9:3333',
  headers: {
    'Accpet': 'application/json',
    'Content-Type': 'application/json'
  },
}) as APIInstanceProps

let failedQueue: PromiseType[] = []
let isRefreshing = false

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(response => response, async requestError => {

    if (requestError?.response?.status === 401) {
      if (
        requestError.response.data?.message === 'token.expired' || 
        requestError.response.data?.message === 'token.invalid'
      ) {
        const { refreshToken } = await getToken()

        if (!refreshToken) {
          signOut()
          return Promise.reject(requestError)
        }

        const originalRequestConfig = requestError.config

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              onSuccess: (token: string) => {
                originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` },
                resolve(api(originalRequestConfig))
              },
              onFailure: (error: AxiosError) => {
                reject(error)
              }
            })
          })
        }

        isRefreshing = true

        return new Promise(async (resolve, reject) => {
          try {
            const { data } = await api.post('/sessions/refresh-token', { refresh_token: refreshToken })
            saveToken({ token: data.token, refreshToken: data.refresh_token })

            if(originalRequestConfig.data) {
              originalRequestConfig.data = JSON.parse(originalRequestConfig.data)
            }

            originalRequestConfig.headers = { 'Authorization': `Bearer ${data.token}` }
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

            failedQueue.forEach(request => {
              request.onSuccess(data.token)
            })

            resolve(api(originalRequestConfig))

          } catch (error) {
            failedQueue.forEach(request => {
              request.onFailure(error as AxiosError)
            })

            signOut()
            reject(error)
          } finally {
            isRefreshing = false
            failedQueue = []
          }
        })

      }

      signOut()
    }

    if (requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message))
    } else {
      return Promise.reject(requestError)
    }
  })

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }