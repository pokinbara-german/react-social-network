/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './Dialogs.module.css';
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import {initialStateType} from '../../reducers/dialogsReducer';
import {dialogsActions} from '../../reducers/dialogsReducer';
import {AddMessageForm} from '../../Common/AddMessageForm/AddMessageForm';

export type dialogsPropsType = {
    dialogsPage: initialStateType
};

type propsType = dialogsPropsType;

const Dialogs: React.FC<propsType> = (props) => {
    let users = props.dialogsPage.userList.map( (user, userIndex) => {
        return <DialogsItem key={'User'+userIndex} id={user.id} name={user.name}/>;
    });
    let messages = props.dialogsPage.messageList.map( (message, messageIndex) => {
        return <Message key={'Message' + messageIndex} message={message.text} userId={message.userId}/>;
    });

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs_items}>
                {users}
            </div>
            <div className={styles.messages}>
                {messages}
                <AddMessageForm blockWidth={'40ch'}
                                sendMessage={dialogsActions.sendMessage}
                                buttonText='Send'
                                minTextLength={2}
                                maxTextLength={100}
                />
            </div>
        </div>
    );
};

export default Dialogs;