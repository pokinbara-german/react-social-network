export type validatorType = (value: string) => string | undefined;

/**
 * Creates one validator from array of validators.
 * Returns error text or empty text as string.
 * Need for formik field-level validation.
 * @param {Array<validatorType>} validators - array of validators.
 */
export const validatorCreator = (validators: Array<validatorType>) => (value: string) => {
    let error = '';

    validators.forEach(validator => {
        let result = validator(value);
        if (result !== undefined) error = result;
    })
    return error;
}

/**
 * Validator for required string.
 * Returns undefined or error text as string.
 * @param {string} value - string from form for validation.
 */
export const required: validatorType = (value) => {
    if (value) return undefined;
    return 'Required field'
}

/**
 * Function which creates "max length validator".
 * @param {number} maxLength - max string length for validator.
 */
export const maxLengthCreator = (maxLength: number): validatorType => (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength}`;
    return undefined;
}

/**
 * Function which creates "min length validator".
 * @param {number} minLength - min string length for validator.
 */
export const minLengthCreator = (minLength: number): validatorType => (value) => {
    if (value && value.length < minLength) return `Min length is ${minLength}`;
    return undefined;
}