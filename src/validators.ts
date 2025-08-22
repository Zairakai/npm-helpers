/**
 * Type checking and validation utilities
 * Laravel-inspired validation helpers
 */

// Basic type checking
export const isTrue = (value: unknown): value is true => true === value;
export const isFalse = (value: unknown): value is false => false === value;
export const isNull = (value: unknown): value is null => null === value;
export const isUndefined = (value: unknown): value is undefined => undefined === value;
export const isSet = (value: unknown): value is NonNullable<unknown> => undefined !== value && null !== value;
export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);
export const isObject = (value: unknown): value is Record<string, unknown> => 'object' === typeof value && null !== value && !Array.isArray(value);
export const isString = (value: unknown): value is string => 'string' === typeof value;
export const isNumber = (value: unknown): value is number => 'number' === typeof value && !isNaN(value);
export const isInteger = (value: unknown): value is number => Number.isInteger(value);
export const isFloat = (value: unknown): value is number => 'number' === typeof value && !isNaN(value) && !Number.isInteger(value);
export const isBoolean = (value: unknown): value is boolean => 'boolean' === typeof value;
export const isFunction = (value: unknown): value is Function => 'function' === typeof value;
export const isDate = (value: unknown): value is Date => value instanceof Date && !isNaN(value.getTime());

// Advanced validation
export const isNumeric = (value: unknown): value is number | string => {
    if ('number' === typeof value) return !isNaN(value);
    if ('string' === typeof value) return !isNaN(parseFloat(value)) && isFinite(value as number);
    return false;
};

export const isEmail = (value: unknown): value is string => {
    if ('string' !== typeof value) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
};

export const isUrl = (value: unknown): value is string => {
    if ('string' !== typeof value) return false;
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
};

// Content validation
export const isEmpty = (value: unknown): boolean => {
    if (isNull(value) || isUndefined(value)) return true;
    if (isString(value)) return 0 === value.trim().length;
    if (isArray(value)) return 0 === value.length;
    if (isObject(value)) return 0 === Object.keys(value).length;
    if (isNumber(value)) return 0 === value;
    if (isBoolean(value)) return isFalse(value);
    return false;
};

export const isNotEmpty = (value: unknown): boolean => !isEmpty(value);

export const isBlank = (value: unknown): boolean => {
    if (null === value || undefined === value) return true;
    if ('string' === typeof value) return '' === value.trim();
    return isEmpty(value);
};

export const isPresent = (value: unknown): boolean => !isBlank(value);

// Aliases for Laravel-like syntax
export const filled = (value: unknown): boolean => isPresent(value);
export const blank = (value: unknown): boolean => isBlank(value);
