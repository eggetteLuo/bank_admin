import type { ReactNode } from 'react'

export const baseInputClass =
  'block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'

export const actionButtonClass =
  'inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 sm:px-3.5'

export const cardSurfaceClass =
  'rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-sm ring-1 ring-slate-900/5 backdrop-blur sm:p-6'

export const tableWrapperClass = 'mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5'
export const tableHeadClass = 'bg-slate-50/80 text-slate-600'
export const tableHeaderCellClass = 'px-4 py-3 text-xs font-semibold uppercase tracking-wide'
export const tableRowClass = 'border-t border-slate-100 hover:bg-slate-50/80'
export const tableCellClass = 'px-4 py-3 text-sm text-slate-700'
export const tableEmptyCellClass = 'px-4 py-8 text-center text-sm text-slate-400'

export type MessageState = {
  type: 'success' | 'error'
  text: string
}

export function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  )
}

export function PrimaryButton({
  children,
  loading,
  loadingText,
  className,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  loadingText?: string
}) {
  const isDisabled = Boolean(disabled || loading)

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-60 ${className ?? ''}`}
    >
      {loading ? loadingText ?? '处理中...' : children}
    </button>
  )
}

export function MessageBanner({ message }: { message: MessageState | null }) {
  if (!message) return null

  return (
    <p
      className={`rounded-xl border px-3 py-2.5 text-sm ${
        message.type === 'success'
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-rose-200 bg-rose-50 text-rose-700'
      }`}
    >
      {message.text}
    </p>
  )
}
