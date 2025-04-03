class A {
    static staticField = 'staticField';
    constructor() {
        const someVar = 1;
    }
}

class B extends A {
    constructor(
    ) {
        super();
    }
}

playdate.update = () => {
    printTable(new A());
    printTable(new B());
};
