import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {sendMessage} from '../../reducers/chatReducer';

export const AddMessage: React.FC = () => {
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    function sendMessageHandler() {
        if (!message) {
            return;
        }

        dispatch(sendMessage(message));
        setMessage('');
    }

    function messageChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setMessage(event.currentTarget.value);
    }

    return (
        <div>
            <div>
                <textarea onChange={messageChange} value={message}/>
            </div>
            <div>
                <button disabled={false} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    );
}