/**
 * Converts any value to a readable string representation for error messages.
 * Uses appropriate formatting for different types (quotes for strings, json.encode for objects, etc.)
 */
export const stringify = (value: any): string => {
    if (value === undefined) return 'undefined';

    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'boolean') return value.toString();
    if (typeof value === 'function') return '[function]';

    if (typeof value === 'object') {
        try {
            return json.encode(value);
        } catch (error) {
            return '[object]';
        }
    }

    return String(value);
};
