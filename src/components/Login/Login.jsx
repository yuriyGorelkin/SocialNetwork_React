import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../Utilits/Validators/Validators";
import {connect} from "react-redux";
import {loginUser} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='email' component={Input} placeholder='email' type='text' validate={required}/>
            </div>
            <div>
                <Field name='password' component={Input} placeholder='password' type='password' validate={required}/>
            </div>
            <div>
                <Field name='rememberMe' component={Input} type='checkbox'/> Remember me
            </div>
            <button type='submit'>Login</button>
        </form>
    );
}


const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);


const Login = (props) => {

    const onSubmit = (formData) => {
        props.loginUser(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) return <Redirect to={'/profile'}/>

    return (
        <>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});


export default connect(mapStateToProps, {loginUser})(Login);