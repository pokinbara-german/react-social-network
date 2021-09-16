import React from 'react';
import {useSelector} from 'react-redux';
import {getChatMessages, getOwnerIdSelector} from '../../Common/Selectors/Selectors';
import Post from '../../Common/Post/Post';
import {PostActions} from '../../Common/Post/PostActions/PostActions';
import {MessagesList} from '../../Common/MessagesList/MessagesList';

export const ChatMessages: React.FC = () => {
    const messages = useSelector(getChatMessages);
    const ownerId = useSelector(getOwnerIdSelector);

    let messagesComponentsList = messages.map((messageItem) =>
        <Post key={'Message' + messageItem.id}
              postId={messageItem.id}
              action={PostActions.onlyText(messageItem.message)}
              avatar={messageItem.photo}
              userName={messageItem.userName}
              userId={messageItem.userId}
              rightSided={messageItem.userId === ownerId}
        />);

    return (
        <MessagesList messages={messagesComponentsList} height={'65vh'}/>
    );
};
