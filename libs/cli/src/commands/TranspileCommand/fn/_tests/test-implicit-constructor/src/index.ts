class A {
    method() {
        return 'test';
    }
}

playdate.update = () => {
    printTable(new A());
};
