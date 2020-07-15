import {Field, reduxForm} from "redux-form";
import React from "react";
import {maxLength50, required} from "../../../../utilits/validators/validators";
import {Textarea} from "../../../Common/FormsControls/FormsControls";


let AddNewPostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPostText' component={Textarea} placeholder= 'add your post'
                       validate={[required, maxLength50]}/>
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    );
}

AddNewPostForm = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm);

export default AddNewPostForm;

