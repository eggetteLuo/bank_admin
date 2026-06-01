import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { MessageBanner, PrimaryButton, actionButtonClass, baseInputClass, cardSurfaceClass } from '../components/ui'
import { useApiAction } from '../hooks/useApiAction'
import { bankApi } from '../api/bank'

type LoginLocationState = {
  from?: string
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { loading, message, setMessage, runAction } = useApiAction()
  const [form, setForm] = useState({
    cardNo: bankApi.getStoredCardNo(),
    password: '',
  })

  const locationState = location.state as LoginLocationState | null
  const nextPath = locationState?.from || '/'

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()

    await runAction(async () => {
      await bankApi.login({
        cardNo: form.cardNo,
        password: form.password,
      })
      setMessage({ type: 'success', text: '登录成功，正在跳转...' })
      navigate(nextPath, { replace: true })
    })
  }

  return (
    <PageShell>
      <section className="mx-auto mt-8 max-w-md">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">银行管理后台</p>
          <Link to="/" className={`${actionButtonClass} w-full sm:w-auto`}>
            返回首页
          </Link>
        </div>
        <div className={cardSurfaceClass}>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">登录</h1>
          <p className="mt-1 text-sm text-slate-500">请输入银行卡号与6位密码</p>

          <div className="mt-4">
            <MessageBanner message={message} />
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">银行卡号</span>
              <input
                required
                value={form.cardNo}
                onChange={(e) => setForm((v) => ({ ...v, cardNo: e.target.value }))}
                className={baseInputClass}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">密码（6位）</span>
              <input
                required
                minLength={6}
                maxLength={6}
                value={form.password}
                onChange={(e) => setForm((v) => ({ ...v, password: e.target.value }))}
                className={baseInputClass}
                type="password"
              />
            </label>
            <PrimaryButton type="submit" loading={loading} loadingText="登录中..." className="w-full">
              登录
            </PrimaryButton>
          </form>
        </div>
      </section>
    </PageShell>
  )
}
