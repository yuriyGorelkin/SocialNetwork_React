import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../Common/FormsControls/FormsControls";
import { required } from "../../Utilits/Validators/Validators";
import styles from '../Common/FormsControls/FormsControls.module.css'


const LoginForm = ({ handleSubmit, error, captcha }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name='email' component={Input} placeholder='email' type='text' validate={required} />
            </div>
            <div>
                <Field name='password' component={Input} placeholder='password' type='password' validate={required} />
            </div>
            {
                error ? <div className={styles.error}>{error}</div> : ''
            }
            <div>
                <Field name='rememberMe' component={Input} type='checkbox' /> Remember me
            </div>
            {
                captcha && <img src={captcha} alt='here will be captcha' />
            }
            {
                captcha && <Field name='captcha' component={Input} placeholder='simbols from captcha' type='text' validate={required} />
            }
            <button type='submit'>Login</button>
        </form>
    );
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);


export default LoginReduxForm;