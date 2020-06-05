import React from "react";
import style from './MyPosts.module.css';
import MyPost from "./Post/MyPost";


const  MyPosts = (props) => {

    let postsElements = props.posts.map(post => <MyPost message={post.message} likesCount={post.likesCount} key={post.id}/>);

    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();
    };

    let onPostChange = ()=> {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    };

    return (
        <div className={style.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange}
                              ref={newPostElement}
                              value={props.newPostText} />
                </div>
                <div>
                    <button onClick={onAddPost}>Add Post</button>
                </div>
            </div>
            <div>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;