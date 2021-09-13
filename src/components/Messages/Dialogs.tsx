/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, {useEffect} from 'react';
import {dialogsActions, getDialogsList, getMessagesList, initialStateType} from '../../reducers/dialogsReducer';
import List from '@material-ui/core/List';
import Post from '../../Common/Post/Post';
import Divider from '@material-ui/core/Divider';
import {useDispatch} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {MatchParams} from '../../types';
import {NoDialog} from './NoDialog/NoDialog';
import {Dialog} from './Dialog/Dialog';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import {Counter} from '../../Common/Counter/Counter';

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

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            dialogsWrapper: {
                display: 'flex',
                margin: theme.spacing(-3)
            },
            dialogs: {
                display: 'flex',
                [theme.breakpoints.down('xs')]: {
                    display: currentDialogId ? 'none' : 'flex',
                    width: '100%'
                },
            },
            dialogsItems: {
                height: '90vh',
                overflowY: 'auto',
                flexGrow: 1,
                '& > li > div': {
                    flexGrow: 1,
                }
            }
        }),
    );

    const classes = useStyles();

    let users = props.dialogsPage.userList.map( (user) => {
        let action = user.newMessagesCount > 0 ? <Counter count={user.newMessagesCount} inCorner={true}/> : undefined;

        return <Post key={'User' + user.id}
                     postId={String(user.id)}
                     avatar={user.photos.small}
                     userName={user.userName}
                     userId={user.id}
                     primaryLink={user.id !== currentDialogId}
                     action={action}
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
        <div className={classes.dialogsWrapper}>
            <div className={classes.dialogs}>
                <List className={classes.dialogsItems}>
                    {users}
                </List>
                <Divider orientation='vertical'/>
            </div>
            {currentDialogId
                ? <Dialog currentDialogId={currentDialogId}/>
                : <NoDialog/>
            }
        </div>
    );
};

export default Dialogs;