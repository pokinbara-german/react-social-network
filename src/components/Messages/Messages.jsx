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
    let users = props.state.userList.map(user => <DialogsItem id={user.id} name={user.name}/>);
    let messages = props.state.messageList.map(message => <Message message={message.text} userId={message.userId}/>);

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs_items}>
                {users}
            </div>
            <div className={styles.messages}>
                {messages}
            </div>
        </div>);
};

export default Messages;