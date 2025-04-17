class A {
    constructor(a: number, b = 5) {
        console.log(a, b);
    }

    method(c: number, d = 5) {
        console.log(c, d);
    }
}

function test(x: number, y = 5) {
    console.log(x, y);
}

playdate.update = () => {
    printTable(new A(1));
    test(1);
};
