import React from "react";
import styles from './Login.module.css';
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../reducers/authReducer";
import {Redirect} from "react-router-dom";

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.login, formData.password, formData.rememberMe);
    }

    if (props.auth.isAuth) {
        return <Redirect to={'/profile'}/>
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
            <Field className={styles.loginInput} placeholder={'Password'} name={'password'} component={'input'} type={'password'}/>
            <Field type={'checkbox'} name={'rememberMe'} component={'input'}/> remember me
            <button>Login</button>
        </form>
    );
}

const LoginReduxForm = reduxForm({form: 'login'}) (LoginForm);

let mapStateToProps = (state) => {
    return {auth: state.auth}
}
export default connect(mapStateToProps,{login})(Login);