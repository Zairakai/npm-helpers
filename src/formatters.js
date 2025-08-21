/**
 * String manipulation and formatting utilities
 */

export const capitalize = (value) => {
    if (!value) {
        return '';
    }

    value = String(value);
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export const slugify = (text) => {
    if (!text) {
        return '';
    }

    return text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
};

export const strLimit = (value, size) => {
    if (!value) {
        return '';
    }

    value = String(value);
    return value.length <= size ? value : `${value.slice(0, size)}…`;
};

export const normalizeString = (value) => {
    if (!value) return value;

    return value
        .trim()
        .toLowerCase()
        .normalize('NFC')
        .replace(/\p{Diacritic}/gu, '');
};

/**
 * Format a number with locale-specific formatting
 * @param {number} value - The number to format
 * @param {number} decimals - Number of decimal places
 * @param {string} locale - Locale string (e.g., 'en-US', 'fr-FR')
 * @returns {string} Formatted number
 */
export const numberFormat = (value, decimals = 2, locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value);
};
