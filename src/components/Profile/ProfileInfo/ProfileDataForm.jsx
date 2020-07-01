import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input, Textarea } from "../../Common/FormsControls/FormsControls";
import styles from '../../Common/FormsControls/FormsControls.module.css';

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>        
        <div>
            <b>Full Name:</b>
            <Field name='fullName' component={Input} placeholder='Full Name' type='text' />
        </div>
        <div>
            <b>Looking for a job:</b>
            <Field name='lookingForAJob' component={Input} type='checkbox' />
        </div>
        <div>
            <b>My professional skills:</b>
            <Field name='lookingForAJobDescription' component={Textarea} placeholder='My professional skills' />
        </div>
        <div>
            <b>About me:</b>
            <Field name='aboutMe' component={Textarea} placeholder='About Me' />
        </div>
        {
            error ? <div className={styles.error}>{error}</div> : ''
        }
        <div>
            <b>My contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <div key={key}>
                    <b>{key}:</b> <Field name={`contacts.${key}`} component={Input} placeholder={key} type='text' />
                </div>
            })}
        </div>
        <div>
            <button type='submit'>Save</button>
        </div>
    </form>
}


export default reduxForm({ form: 'edit-profile' })(ProfileDataForm);
