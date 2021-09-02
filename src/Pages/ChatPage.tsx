import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessage, startMessagesListening, stopMessagesListening} from '../reducers/chatReducer';
import {Messages} from '../components/Chat/Messages';
import Divider from '@material-ui/core/Divider';
import {AddMessageForm} from '../Common/AddMessageForm/AddMessageForm';
import {getIsChatConnectedSelector} from '../Common/Selectors/Selectors';

/**
 * @const
 * @type string
 * @description block max width.
 */
const maxWidth = '40ch';

const ChatPage: React.FC = () => {
    const dispatch = useDispatch();
    const isConnected = useSelector(getIsChatConnectedSelector);

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
            <AddMessageForm blockWidth={maxWidth}
                            sendMessage={sendMessage}
                            buttonText='Send'
                            minTextLength={2}
                            maxTextLength={100}
                            isBlocked={!isConnected}
            />
        </div>
    );
}

export default ChatPage;