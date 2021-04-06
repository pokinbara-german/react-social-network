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
    return(
        <div className={styles.dialogs}>
            <div className={styles.dialogs_items}>
                <DialogsItem id="1" name="Andrey"/>
                <DialogsItem id="2" name="Sergey"/>
                <DialogsItem id="3" name="Misha"/>
            </div>
            <div className={styles.messages}>
                <Message message="First!"/>
                <Message message="Second!"/>
                <Message message="Third!"/>
            </div>
        </div>);
};

export default Messages;