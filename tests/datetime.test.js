import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  dayjs,
  now,
  today,
  tomorrow,
  yesterday,
  isBetweenDates,
  fromNow,
  isToday,
  isPast,
  isFuture,
} from '../src/datetime.ts'

describe('dayjs instance', () => {
  it('should export configured dayjs instance', () => {
    expect(dayjs).toBeDefined()
    expect(typeof dayjs).toBe('function')
  })

  it('should have extended plugins available', () => {
    const date = dayjs('2023-01-15')
    const start = dayjs('2023-01-01')
    const end = dayjs('2023-01-31')

    // Test isBetween plugin
    expect(date.isBetween(start, end)).toBe(true)

    // Test isSameOrAfter plugin
    expect(date.isSameOrAfter(start)).toBe(true)

    // Test isSameOrBefore plugin
    expect(date.isSameOrBefore(end)).toBe(true)

    // Test relativeTime plugin
    expect(typeof date.fromNow()).toBe('string')
  })
})

describe('date utility functions', () => {
  beforeEach(() => {
    // Mock the current date to 2023-06-15 12:00:00
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2023-06-15T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return current moment with now()', () => {
    const currentMoment = now()
    expect(currentMoment.format('YYYY-MM-DD HH:mm')).toBe('2023-06-15 12:00')
  })

  it('should return today start of day with today()', () => {
    const todayMoment = today()
    expect(todayMoment.format('YYYY-MM-DD HH:mm:ss')).toBe('2023-06-15 00:00:00')
  })

  it('should return tomorrow start of day with tomorrow()', () => {
    const tomorrowMoment = tomorrow()
    expect(tomorrowMoment.format('YYYY-MM-DD HH:mm:ss')).toBe('2023-06-16 00:00:00')
  })

  it('should return yesterday start of day with yesterday()', () => {
    const yesterdayMoment = yesterday()
    expect(yesterdayMoment.format('YYYY-MM-DD HH:mm:ss')).toBe('2023-06-14 00:00:00')
  })
})

describe('isBetweenDates', () => {
  it('should check if date is between two dates (inclusive by default)', () => {
    expect(isBetweenDates('2023-06-15', '2023-06-01', '2023-06-30')).toBe(true)
    expect(isBetweenDates('2023-06-01', '2023-06-01', '2023-06-30')).toBe(true)
    expect(isBetweenDates('2023-06-30', '2023-06-01', '2023-06-30')).toBe(true)
    expect(isBetweenDates('2023-05-31', '2023-06-01', '2023-06-30')).toBe(false)
    expect(isBetweenDates('2023-07-01', '2023-06-01', '2023-06-30')).toBe(false)
  })

  it('should handle different inclusivity options', () => {
    const date = '2023-06-01'
    const start = '2023-06-01'
    const end = '2023-06-30'

    expect(isBetweenDates(date, start, end, 'day', '[]')).toBe(true) // inclusive both
    expect(isBetweenDates(date, start, end, 'day', '()')).toBe(false) // exclusive both
    expect(isBetweenDates(date, start, end, 'day', '[)')).toBe(true) // inclusive start
    expect(isBetweenDates(date, start, end, 'day', '(]')).toBe(false) // exclusive start
  })

  it('should handle different time units', () => {
    expect(isBetweenDates('2023-06-15', '2023-06-01', '2023-06-30', 'month')).toBe(true)
    expect(isBetweenDates('2023-06-15', '2023-01-01', '2023-12-31', 'year')).toBe(true)
  })

  it('should work with Date objects and dayjs instances', () => {
    const date = new Date('2023-06-15')
    const start = dayjs('2023-06-01')
    const end = new Date('2023-06-30')

    expect(isBetweenDates(date, start, end)).toBe(true)
  })
})

describe('fromNow', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2023-06-15T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return relative time from now', () => {
    expect(fromNow('2023-06-15T11:00:00.000Z')).toBe('an hour ago')
    expect(fromNow('2023-06-15T13:00:00.000Z')).toBe('in an hour')
    expect(fromNow('2023-06-14T12:00:00.000Z')).toBe('a day ago')
    expect(fromNow('2023-06-16T12:00:00.000Z')).toBe('in a day')
  })

  it('should work with different date formats', () => {
    const pastDate = new Date('2023-06-15T10:00:00.000Z')
    const futureDate = dayjs('2023-06-15T14:00:00.000Z')

    expect(fromNow(pastDate)).toBe('2 hours ago')
    expect(fromNow(futureDate)).toBe('in 2 hours')
  })
})

describe('isToday', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2023-06-15T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should check if date is today', () => {
    expect(isToday('2023-06-15')).toBe(true)
    expect(isToday('2023-06-15T00:00:00')).toBe(true)
    expect(isToday('2023-06-15T23:59:59')).toBe(true)
    expect(isToday('2023-06-14')).toBe(false)
    expect(isToday('2023-06-16')).toBe(false)
  })

  it('should work with different date formats', () => {
    expect(isToday(new Date('2023-06-15T15:30:00'))).toBe(true)
    expect(isToday(dayjs('2023-06-15'))).toBe(true)
    expect(isToday('2023-06-15T08:00:00.000Z')).toBe(true)
  })
})

describe('isPast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2023-06-15T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should check if date is in the past', () => {
    expect(isPast('2023-06-15T11:59:59.000Z')).toBe(true)
    expect(isPast('2023-06-14')).toBe(true)
    expect(isPast('2022-01-01')).toBe(true)
    expect(isPast('2023-06-15T12:00:01.000Z')).toBe(false)
    expect(isPast('2023-06-16')).toBe(false)
    expect(isPast('2024-01-01')).toBe(false)
  })

  it('should work with different date formats', () => {
    const pastDate = new Date('2023-06-15T10:00:00.000Z')
    const futureDate = dayjs('2023-06-15T14:00:00.000Z')

    expect(isPast(pastDate)).toBe(true)
    expect(isPast(futureDate)).toBe(false)
  })
})

describe('isFuture', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2023-06-15T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should check if date is in the future', () => {
    expect(isFuture('2023-06-15T12:00:01.000Z')).toBe(true)
    expect(isFuture('2023-06-16')).toBe(true)
    expect(isFuture('2024-01-01')).toBe(true)
    expect(isFuture('2023-06-15T11:59:59.000Z')).toBe(false)
    expect(isFuture('2023-06-14')).toBe(false)
    expect(isFuture('2022-01-01')).toBe(false)
  })

  it('should work with different date formats', () => {
    const pastDate = new Date('2023-06-15T10:00:00.000Z')
    const futureDate = dayjs('2023-06-15T14:00:00.000Z')

    expect(isFuture(pastDate)).toBe(false)
    expect(isFuture(futureDate)).toBe(true)
  })
})
