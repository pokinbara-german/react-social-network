import React from "react";
import styles from './FieldsComponents.module.css'
import {Field, WrappedFieldProps} from "redux-form";
import {validatorType} from "../../../utils/validators";

const FormControl: React.FC<WrappedFieldProps> = ({input, meta, children, ...props}) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className={hasError ? styles.error : undefined}>
            {React.isValidElement(children) && React.cloneElement(children, {...input, ...props})}
            {hasError && <span>{meta.error}</span>}
        </div>
    );
}

export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    return (
        <FormControl {...props}><textarea/></FormControl>
    );
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    return (
        <FormControl {...props}><input/></FormControl>
    );
}

export function createField<namesType extends string> (
    className: string | undefined,
    placeholder: string | undefined,
    name: namesType,
    component: React.FC<WrappedFieldProps>,
    validate: Array<validatorType>,
    props = {}
) {
    return (
        <Field className={className}
            placeholder={placeholder}
               name={name}
               component={component}
               validate={validate}
               {...props}
        />
    );
}