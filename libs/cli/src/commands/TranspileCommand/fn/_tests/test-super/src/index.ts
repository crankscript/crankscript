const getString = () => {
    return 'some-string';
};

class A {
    constructor(firstArgument: number, otherArgument: string) {
        print(firstArgument);
        print(otherArgument);
    }
}

class B extends A {
    constructor(
        // biome-ignore lint/correctness/noUnusedPrivateClassMembers: needed for the test
        private readonly firstArgument: number,
        secondArgument: number,
        thirdArgument: number,
    ) {
        print(firstArgument);
        print(secondArgument);
        print(thirdArgument);

        super(firstArgument, getString() ?? 'hello');
    }
}

playdate.update = () => {
    printTable(new B(0, 1, 2));
};
