import {Field, reduxForm} from "redux-form";
import React from "react";


let AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPostText' component='textarea' placeholder= 'add your post' />
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    );
}

AddNewPostForm = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm);

export default AddNewPostForm;