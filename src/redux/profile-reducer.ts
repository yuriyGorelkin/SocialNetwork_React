import {profileAPI} from "../api/api";
import {stopSubmit} from 'redux-form';
import { PostsType, ProfileType, PhotosType } from "../types/types";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

const initialState = {
    posts: [{
            id: 0,
            message: 'Hey, how are you?',
            likesCount: 5
        },
        {
            id: 1,
            message: 'I am fine!',
            likesCount: 7
        }
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: '' as string
};

type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts,
                {
                    id: 2,
                    message: action.newPostText,
                    likesCount: 0
                }]
            };

        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile
            };

        case SET_STATUS:
            return {
                ...state, status: action.status
            };

        case SAVE_PHOTO_SUCCESS:
            return {
                ...state, 
                profile: {...state.profile, photos: action.photo} as ProfileType
            };

        default:
            return state;
    }
}

export default profileReducer;

//typescript
export type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string
}

export type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}

export type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}

export type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photo: PhotosType
}

//actionCreators:
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({
    type: ADD_POST,
    newPostText: newPostText
});
const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile: profile
});
const setStatus = (status: string): SetStatusActionType => ({
    type: SET_STATUS,
    status: status
});
const savePhotoSuccess = (photos: any): SavePhotoSuccessActionType => ({
    type: SAVE_PHOTO_SUCCESS,
    photo: photos
});


// thunkCreators:
export const getUserProfile = (userID: number) => async (dispatch: any) => {
    const data = await profileAPI.getProfile(userID);
    dispatch(setUserProfile(data));
}

export const getStatus = (userID: number) => async (dispatch: any) => {
    const data = await profileAPI.getStatus(userID);
    dispatch(setStatus(data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    const response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    const response = await profileAPI.savePhoto(file);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userID = getState().auth.userID;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userID));
    } else {
        dispatch(stopSubmit('edit-profile', {
            _error: response.data.messages[0]
        }));
        return Promise.reject(response.data.messages[0]);
    }
}