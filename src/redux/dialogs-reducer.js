const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessagesText: action.newText
            };

        case SEND_MESSAGE:
            let newText = state.newMessagesText
            return {
                ...state,
                newMessagesText: '',
                messages: [...state.messages, {id: 7, message: newText}]
            };
        default:
            return state;
    }
}

export default dialogsReducer;

export const sendMessageCreator = () => ({type: SEND_MESSAGE});
export const updateNewMessageTextCreator = (text) => ({type: UPDATE_NEW_MESSAGE_TEXT, newText: text});