import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

const store = {
    _state: {
        profilePage: {
            posts: [
                {id: 0, message: 'Hey, how are you?', likesCount: '5'},
                {id: 1, message: 'I am fine!', likesCount: '7'}
            ],
            newPostText: 'BlaBlaBla'
        },
        dialogsPage: {
            dialogs: [
                {id: 0, name: 'Yurii'},
                {id: 1, name: 'Aleksandra'},
                {id: 2, name: 'Varvara'},
                {id: 3, name: 'Kirill'},
                {id: 4, name: 'Anya'},
                {id: 5, name: 'Miya'}
            ],
            messages: [
                {id: 0, message: 'Hi'},
                {id: 1, message: 'What is the capital of Great Britain?'},
                {id: 2, message: 'London'},
                {id: 3, message: 'Ok'},
                {id: 4, message: 'Ok'},
                {id: 5, message: 'Yes'}
            ],
            newMessagesText: ''
        },
        sideBar: {}
    },

    _callSubscriber() {

    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sideBar = sidebarReducer(this._state.sideBar, action);
        this._callSubscriber(this._state);
    }
}

export default store;









