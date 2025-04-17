class A {
    static staticField = 'staticField';

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const someVar = 1;
    }
}

class B extends A {
    constructor() {
        super();
    }
}

playdate.update = () => {
    printTable(new A());
    printTable(new B());
};
