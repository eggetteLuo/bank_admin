import type { FormEvent } from 'react'
import { useState } from 'react'
import { FeaturePageLayout } from '../components/FeaturePageLayout'
import {
  Field,
  PrimaryButton,
  baseInputClass,
  tableCellClass,
  tableEmptyCellClass,
  tableHeadClass,
  tableHeaderCellClass,
  tableRowClass,
  tableWrapperClass,
} from '../components/ui'
import { useApiAction } from '../hooks/useApiAction'
import { bankApi } from '../api/bank'
import { formatMoney, toLocalIsoWithOffset } from '../lib/format'
import type { TradeRecord } from '../types/bank'

export function StatementPage() {
  const { loading, message, setMessage, runAction } = useApiAction()
  const [query, setQuery] = useState({
    cardNo: bankApi.getStoredCardNo(),
    start: '',
    end: '',
  })
  const [records, setRecords] = useState<TradeRecord[]>([])

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()

    await runAction(async () => {
      const data = await bankApi.getStatement({
        cardNo: query.cardNo,
        start: toLocalIsoWithOffset(query.start),
        end: toLocalIsoWithOffset(query.end),
      })
      setRecords(data)
      setMessage({ type: 'success', text: `已获取 ${data.length} 条对账记录` })
      setQuery((value) => ({
        ...value,
        start: '',
        end: '',
      }))
    })
  }

  return (
    <FeaturePageLayout title="对账单查询" subtitle="按卡号和时间区间查询交易明细" message={message}>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-4">
        <Field label="卡号">
          <input
            required
            value={query.cardNo}
            onChange={(e) => setQuery((v) => ({ ...v, cardNo: e.target.value }))}
            className={baseInputClass}
          />
        </Field>
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
            loadingText="查询中..."
            className="w-full"
          >
            查询对账单
          </PrimaryButton>
        </div>
      </form>

      <div className={tableWrapperClass}>
        <table className="min-w-[700px] w-full text-left text-sm">
          <thead className={tableHeadClass}>
            <tr>
              <th className={tableHeaderCellClass}>流水号</th>
              <th className={tableHeaderCellClass}>时间</th>
              <th className={tableHeaderCellClass}>类型</th>
              <th className={tableHeaderCellClass}>金额</th>
              <th className={tableHeaderCellClass}>备注</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item) => (
              <tr key={`${item.tradeId}-${item.tradeTime}`} className={tableRowClass}>
                <td className={tableCellClass}>{item.tradeId}</td>
                <td className={tableCellClass}>{item.tradeTime}</td>
                <td className={tableCellClass}>{item.tradeType}</td>
                <td className={tableCellClass}>￥{formatMoney(item.amount)}</td>
                <td className={tableCellClass}>{item.remark || '-'}</td>
              </tr>
            ))}
            {records.length === 0 ? (
              <tr>
                <td className={tableEmptyCellClass} colSpan={5}>
                  暂无数据
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </FeaturePageLayout>
  )
}
