import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../reducers/authReducer";
import {Redirect} from "react-router-dom";
import {getCaptchaUrlSelector, getIsAuthSelector} from '../../Common/Selectors/Selectors';
import {loginFormDataType, LoginReduxForm} from './LoginForm/LoginForm';

export const Login: React.FC = () => {
    const auth = useSelector(getIsAuthSelector);
    const captchaUrl = useSelector(getCaptchaUrlSelector);

    const dispatch = useDispatch();

    const onSubmit = (formData: loginFormDataType) => {
        dispatch(login(formData.login, formData.password, formData.rememberMe, formData.captcha));
    }

    if (auth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    );
}