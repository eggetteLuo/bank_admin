import type { FormEvent } from 'react'
import { useState } from 'react'
import { FeaturePageLayout } from '../components/FeaturePageLayout'
import { PrimaryButton, baseInputClass } from '../components/ui'
import { useApiAction } from '../hooks/useApiAction'
import { bankApi } from '../api/bank'
import { formatMoney } from '../lib/format'
import type { BalanceResponse } from '../types/bank'

export function BalancePage() {
  const { loading, message, setMessage, runAction } = useApiAction()
  const [cardNo, setCardNo] = useState(bankApi.getStoredCardNo())
  const [result, setResult] = useState<BalanceResponse | null>(null)

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()

    await runAction(async () => {
      const data = await bankApi.getBalance(cardNo)
      setResult(data)
      setMessage({ type: 'success', text: '余额查询成功' })
    })
  }

  return (
    <FeaturePageLayout title="余额查询" subtitle="按卡号查询余额与状态" message={message}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
        <input
          required
          placeholder="请输入卡号"
          value={cardNo}
          onChange={(e) => setCardNo(e.target.value)}
          className={baseInputClass}
        />
        <PrimaryButton
          type="submit"
          loading={loading}
          loadingText="查询中..."
          className="w-full whitespace-nowrap sm:w-28 sm:shrink-0"
        >
          查询
        </PrimaryButton>
      </form>

      {result ? (
        <div className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-sm sm:grid-cols-3">
          <p>
            卡号：<span className="font-medium text-slate-900">{result.cardNo}</span>
          </p>
          <p>
            余额：
            <span className="font-medium text-emerald-700">￥{formatMoney(result.balance)}</span>
          </p>
          <p>
            状态：
            <span className={result.isLost ? 'text-rose-600' : 'text-emerald-700'}>
              {result.isLost ? '挂失' : '正常'}
            </span>
          </p>
        </div>
      ) : null}
    </FeaturePageLayout>
  )
}
