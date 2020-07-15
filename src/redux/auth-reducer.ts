import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

const initialState = {
    userID: null as number | null ,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaURL: null as string | null
};

//typescript
type  InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
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

//typescript
type SetAuthUserDataActionPayloadType = {
    userID: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_AUTH_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

type GetCaptchaUrlSuccessActionType = {
    type: typeof SET_AUTH_USER_DATA
    payload: { captchaURL: string }
}

// actionCreators:
const setAuthUserData = (userID: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_AUTH_USER_DATA, payload: { userID, email, login, isAuth }
});

const getCaptchaUrlSuccess = (captchaURL: string): GetCaptchaUrlSuccessActionType => ({ 
    type: SET_AUTH_USER_DATA, payload: { captchaURL } 
});

// thunkCreators:
export const getAuthUserData = () => {
    return async (dispatch: any) => {
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

export const loginUser = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: any) => {
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
    return async (dispatch: any) => {
        let response = await authAPI.logout();

        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export const getCaptchaURL = () => {
    return async (dispatch: any) => {
        const response = await securityAPI.getCaptchaUrl();
        const captchaURL = response.data.url;
        dispatch(getCaptchaUrlSuccess(captchaURL));
    }
}