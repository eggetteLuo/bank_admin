import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'

/**
 * 受保护路由守卫：未登录时跳转登录页，并记录来源页面。
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation()
  const isLoggedIn = useAuthStatus()

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <>{children}</>
}
