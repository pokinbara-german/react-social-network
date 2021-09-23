import React from 'react';
import {useSelector} from 'react-redux';
import {getDialogsUserListSelector} from '../../../Common/Selectors/Selectors';
import {Counter} from '../../../Common/Counter/Counter';
import Post from '../../../Common/Post/Post';
import List from '@material-ui/core/List';
import {createStyles, makeStyles} from '@material-ui/core';

type dialogsListPropsType = {
    currentDialogId: number
}

const useStyles = makeStyles(() =>
    createStyles({
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

/**
 * Returns complete block with list of dialogs.
 * @param {dialogsListPropsType} props - props object
 * @param {number} props.currentDialogId - props object
 * @returns {JSX.Element}
 * @constructor
 */
export const DialogsList: React.FC<dialogsListPropsType> = (props) => {
    const userList = useSelector(getDialogsUserListSelector);
    const classes = useStyles();

    let users = userList.map((user) => {
        let action = user.newMessagesCount > 0 ? <Counter count={user.newMessagesCount} inCorner={true}/> : undefined;

        return <Post key={'User' + user.id}
                     postId={String(user.id)}
                     avatar={user.photos.small}
                     userName={user.userName}
                     userId={user.id}
                     primaryLink={user.id !== props.currentDialogId}
                     action={action}
        />
    });

    return (
        <List className={classes.dialogsItems}>
            {users}
        </List>
    );
}