import React from 'react';
import {useSelector} from 'react-redux';
import {getDialogsMessagesSelector, getOwnerIdSelector} from '../../../Common/Selectors/Selectors';
import Post from '../../../Common/Post/Post';
import Divider from '@material-ui/core/Divider';
import {AddMessageForm} from '../../../Common/AddMessageForm/AddMessageForm';
import {sendMessage} from '../../../reducers/dialogsReducer';
import {PostActions} from '../../../Common/Post/PostActions/PostActions';
import {MessagesList} from '../../../Common/MessagesList/MessagesList';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {useHistory} from 'react-router-dom';

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
export const Dialog: React.FC = () => {
    const messages = useSelector(getDialogsMessagesSelector);
    const ownerId = useSelector(getOwnerIdSelector);
    const classes = useStyles();
    const history = useHistory();

    let messagesComponentsList = messages.map(message => {
        return <Post key={'Message' + message.id}
                     postId={message.id}
                     action={message.viewed ? PostActions.textWithOk(message.body) : PostActions.textWithWait(message.body)}
                     avatar={null}
                     userName={''}
                     rightSided={message.senderId === ownerId}
        />
    });

    function closeDialog () {
        history.goBack();
    }

    return (
        <div className={classes.messages}>
            <div className={classes.goBackButtonWrapper}>
                <IconButton onClick={closeDialog}>
                    <ChevronLeftIcon/>
                </IconButton>
                <Divider/>
            </div>
            <MessagesList messages={messagesComponentsList} height={'75vh'}/>
            <Divider/>
            <AddMessageForm blockWidth={'40ch'}
                            sendMessage={sendMessage}
                            buttonText='Send'
                            minTextLength={2}
                            maxTextLength={100}
            />
        </div>
    );
}