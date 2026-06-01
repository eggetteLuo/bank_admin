import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'

/**
 * 游客路由守卫：已登录用户不应访问游客页面（如登录/开户）。
 */
export function RequireGuest({ children }: { children: ReactNode }) {
  const isLoggedIn = useAuthStatus()

  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
