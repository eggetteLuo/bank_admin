import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { authStore } from './auth'

export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api'

/**
 * 项目统一 axios 实例：集中处理 baseURL、Authorization 和错误消息。
 */
export const http = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

const PUBLIC_PATH_PATTERNS = [
  /^\/ping$/,
  /^\/accounts\/open$/,
  /^\/auth\/login$/,
  /^\/stats\/trade$/,
  /^\/stats\/no-trade-accounts$/,
]

function isPublicPath(url?: string): boolean {
  if (!url) return false
  return PUBLIC_PATH_PATTERNS.some((pattern) => pattern.test(url))
}

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // 公开接口不带 Authorization，避免后端对无效 token 进行拦截报错。
  if (isPublicPath(config.url)) {
    return config
  }

  const token = authStore.getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string } | string>) => {
    if (error.response?.status === 401) {
      authStore.clearAuth()
    }

    const data = error.response?.data
    if (typeof data === 'string' && data) {
      return Promise.reject(new Error(data))
    }

    if (data && typeof data === 'object' && data.message) {
      return Promise.reject(new Error(data.message))
    }

    if (data && typeof data === 'object' && 'error' in data) {
      const fallbackError = data.error
      if (typeof fallbackError === 'string' && fallbackError) {
        return Promise.reject(new Error(fallbackError))
      }
    }

    return Promise.reject(new Error(error.message || '请求失败'))
  },
)
