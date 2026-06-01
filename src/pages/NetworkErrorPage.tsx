import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { actionButtonClass, cardSurfaceClass } from '../components/ui'

/**
 * 网络异常页：由 NetworkGuard 在后端不可达时自动跳转到这里。
 */
export function NetworkErrorPage() {
  return (
    <PageShell>
      <section className={`mx-auto max-w-lg text-center ${cardSurfaceClass}`}>
        <p className="text-sm font-medium text-rose-600">网络异常</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">无法连接到后端服务</h1>
        <p className="mt-3 text-sm text-slate-600">
          请确认本地 8080 端口后端已启动。网络恢复后会自动返回首页。
        </p>
        <Link to="/" className={`mt-6 ${actionButtonClass}`}>
          返回首页
        </Link>
      </section>
    </PageShell>
  )
}
