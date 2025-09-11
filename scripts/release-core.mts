import { $ } from 'zx';

$.verbose = true;

await $`pnpm exec nx run core:build`;
