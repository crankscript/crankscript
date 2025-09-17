import {
    BaseClass,
    MiddleClass,
    ParameterClass,
    PropertyClass,
} from '@/shared-test-classes';
import { cranktest } from '../../../libs/test/src/import';

cranktest('Class properties', () => {
    cranktest('Property access patterns', (suite) => {
        suite.spec('should access instance properties', (predict) => {
            const base = new BaseClass('Test');
            predict.equals(base.title, 'Test');
        });

        suite.spec('should access inherited properties', (predict) => {
            const middle = new MiddleClass('Test', 5);
            predict.equals(middle.title, 'Test');
            predict.equals(middle.level, 5);
        });

        suite.spec('should work with getters and setters', (predict) => {
            const prop = new PropertyClass();

            predict.equals(prop.value, 0);
            predict.equals(prop.doubleValue, 0);

            prop.value = 5;
            predict.equals(prop.value, 5);
            predict.equals(prop.doubleValue, 10);
        });

        suite.spec('should handle property initialization', (predict) => {
            const middle = new MiddleClass();

            predict.equals(middle.getType(), 'middle');
            predict.equals(middle.title, 'Middle');
        });
    });

    cranktest('Access modifiers', (suite) => {
        suite.spec('should handle public properties', (predict) => {
            const access = new ParameterClass('public', 42);
            predict.equals(access.publicProp, 'public');

            access.publicProp = 'modified';
            predict.equals(access.publicProp, 'modified');
        });

        suite.spec(
            'should handle private properties through methods',
            (predict) => {
                const access = new ParameterClass('test', 42);
                predict.equals(access.getPrivate(), 42);

                access.setPrivate(100);
                predict.equals(access.getPrivate(), 100);
            },
        );

        suite.spec(
            'should handle protected properties through methods',
            (predict) => {
                const access = new ParameterClass('test', 42, true);
                predict.equals(access.getProtected(), true);

                access.setProtected(false);
                predict.equals(access.getProtected(), false);
            },
        );

        suite.spec(
            'should handle default values in constructor parameters',
            (predict) => {
                const access = new ParameterClass('test', 42);
                predict.equals(access.getProtected(), true);
            },
        );
    });
});
