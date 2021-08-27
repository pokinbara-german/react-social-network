import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessage} from '../../reducers/chatReducer';
import {appStateType} from '../../redux/reduxStore';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chatForm: {
            display: 'flex',
            flexDirection: 'column',
            margin: theme.spacing(1),
            width: '40ch',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        sendButton: {
            alignSelf: 'start'
        }
    }),
);

/**
 * Returns form for send message to chat.
 * @constructor
 */
export const AddMessage: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [message, setMessage] = useState('');

    const isConnected = useSelector((state: appStateType) => state.chat.isConnected);

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
        <div className={classes.chatForm}>
            <Tooltip title={'You can type multiline. Just hit enter.'} aria-label='Hint' placement="right" arrow>
                <TextField multiline onChange={messageChange} value={message} placeholder='Type something'/>
            </Tooltip>
            <Button className={classes.sendButton}
                    variant='contained'
                    color='primary'
                    disabled={!isConnected}
                    onClick={sendMessageHandler}
            >
                Send
            </Button>
        </div>
    );
}