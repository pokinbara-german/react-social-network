/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {addMessageCreator} from "../../reducers/dialogsReducer";
import {connect} from "react-redux";
import Messages from "./Messages";

let mapStateToProps = (state) => {
    return (
        {dialogsPage: state.dialogsPage}
    );
};

let mapDispatchToProps = (dispatch) => {
    return (
        {
            sendMessage: (message) => {
                dispatch(addMessageCreator(message));
            }
        }
    );
};

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);

export default MessagesContainer;