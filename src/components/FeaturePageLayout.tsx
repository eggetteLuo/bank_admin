import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { bankApi } from '../api/bank'
import { MessageBanner } from './ui'
import type { MessageState } from './ui'
import { actionButtonClass, cardSurfaceClass } from './ui'
import { PageShell } from './PageShell'
import { useAuthStatus } from '../hooks/useAuthStatus'

/**
 * 业务页统一布局：顶部操作区 + 卡片主体 + 消息提示。
 */
export function FeaturePageLayout({
  title,
  subtitle,
  message,
  children,
}: {
  title: string
  subtitle: string
  message: MessageState | null
  children: ReactNode
}) {
  const navigate = useNavigate()
  const isLoggedIn = useAuthStatus()

  return (
    <PageShell>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">银行管理后台</p>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Link to="/" className={`${actionButtonClass} flex-1 sm:flex-none`}>
            返回首页
          </Link>
          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => {
                bankApi.logout()
                navigate('/')
              }}
              className={`${actionButtonClass} flex-1 sm:flex-none`}
            >
              退出
            </button>
          ) : (
            <Link to="/login" className={`${actionButtonClass} flex-1 sm:flex-none`}>
              登录
            </Link>
          )}
        </div>
      </div>
      <section className={cardSurfaceClass}>
        <header className="mb-5 border-b border-slate-100 pb-4">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </header>
        <div className="mb-4">
          <MessageBanner message={message} />
        </div>
        {children}
      </section>
    </PageShell>
  )
}
