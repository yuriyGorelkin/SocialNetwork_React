import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
};

const initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action:any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export default appReducer;

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
} 

// actionCreators:
const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

// thunkCreators:
export const initializeApp = () => (dispatch: any) => {
   let promise = dispatch(getAuthUserData());
   Promise.all([promise])
       .then(() => {
           dispatch(initializedSuccess());
       });
}

