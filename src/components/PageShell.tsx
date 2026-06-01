import type { ReactNode } from 'react'

/**
 * 页面统一外壳：保证所有业务页风格一致，移动端和桌面端都有良好留白。
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(99,102,241,0.14),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.1),transparent_28%)]" />
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}
