import React from "react";
import style from './MyPost.module.css';
import avatar from './images/avatar.jpg';

const MyPost = (props) => {
    return (
        <div className={style.item}>
            <img src={avatar} className={style.ava} alt="here will be avatar"/>
            {props.message}
            <div className="">
                <span>&#10084; Like {props.likesCount}</span>
            </div>
        </div>

    );
}

export default MyPost;



