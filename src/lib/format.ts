/**
 * 将金额统一格式化为人民币展示格式。
 */
export function formatMoney(value: number): string {
  return Number(value).toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/**
 * 将 datetime-local 转为带时区偏移的 ISO 字符串，
 * 以匹配后端文档中 start/end 的格式要求。
 */
export function toLocalIsoWithOffset(input: string): string {
  if (!input) return ''

  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return input

  const pad = (n: number): string => n.toString().padStart(2, '0')
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hour = pad(date.getHours())
  const minute = pad(date.getMinutes())
  const second = pad(date.getSeconds())

  const offsetMinutes = -date.getTimezoneOffset()
  const sign = offsetMinutes >= 0 ? '+' : '-'
  const offsetHour = pad(Math.floor(Math.abs(offsetMinutes) / 60))
  const offsetMinute = pad(Math.abs(offsetMinutes) % 60)

  return `${year}-${month}-${day}T${hour}:${minute}:${second}${sign}${offsetHour}:${offsetMinute}`
}
