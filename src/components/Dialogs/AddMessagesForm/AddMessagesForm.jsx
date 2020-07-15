import {Field, reduxForm} from "redux-form";
import React from "react";
import {Textarea} from "../../Common/FormsControls/FormsControls";
import {maxLength50, required} from "../../../utilits/validators/validators";


const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field 
                    name='newMessageText'
                    component={Textarea}
                    placeholder="Enter your message"
                    validate={[required, maxLength50]}>
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