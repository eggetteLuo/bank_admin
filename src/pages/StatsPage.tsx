import type { FormEvent } from 'react'
import { useState } from 'react'
import { FeaturePageLayout } from '../components/FeaturePageLayout'
import { Field, PrimaryButton, baseInputClass } from '../components/ui'
import { useApiAction } from '../hooks/useApiAction'
import { bankApi } from '../api/bank'
import { formatMoney, toLocalIsoWithOffset } from '../lib/format'
import type { TradeStat } from '../types/bank'

export function StatsPage() {
  const { loading, message, setMessage, runAction } = useApiAction()
  const [query, setQuery] = useState({
    start: '',
    end: '',
  })
  const [stats, setStats] = useState<TradeStat[]>([])

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()

    await runAction(async () => {
      const data = await bankApi.getTradeStats({
        start: toLocalIsoWithOffset(query.start),
        end: toLocalIsoWithOffset(query.end),
      })
      setStats(data)
      setMessage({ type: 'success', text: '统计查询成功' })
      setQuery({
        start: '',
        end: '',
      })
    })
  }

  return (
    <FeaturePageLayout title="交易统计" subtitle="统计时间区间内存入和支取情况" message={message}>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
        <Field label="开始时间">
          <input
            required
            type="datetime-local"
            value={query.start}
            onChange={(e) => setQuery((v) => ({ ...v, start: e.target.value }))}
            className={baseInputClass}
          />
        </Field>
        <Field label="结束时间">
          <input
            required
            type="datetime-local"
            value={query.end}
            onChange={(e) => setQuery((v) => ({ ...v, end: e.target.value }))}
            className={baseInputClass}
          />
        </Field>
        <div className="self-end">
          <PrimaryButton
            type="submit"
            loading={loading}
            loadingText="统计中..."
            className="w-full"
          >
            开始统计
          </PrimaryButton>
        </div>
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {stats.map((item) => (
          <article
            key={item.type}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-900/5"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">{item.type}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{item.count} 笔</p>
            <p className="mt-2 text-sm text-slate-600">
              总金额：<span className="font-medium">￥{formatMoney(item.totalAmount)}</span>
            </p>
          </article>
        ))}
        {stats.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-400">
            暂无统计数据
          </p>
        ) : null}
      </div>
    </FeaturePageLayout>
  )
}
