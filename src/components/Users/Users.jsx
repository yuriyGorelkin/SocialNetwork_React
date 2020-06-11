import React from "react";
import styles from './Users.module.css';
import userPhoto from '../../application/images/userPhoto.png';


const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            {pages.map(p => {
                return <span key={p}
                             className={props.currentPage === p ? styles.selected : styles.pageNumber}
                             onClick={() => { props.onPageChanged(p)}}> {p} </span>})
            }

            {props.users.map(u => <div key={u.id} className={styles.user}>
                <div>
                    <div>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto}
                             className={styles.userPhoto} alt="here will be user_avatar"/>
                    </div>
                    <div>
                        {u.followed ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </div>
                    <div>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </div>
                </div>
            </div>)
            }
        </div>
    );
}


export default Users;