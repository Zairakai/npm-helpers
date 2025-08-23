import { describe, it, expect } from 'vitest'
import {
  isTrue,
  isFalse,
  isNull,
  isUndefined,
  isSet,
  isArray,
  isObject,
  isString,
  isNumber,
  isInteger,
  isFloat,
  isBoolean,
  isFunction,
  isDate,
  isNumeric,
  isEmail,
  isUrl,
  isEmpty,
  isNotEmpty,
  isBlank,
  isPresent,
  filled,
  blank,
} from '../src/validators.ts'

describe('Basic type checking', () => {
  it('should validate true values correctly', () => {
    expect(isTrue(true)).toBe(true)
    expect(isTrue(false)).toBe(false)
    expect(isTrue(1)).toBe(false)
    expect(isTrue('true')).toBe(false)
  })

  it('should validate false values correctly', () => {
    expect(isFalse(false)).toBe(true)
    expect(isFalse(true)).toBe(false)
    expect(isFalse(0)).toBe(false)
    expect(isFalse('false')).toBe(false)
  })

  it('should validate null values correctly', () => {
    expect(isNull(null)).toBe(true)
    expect(isNull(undefined)).toBe(false)
    expect(isNull(0)).toBe(false)
    expect(isNull('')).toBe(false)
  })

  it('should validate undefined values correctly', () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined(0)).toBe(false)
    expect(isUndefined('')).toBe(false)
  })

  it('should validate set values correctly', () => {
    expect(isSet('test')).toBe(true)
    expect(isSet(0)).toBe(true)
    expect(isSet(false)).toBe(true)
    expect(isSet(null)).toBe(false)
    expect(isSet(undefined)).toBe(false)
  })

  it('should validate arrays correctly', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
    expect(isArray({})).toBe(false)
    expect(isArray('string')).toBe(false)
  })

  it('should validate objects correctly', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ key: 'value' })).toBe(true)
    expect(isObject([])).toBe(false)
    expect(isObject(null)).toBe(false)
    expect(isObject('string')).toBe(false)
  })

  it('should validate strings correctly', () => {
    expect(isString('test')).toBe(true)
    expect(isString('')).toBe(true)
    expect(isString(123)).toBe(false)
    expect(isString(null)).toBe(false)
  })

  it('should validate numbers correctly', () => {
    expect(isNumber(123)).toBe(true)
    expect(isNumber(0)).toBe(true)
    expect(isNumber(-123)).toBe(true)
    expect(isNumber(123.45)).toBe(true)
    expect(isNumber(NaN)).toBe(false)
    expect(isNumber('123')).toBe(false)
  })

  it('should validate integers correctly', () => {
    expect(isInteger(123)).toBe(true)
    expect(isInteger(0)).toBe(true)
    expect(isInteger(-123)).toBe(true)
    expect(isInteger(123.45)).toBe(false)
    expect(isInteger('123')).toBe(false)
  })

  it('should validate floats correctly', () => {
    expect(isFloat(123.45)).toBe(true)
    expect(isFloat(-123.45)).toBe(true)
    expect(isFloat(123)).toBe(false)
    expect(isFloat(0)).toBe(false)
    expect(isFloat('123.45')).toBe(false)
  })

  it('should validate booleans correctly', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean(1)).toBe(false)
    expect(isBoolean(0)).toBe(false)
    expect(isBoolean('true')).toBe(false)
  })

  it('should validate functions correctly', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(function () {})).toBe(true)
    expect(isFunction(Math.max)).toBe(true)
    expect(isFunction('function')).toBe(false)
    expect(isFunction({})).toBe(false)
  })

  it('should validate dates correctly', () => {
    expect(isDate(new Date())).toBe(true)
    expect(isDate(new Date('2023-01-01'))).toBe(true)
    expect(isDate(new Date('invalid'))).toBe(false)
    expect(isDate('2023-01-01')).toBe(false)
    expect(isDate(123456789)).toBe(false)
  })
})

