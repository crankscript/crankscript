import { stringify } from './utils';

/**
 * Asserts that a value is an array and narrows the type.
 */
export const isArray = (actual: any): actual is any[] => {
    if (!Array.isArray(actual)) {
        throw `Expected ${stringify(actual)} to be an array`;
    }
    return true;
};

/**
 * Asserts that a value has a specific length (works with strings, arrays, etc.).
 */
export const hasLength = (
    actual: { length: number },
    expectedLength: number,
): void => {
    if (actual.length !== expectedLength) {
        throw `Expected length ${expectedLength}, got ${actual.length}`;
    }
};

/**
 * Asserts that a collection (string, array, or object) is empty.
 */
export const isEmpty = (actual: string | any[] | object): void => {
    if (typeof actual === 'string' || Array.isArray(actual)) {
        if (actual.length !== 0) {
            throw `Expected to be empty, got length ${actual.length}`;
        }
    } else if (typeof actual === 'object' && actual !== undefined) {
        if (Object.keys(actual).length !== 0) {
            throw `Expected object to be empty`;
        }
    } else {
        throw `Expected string, array, or object, got ${typeof actual}`;
    }
};
