const SEND_MESSAGE = "SEND-MESSAGE";

type DialogType = {id:number, name: string}
type MessageType = {id: number, message: string}
 
const initialState = {
    dialogs: [
        {id: 0, name: 'Yurii'},
        {id: 1, name: 'Aleksandra'},
        {id: 2, name: 'Varvara'},
        {id: 3, name: 'Kirill'},
        {id: 4, name: 'Anya'},
        {id: 5, name: 'Miya'}
    ] as Array <DialogType>,
    messages: [
        {id: 0 as number, message: 'Hi' as string},
        {id: 1 as number, message: 'What is the capital of Great Britain?' as string},
        {id: 2 as number, message: 'London' as string},
        {id: 3 as number, message: 'Ok' as string},
        {id: 4 as number, message: 'Ok' as string},
        {id: 5 as number, message: 'Yes' as string}
    ] as Array<MessageType>
}

//typescript
export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {

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

export default dialogsReducer

//typescript
export type SendMessageCreatorActionType = {type: typeof SEND_MESSAGE, newMessageText: string}

//actuionCreator
export const sendMessageCreator = (newMessageText: string): SendMessageCreatorActionType => ({type: SEND_MESSAGE, newMessageText: newMessageText})
