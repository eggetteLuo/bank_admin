import { useState } from 'react'
import { FeaturePageLayout } from '../components/FeaturePageLayout'
import {
  PrimaryButton,
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
import type { NoTradeAccount } from '../types/bank'

export function NoTradePage() {
  const { loading, message, setMessage, runAction } = useApiAction()
  const [accounts, setAccounts] = useState<NoTradeAccount[]>([])

  const handleQuery = async (): Promise<void> => {
    await runAction(async () => {
      const data = await bankApi.getNoTradeAccounts()
      setAccounts(data)
      setMessage({ type: 'success', text: `找到 ${data.length} 个未发生交易账户` })
    })
  }

  return (
    <FeaturePageLayout
      title="未发生交易账户"
      subtitle="查询从未发生交易的账户列表"
      message={message}
    >
      <PrimaryButton
        type="button"
        onClick={handleQuery}
        loading={loading}
        loadingText="查询中..."
        className="w-full sm:w-auto"
      >
        查询账户
      </PrimaryButton>

      <div className={tableWrapperClass}>
        <table className="min-w-[640px] w-full text-left text-sm">
          <thead className={tableHeadClass}>
            <tr>
              <th className={tableHeaderCellClass}>卡号</th>
              <th className={tableHeaderCellClass}>姓名</th>
              <th className={tableHeaderCellClass}>手机号</th>
              <th className={tableHeaderCellClass}>余额</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((item) => (
              <tr key={item.cardNo} className={tableRowClass}>
                <td className={tableCellClass}>{item.cardNo}</td>
                <td className={tableCellClass}>{item.userName}</td>
                <td className={tableCellClass}>{item.phone}</td>
                <td className={tableCellClass}>￥{formatMoney(item.balance)}</td>
              </tr>
            ))}
            {accounts.length === 0 ? (
              <tr>
                <td className={tableEmptyCellClass} colSpan={4}>
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
