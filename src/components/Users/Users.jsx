import React from "react";
import Pagination from "../Common/Pagination/Pagination";
import User from "./User/User";

const Users = (props) => {
    return <div>
        <Pagination totalItemsCount={props.totalUsersCount}
                    pageSize={props.pageSize}
                    currentPage={props.currentPage}
                    onPageChanged={props.onPageChanged}/>
        <div>
            {props.users.map(user => <User key={user.id}
                                           user={user}
                                           followingInProgress={props.followingInProgress}
                                           unfollow={props.unfollow}
                                           follow={props.follow}/>)
            }
        </div>
    </div>
}

export default Users;