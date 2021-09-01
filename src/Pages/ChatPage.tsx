import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {startMessagesListening, stopMessagesListening} from '../reducers/chatReducer';
import {Messages} from '../components/Chat/Messages';
import {AddMessage} from '../components/Chat/AddMessage';
import Divider from '@material-ui/core/Divider';

const ChatPage: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div>
            <Messages/>
            <Divider/>
            <AddMessage/>
        </div>
    );
}

export default ChatPage;