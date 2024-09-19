const allowedSymbolsRegex = /(^[\\.a-zA-Z\d\s]+)$/i;

export const textValidationWrapper = (onChange: (value: string) => unknown) => (value: string) => {
    if (value === '' || allowedSymbolsRegex.test(value)) {
        onChange(value);
    }
};