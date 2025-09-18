import { cranktest } from '../../../libs/test/src/import';

abstract class AbstractBase {
    protected baseField: string = 'abstract-base-value';
    protected abstractCount: number = 100;

    abstract getImplementedValue(): string;

    getBaseField(): string {
        return this.baseField;
    }

    getAbstractCount(): number {
        return this.abstractCount;
    }
}

class ConcreteChild extends AbstractBase {
    private childField: string = 'child-value';

    constructor() {
        super();
        this.baseField = 'overridden-in-constructor';
    }

    getImplementedValue(): string {
        return this.childField;
    }

    getChildField(): string {
        return this.childField;
    }
}

class ConcreteChildWithFieldOverride extends AbstractBase {
    protected baseField: string = 'child-override-value';

    getImplementedValue(): string {
        return 'implemented';
    }
}

cranktest('Abstract class field initialization', (suite) => {
    suite.spec('should initialize fields from abstract parent', (predict) => {
        const child = new ConcreteChild();

        predict.equals(child.getAbstractCount(), 100);
    });

    suite.spec(
        'should handle constructor override of parent field',
        (predict) => {
            const child = new ConcreteChild();

            predict.equals(child.getBaseField(), 'overridden-in-constructor');
        },
    );

    suite.spec('should handle child field initializer override', (predict) => {
        const child = new ConcreteChildWithFieldOverride();

        predict.equals(child.getBaseField(), 'child-override-value');
        predict.equals(child.getAbstractCount(), 100);
    });

    suite.spec('should support instanceof with abstract parent', (predict) => {
        const child = new ConcreteChild();

        predict.isTrue(child instanceof ConcreteChild);
        predict.isTrue(child instanceof AbstractBase);
    });

    suite.spec('should call methods from abstract parent', (predict) => {
        const child = new ConcreteChild();

        predict.equals(child.getAbstractCount(), 100);

        predict.equals(child.getImplementedValue(), 'child-value');
    });
});
