import React from "react";
import styles from './Login.module.css';
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../reducers/authReducer";
import {Redirect} from "react-router-dom";
import {Input} from "../../Common/FormComponents/FieldsComponents/FieldsComponents";
import {maxLengthCreator, required} from "../../utils/validators";

let maxLength30 = maxLengthCreator(30);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.login, formData.password, formData.rememberMe);
    }

    if (props.auth) {
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
            <Field className={styles.loginInput} placeholder={'Login'} name={'login'} component={Input} validate={[required, maxLength30]}/>
            <Field className={styles.loginInput} placeholder={'Password'} name={'password'} component={Input} type={'password'} validate={[required, maxLength30]}/>
            <div className={styles.checkboxWrapper}>
                <Field type={'checkbox'} name={'rememberMe'} component={Input}/>
                <span>remember me</span>
            </div>
            <button>Login</button>
        </form>
    );
}

const LoginReduxForm = reduxForm({form: 'login'}) (LoginForm);

let mapStateToProps = (state) => {
    return {auth: state.auth.isAuth}
}
export default connect(mapStateToProps,{login})(Login);