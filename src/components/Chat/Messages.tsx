import React, {useEffect, useRef} from 'react';
import {messageType} from '../API/chat-api';
import {useSelector} from 'react-redux';
import {getChatMessages} from '../../Common/Selectors/Selectors';

export const Messages: React.FC = () => {
    const messages = useSelector(getChatMessages);
    const messagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            messagesRef.current?.scrollIntoView({behavior: 'smooth', block: 'end'});
        }, 500);
    }, [messages]);

    return (
        <div style={{height: '74vh', overflowY: 'auto'}}>
            {messages.map((messageItem, index) => <Message key={index} message={messageItem}/>)}
            <div  ref={messagesRef}/>
        </div>
    );
}
const Message: React.FC<{ message: messageType }> = ({message}) => {
    return (
        <div>
            <div><img alt={'ava'} src={message.photo}/>{message.userName}</div>
            <div>{message.message}</div>
            <hr/>
        </div>
    );
}
