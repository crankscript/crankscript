import { stringify } from './utils';

/**
 * Asserts that two values are strictly equal (===).
 */
export const equals = (actual: any, expected: any) => {
    if (actual !== expected) {
        throw `Expected ${stringify(actual)} to equal ${stringify(expected)}`;
    }
};
