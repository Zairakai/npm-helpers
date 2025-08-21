/**
 * Date and time utilities using Day.js
 */

import dayjsModule from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import relativeTime from 'dayjs/plugin/relativeTime'

// Configure dayjs with commonly used plugins
dayjsModule.extend(isBetween)
dayjsModule.extend(isSameOrAfter)
dayjsModule.extend(isSameOrBefore)
dayjsModule.extend(relativeTime)

// Export configured dayjs instance
export const dayjs = dayjsModule

// Utility functions
export const now = () => dayjs()
export const today = () => dayjs().startOf('day')
export const tomorrow = () => dayjs().add(1, 'day').startOf('day')
export const yesterday = () => dayjs().subtract(1, 'day').startOf('day')

/**
 * Check if a date is between two other dates
 * @param {string|Date|dayjs} date - Date to check
 * @param {string|Date|dayjs} start - Start date
 * @param {string|Date|dayjs} end - End date
 * @param {string} unit - Unit of comparison (day, month, year, etc.)
 * @param {string} inclusivity - Inclusivity ('[]', '()', '[)', '(]')
 * @returns {boolean}
 */
export const isBetweenDates = (date, start, end, unit = 'day', inclusivity = '[]') => {
    return dayjs(date).isBetween(dayjs(start), dayjs(end), unit, inclusivity)
}

/**
 * Format a date to a human-readable relative time
 * @param {string|Date|dayjs} date - Date to format
 * @returns {string} Relative time (e.g., "2 hours ago")
 */
export const fromNow = date => dayjs(date).fromNow()

/**
 * Check if a date is today
 * @param {string|Date|dayjs} date - Date to check
 * @returns {boolean}
 */
export const isToday = date => dayjs(date).isSame(dayjs(), 'day')

/**
 * Check if a date is in the past
 * @param {string|Date|dayjs} date - Date to check
 * @returns {boolean}
 */
export const isPast = date => dayjs(date).isBefore(dayjs())

/**
 * Check if a date is in the future
 * @param {string|Date|dayjs} date - Date to check
 * @returns {boolean}
 */
export const isFuture = date => dayjs(date).isAfter(dayjs())