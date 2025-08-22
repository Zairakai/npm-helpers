import { describe, it, expect } from 'vitest';
import { capitalize, slugify, strLimit, normalizeString, numberFormat } from '../src/formatters.ts';

describe('capitalize', () => {
    it('should capitalize the first letter and lowercase the rest', () => {
        expect(capitalize('hello')).toBe('Hello');
        expect(capitalize('HELLO')).toBe('Hello');
        expect(capitalize('hELLo')).toBe('Hello');
        expect(capitalize('hello world')).toBe('Hello world');
    });

    it('should handle empty values', () => {
        expect(capitalize('')).toBe('');
        expect(capitalize(null)).toBe('');
        expect(capitalize(undefined)).toBe('');
    });

    it('should handle numbers and convert to string', () => {
        expect(capitalize(123)).toBe('123');
        expect(capitalize(0)).toBe('0');
    });

    it('should handle single character strings', () => {
        expect(capitalize('a')).toBe('A');
        expect(capitalize('Z')).toBe('Z');
    });
});

describe('slugify', () => {
    it('should create URL-friendly slugs', () => {
        expect(slugify('Hello World')).toBe('hello-world');
        expect(slugify('This is a Test')).toBe('this-is-a-test');
        expect(slugify('Multiple   Spaces')).toBe('multiple-spaces');
    });

    it('should remove special characters', () => {
        expect(slugify('Hello! World?')).toBe('hello-world');
        expect(slugify('Test@Example.com')).toBe('testexamplecom');
        expect(slugify('Price: $19.99')).toBe('price-1999');
    });

    it('should handle accented characters', () => {
        expect(slugify('Café Français')).toBe('cafe-francais');
        expect(slugify('niño piñata')).toBe('nino-pinata');
        expect(slugify('München')).toBe('munchen');
    });

    it('should handle empty values', () => {
        expect(slugify('')).toBe('');
        expect(slugify(null)).toBe('');
        expect(slugify(undefined)).toBe('');
    });

    it('should handle leading/trailing spaces and multiple dashes', () => {
        expect(slugify('  Hello World  ')).toBe('hello-world');
        expect(slugify('Hello--World')).toBe('hello-world');
        expect(slugify('Hello---World')).toBe('hello-world');
    });

    it('should handle numbers and convert to string', () => {
        expect(slugify(12345)).toBe('12345');
        expect(slugify(123.45)).toBe('12345');
    });
});

describe('strLimit', () => {
    it('should truncate strings longer than the limit', () => {
        expect(strLimit('Hello World', 5)).toBe('Hello…');
        expect(strLimit('This is a long string', 10)).toBe('This is a …');
        expect(strLimit('Short', 10)).toBe('Short');
    });

    it('should return original string if within limit', () => {
        expect(strLimit('Hello', 10)).toBe('Hello');
        expect(strLimit('Test', 4)).toBe('Test');
    });

    it('should handle empty values', () => {
        expect(strLimit('', 5)).toBe('');
        expect(strLimit(null, 5)).toBe('');
        expect(strLimit(undefined, 5)).toBe('');
    });

    it('should handle numbers and convert to string', () => {
        expect(strLimit(12345, 3)).toBe('123…');
        expect(strLimit(123, 5)).toBe('123');
    });

    it('should handle edge cases', () => {
        expect(strLimit('Hello', 0)).toBe('…');
        expect(strLimit('Hello', 1)).toBe('H…');
    });
});

describe('normalizeString', () => {
    it('should normalize strings by trimming and lowercasing', () => {
        expect(normalizeString('  Hello World  ')).toBe('hello world');
        expect(normalizeString('UPPERCASE')).toBe('uppercase');
        expect(normalizeString('MiXeD cAsE')).toBe('mixed case');
    });

    it('should remove diacritics', () => {
        expect(normalizeString('café')).toBe('cafe');
        expect(normalizeString('niño')).toBe('nino');
        expect(normalizeString('naïve')).toBe('naive');
    });

    it('should handle empty or null values', () => {
        expect(normalizeString('')).toBe('');
        expect(normalizeString(null)).toBe(null);
        expect(normalizeString(undefined)).toBe(undefined);
    });

    it('should normalize Unicode characters', () => {
        expect(normalizeString('é')).toBe('e');
        expect(normalizeString('à')).toBe('a');
        expect(normalizeString('ñ')).toBe('n');
        expect(normalizeString('ç')).toBe('c');
    });
});

describe('numberFormat', () => {
    it('should format numbers with default settings', () => {
        expect(numberFormat(1234.56)).toBe('1,234.56');
        expect(numberFormat(1000)).toBe('1,000.00');
        expect(numberFormat(123.456)).toBe('123.46'); // rounds to 2 decimals
    });

    it('should format numbers with custom decimal places', () => {
        expect(numberFormat(1234.56, 0)).toBe('1,235'); // rounds
        expect(numberFormat(1234.56, 1)).toBe('1,234.6');
        expect(numberFormat(1234.56, 3)).toBe('1,234.560');
    });

    it('should format numbers with different locales', () => {
        expect(numberFormat(1234.56, 2, 'fr-FR')).toBe('1 234,56');
        expect(numberFormat(1234.56, 2, 'de-DE')).toBe('1.234,56');
        expect(numberFormat(1234.56, 2, 'en-US')).toBe('1,234.56');
    });

    it('should handle zero and negative numbers', () => {
        expect(numberFormat(0)).toBe('0.00');
        expect(numberFormat(-1234.56)).toBe('-1,234.56');
        expect(numberFormat(-1234.56, 0)).toBe('-1,235');
    });

    it('should handle very large numbers', () => {
        expect(numberFormat(1234567.89)).toBe('1,234,567.89');
        expect(numberFormat(1000000000)).toBe('1,000,000,000.00');
    });

    it('should handle very small numbers', () => {
        expect(numberFormat(0.123, 3)).toBe('0.123');
        expect(numberFormat(0.001, 3)).toBe('0.001');
        expect(numberFormat(0.001, 2)).toBe('0.00'); // rounds down
    });
});