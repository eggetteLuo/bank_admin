const TOKEN_KEY = 'bank_auth_token'
const CARD_NO_KEY = 'bank_login_card_no'

export const AUTH_CHANGED_EVENT = 'bank-auth-changed'

/**
 * 统一管理登录态，页面只需要订阅 AUTH_CHANGED_EVENT 即可同步 UI。
 */
export const authStore = {
  getToken: (): string | null => window.localStorage.getItem(TOKEN_KEY),

  getStoredCardNo: (): string => window.localStorage.getItem(CARD_NO_KEY) ?? '',

  isLoggedIn: (): boolean => Boolean(window.localStorage.getItem(TOKEN_KEY)),

  setAuth: (params: { token: string; cardNo: string }) => {
    window.localStorage.setItem(TOKEN_KEY, params.token)
    window.localStorage.setItem(CARD_NO_KEY, params.cardNo)
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT))
  },

  clearAuth: () => {
    window.localStorage.removeItem(TOKEN_KEY)
    window.localStorage.removeItem(CARD_NO_KEY)
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT))
  },
}
