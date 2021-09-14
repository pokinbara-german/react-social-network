export type setErrorsType = (field: string, value: string | undefined) => void;
export type setStatusType = (field: string) => void;

/**
 * Empty default callback which do nothing.
 * Need for callback param optionality.
 * @param {string} field - not need to put param
 * @param {string|undefined} value - not need to put param
 */
export function emptyErrorCallback(field: string, value: string | undefined) {}
/**
 * Empty default callback which do nothing.
 * Need for callback param optionality.
 * @param {string} data - not need to put param
 */
export function emptyStatusCallback(data: string) {}

/**
 * Call callback for every item in data. Parse every item to field name and error text.
 * @param {Array<string>} data - array with errors.
 * @param {setErrorsType} formikSetErrors - setErrors function from formik.
 * @param {setStatusType} formikSetStatus - setStatus function from formik.
 */
export function setErrors (data: Array<string>, formikSetErrors: setErrorsType, formikSetStatus: setStatusType) {
    data.forEach(error => {
        let rawError = error.split('(')[1],
            hasSubkey = rawError.indexOf('->') !== -1,
            key, subkey, errorTextRaw, errorText;

        if (hasSubkey) {
            key = rawError.split('->')[0].toLowerCase();
            subkey = rawError.substring(0, rawError.length - 1).split('->')[1].toLowerCase();
            errorTextRaw = error.split('(')[0];
            errorText = errorTextRaw.substring(0, errorTextRaw.length - 1);

            formikSetErrors(`${key}.${subkey}`, errorText);
        } else {
            key = rawError.substring(0, rawError.length - 1);
            errorTextRaw = error.split('(')[0];
            errorText = errorTextRaw.substring(0, errorTextRaw.length -1);

            if (key === 'contacts') {
                formikSetStatus(errorText);
            }

            formikSetErrors(key, errorText);
        }
    });
}