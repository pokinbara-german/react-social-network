/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, {useEffect} from 'react';
import styles from './Dialogs.module.css';
import {dialogsActions, getDialogsList, getMessagesList, initialStateType} from '../../reducers/dialogsReducer';
import List from '@material-ui/core/List';
import Post from '../../Common/Post/Post';
import Divider from '@material-ui/core/Divider';
import {useDispatch} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {MatchParams} from '../../types';
import {NoDialog} from './NoDialog/NoDialog';
import {Dialog} from './Dialog/Dialog';

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
    const currentDialogId = props.match.params.userId ? parseInt(props.match.params.userId) : 0;

    let users = props.dialogsPage.userList.map( (user) => {
        return <Post key={'User' + user.id}
                     postId={String(user.id)}
                     avatar={user.photos.small}
                     userName={user.userName}
                     userId={user.id}
                     primaryLink={user.id !== currentDialogId}
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
            {currentDialogId
                ? <Dialog/>
                : <NoDialog/>
            }
        </div>
    );
};

export default Dialogs;