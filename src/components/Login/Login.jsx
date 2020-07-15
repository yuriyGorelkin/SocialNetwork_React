import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import LoginReduxForm from "./LoginForm";

const Login = (props) => {

    const onSubmit = (formData) => {
        props.loginUser(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) return <Redirect to={'/profile'} />

    return (
        <>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL} />
        </>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captchaURL
});


export default connect(mapStateToProps, { loginUser })(Login);