import React from "react";
import {Field, FieldProps} from "formik";
import {validatorType} from "../../utils/validators";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

/**
 * Constructs wrapped component for formik field.
 * @param {Object} field
 * @param {Object | Array} children - React children
 * @param {Object} props - any needed props
 * @constructor
 */
const FormControlF: React.FC<FieldProps> = ({field, children, ...props}) => {
    const meta = props.form.getFieldMeta(field.name);
    const hasError = meta.touched && meta.error;
    const elementProps = {
        ...field,
        error: !!hasError,
        helperText: meta.error,
        ...props
    };

    return (
        <div>
            {React.isValidElement(children) && React.cloneElement(children, elementProps)}
        </div>
    );
};

/**
 * Material-UI input for formik field constructor.
 * @param {Object} props - any needed props
 */
export const formikField: React.FC<FieldProps> = (props) => {
    return (
        <FormControlF {...props}><TextField/></FormControlF>
    );
};

/**
 * Material-UI select for formik field constructor.
 * @param {Object} props - props.children must be transferred for select options and must be an Array
 */
export const formikSelect: React.FC<FieldProps> = React.memo((props) => {
    let options = props.children as Array<{key: string, value: string}>;

    return (
        <FormControlF {...props}>
            <Select>
                {options && options.map(option => {
                    return(
                        <MenuItem value={option.key}>{option.value}</MenuItem>
                    );
                })}
            </Select>
        </FormControlF>
    );
});

/**
 * Creates formik field based on transferred component.
 * @param {string | undefined} className
 * @param {string | undefined} placeholder
 * @param {string} name - field name as string
 * @param {React.FC} component - valid React component
 * @param {validatorType} validate - field validator
 * @param {Object} props - any props as object
 */
export function createFieldF<namesType extends string> (
    className: string | undefined,
    placeholder: string | undefined,
    name: namesType,
    component: React.FC<FieldProps>,
    validate: validatorType,
    props = {}
) {
    return (
        <Field className={className}
               placeholder={placeholder}
               name={name}
               validate={validate}
               component={component}
               {...props}
        />
    );
}