describe('Advanced validation', () => {
  it('should validate numeric values correctly', () => {
    expect(isNumeric(123)).toBe(true)
    expect(isNumeric(123.45)).toBe(true)
    expect(isNumeric('123')).toBe(true)
    expect(isNumeric('123.45')).toBe(true)
    expect(isNumeric('-123')).toBe(true)
    expect(isNumeric('abc')).toBe(false)
    expect(isNumeric(NaN)).toBe(false)
    expect(isNumeric(Infinity)).toBe(false)
  })

  it('should validate email addresses correctly', () => {
    expect(isEmail('test@example.com')).toBe(true)
    expect(isEmail('user.name@domain.co.uk')).toBe(true)
    expect(isEmail('user+tag@example.org')).toBe(true)
    expect(isEmail('invalid-email')).toBe(false)
    expect(isEmail('test@')).toBe(false)
    expect(isEmail('@example.com')).toBe(false)
    expect(isEmail('test @example.com')).toBe(false)
    expect(isEmail(123)).toBe(false)
  })

  it('should validate URLs correctly', () => {
    expect(isUrl('https://example.com')).toBe(true)
    expect(isUrl('http://example.com')).toBe(true)
    expect(isUrl('https://example.com/path?param=value')).toBe(true)
    expect(isUrl('ftp://example.com')).toBe(true)
    expect(isUrl('invalid-url')).toBe(false)
    expect(isUrl('example.com')).toBe(false)
    expect(isUrl(123)).toBe(false)
  })
})

describe('Content validation', () => {
  it('should validate empty values correctly', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty('   ')).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty(0)).toBe(true)
    expect(isEmpty(false)).toBe(true)

    expect(isEmpty('test')).toBe(false)
    expect(isEmpty([1])).toBe(false)
    expect(isEmpty({ key: 'value' })).toBe(false)
    expect(isEmpty(1)).toBe(false)
    expect(isEmpty(true)).toBe(false)
  })

  it('should validate non-empty values correctly', () => {
    expect(isNotEmpty('test')).toBe(true)
    expect(isNotEmpty([1])).toBe(true)
    expect(isNotEmpty({ key: 'value' })).toBe(true)
    expect(isNotEmpty(1)).toBe(true)
    expect(isNotEmpty(true)).toBe(true)

    expect(isNotEmpty(null)).toBe(false)
    expect(isNotEmpty(undefined)).toBe(false)
    expect(isNotEmpty('')).toBe(false)
    expect(isNotEmpty('   ')).toBe(false)
    expect(isNotEmpty([])).toBe(false)
    expect(isNotEmpty({})).toBe(false)
    expect(isNotEmpty(0)).toBe(false)
    expect(isNotEmpty(false)).toBe(false)
  })

  it('should validate blank values correctly', () => {
    expect(isBlank(null)).toBe(true)
    expect(isBlank(undefined)).toBe(true)
    expect(isBlank('')).toBe(true)
    expect(isBlank('   ')).toBe(true)
    expect(isBlank([])).toBe(true)
    expect(isBlank({})).toBe(true)
    expect(isBlank(0)).toBe(true)
    expect(isBlank(false)).toBe(true)

    expect(isBlank('test')).toBe(false)
    expect(isBlank('   test   ')).toBe(false)
    expect(isBlank([1])).toBe(false)
    expect(isBlank({ key: 'value' })).toBe(false)
    expect(isBlank(1)).toBe(false)
    expect(isBlank(true)).toBe(false)
  })

  it('should validate present values correctly', () => {
    expect(isPresent('test')).toBe(true)
    expect(isPresent('   test   ')).toBe(true)
    expect(isPresent([1])).toBe(true)
    expect(isPresent({ key: 'value' })).toBe(true)
    expect(isPresent(1)).toBe(true)
    expect(isPresent(true)).toBe(true)

    expect(isPresent(null)).toBe(false)
    expect(isPresent(undefined)).toBe(false)
    expect(isPresent('')).toBe(false)
    expect(isPresent('   ')).toBe(false)
    expect(isPresent([])).toBe(false)
    expect(isPresent({})).toBe(false)
    expect(isPresent(0)).toBe(false)
    expect(isPresent(false)).toBe(false)
  })

  it('should validate Laravel-like aliases correctly', () => {
    expect(filled('test')).toBe(true)
    expect(filled('')).toBe(false)
    expect(blank('')).toBe(true)
    expect(blank('test')).toBe(false)
  })
})
