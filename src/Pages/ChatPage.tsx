import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {startMessagesListening, stopMessagesListening} from '../reducers/chatReducer';
import {Messages} from '../components/Chat/Messages';
import {AddMessage} from '../components/Chat/AddMessage';

const ChatPage: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, []);

    return(
        <div>
            <Messages/>
            <AddMessage/>
        </div>
    );
}

export default ChatPage;