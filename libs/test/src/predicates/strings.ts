import { stringify } from './utils';

/**
 * Asserts that a value is a string and narrows the type.
 */
export const isString = (actual: any): actual is string => {
    if (typeof actual !== 'string') {
        throw `Expected ${stringify(actual)} to be a string`;
    }
    return true;
};

// Note: hasLength is already defined in collections.ts for both strings and arrays
// Re-exporting here for convenience when working specifically with strings
export { hasLength } from './collections';
