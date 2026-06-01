import type { FormEvent } from 'react'
import { useState } from 'react'
import { FeaturePageLayout } from '../components/FeaturePageLayout'
import { Field, PrimaryButton, baseInputClass } from '../components/ui'
import { useApiAction } from '../hooks/useApiAction'
import { bankApi } from '../api/bank'
import type { OpenAccountResponse } from '../types/bank'

export function OpenAccountPage() {
  const { loading, message, setMessage, runAction } = useApiAction()
  const [form, setForm] = useState({
    userName: '',
    idCard: '',
    phone: '',
    address: '',
    openAmount: '1000',
    withdrawPassword: '',
    depositId: '1',
  })
  const [result, setResult] = useState<OpenAccountResponse | null>(null)

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()

    await runAction(async () => {
      const data = await bankApi.openAccount({
        userName: form.userName,
        idCard: form.idCard,
        phone: form.phone,
        address: form.address,
        openAmount: form.openAmount,
        withdrawPassword: form.withdrawPassword,
        depositId: form.depositId,
      })
      setResult(data)
      setMessage({ type: 'success', text: `开户成功，卡号：${data.cardNo}` })
    })
  }

  return (
    <FeaturePageLayout
      title="开户"
      subtitle="创建新的银行卡账户"
      message={message}
    >
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <Field label="姓名">
          <input
            required
            value={form.userName}
            onChange={(e) => setForm((v) => ({ ...v, userName: e.target.value }))}
            className={baseInputClass}
          />
        </Field>
        <Field label="身份证号">
          <input
            required
            value={form.idCard}
            onChange={(e) => setForm((v) => ({ ...v, idCard: e.target.value }))}
            className={baseInputClass}
          />
        </Field>
        <Field label="手机号">
          <input
            required
            value={form.phone}
            onChange={(e) => setForm((v) => ({ ...v, phone: e.target.value }))}
            className={baseInputClass}
          />
        </Field>
        <Field label="开户地址">
          <input
            required
            value={form.address}
            onChange={(e) => setForm((v) => ({ ...v, address: e.target.value }))}
            className={baseInputClass}
          />
        </Field>
        <Field label="开户金额">
          <input
            required
            min={1}
            type="number"
            value={form.openAmount}
            onChange={(e) => setForm((v) => ({ ...v, openAmount: e.target.value }))}
            className={baseInputClass}
          />
        </Field>
        <Field label="取款密码（6位）">
          <input
            required
            minLength={6}
            maxLength={6}
            value={form.withdrawPassword}
            onChange={(e) => setForm((v) => ({ ...v, withdrawPassword: e.target.value }))}
            className={baseInputClass}
          />
        </Field>
        <Field label="网点ID">
          <input
            required
            min={1}
            type="number"
            value={form.depositId}
            onChange={(e) => setForm((v) => ({ ...v, depositId: e.target.value }))}
            className={baseInputClass}
          />
        </Field>
        <div className="md:col-span-2">
          <PrimaryButton type="submit" loading={loading} loadingText="提交中..." className="w-full sm:w-auto">
            提交开户
          </PrimaryButton>
        </div>
      </form>

      {result ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 text-sm text-emerald-800">
          <p>
            用户ID：<span className="font-semibold">{result.userId}</span>
          </p>
          <p className="mt-1">
            卡号：<span className="font-semibold">{result.cardNo}</span>
          </p>
        </div>
      ) : null}
    </FeaturePageLayout>
  )
}
