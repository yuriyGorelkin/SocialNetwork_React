import React from "react";
import styles from './User.module.css';
import userPhoto from '../../../application/images/userPhoto.png';
import {NavLink} from "react-router-dom";

const User = ({user, followingInProgress, unfollow, follow}) => {

    return <div className={styles.user}>
        <div>
            <NavLink to={'/profile/' + user.id}>
                <img src={user.photos.small !== null ? user.photos.small : userPhoto}
                     className={styles.userPhoto} alt="here will be user_avatar"/>
            </NavLink>
        </div>
        <div>
            {user.followed ?
                <button disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => {
                            unfollow(user.id)
                        }}>
                    Unfollow</button>
                : <button disabled={followingInProgress.some(id => id === user.id)}
                          onClick={() => {
                              follow(user.id);
                          }}>
                    Follow</button>
            }
        </div>
        <div>
            <div>{user.name}</div>
            <div>{user.status || 'No Status'}</div>
        </div>
    </div>
}


export default User;