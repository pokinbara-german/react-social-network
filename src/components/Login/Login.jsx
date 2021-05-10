import React from "react";
import styles from './Login.module.css';
import {reduxForm, Field} from "redux-form";

const Login = () => {
    const onSubmit = (formData) => {
        console.log(formData);
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
}
const LoginForm = (props) => {
    return (
        <form className={styles.loginForm} onSubmit={props.handleSubmit}>
            <Field className={styles.loginInput} placeholder={'Login'} name={'login'} component={'input'}/>
            <Field className={styles.loginInput} placeholder={'Password'} name={'password'} component={'input'}/>
            <Field type={'checkbox'} name={'remember'} component={'input'}/> remember me
            <button>Login</button>
        </form>
    );
}

const LoginReduxForm = reduxForm({form: 'login'}) (LoginForm);

export default Login;