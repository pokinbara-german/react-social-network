import React from 'react';
import {useSelector} from 'react-redux';
import {getOwnerIdSelector} from '../../../Common/Selectors/Selectors';
import Post from '../../../Common/Post/Post';
import styles from '../Dialogs.module.css';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {AddMessageForm} from '../../../Common/AddMessageForm/AddMessageForm';
import {sendMessage} from '../../../reducers/dialogsReducer';
import {messageListType} from '../../../types';

type dialogPropsType = {
    messageList: Array<messageListType>
}

/**
 * Returns block of dialog with list of messages and form to add new.
 * @param {dialogPropsType} props - props object
 * @param {Array<messageListType>} props.messageList - array with messages.
 * @constructor
 */
export const Dialog: React.FC<dialogPropsType> = (props) => {
    const ownerId = useSelector(getOwnerIdSelector);

    let messages = props.messageList.map(message => {
        return <Post key={'Message' + message.id}
                     postId={message.id}
                     message={message.body}
                     avatar={null}
                     userName={''}
                     withoutLikes={true}
                     rightSided={message.senderId === ownerId}
        />
    });

    return (
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
    );
}