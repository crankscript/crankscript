import { BaseClass, DerivedClass, MiddleClass } from '@/shared-test-classes';
import { cranktest } from '../../../libs/test/src/import';

cranktest('Class methods', () => {
    cranktest('Method calls', (suite) => {
        suite.spec('should call instance methods', (predict) => {
            const base = new BaseClass('Test');
            predict.equals(base.getTitle(), 'Test');
            predict.equals(base.getDescription(), 'I am Test');
        });

        suite.spec('should call static methods', (predict) => {
            predict.equals(BaseClass.getClassName(), 'BaseClass');
            predict.equals(MiddleClass.getClassName(), 'MiddleClass');
            predict.equals(DerivedClass.getClassName(), 'DerivedClass');
        });

        suite.spec('should access static properties', (predict) => {
            predict.equals(BaseClass.className, 'BaseClass');
            predict.equals(MiddleClass.className, 'MiddleClass');
            predict.equals(DerivedClass.className, 'DerivedClass');
        });

        suite.spec('should call static factory methods', (predict) => {
            const base = BaseClass.create('Factory');
            const middle = MiddleClass.create('Factory');

            predict.isTrue(base instanceof BaseClass);
            predict.equals(base.title, 'Factory');

            predict.isTrue(middle instanceof MiddleClass);
            predict.equals(middle.title, 'Factory');
        });
    });

    cranktest('Method inheritance and overriding', (suite) => {
        suite.spec('should inherit parent methods', (predict) => {
            const middle = new MiddleClass('Test');
            predict.equals(middle.getTitle(), 'Test'); // Inherited from BaseClass
            predict.equals(middle.getType(), 'middle'); // Uses own type
        });

        suite.spec('should override parent methods', (predict) => {
            const base = new BaseClass('Test');
            const middle = new MiddleClass('Test', 5);
            const derived = new DerivedClass('Test', 5, 'custom');

            predict.equals(base.getDescription(), 'I am Test');
            predict.equals(middle.getDescription(), 'I am Test at level 5');
            predict.equals(
                derived.getDescription(),
                'I am Test with value custom',
            );
        });

        suite.spec('should call super methods', (predict) => {
            const middle = new MiddleClass('Test', 5);
            const derived = new DerivedClass('Test', 5, 'custom');

            // Middle calling super.getDescription()
            predict.equals(middle.getParentDescription(), 'I am Test');

            // Derived calling super.getDescription() (MiddleClass version)
            predict.equals(
                derived.getMiddleDescription(),
                'I am Test at level 5',
            );

            // Derived calling super.super.getDescription() (BaseClass version)
            predict.equals(derived.getBaseDescription(), 'I am Test');
        });

        suite.spec('should inherit static methods', (predict) => {
            // Static methods are inherited
            const middleFromBase = MiddleClass.create('Static');
            predict.isTrue(middleFromBase instanceof MiddleClass);
            predict.equals(middleFromBase.title, 'Static');
        });
    });
});
