import {
    BaseClass,
    DerivedClass,
    Example,
    Example2,
    MiddleClass,
} from '@/shared-test-classes';
import { cranktest } from '../../../libs/test/src/import';

cranktest('Class basics', () => {
    cranktest('Basic class functionality', (suite) => {
        suite.spec('should create an instance', (predict) => {
            const example = new Example();
            predict.equals(example.title, 'Example');
        });

        suite.spec('should create an instance of a subclass', (predict) => {
            const example = new Example2();
            predict.equals(example.title, 'Example2');
        });

        suite.spec(
            'should be able to check for the type of an instance',
            (predict) => {
                const example = new Example();
                predict.isTrue(example instanceof Example);
                predict.isFalse(example instanceof Example2);
            },
        );

        suite.spec('should support extended instanceof checks', (predict) => {
            const base = new BaseClass();
            const middle = new MiddleClass();
            const derived = new DerivedClass();

            predict.isTrue(base instanceof BaseClass);
            predict.isFalse(base instanceof MiddleClass);
            predict.isFalse(base instanceof DerivedClass);

            predict.isTrue(middle instanceof BaseClass);
            predict.isTrue(middle instanceof MiddleClass);
            predict.isFalse(middle instanceof DerivedClass);

            predict.isTrue(derived instanceof BaseClass);
            predict.isTrue(derived instanceof MiddleClass);
            predict.isTrue(derived instanceof DerivedClass);
        });
    });

    cranktest('Multi-level inheritance', (suite) => {
        suite.spec('should work with three-level inheritance', (predict) => {
            const derived = new DerivedClass('Multi', 7, 'test');

            predict.equals(derived.title, 'Multi');
            predict.equals(derived.level, 7);
            predict.equals(derived.value, 'test');
            predict.equals(derived.getType(), 'derived');
        });

        suite.spec('should support instanceof at all levels', (predict) => {
            const derived = new DerivedClass();

            predict.isTrue(derived instanceof DerivedClass);
            predict.isTrue(derived instanceof MiddleClass);
            predict.isTrue(derived instanceof BaseClass);
        });

        suite.spec('should call methods from any level', (predict) => {
            const derived = new DerivedClass('Multi', 7, 'test');

            predict.equals(derived.getTitle(), 'Multi');
            predict.equals(derived.getLevel(), 7);
            predict.equals(derived.getValue(), 'test');
            predict.equals(
                derived.getFullInfo(),
                'derived: I am Multi with value test',
            );
        });
    });
});
