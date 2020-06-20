import React from "react";
import {Field, reduxForm} from "redux-form";
import {authAPI} from "../../api/api";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='login' component='input' placeholder='login' type='text'/>
            </div>
            <div>
                <Field component='input' name='password' placeholder='password' type='password'/>
            </div>
            <div>
                <Field component='input' name='rememberMe' type='checkbox'/> Remember me
            </div>
            <button type='submit'>Login</button>
        </form>
    );
}


const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);


const Login = () => {
    const onSubmit = (formData) => {
        authAPI.logIn(formData.login, formData.password, formData.rememberMe)
            .then((response)=> {
                if (response.data.resultCode === 0) {
                    // let myID = response.data.userID;
               }
            })
    }

    return (
        <>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </>
    );
}

export default Login;