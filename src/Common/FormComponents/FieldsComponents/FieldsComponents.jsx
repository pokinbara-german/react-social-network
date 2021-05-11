import React from "react";
import styles from './FieldsComponents.module.css'

const FormControl = ({input, meta, children, ...props}) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className={hasError ? styles.error : undefined}>
            {React.isValidElement(children) && React.cloneElement(children, {...input, ...props})}
            {hasError && <span>{meta.error}</span>}
        </div>
    );
}


export const TextArea = (props) => {
    return (
        <FormControl {...props}><textarea/></FormControl>
    );
}

export const Input = (props) => {
    return (
        <FormControl {...props}><input/></FormControl>
    );
}