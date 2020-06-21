import {Field, reduxForm} from "redux-form";
import React from "react";
import {maxLength10, required} from "../../../../Utilits/Validators/Validators";
import {Textarea} from "../../../Common/FormsControls/FormsControls";


let AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPostText' component={Textarea} placeholder= 'add your post'
                       validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    );
}

AddNewPostForm = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm);

export default AddNewPostForm;

