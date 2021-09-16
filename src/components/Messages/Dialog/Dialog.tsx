import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    getDialogsMessagesSelector,
    getDialogsUserListSelector,
    getOwnerIdSelector, getOwnerPhotosSelector
} from '../../../Common/Selectors/Selectors';
import Post from '../../../Common/Post/Post';
import Divider from '@material-ui/core/Divider';
import {AddMessageForm} from '../../../Common/AddMessageForm/AddMessageForm';
import {dialogsActions, sendMessage} from '../../../reducers/dialogsReducer';
import {PostActions} from '../../../Common/Post/PostActions/PostActions';
import {MessagesList} from '../../../Common/MessagesList/MessagesList';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {useHistory} from 'react-router-dom';
import {userListType} from '../../../types';
import {getRouteNameById, routes} from '../../../Common/Routes';

type dialogPropsType = {
    currentDialogId: number
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        messages: {
            flexGrow: 1,
            width: '20%',
            margin: theme.spacing(3),
        },
        goBackButtonWrapper: {
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        }
    }),
);

/**
 * Returns block of dialog with list of messages and form to add new.
 * @constructor
 */
export const Dialog: React.FC<dialogPropsType> = (props) => {
    let {currentDialogId} = props;
    const messages = useSelector(getDialogsMessagesSelector);
    const opponents = useSelector(getDialogsUserListSelector);
    const ownerId = useSelector(getOwnerIdSelector);
    const ownerPhoto = useSelector(getOwnerPhotosSelector)?.small;
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const opponent = opponents.filter(user => {
        return user.id === currentDialogId ? user as userListType : undefined;
    });

    const opponentPhoto = opponent.length ? opponent[0].photos.small : null;

    useEffect(() => {
        if (!currentDialogId || !opponent.length){
            return;
        }

        if (opponent[0].hasNewMessages) {
            dispatch(dialogsActions.chatMessagesRead(currentDialogId));
        }
    }, [currentDialogId, dispatch, opponent]);

    let messagesComponentsList = messages.map(message => {
        const isOwner = message.senderId === ownerId;
        const action = isOwner
            ? (message.viewed
                ? PostActions.textWithOk(message.body)
                : PostActions.textWithWait(message.body)
              )
            : PostActions.onlyText(message.body);

        return <Post key={'Message' + message.id}
                     postId={message.id}
                     action={action}
                     avatar={!isOwner ? opponentPhoto : ownerPhoto || null}
                     userName={''}
                     rightSided={isOwner}
        />
    });

    function closeDialog () {
        history.push(`/${getRouteNameById(routes.dialogs.id)}`);
    }

    return (
        <div className={classes.messages}>
            <div className={classes.goBackButtonWrapper}>
                <IconButton onClick={closeDialog}>
                    <ChevronLeftIcon/>
                </IconButton>
                <Divider/>
            </div>
            <MessagesList messages={messagesComponentsList} height={'70vh'}/>
            <Divider/>
            <AddMessageForm blockWidth={'30ch'}
                            sendMessage={sendMessage}
                            buttonText='Send'
                            minTextLength={2}
            />
        </div>
    );
}