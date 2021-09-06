/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './Dialogs.module.css';
import {initialStateType} from '../../reducers/dialogsReducer';
import {dialogsActions} from '../../reducers/dialogsReducer';
import {AddMessageForm} from '../../Common/AddMessageForm/AddMessageForm';
import List from '@material-ui/core/List';
import Post from '../../Common/Post/Post';
import Divider from '@material-ui/core/Divider';

export type dialogsPropsType = {
    dialogsPage: initialStateType
};

type propsType = dialogsPropsType;

const Dialogs: React.FC<propsType> = (props) => {
    let users = props.dialogsPage.userList.map( (user, userIndex) => {
        return <Post key={'User' + userIndex}
                     postId={String(userIndex)}
                     message={''}
                     avatar={null}
                     userName={user.name}
                     userId={user.id}
                     withoutLikes={true}
                     primaryLink={true}
        />
    });

    let messages = props.dialogsPage.messageList.map( (message, messageIndex) => {
        return <Post key={'Message' + messageIndex}
                     postId={String(messageIndex)}
                     message={message.text}
                     avatar={null}
                     userName={''}
                     withoutLikes={true}
                     rightSided={message.userId === 1}
        />
    });

    return (
        <div className={styles.dialogs}>
            <List className={styles.dialogs_items} style={{height: '90vh', overflowY: 'auto', width: '20%'}}>
                {users}
            </List>
            <Divider orientation='vertical' flexItem={true}/>
            <div className={styles.messages}>
                <List style={{height: '75vh', overflowY: 'auto', width: '100%'}}>
                    {messages}
                </List>
                <Divider/>
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