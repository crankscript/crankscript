export const formatTestError = (
    error: string,
    file?: string,
    line?: number,
) => {
    if (file && line) {
        return `${error}\nat ${file}:${line}`;
    }

    return error;
};
