import { $ } from 'zx';

$.verbose = true;

await $`pnpm exec nx run types:build`;
