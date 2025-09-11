import { $ } from 'zx';

$.verbose = true;

await $`pnpm exec nx run tstl-plugin:build`;
await $`pnpm exec nx run cli:build`;
await $`pnpm exec nx run tstl-plugin:move-build-to-dist`;
await $`pnpm exec nx run cli:post-build`;
