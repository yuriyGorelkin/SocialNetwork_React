import {authAPI,securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userID: null,
    email: null,
    login: null,
    isAuth: false,
    captchaURL: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
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
const setAuthUserData = (userID, email, login, isAuth) => ({ type: SET_AUTH_USER_DATA,payload: {userID, email, login, isAuth}});

const getCaptchaUrlSuccess = (captchaURL) => ({type: SET_AUTH_USER_DATA, payload: { captchaURL}});

// thunkCreators:
export const getAuthUserData = () => {
    return async (dispatch) => {
        const response = await authAPI.me();

        if (response.data.resultCode === 0) {
            let {
                id,
                email,
                login
            } = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
}

export const loginUser = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe, captcha);

        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaURL());
            }

            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Something not valid';
            dispatch(stopSubmit('login', {
                _error: message
            }));
        }
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        let response = await authAPI.logout();

        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export const getCaptchaURL = () => {
    return async (dispatch) => {
        const response = await securityAPI.getCaptchaUrl();
        const captchaURL = response.data.url;
        dispatch(getCaptchaUrlSuccess(captchaURL));
    }
}