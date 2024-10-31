import { platform } from 'node:os';

export const platformName = platform();
export const isWindows = platformName === 'win32';
export const isMac = platformName === 'darwin';
