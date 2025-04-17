module.exports = {
    extends: ['@commitlint/config-conventional'],
    plugins: ['commitlint-plugin-function-rules'],
    rules: {
        'scope-empty': [2, 'always'],
        'subject-case': [
            2,
            'never',
            ['start-case', 'pascal-case', 'upper-case'],
        ],
        'function-rules/header-max-length': [2, 'always'],
    },
};
