import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessage} from '../../reducers/chatReducer';
import {appStateType} from '../../redux/reduxStore';

export const AddMessage: React.FC = () => {
    const [message, setMessage] = useState('');

    const isConnected = useSelector((state: appStateType) => state.chat.isConnected);

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
                <button disabled={!isConnected} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    );
}