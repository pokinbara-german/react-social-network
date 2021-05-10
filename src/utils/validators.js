export const required = (value) => {
    if (value) return undefined;
    return 'Required field'
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength}`;
    return undefined;
}