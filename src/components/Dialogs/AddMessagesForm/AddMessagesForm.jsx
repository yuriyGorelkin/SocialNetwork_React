import {Field, reduxForm} from "redux-form";
import React from "react";


const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newMessageText' component='textarea'
                       placeholder="Enter your message">
                </Field>
            </div>
            <div>
                <button type='submit'>Send</button>
            </div>
        </form>
    );
}

const AddReduxMessageForm = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);

export default AddReduxMessageForm;