import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { bankApi } from '../api/bank'
import { featureEntries } from '../lib/features'
import { useAuthStatus } from '../hooks/useAuthStatus'
import { actionButtonClass, cardSurfaceClass } from '../components/ui'

/**
 * 首页：仅保留功能入口，不展示后端地址与标题信息。
 */
export function HomePage() {
  const navigate = useNavigate()
  const isLoggedIn = useAuthStatus()

  const visibleEntries = useMemo(
    () =>
      featureEntries.filter(
        (entry) => (isLoggedIn || !entry.requiresAuth) && (!entry.guestOnly || !isLoggedIn),
      ),
    [isLoggedIn],
  )

  return (
    <PageShell>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">银行管理后台</p>
        {isLoggedIn ? (
          <button
            type="button"
            onClick={() => {
              bankApi.logout()
              navigate('/')
            }}
            className={`${actionButtonClass} w-full sm:w-auto`}
          >
            退出
          </button>
        ) : (
          <Link
            to="/login"
            className={`${actionButtonClass} w-full sm:w-auto`}
          >
            登录
          </Link>
        )}
      </div>
      <section className={cardSurfaceClass}>
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">功能入口</h1>
          <p className="mt-1 text-sm text-slate-500">
            {isLoggedIn ? '已登录，可使用全部功能。' : '未登录，仅显示公开功能。'}
          </p>
        </div>

        {!isLoggedIn ? (
          <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            存款、取款、转账、余额、流水、对账单等功能需要登录后才可使用。
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleEntries.map((entry) => (
            <Link
              key={entry.path}
              to={entry.path}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-900/5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">业务功能</p>
              <h2 className="mt-2 text-base font-semibold text-slate-900 group-hover:text-indigo-700">{entry.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{entry.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
