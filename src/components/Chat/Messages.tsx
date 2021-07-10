import React, {useEffect, useRef, useState} from 'react';
import {messageType} from '../API/chat-api';
import {useSelector} from 'react-redux';
import {getChatMessages} from '../../Common/Selectors/Selectors';
import userMale from '../../assets/images/user-male.png';
import styles from './ChatMessages.module.css';

export const Messages: React.FC = () => {
    const messages = useSelector(getChatMessages);
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
    function scrollHandler(event: React.UIEvent<HTMLDivElement, UIEvent>) {
        const element = event.currentTarget;

        if ((element.scrollHeight - element.scrollTop) === element.clientHeight) {
            !isAutoscroll && setIsAutoscroll(true);
        } else {
            isAutoscroll && setIsAutoscroll(false);
        }
    }

    return (
        <div style={{height: '74vh', overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map((messageItem) => <Message key={messageItem.id} message={messageItem}/>)}
            <div  ref={messagesRef}/>
        </div>
    );
};

const Message: React.FC<{message: messageType}> = React.memo(({message}) => {
    return (
        <div>
            <div><img  className={styles.chatAvatar} alt={'ava'} src={message.photo || userMale}/>{message.userName}</div>
            <div>{message.message}</div>
            <hr/>
        </div>
    );
});
