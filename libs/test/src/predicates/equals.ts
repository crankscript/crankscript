import { stringify } from './utils';

/**
 * Asserts that two values are strictly equal (===).
 */
export const equals = (actual: any, expected: any) => {
    if (typeof actual === 'object' && typeof expected === 'object') {
        if (Object.keys(actual).length !== Object.keys(expected).length) {
            throw `Expected ${stringify(actual)} to equal ${stringify(expected)}`;
        }

        for (const key in actual) {
            if (actual[key] !== expected[key]) {
                throw `Expected ${stringify(actual)} to equal ${stringify(expected)}`;
            }
        }

        return;
    }

    if (actual !== expected) {
        throw `Expected ${stringify(actual)} to equal ${stringify(expected)}`;
    }
};
