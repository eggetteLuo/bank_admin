import type {
  ApiMessage,
  BalanceResponse,
  LoginRequest,
  LoginResponse,
  NoTradeAccount,
  OpenAccountRequest,
  OpenAccountResponse,
  PingResponse,
  TradeRecord,
  TradeStat,
} from '../types/bank'
import { authStore } from './auth'
import { http } from './http'

type NumberLike = number | string

const toNumber = (value: NumberLike): number => Number(value)

/**
 * 银行业务 API 集中出口：页面只关心方法名，不直接拼接 URL。
 */
export const bankApi = {
  ping: async () => {
    const { data } = await http.get<PingResponse>('/ping')
    return data
  },

  openAccount: async (
    payload: Omit<OpenAccountRequest, 'openAmount' | 'depositId'> & {
      openAmount: NumberLike
      depositId: NumberLike
    },
  ) => {
    const { data } = await http.post<OpenAccountResponse>('/accounts/open', {
      ...payload,
      openAmount: toNumber(payload.openAmount),
      depositId: toNumber(payload.depositId),
    })
    return data
  },

  login: async (payload: LoginRequest) => {
    const { data } = await http.post<LoginResponse>('/auth/login', payload)
    authStore.setAuth({ token: data.token, cardNo: data.cardNo })
    return data
  },

  logout: () => authStore.clearAuth(),

  getStoredCardNo: () => authStore.getStoredCardNo(),

  isLoggedIn: () => authStore.isLoggedIn(),

  getBalance: async (cardNo: string) => {
    const { data } = await http.get<BalanceResponse>('/accounts/balance', {
      params: { cardNo },
    })
    return data
  },

  deposit: async (payload: { cardNo: string; amount: NumberLike; remark: string }) => {
    const { data } = await http.post<ApiMessage & { tradeId: number }>('/trade/deposit', {
      ...payload,
      amount: toNumber(payload.amount),
    })
    return data
  },

  withdraw: async (payload: { cardNo: string; amount: NumberLike; remark: string }) => {
    const { data } = await http.post<ApiMessage & { tradeId: number }>('/trade/withdraw', {
      ...payload,
      amount: toNumber(payload.amount),
    })
    return data
  },

  transfer: async (payload: {
    fromCardNo: string
    toCardNo: string
    amount: NumberLike
    remark: string
  }) => {
    const { data } = await http.post<ApiMessage>('/trade/transfer', {
      ...payload,
      amount: toNumber(payload.amount),
    })
    return data
  },

  getRecords: async (params: { cardNo: string; page: string; size: string }) => {
    const { data } = await http.get<TradeRecord[]>('/trade/records', { params })
    return data
  },

  getStatement: async (params: { cardNo: string; start: string; end: string }) => {
    const { data } = await http.get<TradeRecord[]>('/trade/statement', { params })
    return data
  },

  getTradeStats: async (params: { start: string; end: string }) => {
    const { data } = await http.get<TradeStat[]>('/stats/trade', { params })
    return data
  },

  getNoTradeAccounts: async () => {
    const { data } = await http.get<NoTradeAccount[]>('/stats/no-trade-accounts')
    return data
  },
}
