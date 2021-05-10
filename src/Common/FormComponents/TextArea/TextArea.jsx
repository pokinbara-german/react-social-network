import React from "react";
import styles from './TextArea.module.css'

const TextArea = ({input, meta, ...props}) => {
    let hasError = meta.touched && meta.error;

    return (
        <div className={hasError ? styles.error : ''}>
            <textarea {...input} {...props}/>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
}

export default TextArea;