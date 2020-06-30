import {profileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

const initialState = {
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

        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photo}};

        default:
            return state;
    }
}

export default profileReducer;

//actionCreators:
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText: newPostText});
const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile: profile});
const setStatus = (status) => ({type: SET_STATUS, status: status});
const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photo: photos});


// thunkCreators:
export const getUserProfile = (userID) => async (dispatch) => {
    const data = await profileAPI.getProfile(userID);
    dispatch(setUserProfile(data));
}

export const getStatus = (userID) => async (dispatch) => {
    const data = await profileAPI.getStatus(userID);
    dispatch(setStatus(data));
}

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userID = getState().auth.userID;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userID));
    }
}
