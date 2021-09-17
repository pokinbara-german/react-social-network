import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {startRefreshDialog} from '../../../../../reducers/dialogsReducer';
import {getRouteNameById, routes} from '../../../../../Common/Routes';
import Button from '@material-ui/core/Button';

type addDialogButtonPropsType = {
    userId: number
}

/**
 * Returns button for start new dialog.
 * @param {addDialogButtonPropsType} props - props object
 * @param {number} props.userId - user's profile ID
 * @constructor
 */
export const AddDialogButton: React.FC<addDialogButtonPropsType> = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    /**
     * Add new dialog or refresh existing.
     * Redirects to new dialog's route.
     */
    const addDialog = () => {
        dispatch(startRefreshDialog(props.userId));
        history.push(`/${getRouteNameById(routes.dialogs.id)}/${props.userId}`);
    }

    return (
        <Button variant='contained' color='primary' onClick={addDialog}>Start dialog</Button>
    );
}