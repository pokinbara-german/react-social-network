import React from "react";
import {Field, FieldProps} from "formik";
import {validatorType} from "../../utils/validators";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import {createStyles, makeStyles} from '@material-ui/core';
import {getFontsWithEmoji} from '../../utils/fontHelpers';

type elementPropsType = {
    error?: boolean,
    helperText?: string
};

/**
 * Constructs wrapped component for formik field.
 * @param {Object} field
 * @param {Object | Array} children - React children
 * @param {Object} props - any needed props
 * @constructor
 */
const FormControl: React.FC<FieldProps> = ({field, children, ...props}) => {
    const meta = props.form.getFieldMeta(field.name);
    const hasError = meta.touched && meta.error;
    const helperText = meta.error || undefined;

    const elementProps: typeof field & typeof props & elementPropsType = {
        ...field,
        ...props
    };

    if (hasError) elementProps.error = !!hasError;
    if (helperText) elementProps.helperText = helperText;

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
export const FormikField: React.FC<FieldProps> = (props) => {
    const useStyles = makeStyles((theme) =>
        createStyles({
            root: {
                '& > div': {
                    fontFamily: getFontsWithEmoji(theme)
                }
            }
        }),
    );

    const classes = useStyles();

    return (
        <FormControl {...props}><TextField classes={classes}/></FormControl>
    );
};

/**
 * Material-UI checkbox for formik field constructor.
 * @param {Object} props - any needed props
 */
export const FormikCheckbox: React.FC<FieldProps> = (props) => {
    return (
        <FormControl {...props}><Checkbox/></FormControl>
    );
};

/**
 * Material-UI select for formik field constructor.
 * @param {Object} props - props.children must be transferred for select options and must be an Array
 */
export const formikSelect: React.FC<FieldProps> = React.memo((props) => {
    let options = props.children as Array<{key: string, value: string}>;

    return (
        <FormControl {...props}>
            <Select>
                {options && options.map(option => {
                    return(
                        <MenuItem key={option.key} value={option.key}>{option.value}</MenuItem>
                    );
                })}
            </Select>
        </FormControl>
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
export function createField<namesType extends string> (
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