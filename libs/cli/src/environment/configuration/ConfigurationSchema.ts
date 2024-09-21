import { z } from 'zod';

export const ConfigurationSchema = z.object({
    version: z.string().regex(/^\d+\.\d+\.\d+$/),
});

export type ConfigurationType = z.infer<typeof ConfigurationSchema>;
