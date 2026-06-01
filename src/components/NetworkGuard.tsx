import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { bankApi } from '../api/bank'

const NETWORK_ERROR_PATH = '/network-error'
const CHECK_INTERVAL_MS = 5000

/**
 * 全局网络守卫：后台轮询后端连通性。
 * 1) 连通失败：自动跳转到网络异常页。
 * 2) 网络恢复且停留在异常页：自动返回首页。
 */
export function NetworkGuard() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let disposed = false

    const check = async (): Promise<void> => {
      try {
        const result = await bankApi.ping()

        if (disposed) return

        if (result.status === 'ok' && location.pathname === NETWORK_ERROR_PATH) {
          navigate('/', { replace: true })
        }
      } catch {
        if (disposed) return

        if (location.pathname !== NETWORK_ERROR_PATH) {
          navigate(NETWORK_ERROR_PATH, { replace: true })
        }
      }
    }

    void check()

    const timerId = window.setInterval(() => {
      void check()
    }, CHECK_INTERVAL_MS)

    return () => {
      disposed = true
      window.clearInterval(timerId)
    }
  }, [location.pathname, navigate])

  return null
}
