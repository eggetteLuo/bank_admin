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
import { formatMoney } from '../lib/format'
import type { TradeRecord } from '../types/bank'

export function RecordsPage() {
  const { loading, message, setMessage, runAction } = useApiAction()
  const [query, setQuery] = useState({
    cardNo: bankApi.getStoredCardNo(),
    page: '1',
    size: '10',
  })
  const [records, setRecords] = useState<TradeRecord[]>([])

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()

    await runAction(async () => {
      const data = await bankApi.getRecords(query)
      setRecords(data)
      setMessage({ type: 'success', text: `已获取 ${data.length} 条流水` })
    })
  }

  return (
    <FeaturePageLayout title="流水分页查询" subtitle="按页码和每页条数查询流水" message={message}>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-4">
        <Field label="卡号">
          <input
            required
            value={query.cardNo}
            onChange={(e) => setQuery((v) => ({ ...v, cardNo: e.target.value }))}
            className={baseInputClass}
          />
        </Field>
        <Field label="页码">
          <input
            required
            min={1}
            type="number"
            value={query.page}
            onChange={(e) => setQuery((v) => ({ ...v, page: e.target.value }))}
            className={baseInputClass}
          />
        </Field>
        <Field label="每页条数（<=100）">
          <input
            required
            min={1}
            max={100}
            type="number"
            value={query.size}
            onChange={(e) => setQuery((v) => ({ ...v, size: e.target.value }))}
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
            查询流水
          </PrimaryButton>
        </div>
      </form>

      <div className={tableWrapperClass}>
        <table className="min-w-[760px] w-full text-left text-sm">
          <thead className={tableHeadClass}>
            <tr>
              <th className={tableHeaderCellClass}>流水号</th>
              <th className={tableHeaderCellClass}>时间</th>
              <th className={tableHeaderCellClass}>类型</th>
              <th className={tableHeaderCellClass}>卡号</th>
              <th className={tableHeaderCellClass}>金额</th>
              <th className={tableHeaderCellClass}>备注</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item) => (
              <tr key={item.tradeId} className={tableRowClass}>
                <td className={tableCellClass}>{item.tradeId}</td>
                <td className={tableCellClass}>{item.tradeTime}</td>
                <td className={tableCellClass}>{item.tradeType}</td>
                <td className={tableCellClass}>{item.cardNo}</td>
                <td className={tableCellClass}>￥{formatMoney(item.amount)}</td>
                <td className={tableCellClass}>{item.remark || '-'}</td>
              </tr>
            ))}
            {records.length === 0 ? (
              <tr>
                <td className={tableEmptyCellClass} colSpan={6}>
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
