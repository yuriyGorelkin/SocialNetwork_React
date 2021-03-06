import React from "react";
import style from './MyPosts.module.css';
import MyPost from "./Post/MyPost";
import AddNewPostForm from './PostsForm/AddNewPostsForm';



const MyPosts = (props) => {

    let postsElements = props.posts.map(post => <MyPost message={post.message} likesCount={post.likesCount}
                                                        key={post.id}/>).reverse();

    const addNewPost = (values) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={style.postsBlock}>
            <h3>My Posts</h3>
            <AddNewPostForm onSubmit={addNewPost}/>
            <div>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;
