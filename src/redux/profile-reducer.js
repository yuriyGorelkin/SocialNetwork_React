import {profileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        {id: 0, message: 'Hey, how are you?', likesCount: '5'},
        {id: 1, message: 'I am fine!', likesCount: '7'}
    ],
    newPostText: 'BlaBlaBla',
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            };

        case ADD_POST:
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, {id: 2, message: state.newPostText, likesCount: '0'}]
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
export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});
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
