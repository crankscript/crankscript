// Shared class definitions for all class tests

export class Example {
    title: string;

    constructor() {
        this.title = 'Example';
    }
}

export class Example2 extends Example {
    constructor() {
        super();
        this.title = 'Example2';
    }
}

export class BaseClass {
    public title: string;
    protected type: string = 'base';
    private _id: number = 1;
    static className: string = 'BaseClass';

    constructor(title: string = 'Base') {
        this.title = title;
    }

    getTitle(): string {
        return this.title;
    }

    getType(): string {
        return this.type;
    }

    getDescription(): string {
        return `I am ${this.title}`;
    }

    getFullInfo(): string {
        return `${this.getType()}: ${this.getDescription()}`;
    }

    static getClassName(): string {
        return (this as any).className;
    }

    static create(title: string): BaseClass {
        return new BaseClass(title);
    }
}

export class MiddleClass extends BaseClass {
    static className: string = 'MiddleClass';
    level: number;

    constructor(title: string = 'Middle', level: number = 2) {
        super(title);
        this.type = 'middle';
        this.level = level;
    }

    getLevel(): number {
        return this.level;
    }

    getDescription(): string {
        return `I am ${this.title} at level ${this.level}`;
    }

    getParentDescription(): string {
        return super.getDescription();
    }

    static create(title: string): MiddleClass {
        return new MiddleClass(title);
    }
}

export class DerivedClass extends MiddleClass {
    static className: string = 'DerivedClass';
    value: string;

    constructor(
        title: string = 'Derived',
        level: number = 3,
        value: string = 'default',
    ) {
        super(title, level);
        this.type = 'derived';
        this.value = value;
    }

    getValue(): string {
        return this.value;
    }

    getDescription(): string {
        return `I am ${this.title} with value ${this.value}`;
    }

    getMiddleDescription(): string {
        return super.getDescription();
    }

    getBaseDescription(): string {
        return super.getParentDescription();
    }
}

export class ParameterClass {
    constructor(
        public publicProp: string,
        private privateProp: number,
        protected protectedProp: boolean = true,
    ) {}

    getPrivate(): number {
        return this.privateProp;
    }

    getProtected(): boolean {
        return this.protectedProp;
    }

    setPrivate(value: number): void {
        this.privateProp = value;
    }

    setProtected(value: boolean): void {
        this.protectedProp = value;
    }
}

export class PropertyClass {
    private _value: number = 0;

    get value(): number {
        return this._value;
    }

    set value(newValue: number) {
        this._value = newValue;
    }

    get doubleValue(): number {
        return this._value * 2;
    }
}
