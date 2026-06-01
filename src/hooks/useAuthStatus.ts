import { useEffect, useState } from 'react'
import { AUTH_CHANGED_EVENT } from '../api/auth'
import { bankApi } from '../api/bank'

/**
 * 统一登录态订阅，避免页面重复绑定/解绑 AUTH_CHANGED_EVENT。
 */
export function useAuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(bankApi.isLoggedIn())

  useEffect(() => {
    const sync = () => setIsLoggedIn(bankApi.isLoggedIn())
    window.addEventListener(AUTH_CHANGED_EVENT, sync)
    return () => window.removeEventListener(AUTH_CHANGED_EVENT, sync)
  }, [])

  return isLoggedIn
}
