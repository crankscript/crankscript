import { ConstantDescription } from '@/cli/types.js';

export const playdateConstants = [
    {
        name: 'PlaydateColor',
        values: [
            { name: 'Black', value: 0, docs: '' },
            { name: 'White', value: 1, docs: '' },
            { name: 'Clear', value: 2, docs: '' },
            { name: 'XOR', value: 4, docs: '' },
        ],
        docs: '',
    },
    {
        name: 'PlaydateImageFlip',
        values: [
            { name: 'Unflipped', value: 0, docs: '' },
            { name: 'FlippedX', value: 1, docs: '' },
            { name: 'FlippedY', value: 2, docs: '' },
            { name: 'FlippedXY', value: 4, docs: '' },
        ],
        docs: '',
    },
    {
        name: 'PlaydatePolygonFill',
        values: [
            { name: 'NonZero', value: 1, docs: '' },
            { name: 'EvenOdd', value: 2, docs: '' },
        ],
        docs: '',
    },
    {
        name: 'PlaydateButton',
        values: [
            { name: 'Left', value: 1, docs: '' },
            { name: 'Right', value: 2, docs: '' },
            { name: 'Up', value: 4, docs: '' },
            { name: 'Down', value: 8, docs: '' },
            { name: 'B', value: 16, docs: '' },
            { name: 'A', value: 32, docs: '' },
            { name: 'Menu', value: 64, docs: '' },
            { name: 'Lock', value: 124, docs: '' },
        ],
        docs: '',
    },
    {
        name: 'PlaydateLanguage',
        values: [
            { name: 'English', value: 1, docs: '' },
            { name: 'Japanese', value: 2, docs: '' },
        ],
        docs: '',
    },
] satisfies ConstantDescription[];
