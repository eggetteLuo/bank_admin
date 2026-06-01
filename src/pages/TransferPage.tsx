import type { FormEvent } from 'react'
import { useState } from 'react'
import { FeaturePageLayout } from '../components/FeaturePageLayout'
import { Field, PrimaryButton, baseInputClass } from '../components/ui'
import { useApiAction } from '../hooks/useApiAction'
import { bankApi } from '../api/bank'

export function TransferPage() {
  const { loading, message, setMessage, runAction } = useApiAction()
  const [form, setForm] = useState({
    fromCardNo: bankApi.getStoredCardNo(),
    toCardNo: '',
    amount: '',
    remark: '转账业务',
  })

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()

    await runAction(async () => {
      const data = await bankApi.transfer({
        fromCardNo: form.fromCardNo,
        toCardNo: form.toCardNo,
        amount: form.amount,
        remark: form.remark,
      })
      setMessage({ type: 'success', text: data.message })
    })
  }

  return (
    <FeaturePageLayout title="转账" subtitle="在两个账户间进行资金转移" message={message}>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <Field label="转出卡号">
          <input
            required
            value={form.fromCardNo}
            onChange={(e) => setForm((v) => ({ ...v, fromCardNo: e.target.value }))}
            className={baseInputClass}
          />
        </Field>
        <Field label="转入卡号">
          <input
            required
            value={form.toCardNo}
            onChange={(e) => setForm((v) => ({ ...v, toCardNo: e.target.value }))}
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
            提交转账
          </PrimaryButton>
        </div>
      </form>
    </FeaturePageLayout>
  )
}
