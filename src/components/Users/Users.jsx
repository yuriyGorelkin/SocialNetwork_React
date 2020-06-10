import React from "react";
import styles from './Users.module.css';
import userPhoto from '../../application/images/userPhoto.png';
import * as axios from 'axios';


class Users extends React.Component {

    getUsers = () => {
        if (this.props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                this.props.setUsers(response.data.items);
            });
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.getUsers}> get Users</button>
                {this.props.users.map(u => <div key={u.id}>
                    <div>
                        <div>
                            <img src={u.photos.small !== null ? u.photos.small : userPhoto}
                                 className={styles.userPhoto} alt="here will be user_avatar"/>
                        </div>
                        <div>
                            {u.followed ? <button onClick={() => {
                                    this.props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    this.props.follow(u.id)
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
}


export default Users;