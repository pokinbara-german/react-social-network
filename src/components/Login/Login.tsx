import React from "react";
import styles from './Login.module.css';
import {reduxForm, InjectedFormProps} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../reducers/authReducer";
import {Redirect} from "react-router-dom";
import {createField, Input} from "../../Common/FormComponents/FieldsComponents/FieldsComponents";
import {maxLengthCreator, required} from "../../utils/validators";
import {appStateType} from "../../redux/reduxStore";
import {stringOrNull} from "../../reducers/types/types";

let maxLength30 = maxLengthCreator(30);

const Login: React.FC<loginPropsType> = (props) => {
    const onSubmit = (formData: loginFormDataType) => {
        props.login(formData.login, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.auth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    );
}

type loginFormDataType = {
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

const LoginReduxForm = reduxForm<loginFormDataType, loginFormOwnPropsType>({form: 'login'}) (LoginForm);

type mapStatePropsType = {
    auth: boolean,
    captchaUrl: stringOrNull
}

type mapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type ownPropsType = {
};

type loginPropsType = mapStatePropsType & mapDispatchPropsType & ownPropsType;

let mapStateToProps = (state: appStateType): mapStatePropsType => {
    return {
        auth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}
export default connect<
    mapStatePropsType,
    mapDispatchPropsType,
    ownPropsType,
    appStateType
    >(mapStateToProps,{login})(Login);