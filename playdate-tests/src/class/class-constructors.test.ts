import { cranktest } from '../../../libs/test/src/import';
import { BaseClass, MiddleClass, ParameterClass } from '../shared-test-classes';

cranktest('Constructor patterns', suite => {
    suite.spec('should handle default parameters', predict => {
        const base1 = new BaseClass();
        const base2 = new BaseClass('Custom');

        predict.equals(base1.title, 'Base');
        predict.equals(base2.title, 'Custom');
    });

    suite.spec('should handle multiple parameters with defaults', predict => {
        const middle1 = new MiddleClass();
        const middle2 = new MiddleClass('Custom');
        const middle3 = new MiddleClass('Custom', 5);

        predict.equals(middle1.title, 'Middle');
        predict.equals(middle1.level, 2);

        predict.equals(middle2.title, 'Custom');
        predict.equals(middle2.level, 2);

        predict.equals(middle3.title, 'Custom');
        predict.equals(middle3.level, 5);
    });

    suite.spec('should handle constructor parameter shorthand', predict => {
        const param = new ParameterClass('test', 42, false);

        predict.equals(param.publicProp, 'test');
        predict.equals(param.getPrivate(), 42);
        predict.equals(param.getProtected(), false);
    });

    suite.spec(
        'should handle constructor parameter shorthand with defaults',
        predict => {
            const param = new ParameterClass('test', 42);

            predict.equals(param.publicProp, 'test');
            predict.equals(param.getPrivate(), 42);
            predict.equals(param.getProtected(), true);
        },
    );
});
