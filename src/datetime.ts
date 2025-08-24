/**
 * Date and time utilities using Day.js
 */

import dayjsModule, { ConfigType, Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

// Configure dayjs with commonly used plugins
dayjsModule.extend(isBetween)
dayjsModule.extend(isSameOrAfter)
dayjsModule.extend(isSameOrBefore)
dayjsModule.extend(relativeTime)
dayjsModule.extend(utc)

// Export configured dayjs instance
export const dayjs = dayjsModule

// Utility functions
export const now = (): Dayjs => dayjs()
export const today = (): Dayjs => dayjs().startOf('day')
export const tomorrow = (): Dayjs => dayjs().add(1, 'day').startOf('day')
export const yesterday = (): Dayjs => dayjs().subtract(1, 'day').startOf('day')

/**
 * Check if a date is between two other dates
 * @param date - Date to check
 * @param start - Start date
 * @param end - End date
 * @param unit - Unit of comparison (day, month, year, etc.)
 * @param inclusivity - Inclusivity ('[]', '()', '[)', '(]')
 * @returns boolean
 */
export const isBetweenDates = (
  date: ConfigType,
  start: ConfigType,
  end: ConfigType,
  unit: dayjsModule.OpUnitType = 'day',
  inclusivity: '()' | '[]' | '[)' | '(]' = '[]'
): boolean => {
  return dayjs(date).isBetween(dayjs(start), dayjs(end), unit, inclusivity)
}

/**
 * Format a date to a human-readable relative time
 * @param date - Date to format
 * @returns Relative time (e.g., "2 hours ago")
 */
export const fromNow = (date: ConfigType): string => dayjs(date).fromNow()

/**
 * Check if a date is today
 * @param date - Date to check
 * @returns boolean
 */
export const isToday = (date: ConfigType): boolean => dayjs(date).isSame(dayjs(), 'day')

/**
 * Check if a date is in the past
 * @param date - Date to check
 * @returns boolean
 */
export const isPast = (date: ConfigType): boolean => dayjs(date).isBefore(dayjs())

/**
 * Check if a date is in the future
 * @param date - Date to check
 * @returns boolean
 */
export const isFuture = (date: ConfigType): boolean => dayjs(date).isAfter(dayjs())
