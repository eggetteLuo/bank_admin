type FeatureEntry = {
  path: string
  title: string
  description: string
  requiresAuth: boolean
  guestOnly?: boolean
}

export const featureEntries: readonly FeatureEntry[] = [
  {
    path: '/open-account',
    title: '开户',
    description: '创建新账户并生成银行卡号',
    requiresAuth: false,
    guestOnly: true,
  },
  {
    path: '/deposit',
    title: '存款',
    description: '向指定卡号增加余额',
    requiresAuth: true,
  },
  {
    path: '/withdraw',
    title: '取款',
    description: '从账户中扣减余额',
    requiresAuth: true,
  },
  {
    path: '/transfer',
    title: '转账',
    description: '在账户间进行转账交易',
    requiresAuth: true,
  },
  {
    path: '/balance',
    title: '余额查询',
    description: '按卡号查看余额与账户状态',
    requiresAuth: true,
  },
  {
    path: '/records',
    title: '流水分页查询',
    description: '按页码/每页条数查看交易流水',
    requiresAuth: true,
  },
  {
    path: '/statement',
    title: '对账单查询',
    description: '按时间区间查询交易明细',
    requiresAuth: true,
  },
  {
    path: '/stats',
    title: '交易统计',
    description: '统计存入/支取笔数与金额',
    requiresAuth: false,
  },
  {
    path: '/no-trade',
    title: '无交易账户',
    description: '查看未发生交易的账户列表',
    requiresAuth: false,
  },
]
