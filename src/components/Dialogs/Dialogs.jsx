import React from "react";
import style from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddReduxMessageForm from "./AddMessagesForm/AddMessagesForm";

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(dialog => <DialogItem name={dialog.name}
                                                                  id={dialog.id}
                                                                  key={dialog.id}/>);

    let messagesElements = state.messages.map(message => <Message message={message.message}
                                                                  key={message.id}/>);

    const addNewMessage = (values) => {
        props.sendMessage(values.newMessageText);
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                <div>{messagesElements}</div>
                <AddReduxMessageForm onSubmit={addNewMessage}/>
            </div>
        </div>
    );
}

export default Dialogs;

