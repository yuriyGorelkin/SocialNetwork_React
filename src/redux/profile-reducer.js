import {profileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        {id: 0, message: 'Hey, how are you?', likesCount: '5'},
        {id: 1, message: 'I am fine!', likesCount: '7'}
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
       case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 2, message: action.newPostText, likesCount: '0'}]
            };

        case SET_USER_PROFILE:
            return {...state, profile: action.profile};

        case SET_STATUS:
            return {...state, status: action.status};

        default:
            return state;
    }
}

export default profileReducer;

//actionCreators:
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText: newPostText});
const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile: profile});
const setStatus = (status) => ({type: SET_STATUS, status: status});


// thunkCreators:
export const getUserProfile = (userID) => {
    return (dispatch) => {
        profileAPI.getProfile(userID)
            .then(data => {
                dispatch(setUserProfile(data));
            });
    }
}

export const getStatus = (userID) => {
    return (dispatch) => {
        profileAPI.getStatus(userID)
            .then(data => {
                dispatch(setStatus(data));
            });
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status));
                }
            });
    }
}
