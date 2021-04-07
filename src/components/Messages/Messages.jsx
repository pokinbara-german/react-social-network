/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './Messages.module.css';
import {NavLink} from 'react-router-dom';

const DialogsItem = (props) => {
    let path = "/messages/" + props.id;
    return(
            <div className={styles.dialog}>
                    <NavLink to={path}>{props.name}</NavLink>
                </div>
           );
}

const Message = (props) => {
    return(
            <div className={styles.message}>{props.message}</div>
           );
}

const Messages = () => {
    let userList = [
        {id:1, name: 'Andrey'},
        {id:2, name: 'Sergey'},
        {id:3, name: 'Misha'}
    ];

    let messageList = [
        {id: 1, text: 'First!'},
        {id: 2, text: 'Second!'},
        {id: 3, text: 'Third!'},
    ];

    let users = userList.map( user => <DialogsItem id={user.id} name={user.name}/>);
    let messages = messageList.map( message => <Message message={message.text}/>);

    return(
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