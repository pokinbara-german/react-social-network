/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import {dialogsActions, getDialogsList, getMessagesList} from '../../reducers/dialogsReducer';
import Divider from '@material-ui/core/Divider';
import {useDispatch, useSelector} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {MatchParams} from '../../types';
import {NoDialog} from './NoDialog/NoDialog';
import {Dialog} from './Dialog/Dialog';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import {getIsDialogsFetchingSelector} from '../../Common/Selectors/Selectors';
import withAuthRedirect from '../../Hocs/withAuthRedirect';
import Preloader from '../../Common/Preloader/Preloader';
import {DialogsList} from './DialogsList/DialogsList';

type matchType = RouteComponentProps<MatchParams>;

/**
 * Returns page with dialogs.
 * Allow only for authorized users.
 * @param {Object} props - props object
 * @param {matchType} props.match - props from router
 * @returns {JSX.Element}
 * @constructor
 */
const Dialogs: React.FC<matchType> = (props) => {
    const isDialogsFetching = useSelector(getIsDialogsFetchingSelector);
    const dispatch = useDispatch();
    const currentDialogId = props.match.params.userId ? parseInt(props.match.params.userId) : 0;

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            dialogsWrapper: {
                display: 'flex',
                margin: theme.spacing(-3)
            },
            dialogs: {
                display: 'flex',
                [theme.breakpoints.down('xs')]: {
                    display: currentDialogId ? 'none' : 'flex',
                    width: '100%'
                },
            },
            emptyDialogsList: {
                minWidth: 200
            }
        }),
    );

    const classes = useStyles();

    React.useEffect(() => {
        if (currentDialogId) {
            dispatch(dialogsActions.chatChanged(currentDialogId));
            dispatch(getMessagesList(currentDialogId));
        }
    }, [currentDialogId, dispatch]);

    React.useEffect(() => {
        dispatch(getDialogsList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.dialogsWrapper}>
            <div className={classes.dialogs}>
                {isDialogsFetching
                    ? <div className={classes.emptyDialogsList}><Preloader/></div>
                    : <DialogsList currentDialogId={currentDialogId}/>
                }
                <Divider orientation='vertical'/>
            </div>
            {currentDialogId
                ? <Dialog currentDialogId={currentDialogId}/>
                : <NoDialog/>
            }
        </div>
    );
};

export default withRouter(withAuthRedirect(Dialogs));