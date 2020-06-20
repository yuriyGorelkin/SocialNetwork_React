const SEND_MESSAGE = "SEND-MESSAGE";

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
    ]
};

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SEND_MESSAGE:
            let newText = action.newMessageText
            return {
                ...state,
                messages: [...state.messages, {id: 7, message: newText}]
            };

        default:
            return state;
    }
}

export default dialogsReducer;

export const sendMessageCreator = (newMessageText) => ({type: SEND_MESSAGE, newMessageText: newMessageText});
