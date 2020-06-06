const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        {id: 0, message: 'Hey, how are you?', likesCount: '5'},
        {id: 1, message: 'I am fine!', likesCount: '7'}
    ],
    newPostText: 'BlaBlaBla'
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
            }
        default:
            return state;
    }
}

export default profileReducer;

export const addPostActionCreator = () => ({type: ADD_POST});

export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});

