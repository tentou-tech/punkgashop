/**
 * Format a number as currency with thousands separators
 * @param value - The number to format
 * @param currency - The currency symbol (default: ₫)
 * @returns Formatted string with currency symbol
 */
export const formatCurrency = (value: number | string, currency: string = 'VNĐ'): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(numValue)) return '0 ' + currency

  return numValue.toLocaleString('vi-VN') + ' ' + currency
}

/**
 * Format a number with thousands separators
 * @param value - The number to format
 * @returns Formatted string with thousands separators
 */
export const formatNumber = (value: number | string): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(numValue)) return '0'

  return numValue.toLocaleString('vi-VN')
}

/**
 * Format a number to display with K, M, B suffixes for thousands, millions, billions
 * @param value - The number to format
 * @returns Formatted string with appropriate suffix
 */
export const formatCompactNumber = (value: number | string): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(numValue)) return '0'

  if (numValue >= 1_000_000_000) {
    return (numValue / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B'
  }

  if (numValue >= 1_000_000) {
    return (numValue / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  }

  if (numValue >= 1_000) {
    return (numValue / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  }

  return numValue.toString()
}
