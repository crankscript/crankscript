import { example } from './index';
import { cranktest } from '../../../libs/test/src/import';

cranktest('example', suite => {
    suite.spec('should be not greater than 10', predict => {
        predict.isMax(example, 10);
    });
});
