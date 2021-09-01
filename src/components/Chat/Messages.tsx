import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {getChatMessages, getOwnerIdSelector} from '../../Common/Selectors/Selectors';
import Post from '../../Common/Post/Post';
import List from '@material-ui/core/List';

export const Messages: React.FC = () => {
    const messages = useSelector(getChatMessages);
    const ownerId = useSelector(getOwnerIdSelector);
    const messagesRef = useRef<HTMLDivElement>(null);
    const [isAutoscroll, setIsAutoscroll] = useState(true);

    useEffect(() => {
        if (isAutoscroll) {
            setTimeout(() => {
                messagesRef.current?.scrollIntoView({behavior: 'smooth', block: 'end'});
            }, 500);
        }
    }, [messages, isAutoscroll]);

    /**
     * Detects scroll end and set autoscroll to true or false.
     * @param event
     */
    function scrollHandler(event: React.UIEvent<HTMLUListElement, UIEvent>) {
        const element = event.currentTarget;

        if ((element.scrollHeight - element.scrollTop) === element.clientHeight) {
            !isAutoscroll && setIsAutoscroll(true);
        } else {
            isAutoscroll && setIsAutoscroll(false);
        }
    }

    return (
        <List style={{height: '65vh', overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map((messageItem) =>
                <Post key={'Message' + messageItem.id}
                      postId={messageItem.id}
                      message={messageItem.message}
                      avatar={messageItem.photo}
                      userName={messageItem.userName}
                      withoutLikes={true}
                      rightSided={messageItem.userId === ownerId}
                />)}
            <div  ref={messagesRef}/>
        </List>
    );
};
