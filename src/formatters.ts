/**
 * String manipulation and formatting utilities
 */

export const capitalize = (value: unknown): string => {
  if (!value) {
    return ''
  }

  const stringValue = String(value)
  return stringValue.charAt(0).toUpperCase() + stringValue.slice(1).toLowerCase()
}

export const slugify = (text: unknown): string => {
  if (!text) {
    return ''
  }

  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export const strLimit = (value: unknown, size: number): string => {
  if (!value) {
    return ''
  }

  const stringValue = String(value)
  return stringValue.length <= size ? stringValue : `${stringValue.slice(0, size)}…`
}

export const normalizeString = (value: string | null | undefined): string | null | undefined => {
  if (!value) {
    return value
  }

  return value
    .trim()
    .toLowerCase()
    .normalize('NFC')
    .replace(/\p{Diacritic}/gu, '')
}

/**
 * Format a number with locale-specific formatting
 * @param value - The number to format
 * @param decimals - Number of decimal places
 * @param locale - Locale string (e.g., 'en-US', 'fr-FR')
 * @returns Formatted number
 */
export const numberFormat = (
  value: number,
  decimals: number = 2,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}
