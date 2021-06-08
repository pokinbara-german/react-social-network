/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './Message.module.css';

type propsType = {
    message: string,
    userId: number
}

const Message: React.FC<propsType> = (props) => {
    let isMe = (props.userId === 1) ? ` ${styles.me}` : '';

    return (
        <div className={styles.message_wrapper + isMe}>
            <img alt='ava' src="https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"/>
            <div className={styles.message}>{props.message}</div>
        </div>
    );
}

export default Message;