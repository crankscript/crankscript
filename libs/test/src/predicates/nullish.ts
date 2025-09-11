import { stringify } from './utils';

/**
 * Asserts that a value is undefined and narrows the type.
 */
export const isUndefined = (actual: any): actual is undefined => {
    if (actual !== undefined) {
        throw `Expected ${stringify(actual)} to be undefined`;
    }
    return true;
};

/**
 * Asserts that a value is not undefined and narrows the type.
 */
export const isDefined = <T>(actual: T | undefined): actual is T => {
    if (actual === undefined) {
        throw `Expected value to be defined, got ${stringify(actual)}`;
    }
    return true;
};
