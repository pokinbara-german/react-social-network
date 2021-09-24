import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessage, startMessagesListening, stopMessagesListening} from '../../reducers/chatReducer';
import {ChatMessages} from './ChatMessages/ChatMessages';
import Divider from '@material-ui/core/Divider';
import {AddMessageForm} from '../Common/AddMessageForm/AddMessageForm';
import {getIsChatConnectedSelector} from '../../selectors/selectors';
import withAuthRedirect from '../../Hocs/withAuthRedirect';

/**
 * @const
 * @type string
 * @description block max width.
 */
const MAX_WIDTH = '30ch';

/**
 * Returns whole page of chat.
 * Available only for authorized users.
 * @constructor
 */
const Chat: React.FC = () => {
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
            <ChatMessages/>
            <Divider/>
            <AddMessageForm blockWidth={MAX_WIDTH}
                            sendMessage={sendMessage}
                            buttonText='Send'
                            minTextLength={2}
                            maxTextLength={100}
                            isBlocked={!isConnected}
            />
        </div>
    );
}

export default withAuthRedirect(Chat);