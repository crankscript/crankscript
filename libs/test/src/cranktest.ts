import { createCrankTest } from './createCrankTest';
import { basePredicates } from './predicates';

export const cranktest = createCrankTest().extend(basePredicates);
