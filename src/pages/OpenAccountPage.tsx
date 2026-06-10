import type { FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { FeaturePageLayout } from '../components/FeaturePageLayout'
import { Field, PrimaryButton, baseInputClass } from '../components/ui'
import { useApiAction } from '../hooks/useApiAction'
import { bankApi } from '../api/bank'
import { addressOptions } from '../lib/addressOptions'
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
  const [isAddressPickerOpen, setIsAddressPickerOpen] = useState(false)
  const [selectedProvinceName, setSelectedProvinceName] = useState(addressOptions[0].name)
  const [selectedCityName, setSelectedCityName] = useState(addressOptions[0].cities[0].name)
  const addressPickerRef = useRef<HTMLDivElement | null>(null)

  const selectedProvince =
    addressOptions.find((province) => province.name === selectedProvinceName) ?? addressOptions[0]
  const selectedCity =
    selectedProvince.cities.find((city) => city.name === selectedCityName) ?? selectedProvince.cities[0]

  useEffect(() => {
    if (!isAddressPickerOpen) return undefined

    const closeOnOutsideClick = (event: MouseEvent): void => {
      if (!addressPickerRef.current?.contains(event.target as Node)) {
        setIsAddressPickerOpen(false)
      }
    }

    window.addEventListener('mousedown', closeOnOutsideClick)
    return () => window.removeEventListener('mousedown', closeOnOutsideClick)
  }, [isAddressPickerOpen])

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()

    if (!form.address.trim()) {
      setMessage({ type: 'error', text: '请选择开户地址' })
      return
    }

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
      setForm({
        userName: '',
        idCard: '',
        phone: '',
        address: '',
        openAmount: '',
        withdrawPassword: '',
        depositId: '',
      })
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
        <div className="relative flex flex-col gap-2" ref={addressPickerRef}>
          <span className="text-sm font-medium text-slate-700">开户地址</span>
          <button
            type="button"
            onClick={() => setIsAddressPickerOpen((value) => !value)}
            className={`${baseInputClass} flex items-center justify-between text-left ${
              form.address ? '' : 'text-slate-400'
            }`}
          >
            <span>{form.address || '请选择省 / 市 / 区'}</span>
            <span className="ml-3 text-slate-400">展开</span>
          </button>
          {isAddressPickerOpen ? (
            <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-96 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl ring-1 ring-slate-900/5">
              <div className="grid max-h-96 min-h-0 grid-cols-3 divide-x divide-slate-100 text-sm">
                <div className="max-h-96 min-h-0 overflow-y-auto overscroll-contain p-2">
                  {addressOptions.map((province) => (
                    <button
                      type="button"
                      key={province.name}
                      onClick={() => {
                        setSelectedProvinceName(province.name)
                        setSelectedCityName(province.cities[0].name)
                      }}
                      className={`block w-full rounded-xl px-3 py-2 text-left transition ${
                        province.name === selectedProvince.name
                          ? 'bg-indigo-50 font-medium text-indigo-700'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {province.name}
                    </button>
                  ))}
                </div>
                <div className="max-h-96 min-h-0 overflow-y-auto overscroll-contain p-2">
                  {selectedProvince.cities.map((city) => (
                    <button
                      type="button"
                      key={city.name}
                      onClick={() => setSelectedCityName(city.name)}
                      className={`block w-full rounded-xl px-3 py-2 text-left transition ${
                        city.name === selectedCity.name
                          ? 'bg-indigo-50 font-medium text-indigo-700'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
                <div className="max-h-96 min-h-0 overflow-y-auto overscroll-contain p-2">
                  {selectedCity.districts.map((district) => (
                    <button
                      type="button"
                      key={district}
                      onClick={() => {
                        setForm((value) => ({
                          ...value,
                          address: `${selectedProvince.name} ${selectedCity.name} ${district}`,
                        }))
                        setIsAddressPickerOpen(false)
                      }}
                      className="block w-full rounded-xl px-3 py-2 text-left text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      {district}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
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
