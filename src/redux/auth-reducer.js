import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

let initialState = {
    userID: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export default authReducer;

// actionCreators:
const setAuthUserData = (userID, email, login, isAuth) => ({type: SET_AUTH_USER_DATA, payload: {userID, email, login, isAuth}});

// thunkCreators:
export const getAuthUserData = () => (dispatch) => {
    authAPI.me()
        .then((response) => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        });
}

export const loginUser = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData());
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Something not valid';
                dispatch(stopSubmit('login',{_error: message}));
            }
        });
}

export const logoutUser = () => (dispatch) => {
    authAPI.logout()
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
}



