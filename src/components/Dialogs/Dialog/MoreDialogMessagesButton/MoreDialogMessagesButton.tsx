import React from 'react';
import {useDispatch} from 'react-redux';
import {getMessagesList} from '../../../../reducers/dialogsReducer';
import Button from '@material-ui/core/Button';

type moreDialogMessagesButtonPropsType = {
    currentDialogId: number
}

/**
 * Returns complete button for request next page of messages.
 * @param {moreDialogMessagesButtonPropsType} props - props object
 * @param {number} props.currentDialogId - ID of opponent profile
 * @constructor
 */
export const MoreDialogMessagesButton: React.FC<moreDialogMessagesButtonPropsType> = (props) => {
    const dispatch = useDispatch();

    function onClick() {
        dispatch(getMessagesList(props.currentDialogId));
    }

    return (
        <li style={{display: 'flex', justifyContent: 'center'}}>
            <Button variant='outlined' color='primary' onClick={onClick}>More messages</Button>
        </li>
    );
}