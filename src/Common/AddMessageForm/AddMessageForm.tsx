import React from 'react';
import {FormikHelpers, FormikProvider, useFormik} from 'formik';
import {createFieldF, formikField} from '../FormComponents/FieldsComponentsFormik';
import {maxLengthCreator, minLengthCreator, required, validatorCreator} from '../../utils/validators';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';

type propsType = {
    blockWidth?: string,
    buttonText: string,
    minTextLength: number,
    maxTextLength: number,
    isBlocked?: boolean,
    sendMessage: (text: string) => void
};

type formDataType = {
    newMessage: string
}

type fieldNamesType = keyof formDataType;

/**
 * Returns form for adding new message with one multiline input and one button.
 * @param {propsType} props - props object.
 * @param {string=} props.blockWidth - width of form (optional param, 'inherit' by default)
 * @param {string} props.buttonText - text on button
 * @param {number} props.minTextLength - min length of input value
 * @param {number} props.maxTextLength - max length of input value
 * @param {boolean} props.isBlocked - is need to disable button
 * @param {function(text: string): void} props.sendMessage - callback for set new message
 * @constructor
 */
export const AddMessageForm: React.FC<propsType> = (props) => {
    let minLength = minLengthCreator(props.minTextLength);
    let maxLength = maxLengthCreator(props.maxTextLength);

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            newPostForm: {
                display: 'flex',
                flexDirection: 'column',
                maxWidth: props.blockWidth || 'inherit',
                '& > *': {
                    display: 'flex',
                    margin: theme.spacing(1),
                },
            },
            stretched: {
                flexGrow: 1,
            }
        }),
    );

    const dispatch = useDispatch();
    const classes = useStyles();

    function onSubmit(values: formDataType, {setSubmitting, resetForm}: FormikHelpers<formDataType>) {
        dispatch(props.sendMessage(values.newMessage));
        setSubmitting(false);
        resetForm();
    }

    const formik = useFormik({
        initialValues: {newMessage: ''},
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit} className={classes.newPostForm}>
            <FormikProvider value={formik}>
                <Tooltip title={'You can type multiline. Just hit enter.'} aria-label='Hint' placement="right" arrow>
                    {createFieldF<fieldNamesType>(
                        classes.stretched,
                        'Type something',
                        'newMessage',
                        formikField,
                        validatorCreator([required, minLength, maxLength]),
                        {multiline: true}
                    )}
                </Tooltip>
            </FormikProvider>
            <div>
                <Button variant='contained'
                        color='primary'
                        type='submit'
                        disabled={!!props.isBlocked || formik.isSubmitting || !formik.dirty || !formik.isValid}
                >
                    {props.buttonText}
                </Button>
            </div>
        </form>
    );
}