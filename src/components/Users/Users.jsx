import React from "react";
import styles from './Users.module.css';

const Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 0,
                photoURL: 'https://resizer.mail.ru/p/7a1e86df-9686-5098-963e-27304c6f1133/AAACBYbcG0NlNy7keubhdztLicf0tVpMvOpCNTHFFkrjD4GOT8SXrtdnwK4PIWmYtV7YtLsVEIIn3QUR5KJ5Nn7BBLk.jpg',
                followed: false,
                fullName: 'Yurii',
                status: 'I am looking for a job',
                location: {city: 'Zaporizhzhia', country: 'Ukraine'}
            },
            {
                id: 1,
                photoURL: 'https://resizer.mail.ru/p/7a1e86df-9686-5098-963e-27304c6f1133/AAACBYbcG0NlNy7keubhdztLicf0tVpMvOpCNTHFFkrjD4GOT8SXrtdnwK4PIWmYtV7YtLsVEIIn3QUR5KJ5Nn7BBLk.jpg',
                followed: true,
                fullName: 'Alex',
                status: 'I am a strikeball man',
                location: {city: 'Kursk', country: 'Russia'}
            },
            {
                id: 2,
                photoURL: 'https://resizer.mail.ru/p/7a1e86df-9686-5098-963e-27304c6f1133/AAACBYbcG0NlNy7keubhdztLicf0tVpMvOpCNTHFFkrjD4GOT8SXrtdnwK4PIWmYtV7YtLsVEIIn3QUR5KJ5Nn7BBLk.jpg',
                followed: false,
                fullName: 'Kostya',
                status: 'I am crazy man',
                location: {city: 'Yasinovataya', country: 'Ukraine'}
            }]);
    }

    return (
        <div>
            {props.users.map(u => <div key={u.id}>
                <div>
                    <div>
                        <img src={u.photoURL} className={styles.userPhoto} alt="here will be user_avatar"/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>}
                    </div>
                </div>
                <div>
                    <div>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </div>
                    <div>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </div>
                </div>
            </div>)
            }
        </div>
    );
}


export default Users;