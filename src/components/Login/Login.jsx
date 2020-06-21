import React from "react";
import {Field, reduxForm} from "redux-form";
import {authAPI} from "../../api/api";
import {Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../Utilits/Validators/Validators";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='login' component={Input} placeholder='login' type='text' validate={required} />
            </div>
            <div>
                <Field name='password' component={Input}  placeholder='password' type='password' validate={required} />
            </div>
            <div>
                <Field name='rememberMe' component={Input} type='checkbox'/> Remember me
            </div>
            <button type='submit'>Login</button>
        </form>
    );
}


const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);


const Login = () => {
    const onSubmit = (formData) => {
        console.log(formData);
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