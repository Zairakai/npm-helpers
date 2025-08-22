import { describe, it, expect } from 'vitest';

// Test main exports
describe('main exports', () => {
    it('should export all validators', async () => {
        const validators = await import('../src/validators.js');
        
        // Basic type checking
        expect(validators.isTrue).toBeDefined();
        expect(validators.isFalse).toBeDefined();
        expect(validators.isNull).toBeDefined();
        expect(validators.isUndefined).toBeDefined();
        expect(validators.isSet).toBeDefined();
        expect(validators.isArray).toBeDefined();
        expect(validators.isObject).toBeDefined();
        expect(validators.isString).toBeDefined();
        expect(validators.isNumber).toBeDefined();
        expect(validators.isInteger).toBeDefined();
        expect(validators.isFloat).toBeDefined();
        expect(validators.isBoolean).toBeDefined();
        expect(validators.isFunction).toBeDefined();
        expect(validators.isDate).toBeDefined();
        
        // Advanced validation
        expect(validators.isNumeric).toBeDefined();
        expect(validators.isEmail).toBeDefined();
        expect(validators.isUrl).toBeDefined();
        
        // Content validation
        expect(validators.isEmpty).toBeDefined();
        expect(validators.isNotEmpty).toBeDefined();
        expect(validators.isBlank).toBeDefined();
        expect(validators.isPresent).toBeDefined();
        expect(validators.filled).toBeDefined();
        expect(validators.blank).toBeDefined();
    });

    it('should export all formatters', async () => {
        const formatters = await import('../src/formatters.js');
        
        expect(formatters.capitalize).toBeDefined();
        expect(formatters.slugify).toBeDefined();
        expect(formatters.strLimit).toBeDefined();
        expect(formatters.normalizeString).toBeDefined();
        expect(formatters.numberFormat).toBeDefined();
    });

    it('should export all datetime utilities', async () => {
        const datetime = await import('../src/datetime.js');
        
        expect(datetime.dayjs).toBeDefined();
        expect(datetime.now).toBeDefined();
        expect(datetime.today).toBeDefined();
        expect(datetime.tomorrow).toBeDefined();
        expect(datetime.yesterday).toBeDefined();
        expect(datetime.isBetweenDates).toBeDefined();
        expect(datetime.fromNow).toBeDefined();
        expect(datetime.isToday).toBeDefined();
        expect(datetime.isPast).toBeDefined();
        expect(datetime.isFuture).toBeDefined();
    });

    it('should export main index file', async () => {
        const mainExports = await import('../src/index.js');
        
        // Should re-export all functions from submodules
        expect(Object.keys(mainExports).length).toBeGreaterThan(0);
        
        // Test a few key functions are available in main export
        expect(mainExports.isString).toBeDefined();
        expect(mainExports.capitalize).toBeDefined();
        expect(mainExports.dayjs).toBeDefined();
    });
});