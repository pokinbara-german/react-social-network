/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {sendMessage, updateNewMessage} from "../../reducers/dialogsReducer";
import {connect} from "react-redux";
import Messages from "./Messages";

let mapStateToProps = (state) => {
    return (
        {dialogsPage: state.dialogsPage}
    );
};

const MessagesContainer = connect(mapStateToProps, {sendMessage, updateNewMessage})(Messages);

export default MessagesContainer;