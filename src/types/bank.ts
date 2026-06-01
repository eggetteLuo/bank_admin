export type ApiMessage = {
  message: string
}

export type OpenAccountRequest = {
  userName: string
  idCard: string
  phone: string
  address: string
  openAmount: number
  withdrawPassword: string
  depositId: number
}

export type OpenAccountResponse = {
  userId: number
  cardNo: string
}

export type BalanceResponse = {
  cardNo: string
  balance: number
  isLost: boolean
}

export type TradeRecord = {
  tradeId: number
  tradeTime: string
  tradeType: string
  cardNo: string
  amount: number
  remark?: string
}

export type TradeStat = {
  type: string
  count: number
  totalAmount: number
}

export type NoTradeAccount = {
  cardNo: string
  userName: string
  phone: string
  balance: number
}

export type PingResponse = {
  status: string
}

export type LoginRequest = {
  cardNo: string
  password: string
}

export type LoginResponse = {
  token: string
  userId: number
  cardNo: string
}
