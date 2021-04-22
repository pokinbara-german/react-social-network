/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './Messages.module.css';
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";

const Messages = (props) => {
    let users = props.dialogsPage.userList.map( (user, userIndex) => {
        return <DialogsItem key={'User'+userIndex} id={user.id} name={user.name}/>;
    });
    let messages = props.dialogsPage.messageList.map( (message, messageIndex) => {
        return <Message key={'Message' + messageIndex} message={message.text} userId={message.userId}/>;
    });

    let onMessageChange = (event) => props.updateNewMessage(event.target.value);

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs_items}>
                {users}
            </div>
            <div className={styles.messages}>
                {messages}
                <div>
                    <div>
                        <textarea onChange={onMessageChange} value={props.dialogsPage.newMessageText}/>
                    </div>
                    <div>
                        <button onClick={props.sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;