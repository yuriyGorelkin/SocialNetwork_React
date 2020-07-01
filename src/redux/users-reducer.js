import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../Utilits/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
            }

        case SET_USERS:
            return {...state, users: action.users}

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count < 10 ? action.count : 500
            }
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)
            }
        default:
            return state;
    }
}

export default usersReducer;

// actionCreators:
const followSuccess = (userID) => ({type: FOLLOW, userID: userID});
const unfollowSuccess = (userID) => ({type: UNFOLLOW, userID: userID});
const setUsers = (users) => ({type: SET_USERS, users: users});
const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});
const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching});
const toggleFollowingProgress = (isFetching, userID) => ({
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    followingInProgress: isFetching,
    userID: userID
});

// thunkCreators:
export const requestUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(setCurrentPage(page));
        dispatch(toggleIsFetching(true));

        const data = await usersAPI.getUsers(page, pageSize);

        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

export const follow = (userID) => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userID));
        const data = await usersAPI.followUser(userID);

        if (data.resultCode === 0) {
            dispatch(followSuccess(userID));
        }
        dispatch(toggleFollowingProgress(false, userID));
    }
}

export const unfollow = (userID) => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userID));
        const data = await usersAPI.unfollowUser(userID);

        if (data.resultCode === 0) {
            dispatch(unfollowSuccess(userID));
        }
        dispatch(toggleFollowingProgress(false, userID));
    }
}