import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    getDialogHasMoreSelector,
    getDialogsMessagesSelector,
    getDialogsUserListSelector,
    getIsMessagesFetchingSelector,
    getOwnerIdSelector,
    getOwnerPhotosSelector
} from '../../../Common/Selectors/Selectors';
import Post from '../../../Common/Post/Post';
import Divider from '@material-ui/core/Divider';
import {AddMessageForm} from '../../../Common/AddMessageForm/AddMessageForm';
import {dialogsActions, sendMessage} from '../../../reducers/dialogsReducer';
import {PostActions} from '../../../Common/Post/PostActions/PostActions';
import {MessagesList} from '../../../Common/MessagesList/MessagesList';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import {userListType} from '../../../types';
import {MoreDialogMessagesButton} from './MoreDialogMessagesButton/MoreDialogMessagesButton';
import {GoBackButton} from './GoBackButton/GoBackButton';
import {EmptyMessagesList} from './EmptyMessagesList/EmptyMessagesList';
import Preloader from '../../../Common/Preloader/Preloader';

type dialogPropsType = {
    currentDialogId: number
}

/**
 * @const
 * @type string
 * @description height of block.
 */
const BLOCK_HEIGHT = '70vh';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        messages: {
            flexGrow: 1,
            width: '20%',
            margin: theme.spacing(3),
        }
    })
);

/**
 * Returns opponent data.
 * @param {Array<userListType>} opponents - list of dialogs
 * @param {number} dialogId - profile ID of opponent.
 */
function getOpponentData(opponents: Array<userListType>, dialogId: number):userListType|null  {
    let opponent = opponents.filter(user => {
        return user.id === dialogId ? user as userListType : undefined;
    });

    return opponent.length ? opponent[0] : null;
}

/**
 * Returns block of dialog with list of messages and form to add new.
 * @returns {JSX.Element}
 * @constructor
 */
export const Dialog: React.FC<dialogPropsType> = (props) => {
    let {currentDialogId} = props;
    const messages = useSelector(getDialogsMessagesSelector);
    const opponents = useSelector(getDialogsUserListSelector);
    const ownerId = useSelector(getOwnerIdSelector);
    const ownerPhoto = useSelector(getOwnerPhotosSelector)?.small;
    const hasMore = useSelector(getDialogHasMoreSelector);
    const isMessagesFetching = useSelector(getIsMessagesFetchingSelector);
    const classes = useStyles();
    const dispatch = useDispatch();

    const opponent = getOpponentData(opponents, currentDialogId);
    const opponentPhoto = opponent ? opponent.photos.small : null;

    React.useEffect(() => {
        if (!currentDialogId || !opponent){
            return;
        }

        if (opponent.hasNewMessages) {
            dispatch(dialogsActions.chatMessagesRead(currentDialogId));
        }
    }, [currentDialogId, dispatch, opponent]);

    let messagesComponentsList = messages.map(message => {
        const isOwner = message.senderId === ownerId;
        const action = isOwner
            ? (message.viewed
                ? PostActions.textWithOk(message.body, message.addedAt)
                : PostActions.textWithWait(message.body, message.addedAt)
              )
            : PostActions.onlyText(message.body, message.addedAt);

        return <Post key={'Message' + message.id}
                     postId={message.id}
                     action={action}
                     avatar={!isOwner ? opponentPhoto : ownerPhoto || null}
                     userName={''}
                     rightSided={isOwner}
        />
    });

    if (hasMore) {
        messagesComponentsList.unshift(
            isMessagesFetching ? <Preloader/> : <MoreDialogMessagesButton key={'MoreMessagesButton'} currentDialogId={currentDialogId}/>
        );
    }

    return (
        <div className={classes.messages}>
            <GoBackButton/>
            {messages.length
                ? <MessagesList messages={messagesComponentsList} height={BLOCK_HEIGHT}/>
                : isMessagesFetching
                    ? <div style={{height: BLOCK_HEIGHT}}><Preloader/></div>
                    : <EmptyMessagesList/>
            }
            <Divider/>
            <AddMessageForm blockWidth={'30ch'}
                            sendMessage={sendMessage}
                            buttonText='Send'
                            minTextLength={2}
            />
        </div>
    );
}