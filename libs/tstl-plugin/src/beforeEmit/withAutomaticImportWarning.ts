export const withAutomaticImportWarning = (
    importsString: string,
    code: string
) => {
    return `-- These imports were added automatically\n\n${importsString}\n\n-- End of automatic imports\n\n${code}`;
};
