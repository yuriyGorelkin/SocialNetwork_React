import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utilits/object-helpers";
import {UserType} from '../types/types';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS';

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of users id
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
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

//typescript:
type FollowSuccessActionType = {type: typeof FOLLOW, userID: number}
type UnfollowSuccessActionType = {type: typeof UNFOLLOW, userID: number}
type SetUsersActionType = {type: typeof SET_USERS, users: Array<UserType>}
type SetCurrentPageActionType = {type: typeof SET_CURRENT_PAGE, currentPage: number}
type SetTotalUsersCountActionType = {type: typeof SET_TOTAL_USERS_COUNT, count: number}
type ToggleIsFetchingActionType = {type: typeof TOGGLE_IS_FETCHING, isFetching: boolean}
type ToggleFollowingProgressActionType = { type: typeof TOGGLE_FOLLOWING_IN_PROGRESS, followingInProgress: boolean, userID: number }

// actionCreators:
const followSuccess = (userID: number): FollowSuccessActionType => ({type: FOLLOW, userID: userID});
const unfollowSuccess = (userID: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userID: userID});
const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users: users});
const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});
const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching});
const toggleFollowingProgress = (isFetching: boolean, userID: number): ToggleFollowingProgressActionType => ({
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    followingInProgress: isFetching,
    userID: userID
});

// thunkCreators:
export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(setCurrentPage(page));
        dispatch(toggleIsFetching(true));

        const data = await usersAPI.getUsers(page, pageSize);

        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

export const follow = (userID: number) => {
    return async (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userID));
        const data = await usersAPI.followUser(userID);

        if (data.resultCode === 0) {
            dispatch(followSuccess(userID));
        }
        dispatch(toggleFollowingProgress(false, userID));
    }
}

export const unfollow = (userID: number) => {
    return async (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userID));
        const data = await usersAPI.unfollowUser(userID);

        if (data.resultCode === 0) {
            dispatch(unfollowSuccess(userID));
        }
        dispatch(toggleFollowingProgress(false, userID));
    }
}