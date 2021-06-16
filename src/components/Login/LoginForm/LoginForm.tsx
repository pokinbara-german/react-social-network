import {InjectedFormProps, reduxForm} from 'redux-form';
import {stringOrNull} from '../../../reducers/types/types';
import {maxLengthCreator, required} from '../../../utils/validators';
import React from 'react';
import styles from '../Login.module.css';
import {createField, Input} from '../../../Common/FormComponents/FieldsComponents/FieldsComponents';

let maxLength30 = maxLengthCreator(30);

export type loginFormDataType = {
    login: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

type fieldNamesType = keyof loginFormDataType
type loginFormOwnPropsType = {
    captchaUrl: stringOrNull
}

const LoginForm: React.FC<InjectedFormProps<loginFormDataType, loginFormOwnPropsType> & loginFormOwnPropsType> = (props) => {
    return (
        <form className={styles.loginForm} onSubmit={props.handleSubmit}>
            {createField<fieldNamesType>(
                styles.loginInput,
                'Введите логин',
                'login',
                Input,
                [required, maxLength30]
            )}
            {createField<fieldNamesType>(
                styles.loginInput,
                'Введите пароль',
                'password',
                Input,
                [required, maxLength30],
                {type: 'password'}
            )}
            <div className={styles.checkboxWrapper}>
                {createField<fieldNamesType>(
                    undefined,
                    undefined,
                    'rememberMe',
                    Input,
                    [],
                    {type: 'checkbox'}
                )}
                <span className={styles.checkboxSpan}>remember me</span>
            </div>
            {props.captchaUrl && <img alt={'captcha'} src={props.captchaUrl}/>}
            {props.captchaUrl && createField<fieldNamesType>(
                styles.loginInput,
                'Ввведите символы с картинки',
                'captcha',
                Input,
                [required, maxLength30],
                {autocomplete: 'off'}
            )}
            {props.error && <div className={styles.error}>{props.error}</div>}
            <button>Login</button>
        </form>
    );
}
export const LoginReduxForm = reduxForm<loginFormDataType, loginFormOwnPropsType>({form: 'login'})(LoginForm);