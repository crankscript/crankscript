import { join } from 'node:path';
import { __dirname } from './utils/dirname.js';

export const TypescriptReservedNamed = ['delete', 'new', 'function'];
export const RootFolder = join(__dirname, '..', '..');
export const DataFolder = join(RootFolder, 'src', 'data');
