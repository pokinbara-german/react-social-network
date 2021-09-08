/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, {useEffect} from 'react';
import styles from './Dialogs.module.css';
import {getDialogsList, getMessagesList, initialStateType, sendMessage} from '../../reducers/dialogsReducer';
import {dialogsActions} from '../../reducers/dialogsReducer';
import {AddMessageForm} from '../../Common/AddMessageForm/AddMessageForm';
import List from '@material-ui/core/List';
import Post from '../../Common/Post/Post';
import Divider from '@material-ui/core/Divider';
import {useDispatch, useSelector} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {MatchParams} from '../../types';
import {getOwnerIdSelector} from '../../Common/Selectors/Selectors';

export type dialogsPropsType = {
    dialogsPage: initialStateType
};

type matchType = RouteComponentProps<MatchParams>;

/**
 * Returns page with dialogs.
 * @param {dialogsPropsType} props - props object (whole dialogs stage)
 * @constructor
 */
const Dialogs: React.FC<dialogsPropsType & matchType> = (props) => {
    const dispatch = useDispatch();
    const ownerId = useSelector(getOwnerIdSelector);
    const currentDialogId = props.match.params.userId ? parseInt(props.match.params.userId) : 0;

    let users = props.dialogsPage.userList.map( (user) => {
        return <Post key={'User' + user.id}
                     postId={String(user.id)}
                     message={''}
                     avatar={user.photos.small}
                     userName={user.userName}
                     userId={user.id}
                     withoutLikes={true}
                     primaryLink={true}
        />
    });

    let messages = props.dialogsPage.messageList.map( (message) => {
        return <Post key={'Message' + message.id}
                     postId={message.id}
                     message={message.body}
                     avatar={null}
                     userName={''}
                     withoutLikes={true}
                     rightSided={message.senderId === ownerId}
        />
    });

    useEffect(() => {
        if (currentDialogId) {
            dispatch(dialogsActions.chatChanged(currentDialogId));
            dispatch(getMessagesList(currentDialogId));
        }
    }, [currentDialogId, dispatch]);

    useEffect(() => {
        dispatch(getDialogsList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                                sendMessage={sendMessage}
                                buttonText='Send'
                                minTextLength={2}
                                maxTextLength={100}
                />
            </div>
        </div>
    );
};

export default Dialogs;