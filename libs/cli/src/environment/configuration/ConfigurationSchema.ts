import { z } from 'zod';

export const ConfigurationSchema = z.object({
    version: z.union([
        z.string().regex(/^\d+\.\d+\.\d+$/),
        z.literal('latest'),
    ]),
});

export type ConfigurationType = z.infer<typeof ConfigurationSchema>;
