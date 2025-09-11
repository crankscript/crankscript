import { stringify } from './utils';

/**
 * Asserts that a value is a number and narrows the type.
 */
export const isNumber = (actual: any): actual is number => {
    if (typeof actual !== 'number') {
        throw `Expected ${stringify(actual)} to be a number`;
    }
    return true;
};

/**
 * Asserts that a number is greater than or equal to a minimum value.
 */
export const isMin = (actual: number, minValue: number): void => {
    if (actual < minValue) {
        throw `Expected ${actual} to be at least ${minValue}`;
    }
};

/**
 * Asserts that a number is less than or equal to a maximum value.
 */
export const isMax = (actual: number, maxValue: number): void => {
    if (actual > maxValue) {
        throw `Expected ${actual} to be at most ${maxValue}`;
    }
};

/**
 * Asserts that a number is within a range (inclusive).
 */
export const isBetween = (
    actual: number,
    minValue: number,
    maxValue: number,
): void => {
    if (actual < minValue || actual > maxValue) {
        throw `Expected ${actual} to be between ${minValue} and ${maxValue}`;
    }
};
