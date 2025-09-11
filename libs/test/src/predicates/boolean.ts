import { stringify } from './utils';

/**
 * Asserts that a value is exactly true.
 */
export const isTrue = (actual: any) => {
    if (actual !== true) {
        throw `Expected ${stringify(actual)} to be true`;
    }
};

/**
 * Asserts that a value is exactly false.
 */
export const isFalse = (actual: any) => {
    if (actual !== false) {
        throw `Expected ${stringify(actual)} to be false`;
    }
};
