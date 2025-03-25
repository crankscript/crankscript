module.exports = {
    extends: ['@commitlint/config-conventional'],
    plugins: ['commitlint-plugin-function-rules'],
    rules: {
        'scope-empty': [2, 'never'],
        'subject-case': [
            2,
            'never',
            ['start-case', 'pascal-case', 'upper-case'],
        ],
        'function-rules/header-max-length': [
            2,
            'always',
            (parsed) => {
                if (parsed.scope === 'wip' || /^cnk-\d+$/.test(parsed.scope)) {
                    return [true];
                }

                return [false, 'scope must match the pattern "cnk-<xyz>"'];
            },
        ],
    },
};
