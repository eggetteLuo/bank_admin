import { useState } from 'react'
import type { MessageState } from '../components/ui'

/**
 * 统一封装接口调用状态，避免每个页面重复写 loading/message 逻辑。
 */
export function useApiAction() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<MessageState | null>(null)

  const onError = (error: unknown): void => {
    setMessage({
      type: 'error',
      text: error instanceof Error ? error.message : '发生未知错误',
    })
  }

  const runAction = async (action: () => Promise<void>): Promise<void> => {
    setLoading(true)
    setMessage(null)
    try {
      await action()
    } catch (error) {
      onError(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    message,
    setMessage,
    runAction,
  }
}
