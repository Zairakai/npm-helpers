/**
 * Type checking and validation utilities
 * Laravel-inspired validation helpers
 */

// Basic type checking
export const isTrue = (value) => true === value;
export const isFalse = (value) => false === value;
export const isNull = (value) => null === value;
export const isUndefined = (value) => undefined === value;
export const isSet = (value) => undefined !== value && null !== value;
export const isArray = (value) => Array.isArray(value);
export const isObject = (value) => 'object' === typeof value && null !== value && !Array.isArray(value);
export const isString = (value) => 'string' === typeof value;
export const isNumber = (value) => 'number' === typeof value && !isNaN(value);
export const isInteger = (value) => Number.isInteger(value);
export const isFloat = (value) => 'number' === typeof value && !isNaN(value) && !Number.isInteger(value);
export const isBoolean = (value) => 'boolean' === typeof value;
export const isFunction = (value) => 'function' === typeof value;
export const isDate = (value) => value instanceof Date && !isNaN(value.getTime());

// Advanced validation
export const isNumeric = (value) => {
    if ('number' === typeof value) return !isNaN(value);
    if ('string' === typeof value) return !isNaN(parseFloat(value)) && isFinite(value);
    return false;
};

export const isEmail = (value) => {
    if ('string' !== typeof value) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
};

export const isUrl = (value) => {
    if ('string' !== typeof value) return false;
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
};

// Content validation
export const isEmpty = (value) => {
    if (isNull(value) || isUndefined(value)) return true;
    if (isString(value)) return 0 === value.trim().length;
    if (isArray(value)) return 0 === value.length;
    if (isObject(value)) return 0 === Object.keys(value).length;
    if (isNumber(value)) return 0 === value;
    if (isBoolean(value)) return isFalse(value);
    return false;
};

export const isNotEmpty = (value) => !isEmpty(value);

export const isBlank = (value) => {
    if (null === value || undefined === value) return true;
    if ('string' === typeof value) return '' === value.trim();
    return isEmpty(value);
};

export const isPresent = (value) => !isBlank(value);

// Aliases for Laravel-like syntax
export const filled = (value) => isPresent(value);
export const blank = (value) => isBlank(value);
