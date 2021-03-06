import {stringOrNull} from '../../../types';
import {maxLengthCreator, required, validatorCreator} from '../../../utils/validators';
import React from 'react';
import {FormikHelpers, FormikProvider, useFormik} from 'formik';
import Button from '@material-ui/core/Button';
import {useDispatch} from 'react-redux';
import {login} from '../../../reducers/authReducer';
import {createField, FormikCheckbox, FormikField} from '../../Common/FormComponents/FieldsComponentsFormik';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

let maxLength30 = maxLengthCreator(30);

export type loginFormDataType = {
    login: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

type fieldNamesType = keyof loginFormDataType
type loginFormPropsType = {
    captchaUrl: stringOrNull
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loginForm: {
            display: 'flex',
            flexDirection: 'column',
            width: '40ch',
            margin: theme.spacing(1),
            '& > *': {
                display: 'flex',
            },
        },
        checkboxWrapper: {
            alignItems: 'center'
        },
        loginInput: {
            flexGrow: 1,
            margin: theme.spacing(1),
        },
        errorText: {
            color: 'red',
            alignSelf: 'center',
            marginBottom: theme.spacing(1),
        }
    }),
);

/**
 * Form for login process with two static inputs, one optional input with image for captcha, checkbox and button.
 * @param {loginFormPropsType} props - url to captcha img
 * @constructor
 */
const LoginForm: React.FC<loginFormPropsType> = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const initialValues = {
        login: '',
        password: '',
        rememberMe: false,
        captcha: ''
    }

    const onSubmit = (formData: loginFormDataType, {setSubmitting}: FormikHelpers<loginFormDataType>) => {
        dispatch(login(formData.login, formData.password, formData.rememberMe, formData.captcha, formik.setStatus));
        setSubmitting(false);
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
    });

    return (
        <form className={classes.loginForm} onSubmit={formik.handleSubmit}>
            <FormikProvider value={formik}>
                {createField<fieldNamesType>(
                    classes.loginInput,
                    'Enter login',
                    'login',
                    FormikField,
                    validatorCreator([required, maxLength30])
                )}
                {createField<fieldNamesType>(
                    classes.loginInput,
                    'Enter password',
                    'password',
                    FormikField,
                    validatorCreator([required, maxLength30]),
                    {type: 'password'}
                )}
                <div className={classes.checkboxWrapper}>
                    {createField<fieldNamesType>(
                        undefined,
                        undefined,
                        'rememberMe',
                        FormikCheckbox,
                        validatorCreator([]),
                        {color: 'primary'}
                    )}
                    <span>remember me</span>
                </div>
                {props.captchaUrl && <img alt={'captcha'} src={props.captchaUrl}/>}
                {props.captchaUrl && createField<fieldNamesType>(
                    classes.loginInput,
                    'Enter symbols from image',
                    'captcha',
                    FormikField,
                    validatorCreator([required, maxLength30]),
                    {autoComplete: 'off'}
                )}
            </FormikProvider>
            {formik.status && <div className={classes.errorText}>{formik.status}</div>}
            <Button variant='contained'
                    color='primary'
                    type='submit'
                    disabled={formik.isSubmitting || !formik.isValid}
            >
                Login
            </Button>
        </form>
    );
}

export default LoginForm;