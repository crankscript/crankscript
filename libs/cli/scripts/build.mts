#!/usr/bin/env tsx
import { $ } from 'zx';

$.verbose = true;

console.log('🏗️  Building CLI package...');

console.log('🧹 Cleaning previous build...');
await $`rm -rf ../../dist/libs/cli`;

console.log('📝 Compiling TypeScript...');
await $`tsc --project tsconfig.lib.json`;

console.log('🔗 Resolving path aliases...');
await $`tsc-alias --project tsconfig.json`;

console.log('📦 Copying package files and assets...');
await $`cp package.json *.md ../../dist/libs/cli/`;
await $`cp -r assets ../../dist/libs/cli/`;

console.log('✅ CLI build complete!');
