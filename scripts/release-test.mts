import { $ } from 'zx';

$.verbose = true;

await $`pnpm --filter=@crankscript/test exec build`;
