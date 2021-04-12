/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './Messages.module.css';
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import {addMessageCreator} from "../../reducers/dialogsReducer";

const Messages = (props) => {
    let users = props.state.userList.map( (user, userIndex) => {
        return <DialogsItem key={'User'+userIndex} id={user.id} name={user.name}/>;
    });
    let messages = props.state.messageList.map( (message, messageIndex) => {
        return <Message key={'Message' + messageIndex} message={message.text} userId={message.userId}/>;
    });

    let NewMessageArea = React.createRef();

    let AddNewMessage = () => {
        let message = NewMessageArea.current.value;
        props.dispatch(addMessageCreator(message));
    };

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs_items}>
                {users}
            </div>
            <div className={styles.messages}>
                {messages}
                <div>
                    <div>
                        <textarea ref={NewMessageArea}/>
                    </div>
                    <div>
                        <button onClick={AddNewMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;