import {sendMessageCreator, updateNewMessageTextCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageCreator());
        },
        updateNewMessageText: (text) => {
            dispatch(updateNewMessageTextCreator(text));
        }
    }
}


const DialogsContainer =  compose(
    connect(mapStateToProps,mapDispatchToProps ),
    withAuthRedirect
)(Dialogs);

export default DialogsContainer;