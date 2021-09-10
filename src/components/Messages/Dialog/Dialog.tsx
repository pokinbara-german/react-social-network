import React from 'react';
import {useSelector} from 'react-redux';
import {getDialogsMessagesSelector, getOwnerIdSelector} from '../../../Common/Selectors/Selectors';
import Post from '../../../Common/Post/Post';
import styles from '../Dialogs.module.css';
import Divider from '@material-ui/core/Divider';
import {AddMessageForm} from '../../../Common/AddMessageForm/AddMessageForm';
import {sendMessage} from '../../../reducers/dialogsReducer';
import {PostActions} from '../../../Common/Post/PostActions/PostActions';
import {MessagesList} from '../../../Common/MessagesList/MessagesList';

/**
 * Returns block of dialog with list of messages and form to add new.
 * @constructor
 */
export const Dialog: React.FC = () => {
    const messages = useSelector(getDialogsMessagesSelector);
    const ownerId = useSelector(getOwnerIdSelector);

    let messagesComponentsList = messages.map(message => {
        return <Post key={'Message' + message.id}
                     postId={message.id}
                     action={message.viewed ? PostActions.textWithOk(message.body) : PostActions.textWithWait(message.body)}
                     avatar={null}
                     userName={''}
                     rightSided={message.senderId === ownerId}
        />
    });

    return (
        <div className={styles.messages}>
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