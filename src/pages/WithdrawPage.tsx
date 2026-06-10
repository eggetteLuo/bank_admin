import type { FormEvent } from 'react'
import { useState } from 'react'
import { FeaturePageLayout } from '../components/FeaturePageLayout'
import { Field, PrimaryButton, baseInputClass } from '../components/ui'
import { useApiAction } from '../hooks/useApiAction'
import { bankApi } from '../api/bank'

export function WithdrawPage() {
  const { loading, message, setMessage, runAction } = useApiAction()
  const [form, setForm] = useState({
    cardNo: bankApi.getStoredCardNo(),
    amount: '',
    remark: 'ATM取款',
  })

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()

    await runAction(async () => {
      const data = await bankApi.withdraw({
        cardNo: form.cardNo,
        amount: form.amount,
        remark: form.remark,
      })
      setMessage({ type: 'success', text: `${data.message}（流水号：${data.tradeId}）` })
      setForm((value) => ({
        ...value,
        amount: '',
        remark: '',
      }))
    })
  }

  return (
    <FeaturePageLayout title="取款" subtitle="从指定银行卡扣减余额" message={message}>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <Field label="卡号">
          <input
            required
            value={form.cardNo}
            onChange={(e) => setForm((v) => ({ ...v, cardNo: e.target.value }))}
            className={baseInputClass}
          />
        </Field>
        <Field label="金额">
          <input
            required
            type="number"
            min={0.01}
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm((v) => ({ ...v, amount: e.target.value }))}
            className={baseInputClass}
          />
        </Field>
        <Field label="备注">
          <input
            value={form.remark}
            onChange={(e) => setForm((v) => ({ ...v, remark: e.target.value }))}
            className={baseInputClass}
          />
        </Field>
        <div className="md:col-span-2">
          <PrimaryButton type="submit" loading={loading} loadingText="提交中..." className="w-full sm:w-auto">
            提交取款
          </PrimaryButton>
        </div>
      </form>
    </FeaturePageLayout>
  )
}
