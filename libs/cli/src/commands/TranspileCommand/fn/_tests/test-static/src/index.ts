class A {
    static staticField = 'staticField';

    constructor() {
        // biome-ignore lint/correctness/noUnusedVariables: needed for the test
        const someVar = 1;
    }
}

class B extends A {
    // biome-ignore lint/complexity/noUselessConstructor: needed for the test
    constructor() {
        super();
    }
}

playdate.update = () => {
    printTable(new A());
    printTable(new B());
};
