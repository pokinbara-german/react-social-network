import React from "react";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {getCaptchaUrlSelector, getIsAuthSelector} from '../../Common/Selectors/Selectors';
import LoginForm from './LoginForm/LoginForm';

/**
 * Login-page with header and form.
 * @constructor
 */
export const Login: React.FC = () => {
    const auth = useSelector(getIsAuthSelector);
    const captchaUrl = useSelector(getCaptchaUrlSelector);

    if (auth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm captchaUrl={captchaUrl}/>
        </div>
    );
}